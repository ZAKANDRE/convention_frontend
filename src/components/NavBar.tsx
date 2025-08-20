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

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};


const mainLinks = [
  { link: '#', label: 'Mes conventions de stage' },
  { link: '#', label: 'Conventions en traitement' },
];

export function NavBar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const mainItems = mainLinks.map((item, index) => (
    <Anchor<'a'>

      href={item.link}
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
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
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
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
    <Container>
        <Tabs defaultValue="traitement">
          <Tabs.List>
            <Tabs.Tab value="stage">
              MES CONVENTIONS DE STAGE
            </Tabs.Tab>
            <Tabs.Tab value="traitement">
              CONVENTIONS EN TRAITEMENT
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Container>

    </header>
  );
}