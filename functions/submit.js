// Escape HTML entities to prevent XSS in email body
function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const hp      = (formData.get('_hp')     || '').trim(); // honeypot

    // Honeypot: bots fill hidden fields, humans don't
    if (hp) {
      return Response.json({ success: true }); // silently discard
    }

    // Trim and enforce max lengths
    const name    = (formData.get('name')    || '').trim().slice(0, 100);
    const email   = (formData.get('email')   || '').trim().slice(0, 254);
    const subject = (formData.get('subject') || 'General Inquiry').trim().slice(0, 100);
    const message = (formData.get('message') || '').trim().slice(0, 5000);

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: 'Please fill all required fields.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const toEmail   = env.CONTACT_EMAIL || 'info@yogiramsuratkumarashram.org';
    const hostname  = new URL(request.url).hostname;

    const payload = {
      personalizations: [{
        to: [{ email: toEmail, name: 'Ashram Admin' }],
        reply_to: { email, name }
      }],
      from: {
        email: `noreply@${hostname}`,
        name:  'Yogi Ramsuratkumar Ashram Website'
      },
      subject: `[Contact] ${subject} — from ${name}`,
      content: [
        {
          type: 'text/plain',
          value: `Name:    ${name}\nEmail:   ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
        },
        {
          type: 'text/html',
          value: `
            <p>
              <strong>Name:</strong> ${esc(name)}<br>
              <strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a><br>
              <strong>Subject:</strong> ${esc(subject)}
            </p>
            <hr>
            <p style="white-space:pre-line;">${esc(message)}</p>
          `
        }
      ]
    };

    const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });

    if (res.status === 202) {
      return Response.json({ success: true });
    }

    const errText = await res.text();
    console.error('MailChannels error:', res.status, errText);
    return Response.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );

  } catch (e) {
    console.error('Submit error:', e);
    return Response.json(
      { success: false, error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}
