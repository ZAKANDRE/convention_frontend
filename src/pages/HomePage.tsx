import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavBar } from '../components/NavBar';

export function HomePage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <NavBar />
      </AppShell.Header>
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}