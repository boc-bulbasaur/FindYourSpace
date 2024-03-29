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
          if (user && user.is_verified) {
            const authenticated = utils.compareHash(password, user.password, user.salt);
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
  callbacks: {
    async session({session}) {
      const { user } = session;
      const result = await client.query(`SELECT * FROM users WHERE email = '${user.email}'`);
      session.user.user_id = result.rows[0].user_id;
      session.user.bluecheckmark = result.rows[0].bluecheckmark;
      return session;
  },
  async signIn({ user, account, profile }) {
    const { email, name } = user;
    const values = [email, name, true, new Date()];
    if (account.provider === 'google') {
      const result = await client.query(`INSERT INTO users (email, name, is_verified, registered_at) VALUES($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING`, values);
      console.log(result);
    }
    return true
  },
}
}

export default NextAuth(options);