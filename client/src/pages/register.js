import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import AuthService from "../services/auth.service";
import { HomeNavbar } from 'src/components/clientSide/home-navbar';
import Router from 'next/router';

const Register = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const phoneRegExp = /^(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/;
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      lastName: '',
      telephone: '',
      pays: '',
      password: '',
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Le mail doit être valide')
        .max(255)
        .required(
          'Veuillez renseigner votre adresse mail'),
      name: Yup
        .string()
        .max(255)
        .required(
          'Veuillez renseigner votre nom'),
      lastName: Yup
        .string()
        .max(255)
        .required(
          'Veuillez renseigner votre prénom'),
      telephone: Yup
        .string()
        .matches(phoneRegExp, 'Veuillez respecter le format du numéro de téléphone')
        .required(
          'Veuillez renseigner votre numéro de téléphone'),
      pays: Yup
        .string()
        .max(255)
        .required(
          'Veuillez renseigner votre pays'),
      password: Yup
        .string()
        .min(6)
        .max(40)
        .required(
          'Veuillez renseigner un mot de passe'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'Veuillez acccepter nos conditions'
        )
    }),
    onSubmit: () => {
      handleRegister();
    }
  });

  const handleRegister = () => {
    setMessage("");
    AuthService.register(formik.values.email, 
      formik.values.name, formik.values.lastName, formik.values.telephone, 
      formik.values.pays, formik.values.avatar, formik.values.password).then(
      (response) => {
        setMessage(response.data.message);
        setTimeout(() => {  Router.push('/login'); }, 1500);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  };


  return (
    <>
      <Head>
        <title>
          Inscription | {process.env.APP_NAME}
        </title>
      </Head>
      <HomeNavbar/>
      <br/><br/>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Créer un compte
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Utilisez votre adresse mail afin de créer un compte
                {message && (
                  <div className="form-group">
                    <div
                      className={ "alert alert-success" }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Nom"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Prénom"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Adresse mail"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.telephone && formik.errors.telephone)}
              fullWidth
              helperText={formik.touched.telephone && formik.errors.telephone}
              label="Numéro de téléphone"
              margin="normal"
              name="telephone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.telephone}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.pays && formik.errors.pays)}
              fullWidth
              helperText={formik.touched.pays && formik.errors.pays}
              label="Pays"
              margin="normal"
              name="pays"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.pays}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Mot de passe"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                J'ai lu et j'accepte les
                {' '}
                <NextLink
                  href="#"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    termes et conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={!(formik.isValid && formik.dirty)}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Je m'inscris
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Vous avez déjà un compte ?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Connectez-vous
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
      {message && (
                  <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  message={message}
                />
                )
      }
    </>
  );
};

export default Register;
