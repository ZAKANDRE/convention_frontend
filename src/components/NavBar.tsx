import {
  IconChevronDown,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import cx from 'clsx';
import { useState, useEffect } from 'react';
import { Anchor, Avatar, Container, Group, Menu, Text, UnstyledButton, Image, Tabs, Skeleton } from '@mantine/core';
import AfpalogoURL from '../assets/logo/afpa_logo.png?url';
import classes from '../module/css/NavBar.module.css';
import { TabsListBar } from './Tabs/TabsListBar.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

export function NavBar({ news, activeTabId, onTabSelected }) {
  const [navUser, setNavUser] = useState({});
  const [error, setError] = useState(null);
  const { userInfo, isLoading } = useAuth();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res1 = await fetch('http://127.0.0.1:8000/api/users');
        if (!res1.ok) throw new Error('Erreur téléchargement users');
        const data1 = await res1.json();
        const rows1 = data1.member;

        const usersData = rows1.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});
        setNavUser(usersData);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  const getUserFirstName = (userId) => {
    const user = navUser[userId];
    return user?.first_name || 'Téléchargement...';
  };

  const getUserLastName = (userId) => {
    const user = navUser[userId];
    return user?.last_name || 'Téléchargement...'; // Змінив first_name на last_name
  };

  const handleTokenDelete = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  // Використовуємо умовний рендеринг поки дані завантажуються
  const displayUser = userInfo ? {
    name: `${getUserFirstName(userInfo.id)} ${getUserLastName(userInfo.id)}`,
    formation: userInfo.formation?.name || 'Aucune formation',
  } : null;

  const mainItems = news.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      className={classes.mainLink}
      data-active={item.id === activeTabId || undefined}
      onClick={(event) => {
        event.preventDefault();
        onTabSelected(item.id);
      }}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <header className={classes.header}>
      <Container className={classes.mainSection}>
        <div className={classes.inner}>
          <Image src={AfpalogoURL} h={50} w="auto" />

          {userInfo && (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Group>
                <Text fw={500} size="sm" lh={1} mr={3}>
                  {displayUser?.formation || 'Chargement...'}
                </Text>
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.userInfo, { [classes.userActive]: userMenuOpened })}
                  >
                    <Group gap={7}>
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {displayUser?.name || 'Chargement...'}
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
                <Menu.Item 
                  leftSection={<IconLogout size={16} stroke={1.5} />}
                  onClick={handleTokenDelete}
                >
                  <Text>Déconnexion</Text>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </Container>
      
      <Container>
        {/* {userInfo?.roles?.[0] === "ROLE_STUDENT" && ( */}
        <Tabs 
          defaultValue={news.find((item) => item.id === activeTabId)?.value}
          onChange={(value) => {
            const selected = news.find((item) => item.value === value);
            if (selected) {
              onTabSelected(selected.id);
            }
          }}
        >
          <TabsListBar infos={news} />
        </Tabs>
         {/* )} */}

      </Container>

      {userInfo && (
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
            {/* <Tabs.List>{items}</Tabs.List> */}
          </Tabs>
        </Container>
      )}
    </header>
  );
}