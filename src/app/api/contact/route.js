import { NextResponse } from 'next/server';
import { resend } from '../../../lib/email';

const OWNER_EMAIL = 'saikatsomir@gmail.com';

export async function POST(request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const subject = body.subject?.trim();
    const message = body.message?.trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please complete all required fields.',
        },
        { status: 400 }
      );
    }

    const emailResult = await resend.emails.send({
      from: '32 ocean <onboarding@resend.dev>',
      to: [OWNER_EMAIL],
      replyTo: email,
      subject: `New Contact Form: ${subject}`,

      html: `
        <div
          style="
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.6;
            color: #0b2a3a;
            max-width: 700px;
            margin: 0 auto;
          "
        >
          <h2 style="margin-bottom: 24px;">
            New Contact Form Message
          </h2>

          <div style="margin-bottom: 24px;">
            <p>
              <strong>Name:</strong>
              ${escapeHtml(name)}
            </p>

            <p>
              <strong>Email:</strong>
              ${escapeHtml(email)}
            </p>

            <p>
              <strong>Phone:</strong>
              ${escapeHtml(phone || 'Not provided')}
            </p>

            <p>
              <strong>Subject:</strong>
              ${escapeHtml(subject)}
            </p>
          </div>

          <div>
            <h3>Message</h3>

            <p
              style="
                white-space: pre-wrap;
                background: #f7f5f0;
                padding: 20px;
                border-radius: 10px;
              "
            >
              ${escapeHtml(message)}
            </p>
          </div>

          <hr
            style="
              margin: 30px 0;
              border: 0;
              border-top: 1px solid #ddd;
            "
          />

          <p style="font-size: 12px; color: #667085;">
            Sent from the 32 ocean website contact form.
          </p>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error('Resend contact email error:', emailResult.error);

      return NextResponse.json(
        {
          success: false,
          message: 'Unable to send your message right now. Please try again.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('Contact API error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to send your message right now. Please try again.',
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
