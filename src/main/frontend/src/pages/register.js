import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = () => {
  const router = useRouter();
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
        .max(255)
        .required(
          'Veuillez renseigner votre numéro de téléphone'),
      pays: Yup
        .string()
        .max(255)
        .required(
          'Veuillez renseigner votre pays'),
      password: Yup
        .string()
        .max(255)
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
      saveUser();
      router.push('/login');
    }
  });

  const saveUser = async (e) => {
    const response = await fetch("http://localhost:8080/clients",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formik.values),
    });

    if(!response.ok){
      throw new Error("Une erreur s'est produite");
    }
  };

  return (
    <>
      <Head>
        <title>
          Inscription | Ourairbnb
        </title>
      </Head>
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
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Acceuil
            </Button>
          </NextLink>
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
                disabled={formik.isSubmitting}
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
    </>
  );
};

export default Register;
