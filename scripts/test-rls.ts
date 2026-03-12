import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { join } from 'path'

// Load environment variables from .env.local
dotenv.config({ path: join(process.cwd(), '.env.local') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testInsert() {
  console.log('🧪 Testing public reservation creation...')
  console.log(`URL: ${supabaseUrl}`)
  
  const testReservation = {
    name: 'Test RLS Check',
    email: 'test@example.com',
    phone: '000000000',
    reservation_date: new Date().toISOString().split('T')[0],
    reservation_time: '13:00',
    guests: 2,
    status: 'pending', 
    message: 'Automated RLS check'
  }

  const { data, error } = await supabase
    .from('reservations')
    .insert([testReservation])
    .select()

  if (error) {
    console.error('\n❌ INSERT FAILED')
    console.error(`Error Code: ${error.code}`)
    console.error(`Message: ${error.message}`)
    
    if (error.code === '42501') {
      console.log('\n⚠️  DIAGNOSIS: RLS Policy Blocking')
      console.log('The database is rejecting the insertion because the Row Level Security (RLS) policy does not allow public users to create reservations.')
      console.log('\n✅ SOLUTION:')
      console.log('You MUST run the SQL fix manually in the Supabase Dashboard.')
    }
  } else {
    console.log('\n✅ INSERT SUCCESSFUL!')
    console.log('The RLS policy is correctly configured. Public reservations are allowed.')
    
    // Clean up test data (this might fail if delete policy is restrictive, which is expected/good)
    if (data && data[0]) {
      const { error: deleteError } = await supabase
        .from('reservations')
        .delete()
        .eq('id', data[0].id)
      
      if (deleteError) {
        console.log('(Note: Could not clean up test record - this is normal if you are not admin)')
      } else {
        console.log('Cleaned up test record.')
      }
    }
  }
}

testInsert()
