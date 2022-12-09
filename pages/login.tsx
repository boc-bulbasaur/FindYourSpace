// import React from 'react';
// import { useSession, signIn, signOut } from 'next-auth/react';

// export default function Login() {
//   const {data: session} = useSession();
//   console.log('session:', session);

//   if (session) {
//     return (
//       <div>
//         <p>Welcome, {session.user.name}!</p>
//         <img src={session.user.image} alt="" style={{borderRadius: '50px'}}/>
//         <button onClick={() => signOut()}>Sign out</button>
//       </div>
//     )
//   } else {
//     return (
//       <div>
//         <p>You are not signed in.</p>
//         <button onClick={() => signIn()}>Sign in</button>
//       </div>
//     )
//   }
// }

import React from "react";
import NavBar from "../components/navBar";
import {signIn, getSession, getCsrfToken } from "next-auth/react";
import GoogleProvider from 'next-auth/providers/google'
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Container,
  Stack,
} from "@chakra-ui/react";

export default function LogIn({ GoogleProvider, getCsrfToken }) {
  return (
    <>
      <NavBar />
      <Container maxW="xl" centerContent>
        <Heading as="h2" textAlign="center">
          Log in to your account
        </Heading>
        <Box alignContent="center" justifyContent="center" marginTop={12}>
          {/* <Box className="email-form">
            <form method="post" action="/api/auth/signin/email">
              <Input name="csrfToken" type="hidden" defaultValue={getCsrfToken} />
              <label>
                Email address
                <Input type="text" id="email" name="email" />
              </label>
              <Button type="submit">Use your Email</Button>
            </form>
          </Box> */}
          <Stack isInline marginTop={12}>
            return (
              <Box key= 'google'>
                <Button variant="outline" onClick={() => signIn(GoogleProvider)}>
                Sign in with Google</Button>
              </Box>

            )
          </Stack>
        </Box>
      </Container>
    </>
  );
}

LogIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await GoogleProvider(context.data),
    csrfToken: await getCsrfToken(context.data),
  };
};