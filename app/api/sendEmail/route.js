import nodemailer from 'nodemailer';

export async function POST(req) {
  const { to, subject, text } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      text,
    });

    return new Response(JSON.stringify({ message: 'Email sent' }), { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return new Response(JSON.stringify({ message: 'Email failed' }), { status: 500 });
  }
}
