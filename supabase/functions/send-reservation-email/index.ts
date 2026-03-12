import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

interface ReservationEmailPayload {
  id: string;
  name: string;
  email: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const payload: ReservationEmailPayload = await req.json();
    const { id, name, email, reservation_date, reservation_time, guests } = payload;

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY no está configurado en Supabase Secrets');
    }

    // Format date DD/MM/YYYY
    const [year, month, day] = reservation_date.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    // Confirmation URL
    const confirmUrl = `https://ilborsalino.com/confirmar/${id}`;

    // QR code image via QR Server API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(id)}`;

    const htmlBody = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmación de Reserva — Il Borsalino</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background-color: #f5f4f0; font-family: Arial, sans-serif; color: #1a1a1a; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 40px rgba(0,0,0,0.08); }
    .header { background: #1a1a1a; padding: 48px 40px 40px; text-align: center; }
    .header-line { width: 60px; height: 1px; background: #c9a84c; margin: 0 auto 20px; }
    .header-sub { font-style: italic; color: #c9a84c; font-size: 14px; letter-spacing: 0.08em; margin-bottom: 12px; }
    .header-title { color: #ffffff; font-size: 38px; font-weight: 700; letter-spacing: 0.05em; }
    .body { padding: 48px 40px; text-align: center; }
    .greeting { font-size: 26px; color: #1a1a1a; margin-bottom: 16px; font-weight: 700; }
    .intro { color: #555; font-size: 15px; line-height: 1.7; margin-bottom: 36px; }
    .details-box { background: #faf9f6; border: 1px solid #ede9e0; border-radius: 12px; padding: 24px 28px; margin-bottom: 36px; text-align: left; }
    .detail-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; color: #333; font-size: 15px; }
    .detail-row:not(:last-child) { border-bottom: 1px solid #ede9e0; }
    .detail-icon { font-size: 18px; width: 24px; text-align: center; }
    .qr-section { margin-bottom: 36px; }
    .qr-box { display: inline-block; border: 2px dashed #ddd; border-radius: 16px; padding: 24px; background: #fff; }
    .qr-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: #aaa; margin-top: 14px; }
    .btn { display: inline-block; background: #1a1a1a; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 0.04em; padding: 18px 48px; border-radius: 12px; margin-bottom: 12px; }
    .footer { background: #faf9f6; border-top: 1px solid #ede9e0; padding: 24px 40px; text-align: center; }
    .footer p { font-size: 10px; color: #bbb; text-transform: uppercase; letter-spacing: 0.2em; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="header-line"></div>
      <div class="header-sub">Restaurante &amp; Pizzería</div>
      <div class="header-title">IL BORSALINO</div>
    </div>
    <div class="body">
      <p class="greeting">¡Hola, ${name}!</p>
      <p class="intro">
        Gracias por elegir <strong>Il Borsalino</strong>.<br/>
        Para asegurar tu mesa, por favor confirma tu reserva haciendo clic en el botón de abajo.
      </p>

      <div class="details-box">
        <div class="detail-row">
          <span class="detail-icon">📅</span>
          <span>${formattedDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-icon">🕐</span>
          <span>${reservation_time}h</span>
        </div>
        <div class="detail-row">
          <span class="detail-icon">👥</span>
          <span>${guests} ${guests === 1 ? 'persona' : 'personas'}</span>
        </div>
      </div>

      <div class="qr-section">
        <div class="qr-box">
          <img src="${qrUrl}" width="160" height="160" alt="QR de reserva" style="display:block;" />
          <p class="qr-label">Presenta este QR al llegar</p>
        </div>
      </div>

      <a href="${confirmUrl}" class="btn">Confirmar Reserva →</a>
    </div>
    <div class="footer">
      <p>Il Borsalino · Playa de Gandía · reservas@ilborsalino.com</p>
    </div>
  </div>
</body>
</html>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Il Borsalino <onboarding@resend.dev>',
        to: [email],
        subject: `✅ Confirmación de reserva — Il Borsalino · ${formattedDate}`,
        html: htmlBody,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      throw new Error(JSON.stringify(resendData));
    }

    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    console.error('Error sending email:', err);
    // Return 200 with success: false so the client SDK doesn't throw a generic exception and we can read the exact error
    return new Response(JSON.stringify({ success: false, error: err.message || JSON.stringify(err) }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
});
