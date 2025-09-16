import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import Afpalogo from '../assets/logo/logo3.png'
import classes from '../module/css/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner/Spinner.tsx'
import './css/Login.css';

export function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const token = localStorage.getItem('userToken');

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  // if (token) {
  //   setTimeout(() => window.location.href = '/home', 50);
  //   return <Spinner />;
  // }
  // useEffect(() => {
  //     if (localStorage.getItem('userToken')) {
  //       navigate('/home');
  //     }
  //   }, [navigate]);
    
  // const form = useForm({
  //   mode: 'uncontrolled',
  //   initialValues: {
  //     email: '',
  //     password: '',
  //   },
  //   validate: {
  //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
  //   },
  // });

  const handleFormSubmit = (values) => {
    setLoading(true);
    console.log("Submitting raw values:", values);
    const userPayload = {
      ...values,
    };

    axios.post('http://127.0.0.1:8000/api/login_check', userPayload, {
      headers: {
        'Content-Type': 'application/ld+json'
      }
    })
      .then(function (response) {
        console.log("Connexion réussie:", response.data);
        const token = response.data.token;
        localStorage.setItem('userToken', token);
        setShowSpinner(true);

        if (token) {
          localStorage.setItem('jwt_token', token);
          // navigate('/home');
          window.location.href = '/home';
        } else {
          console.log("Aucun token reçu, veuillez réessayer.");
        }
      })
      .catch(function (error) {
        // console.error("Error1:", error.response ? error.response.data : error.message);
        alert('Vos données ne sont pas correctes, veuillez les ressaisir !')
      })
      .finally(() => {
        setLoading(false);
      });
  };


   if (showSpinner) {
    return <Spinner/>;
  }
  return (
    <>
         <video width="600" height="100"  autoPlay muted loop playsInline className='back-video'>
          <source src="/upload/video.mp4" type="video/mp4" />
          Votre navigatteur ne support pas video.
        </video>
    <Container size={420} mt={-100} id="login-form" >
      <Image src={Afpalogo} ></Image>
      <Title ta="center" className={classes.title}>
        Connexion
      </Title>

      <Text className={classes.subtitle}>
        <Anchor component={Link} to="/create-account" c="#86bc24">
          Créer un compte
        </Anchor>
        <Anchor component={Link} to="/home" c="#86bc24">
          Home Page
        </Anchor>
      </Text>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
          <TextInput
            label="Courrier"
            placeholder="courrier@nomcourrier.com"
            required radius="md"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Mot de passe"
            placeholder="Mot de passe ultra securisée"
            required mt="md"
            radius="md"
            {...form.getInputProps('password')}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Se souvenir" />
            <Anchor c='#86bc24' component="button" size="sm">
              Mot de passe oublié?
            </Anchor>
          </Group>
          <Button color='#86bc24' fullWidth mt="xl" radius="md" type="submit">
            Connexion
          </Button>
        </Paper>
      </form>
    </Container >
    </>
  );
}