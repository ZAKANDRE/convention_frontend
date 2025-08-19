// src/components/NavBar.tsx

import { useState } from 'react';
import { Anchor, Box, Burger, Container, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// La ligne d'importation a été modifiée pour être plus explicite
import AfpalogoURL from '../assets/logo/afpa_logo.png?url';
import classes from '../module/css/NavBar.module.css';

const userLinks = [
  { link: '#', label: 'Mon compte' }
];

const mainLinks = [
  { link: '#', label: 'Mes conventions' },
  { link: '#', label: 'Conventions envoyés' }
];

export function NavBar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(0);

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

  const secondaryItems = userLinks.map((item) => (
    <Anchor
      href={item.link}
      key={item.label}
      onClick={(event) => event.preventDefault()}
      className={classes.secondaryLink}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <Image src={AfpalogoURL} h={50} w="auto" />

        <Box className={classes.links} visibleFrom="sm">
          <Group justify="flex-end">{secondaryItems}</Group>
          <Group gap={0} justify="flex-end" className={classes.mainLinks}>
            {mainItems}
          </Group>
        </Box>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          hiddenFrom="sm"
        />
      </Container>
    </header>
  );
}