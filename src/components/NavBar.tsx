import {
  IconChevronDown,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import cx from 'clsx';
import { useState } from 'react';
import { Anchor, Avatar, Container, Group, Menu, Text, UnstyledButton, Image, Tabs, Skeleton } from '@mantine/core';
import AfpalogoURL from '../assets/logo/afpa_logo.png?url';
import classes from '../module/css/NavBar.module.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const tabs = [
  'MES CONVENTIONS',
  'CONVENTIONS EN COURS DE TRAITEMENT',
];


export function NavBar() {
  const { user, isLoading } = useAuth();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const navigate = useNavigate();

  const hadleTokenDelete = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };
  console.log("User in NavBar:", user);

  if (isLoading) {
    return (
      <header className={classes.header}>
        <Container className={classes.mainSection}>
          <div className={classes.inner}>
            <Image src={AfpalogoURL} h={50} w="auto" />
            <Group gap={7}>
              <Skeleton height={45} circle />
              <Skeleton height={8} width={80} radius="xl" />
            </Group>
          </div>
        </Container>
      </header>
    );
  }

  const displayUser = {
    name: user ? `${user.first_name} ${user.last_name}` : 'Invité',
    formation: user ? `${user.formation.name}` : 'Aucune formation',
  };

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

          {user && (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            > <Group>
              <Text fw={500} size="sm" lh={1} mr={3}>
                  {displayUser.formation}
                </Text>
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                  >
                    <Group gap={7}>
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {displayUser.name}
                      </Text>
                      <IconChevronDown size={12} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                
              </Group>
              <Menu.Dropdown>
                <Menu.Label>Options</Menu.Label>
                <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
                  Informations compte
                </Menu.Item>
                <Group onClick={hadleTokenDelete}>
                  <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>
                    <Text >Déconnexion</Text>
                  </Menu.Item>
                </Group>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </Container>

      {/* N'afficher les onglets que si l'utilisateur est connecté */}
      {user && (
        <Container size="md">
          <Tabs
            defaultValue="MES CONVENTIONS"
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
      )}
    </header>
  );
}