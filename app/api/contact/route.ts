import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const emailContent = `
# Nytt kontaktmeddelande

**Från:** ${name}
**E-post:** ${email}
**Telefon:** ${phone || 'Ej angivet'}

---

## Meddelande

${message}
`;

        const { data, error } = await resend.emails.send({
            from: 'Marksen Media <onboarding@resend.dev>',
            to: ['william@marksendigital.se'],
            replyTo: email,
            subject: `Nytt kontaktmeddelande från ${name}`,
            text: emailContent,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
