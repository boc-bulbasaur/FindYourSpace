import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from "next-auth/providers/credentials";
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";
import utils from '../../../lib/crypto.js';
import client from '../../../database/db.js';


const options = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: 'credentials',
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          const { rows } = await client.query(`SELECT * FROM users WHERE email = '${email}'`);
          const user = rows[0];
          console.log('User:', user);
          if (user !== null) {
            const authenticated = utils.compareHash(password, user.password);
            if (authenticated) {
              console.log('Authenticated');
              return user;
            }
            console.log('Not authenticated');
            return null;
          } else {
            return null;
          }
        } catch (err) {
          console.log('Authorize error:', err);
        }
      }
    })
  ],
  // database: {
  //   type: 'postgres',
  //   database: 'my_user',
  //   synchronize: true,
  // },
  // adapter: TypeORMLegacyAdapter({
  //   type: "postgres",
  //   host: "localhost",
  //   port: 5432,
  //   username: "my_user",
  //   password: "root",
  //   database: "my_user",
  // }),
  pages: {
    signIn: '/login'
  },
  secret: process.env.JWT_SECRET,
}

export default NextAuth(options);