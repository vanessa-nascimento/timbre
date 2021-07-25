import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Nome é requerido'),
    email: Yup.string().email('Insira um endereço de e-mail válido').required('Email é requerido'),
    birthDate: Yup.string().required('Data de nascimento é requerida'),
    cpf: Yup.string().required('CPF é requerido'),
    password: Yup.string().required('Senha é requerida')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      birthDate: '',
      cpf: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Insira seu nome completo"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            type="email"
            label="Insira seu endereço de e-mail"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            label="Insira sua data de nascimento"
            {...getFieldProps('birthDate')}
            error={Boolean(touched.birthDate && errors.birthDate)}
            helperText={touched.birthDate && errors.birthDate}
          />

          <TextField
            fullWidth
            type="text"
            label="Insira seu CPF"
            {...getFieldProps('cpf')}
            error={Boolean(touched.cpf && errors.cpf)}
            helperText={touched.cpf && errors.cpf}
          />

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Insira sua senha"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Cadastrar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
