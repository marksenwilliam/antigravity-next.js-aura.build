import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            scope,
            seo,
            gbp,
            domain_type,
            domain_name,
            domainUnknown,
            reach,
            ecommerce,
            ecommerce_priority,
            product_count,
            product_type,
            updates,
            mail,
            mail_count,
            email_names,
            services,
            company,
            name,
            email,
            phone
        } = body;

        // Format email content
        const emailContent = `
# Ny Quiz-inlämning från ${company}

## Kontaktuppgifter
- **Företag:** ${company}
- **Namn:** ${name}
- **E-post:** ${email}
- **Telefon:** ${phone}

---

## Webbplatsbehov

### Storlek
${scope || 'Ej angivet'}

### SEO
${seo === 'primary' ? 'Ja, jätte viktigt!' :
                seo === 'complementary' ? 'Ja, lite viktigt' :
                    seo === 'none' ? 'Nej, inte så viktigt' :
                        'Vet ej – öppen för förslag'}

### Google Business Profile
${gbp === 'yes' ? 'Ja' : gbp === 'no' ? 'Nej' : 'Vet ej – öppen för förslag'}

### Domän
${domain_type === 'yes' ? `Har domän: ${domain_name}` :
                domainUnknown ? 'Behöver hjälp med domänval' :
                    `Önskar domän: ${domain_name || 'Ej angivet'}`}

### Räckvidd
${reach || 'Ej angivet'}

---

## E-handel
${ecommerce === 'yes' ? `
**Ja, behöver e-handel**
- Prioritet: ${ecommerce_priority === 'essential' ? 'Väsentligt' : 'En liten del'}
- Antal produkter: ${product_count}
- Produkttyp: ${product_type}
` : 'Nej, behöver inte e-handel'}

---

## Uppdateringsbehov
${updates === 'rarely' ? 'Sällan, 1-2 gånger per år' :
                updates === 'occasionally' ? 'Ibland, 1-2 gånger i månaden' :
                    'Ofta, 1-2+ gånger i veckan'}

---

## Företagsmail
${mail === 'yes' ? `
**Ja, behöver ${mail_count} e-postkonto(n)**
${email_names && email_names.length > 0 ?
                    email_names.map((n: string, i: number) => `${i + 1}. ${n}`).join('\n') :
                    'Inga namn angivna'}
` : 'Nej, behöver inte företagsmail'}

---

## Övriga tjänster
${services && services.length > 0 ? services.map((s: string) => {
                        if (s === 'google_ads') return '- Google Ads';
                        if (s === 'meta_ads') return '- Meta Ads';
                        if (s === 'video_content') return '- Videoproduktion & content';
                        return `- ${s}`;
                    }).join('\n') : 'Inga övriga tjänster valda'}
`;

        const { data, error } = await resend.emails.send({
            from: 'Marksen Media <onboarding@resend.dev>',
            to: ['william@marksendigital.se'],
            replyTo: email,
            subject: `Ny Quiz-inlämning: ${company}`,
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
