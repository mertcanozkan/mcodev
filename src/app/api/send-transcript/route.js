import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const { to, firstName, messages } = await request.json()

    if (!to || !messages?.length) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const transcript = messages
      .map((m) => `${m.sender === 'bot' ? 'Angela' : firstName}: ${m.text}`)
      .join('\n\n')

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: 'Your chat transcript with Angela — MCODev',
      text: [
        `Hi ${firstName},`,
        '',
        "Here's a copy of your conversation with Angela, MCODev's AI assistant:",
        '',
        '─'.repeat(40),
        '',
        transcript,
        '',
        '─'.repeat(40),
        '',
        'Thank you for reaching out. We look forward to working with you.',
        '',
        'The MCODev Team',
        'https://mcodev.uk',
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
          <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);padding:32px 40px;border-radius:12px 12px 0 0;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;letter-spacing:-0.5px">MCODev</h1>
            <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:13px">Chat transcript with Angela</p>
          </div>
          <div style="background:#f8f9ff;padding:32px 40px">
            <p style="color:#374151;font-size:15px;margin:0 0 24px">Hi <strong>${firstName}</strong>,</p>
            <p style="color:#6b7280;font-size:14px;margin:0 0 24px;line-height:1.6">
              Here&apos;s a copy of your conversation with Angela, MCODev&apos;s AI assistant.
            </p>
            <div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:24px;margin-bottom:24px">
              ${messages.map((m) => `
                <div style="margin-bottom:16px;display:flex;gap:10px;align-items:flex-start;flex-direction:${m.sender === 'bot' ? 'row' : 'row-reverse'}">
                  <div style="width:28px;height:28px;border-radius:50%;flex-shrink:0;background:${m.sender === 'bot' ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : '#e5e7eb'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:${m.sender === 'bot' ? '#fff' : '#6b7280'}">
                    ${m.sender === 'bot' ? 'A' : firstName.charAt(0).toUpperCase()}
                  </div>
                  <div style="max-width:80%;padding:10px 14px;border-radius:12px;font-size:13px;line-height:1.6;color:${m.sender === 'bot' ? '#374151' : '#fff'};background:${m.sender === 'bot' ? '#f3f4f6' : 'linear-gradient(135deg,#6366f1,#8b5cf6)'}">
                    ${m.text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                  </div>
                </div>
              `).join('')}
            </div>
            <p style="color:#9ca3af;font-size:12px;margin:0">
              Thank you for reaching out — we look forward to working with you.
            </p>
          </div>
          <div style="background:#1e1b4b;padding:20px 40px;border-radius:0 0 12px 12px;text-align:center">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0">
              MCODev · <a href="https://mcodev.uk" style="color:rgba(255,255,255,0.5)">mcodev.uk</a>
            </p>
          </div>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('Email error:', err)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
