import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavBar } from '../components/NavBar';

export function HomePage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 120 }}
      padding="md"
    >
      <AppShell.Header>
        <NavBar/>
      </AppShell.Header>
      <AppShell.Main>Navbar is only visible on mobile, links that are rendered in the header on desktop are
        hidden on mobile in header and rendered in navbar instead.</AppShell.Main>
    </AppShell>
  );
}