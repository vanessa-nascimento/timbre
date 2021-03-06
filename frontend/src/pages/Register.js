import axios from "axios";
import React from "react";

import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Link, Container, Typography } from '@material-ui/core';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RegisterForm } from '../components/authentication/register';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const baseURL = "http://localhost:3000/api/cadastro";

export default function Register() {
  const [cadastro, setCadastro] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      setCadastro(response.data);
    });
  }, []);

  function createUser() {
    axios
      .post(baseURL, {
        nome: "Hello World!",
        email: "This is a new post.",
        senha: "Hello World!",
        cpf: "Hello World!",
        data_nascimento: "This is a new post."
      })
      .then((response) => {
        setCadastro(response.data);
      });
  }

  if (!cadastro) return "Sem cadastro!"

  return (
    <RootStyle title="Cadastre-se | TImbre">
      <AuthLayout>
        Já possui uma conta? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Administre eventos aonde estiver com o TImbre
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Fique ligado nos eventos mais <br /> próximos de você
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Crie. Administre. Participe. A TImbre vai estar com você
            </Typography>
          </Box>

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            Ao se registrar, você está de acordo com&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Termos de Serviço
            </Link>
            &nbsp;e a&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Política de Privacidade
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Já possui uma conta?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
