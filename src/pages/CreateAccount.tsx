import { useState } from 'react'; // 1. Added useState import
import  { PhoneMask } from '../components/PhoneMask/PhoneMask.tsx'

import {
    Anchor,
    Button,
    Container,
    Grid,
    GridCol,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
    LoadingOverlay,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import classes from './css/module/Login.module.css';
import { FormationCombox } from '../components/FormationCombox/FormationCombox.tsx';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

export function CreateAccount() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            plainPassword: '',
            telephone: '', 
            matricule: '',
            formation: '', 
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            telephone: (value) =>
                 /^\d{2} \d{2} \d{2} \d{2} \d{2}$/.test(value)
                ? null
                : 'Numéro invalide (ex: 06 12 34 56 78)',
        },
    });
    
    const handleFormSubmit = (values) => {
        setLoading(true);
        const userPayload = {
            ...values, 
            formation: `/api/formations/${values.formation}`
        };

        axios.post('https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/users', userPayload, {
            headers: {
                'Content-Type': 'application/ld+json'
            }
        })
        .then(function (response) {
            console.log(response.data)
            alert('Votre compte a été créer avec succès !')
            notifications.show({
                title: 'Compte créé !',
                message: `L'utilisateur ${values.firstname} a été créé avec succès.`,
                color: 'green',
            });
            form.reset();
            setTimeout(() => navigate('/login'), 2000);
        })
        .catch(function (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            notifications.show({
                title: 'Erreur',
                message: 'Une erreur est survenue lors de la création du compte.',
                color: 'red',
            });
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <Container size={420} my={20}>
            <Title ta="center" className={classes.title}>
                Créer un nouveau utilisateur
            </Title>
            <Text ta="center" mt="xs">
                Vous avez déjà un compte?{' '}
                <Anchor component={Link} to="/login" c="#86bc24">
                    Retour à la connexion
                </Anchor>
            </Text>

            <form onSubmit={form.onSubmit(handleFormSubmit)}>
                <Paper withBorder shadow="sm" p={22} mt={30} radius="md" style={{ position: 'relative' }}>
                    <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                    <Grid>
                        <GridCol span={6}>
                            <TextInput
                                label="Nom"
                                placeholder="Nom de famille"
                                required
                                radius="md"
                                {...form.getInputProps('last_name')}
                            />
                        </GridCol>
                        <GridCol span={6}>
                            <TextInput
                                label="Prénom"
                                placeholder="Prénom"
                                required
                                radius="md"
                                {...form.getInputProps('first_name')}
                            />
                        </GridCol>
                    </Grid>
                    
                    <FormationCombox
                        value={form.values.formation}
                        onChange={(value) => form.setFieldValue('formation', value || '')}
                    /> 
  
                    <TextInput
                        label="Courrier"
                        placeholder="votre@email.com"
                        required
                        radius="md"
                        mt="md"
                        {...form.getInputProps('email')}
                    />
                    {/* <TextInput
                        label="Téléphone"
                        placeholder="0612345678"
                        required
                        radius="md"
                        mt="md"
                        {...form.getInputProps('telephone')}
                    /> */}
                    <PhoneMask form={form}
                    />
                    <TextInput
                        label="Matricule AFPA"
                        placeholder="Matricule"
                        required
                        radius="md"
                        name="phone"
                        mt="md"
                        {...form.getInputProps('matricule')}
                    />
                    <PasswordInput
                        label="Mot de passe"
                        placeholder="Mot de passe sécurisé"
                        required
                        mt="md"
                        radius="md"
                        {...form.getInputProps('plainPassword')}
                    />

                    <Button color="#86bc24" fullWidth mt="xl" radius="md" type="submit" disabled={loading}>
                        {loading ? 'Création en cours...' : 'Créer le compte'}
                    </Button>
                </Paper>
            </form>
        </Container>
    );
}
