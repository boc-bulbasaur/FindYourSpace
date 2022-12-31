import React, { useState }  from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
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
import { signIn } from "next-auth/react";
import client from '../../../database/db.js';

export default function PasswordReset({ email, validToken, token }) {
  const [message, setMessage] = useState('');

  const initialValues = {
    password: '',
    confirmPassword: ''
  };
  const validationSchema = yup.object().shape({
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

  const handleSubmit = async ({password}) => {
    const credentials = {
      email,
      password,
      token
    };
    await fetch('/api/update-password', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('Success:', response);
        signIn('credentials', { email, password, callbackUrl: 'http://localhost:3000/'});
      }
    })
    .catch((error) => {
      setMessage('An error has occurred. If the problem persists, please contact us.')
      console.error('Error:', error);
    });
  };
  const handleNewLink = async () => {
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

  if (validToken) {
    return (
      <Container maxW="xl" centerContent>
        <Heading as="h1" textAlign="center" marginTop={50}>
          Please create a new password.
        </Heading>
        <Box
          alignContent="center"
          justifyContent="center"
          marginTop={20}
          backgroundColor={'white'}
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
                      Reset Password
                    </Button>
                  </CardActions>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container maxW="xl" centerContent>
        <Heading as="h1" textAlign="center" marginTop={50}>
          Link is invalid or may have expired.
        </Heading>
        <Box
          alignContent="center"
          justifyContent="center"
          marginTop={20}
          backgroundColor={'white'}
          sx={{ p: 30, width: 400 }}
        >
          <Box margin={8} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'stretch'}>
            <Typography color={'error'} textAlign="center" sx={{ m: 1.2 }}>{message}</Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{ p: 1, m: 1 }}
              onClick={handleNewLink}
            >
              Send a new link
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }
};

export async function getServerSideProps({ query, req, res }) {
  const email = decodeURIComponent(query.email);
  const { token } = query;
  const validToken = await client.query(`SELECT * FROM users WHERE email = $1 AND token = $2`,
  [email, token]).then(async (result) => {
      const user = result.rows[0];
      if (!user || new Date() > user.token_expires.getTime()) {
        return false;
      } else {
        return true;
      }
    }).catch((err) => {
      if (err) {
        console.log(err);
        return false;
      }
    });
  return {
    props: {
      email,
      validToken,
      token
    }
  };
};