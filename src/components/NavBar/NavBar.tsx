import {
  IconChevronDown,
  IconLogout,
  IconSchool,
  IconUserFilled,
  IconMenu2,
} from '@tabler/icons-react';

import cx from 'clsx';
import { useState, useEffect } from 'react';
import { Anchor, Avatar, Container, Group, Menu, Text, UnstyledButton, Image, Tabs } from '@mantine/core';
import AfpalogoURL from '../../assets/logo/afpa_logo.png?url';
import { TabsListBar } from '../Tabs/TabsListBar.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { Spinner } from '../Spinner/Spinner.tsx';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import classes from './NavBar.module.css';
import './NavBar.css';
import './media/576px.css';
import './media/768px.css';
import './media/992px.css';

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

  const handleTokenDelete = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const displayUser = userInfo ? {
    name: `${userInfo.first_name} ${userInfo.last_name}`,
    formation: userInfo.formation?.name || <Spinner/>,
  } : null;


  return (
    <header className={classes.header}>

      <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"> </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <p className='empty_par'></p>

          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">
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
        </Tabs></Nav.Link>

          </Nav>
            {userInfo && (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
            
            <Group >
                <Menu.Target >
                  <UnstyledButton
                    className={cx(classes.userInfo, { [classes.userActive]: userMenuOpened })}
            >
                    <Group gap={7}>
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {displayUser?.name || <Spinner/>}
                      </Text>
                      <IconChevronDown size={12} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <IconUserFilled/>

              </Group>
              <Menu.Dropdown>
                <Menu.Label>Options</Menu.Label>
                <Menu.Item leftSection={<IconSchool size={16} stroke={1.5} />}>  
                  {displayUser?.formation || <Spinner/>}</Menu.Item>
                <Menu.Item 
                  leftSection={<IconLogout size={16} stroke={1.5} />}
                  onClick={handleTokenDelete}
                >
                  <Text>Déconnexion</Text>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Image src={AfpalogoURL} h={70} w="auto" className='main-logo'/>
        {/* <IconMenu2 stroke={2} />

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
        </Tabs> */}
        
          
    </header>
  );
}