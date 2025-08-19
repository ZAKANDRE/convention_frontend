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
import Afpalogo from '../assets/logo/afpa_logo.png'
import classes from '../module/css/Login.module.css';
import { Link } from 'react-router-dom';

export function Login() {
  return (
    <Container size={420} mt={-100} >
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

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TextInput label="Courrier" placeholder="courrier@nomcourrier.com" required radius="md" />
        <PasswordInput label="Mot de passe" placeholder="Mot de passe ultra securisée" required mt="md" radius="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Se souvenir" />
          <Anchor c='#86bc24' component="button" size="sm">
            Mot de passe oublié?
          </Anchor>
        </Group>
        <Button color='#86bc24' fullWidth mt="xl" radius="md">
          Connexion 
        </Button>
      </Paper>
    </Container>
  );
}