import {
  Anchor,
  Button,
  Container,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import Afpalogo from '../assets/logo/logo3.png';
import classes from './css/module/Login.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Spinner } from '../components/Spinner/Spinner.tsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // <-- импортируем хук useAuth
import './css/Login.css';
import './css/media/login/320.css';
import { useEffect, useRef } from 'react';

export function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const onFirstTouch = () => {
            video.play();
            window.removeEventListener('touchstart', onFirstTouch);
          };
          window.addEventListener('touchstart', onFirstTouch);
        });
      }
    }
  }, []);
  
  const { login } = useAuth();  // <-- получаем метод login из контекста

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

  const handleFormSubmit = (values) => {
    setLoading(true);

    const userPayload = {
      ...values,
    };

    axios.post(
      'https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/login_check',
      userPayload,
      {
        headers: {
          'Content-Type': 'application/ld+json',
        },
      }
    )
      .then(function (response) {
        console.log('Connexion réussie:', response.data);
        const token = response.data.token;

        if (token) {
          login(token);            
          setShowSpinner(true);
          navigate('/home');       
        } else {
          console.log('Aucun token reçu, veuillez réessayer.');
        }
      })
      .catch(function () {
        alert('Vos données ne sont pas correctes, veuillez les ressaisir !');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (showSpinner) {
    return <Spinner />;
  }

  return (
    <>
    <video ref={videoRef} width="600" height="100" autoPlay muted loop playsInline className="back-video">
        <source src="/upload/video.mp4" type="video/mp4" />
        Votre navigatteur ne support pas video.
    </video>
   
      <Container size={420} mt={-100} id="login-form">
        <Image src={Afpalogo} id="logo-login"></Image>
    
        <Title ta="center" className={classes.title}>
          Connexion
        </Title>

        <Text className={classes.subtitle}>
          <Anchor component={Link} to="/create-account">
            Créer un compte
          </Anchor>
          
          <span> / </span>
          <Anchor component={Link} to="/home">
            Home Page
          </Anchor>
        </Text>

        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
            <TextInput
              label="Courrier"
              placeholder="courrier@nomcourrier.com"
              required
              radius="md"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Mot de passe"
              placeholder="Mot de passe"
              required
              mt="md"
              radius="md"
              {...form.getInputProps('password')}
            />
            <Button color="#86bc24" fullWidth mt="xl" radius="md" type="submit" disabled={loading}>
              Connexion
            </Button>
          </Paper>
        </form>
      </Container>
    </>
  );
}
