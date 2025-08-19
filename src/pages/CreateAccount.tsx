// src/pages/CreateAccount.tsx
import {
    Anchor,
    Button,
    Container,
    Grid,
    GridCol,
    Image,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from '../module/css/Login.module.css';
import { FormationCombox } from '../components/FormationCombox';
export function CreateAccount() {
    return (
        <Container size={420} my={20}>
            <Title ta="center" className={classes.title}>
                Créer un nouveau utilisateur
            </Title>

            <Text className={classes.subtitle}>
                Vous avez déjà un compte?{' '}
                <Anchor component={Link} to="/login" c="#86bc24">
                    Retour à la connexion
                </Anchor>
            </Text>

            <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
                <Grid>
                <GridCol span={6}>  <TextInput label="Nom" placeholder="Nom" required radius="md" /></GridCol>
                <GridCol span={6}> <TextInput label="Prénom" placeholder="Prenom" required radius="md" /></GridCol>
                </Grid>
                <FormationCombox />
                <TextInput label="Courrier" placeholder="courrier@nomcourrier.com" required radius="md" />
                <PasswordInput label="Mot de passe" placeholder="Mot de passe ultra sécurisé" required mt="md" radius="md" />
                <PasswordInput label="Confirmer le mot de passe" placeholder="Confirmer le mot de passe" required mt="md" radius="md" />

                <Button color="#86bc24" fullWidth mt="xl" radius="md">
                    Créer le compte
                </Button>
            </Paper>
        </Container>
    );
}