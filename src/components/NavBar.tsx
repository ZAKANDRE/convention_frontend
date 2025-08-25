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
import { TabsListBar } from './Tabs/TabsListBar.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';


export function NavBar({news, activeTabId, onTabSelected }) {
  const { user, isLoading } = useAuth();
  const [active, setActive] = useState(0);
  const [field, setField] = useState(0);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const navigate = useNavigate();

  const handleTokenDelete = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

   const displayUser = {
    name: user ? `${user.first_name} ${user.last_name}` : 'Invité',
    formation: user ? `${user.formation.name}` : 'Aucune formation',
  };

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
                <Group onClick={handleTokenDelete}>
                  <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>
                    <Text >Déconnexion</Text>
                  </Menu.Item>
                </Group>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </Container>
    <Container>
        <Tabs defaultValue={news.find((item) => item.id === activeTabId)?.value}
              onChange={(value) => {
                const selected = news.find((item) => item.value === value);
                if (selected) {
                  onTabSelected(selected.id);
                }
          }}>
          <TabsListBar infos={news}/>
        </Tabs>
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
            {/* <Tabs.List>{items}</Tabs.List> */}
          </Tabs>
        </Container>
      )}
    </header>
  );
}