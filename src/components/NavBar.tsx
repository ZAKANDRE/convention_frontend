import {
  IconChevronDown,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import cx from 'clsx';
import { useState } from 'react';
import { Anchor, Avatar, Container, Group, Tabs, Image, Menu, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AfpalogoURL from '../assets/logo/afpa_logo.png?url';
import classes from '../module/css/NavBar.module.css';
import axios from 'axios';

const user = {
  name: 'Ice Cube',
  email: 'janspoon@fighter.dev',
  image: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQ30PWuhimFsjTOcl7vjAQJFFkFi5m4PC8yl71hnQN-QJnX_2IZ0wUlJN3iIhke3RHOFSnaT3gnwYaqU5M',
};


const tabs = [
  'MES CONVENTIONS',
  'CONVENTIONS EN COURS DE TRAITEMENT',
];

console.log(localStorage.getItem('userToken'));
// Créer une instance d'Axios qui inclura automatiquement le token
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Utiliser un "intercepteur" pour ajouter l'en-tête à chaque requête
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Maintenant, vous pouvez utiliser 'apiClient' pour faire des appels authentifiés
export const fetchUserProfile = () => {
  return apiClient.get('/me'); // Appel à notre future route protégée
};

export function NavBar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  
  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <header className={classes.header}>
      <Container className={classes.mainSection}>
        <div className={classes.inner}>
          <Image src={AfpalogoURL} h={50} w="auto" />
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={45} />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Options</Menu.Label>
              <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>Informations compte</Menu.Item>
              <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>Decconnexion</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </Container>
    <Container size="md">
        <Tabs
          defaultValue="Home"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>

    </header>
  );
}