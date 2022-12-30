import React, { useState } from "react";
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

export default function Signup() {
  const { data: session } = useSession();

  const [message, setMessage] = useState('');

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must contain a combination of 8 lowercase and uppercase letters, numbers, and special characters'
      ),
    confirmPassword: yup
      .string()
      .required('Please reenter your password')
      .oneOf([yup.ref('password'), null], "Passwords don\'t match")
  });

  const handleSubmit = async (credentials) => {
    await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    .then((response) => {
      if (response.status === 422) {
        console.log('User already exists.', new Date());
        setMessage('User cannot be created.');
        return;
      }
      if (response.status === 201) {
        console.log('Success:', response);
        setMessage('User created! Please check your email.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setMessage('An error has occurred.');
    });
  }

  return (
    <>
      <NavBar session={session}/>
      <Container maxW="xl" centerContent marginBottom={50}>
        <Heading as="h1" textAlign="center" marginTop={50}>
          Let&apos;s get you started
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
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      required
                      helperText={touched.name && errors.name}
                      label="Name"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.name}
                      variant="outlined"
                      sx={{ py: 1.2 }}
                    />
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
                    <TextField
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      fullWidth
                      required
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      label="Confirm Password"
                      name="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.confirmPassword}
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
                      Sign Up
                    </Button>
                  </CardActions>
                </form>
            )}
            </Formik>
            <Typography color={'black'} textAlign="center" marginTop={3}>Already have an account?</Typography>
            <Typography color={'primary'} textAlign="center" margin={1}><Link href='/login'>Log in</Link></Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

Signup.getInitialProps = async (context) => {
  const { req, res } = context;
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