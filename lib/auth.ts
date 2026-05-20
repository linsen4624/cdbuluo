import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { user, session, account, verification } from "./auth-schema";
//import { Resend } from 'resend';

// 这里以 Resend 为例，你也可以使用 Nodemailer 等
// const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    revokeSessionsOnPasswordReset: true,
    // 发送重置密码邮件的函数
    // async sendResetPassword({ user, url, token }, request) {
    //   await resend.emails.send({
    //     from: '你的应用 <noreply@你的域名.com>',
    //     to: [user.email],
    //     subject: "重置你的密码",
    //     html: `<a href="${url}">点击这里重置你的密码</a>`
    //   });
    // },
  },
});
