import React, { useState } from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import NavBar from "../components/navBar";
import { useSession } from "next-auth/react";
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

export default function ForgotPassword() {
  const { data: session } = useSession();
  const [message, setMessage] = useState('');

  const initialValues = {
    email: '',

  };
  const validationSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Email is required"),
  });

  const handleSubmit = async ({email}) => {
    if (email.indexOf('@') !== -1) {
      await fetch('/api/password-reset-email', {
        method: 'POST',
        body: email,
      })
      .then((response) => {
        setMessage('Please check your email for the reset password link.');
      })
      .catch((error) => {
        setMessage('An error has occurred. If the problem persists, please contact us.')
        console.error('Error:', error);
      });
    }
  }

  return (
    <>
      <NavBar session={session}/>
      <Container maxW="xl" centerContent>
        <Heading as="h1" textAlign="center" marginTop={50}>
          Let&apos;s reset your password.
        </Heading>
        <Box
          alignContent="center"
          justifyContent="center"
          marginTop={20}
          backgroundColor={'white'}
          borderRadius={10}
          sx={{ p: 30, width: 400 }}
        >
          <Box margin={8} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'stretch'}>
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
                      Send Password Reset Link
                    </Button>
                  </CardActions>
                </form>
              )}
            </Formik>
            <Typography color={'primary'} textAlign="center" margin={1}><Link href='/login'>Go back to log in</Link></Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}