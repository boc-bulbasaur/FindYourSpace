import React, { useState } from "react";
import router from 'next/router';
import { Formik } from 'formik';
import * as yup from 'yup';
import NavBar from "../components/navBar";
import { signIn, useSession, getSession } from "next-auth/react";
import Link from 'next/link';
import {
  Box,
  Heading,
  Container,
} from "@chakra-ui/react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

export default function LogIn() {
  const { data: session } = useSession();
  const [message, setMessage] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup.string().required("Please enter your password")
  });

  const handleSubmit = async ({email, password}) => {
    signIn('credentials', { email, password, redirect: false})
      .then(({ error }) => {
        if (error) {
          setMessage('You have either entered invalid credentials or your email has not been validated.');
        } else {
          router.push('/');
        }
      })
  }

  return (
    <>
      <NavBar session={session}/>
      <Container maxW="xl" centerContent>
        <Heading as="h1" textAlign="center" marginTop={50}>
          Log in to your account
        </Heading>
        <Box
          alignContent="center"
          justifyContent="center"
          marginTop={20}
          backgroundColor={'white'}
          sx={{ p: 30, width: 400 }}
        >
          <Box margin={8} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'stretch'}>
            <Button variant="contained" onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/'})}>
            Continue with Google
            </Button>
            <Typography color={'black'} textAlign="center" margin={2}>or</Typography>
            <Formik
              initialValues={{ ...initialValues }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isValid,
                touched,
                values
              }) => (
                <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <CardContent display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'stretch'}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      required
                      helperText={touched.email && errors.email}
                      label="Email"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.email}
                      variant="outlined"
                      sx={{ py: 1.2 }}
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      required
                      helperText={touched.password && errors.password}
                      label="Password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                      sx={{ py: 1.2 }}
                    />
                    <Typography color={'error'} textAlign="center" sx={{ m: 1.2 }}>{message}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      color="primary"
                      disabled={Boolean(!isValid)}
                      type="submit"
                      variant="contained"
                      sx={{width: '100%'}}
                    >
                      Log in
                    </Button>
                  </CardActions>
                </form>
              )}
            </Formik>
            <Typography color={'primary'} textAlign="center" marginTop={3}><Link href='/forgot-password'>Forgot password?</Link></Typography>
            <Typography color={'primary'} textAlign="center" margin={1}><Link href='/signup'>Create an account</Link></Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

LogIn.getInitialProps = async (context) => {
  let { req, res } = context;
  const session = await getSession({ req });
  if (session) {
    res.writeHead(301, {
      Location: '/',
    });
    res.end();
    return;
  }
  return {
    session: undefined,
  };
};