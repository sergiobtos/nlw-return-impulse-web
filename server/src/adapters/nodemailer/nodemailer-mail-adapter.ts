import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../mail-adapter";


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "43deefcf7fff2e",
    pass: "fc1ce9dc63575e"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail ({subject, body}: SendMailData) {
      await transport.sendMail({
          from: 'Team Feedget <sergiobtos1193686@gmail.com>',
          to: 'Sergio Silva <sergiobtos@hotmail.com>',
          subject,
          html: body
      }) 
  }
  
}


/* html: [
  `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
  `<p>Type of feedback: ${type} </>`,
  `<p>Comments: ${comment}`,
  `</div>`,
].join('\n') */