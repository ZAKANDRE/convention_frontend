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
import classes from '../module/css/Authentication.module.css';

export function Authentication() {
  return (
    <Container size={420} my={20}>
        <Image src={Afpalogo}></Image>
      <Title ta="center" className={classes.title}>
        Creer un nouveau utilisateur
      </Title>

      <Text className={classes.subtitle}>
        Vous avez deja une compte? <Anchor c='#86bc24' >Retour</Anchor>
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