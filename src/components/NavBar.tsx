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
import { TabsListBar } from './Tabs/TabsListBar.jsx';

const user = {
  name: 'Ice Cube',
  email: 'janspoon@fighter.dev',
  image: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQ30PWuhimFsjTOcl7vjAQJFFkFi5m4PC8yl71hnQN-QJnX_2IZ0wUlJN3iIhke3RHOFSnaT3gnwYaqU5M',
};




export function NavBar({news, activeTabId, onTabSelected }) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  const [field, setField] = useState(0);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

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

    </header>
  );
}