const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
try {
  const envPath = path.join(process.cwd(), '.env.local');
  console.log('Reading .env.local from:', envPath);
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) return;
      
      const match = trimmedLine.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, '');
        process.env[key] = value;
        // console.log(`Loaded ${key}`); // Don't log values for security
      }
    });
  } else {
    console.error('⚠️ .env.local file NOT found!');
  }
} catch (e) {
  console.error('⚠️  Could not read .env.local:', e.message);
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  console.error('Current keys:', Object.keys(process.env).filter(k => k.startsWith('VITE_')));
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log('🧪 Testing public reservation creation (Node.js)...');
  console.log(`URL: ${supabaseUrl}`);
  
  const testReservation = {
    name: 'Test RLS Check JS',
    email: 'test-js@example.com',
    phone: '000000000',
    reservation_date: new Date().toISOString().split('T')[0],
    reservation_time: '13:00',
    guests: 2,
    status: 'pending', 
    message: 'Automated RLS check JS'
  };

  const { data, error } = await supabase
    .from('reservations')
    .insert([testReservation])
    .select();

  if (error) {
    console.error('\n❌ INSERT FAILED');
    console.error(`Error Code: ${error.code}`);
    console.error(`Message: ${error.message}`);
    
    if (error.code === '42501') {
      console.log('\n⚠️  DIAGNOSIS: RLS Policy Blocking');
      console.log('The database is rejecting the insertion because the RLS policy is restrictive.');
      console.log('You MUST run the SQL fix in Supabase Dashboard.');
    } else {
      console.log('\n⚠️  DIAGNOSIS: Other Error');
      console.log('This might be a trigger error or data type error.');
    }
  } else {
    console.log('\n✅ INSERT SUCCESSFUL!');
    console.log('Public reservations are working correctly.');
    
    // Clean up
    if (data && data[0]) {
      const { error: deleteError } = await supabase
        .from('reservations')
        .delete()
        .eq('id', data[0].id);
      
      if (deleteError) {
        console.log('(Cleanup skipped - expected for public user)');
      } else {
        console.log('Cleaned up test record.');
      }
    }
  }
}

testInsert();
