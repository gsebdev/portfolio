import nodemailer from 'nodemailer';

export const sendEmail = async (data: { name: string, email: string, message: string }): Promise<void> => {
    // Create a Nodemailer transporter with your email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW,
        },
    })

    const removeTags = (html: string) => {
        const regex = /(<([^>]+)>)/gi;
        return html.replace(regex, "");
    }

    const html = `<style>
    .title {
        font-size: large;
        color: grey;
    }
    .body {
        white-space: pre-line;
        color: darkblue;
        font-size: 1.1rem;
    }
</style>
<h1 class="title">Message de ${removeTags(data.name)}</h1>
<p class="body"><b>Message : </b>${removeTags(data.message)}</p>
<p><b>Email : </b>${removeTags(data.email)}</p>`

    // Compose the email message
    const message = {
        from: removeTags(data.email),
        to: process.env.NODEMAILER_EMAIL,
        subject: 'Message de ' + removeTags(data.name),
        html: html,
    };

    // Send the email
    await transporter.sendMail(message)
};
