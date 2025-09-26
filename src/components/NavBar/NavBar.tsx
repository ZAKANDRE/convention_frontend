import {
  IconChevronDown,
  IconLogout,
  IconSchool,
  IconUserFilled,
} from '@tabler/icons-react';

import cx from 'clsx';
import { useState, useEffect } from 'react';
import { Container, Group, Menu, Text, UnstyledButton, Image, Tabs } from '@mantine/core';
import AfpalogoURL from '../../assets/logo/afpa_logo.png?url';
import { TabsListBar } from '../Tabs/TabsListBar.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';
import { Spinner } from '../Spinner/Spinner.tsx';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BellIcon, CloseNotifications } from '../SvgIcons/SvgIcons.tsx'

import classes from './css/NavBar.module.css';
import './css/NavBar.css';
import './css/media/576px.css';
import './css/media/768px.css';
import './css/media/992px.css';

export function NavBar({ news,  activeTabId, onTabSelected  }) {
  const [navUser, setNavUser] = useState({});
  const [error, setError] = useState(null);
  const {userInfo, isLoading } = useAuth();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [notif, setNotif] = useState(0);
  const [newNotifs, setNewNotifs] = useState<{id: number, dateStart: string, dateEnd: string}[]>([]);
  let student = userInfo.roles[0] === "ROLE_STUDENT";

const getNotificationIds = () => {
  return  news
    .map(row => 
         row.rows.filter(row1 => (row1.progress === 100))
         .map(row1  => ({
            id: row1.id,
            dateStart: row1.dateStart,
            dateEnd: row1.dateEnd,
            student_id: row1.studentId, 
          }))
    ).flat(); 
}

useEffect(() => {
  const seenIds = JSON.parse(localStorage.getItem('notifSeenIds') || '[]') as number[];
  const currentIds = getNotificationIds();
  const newIds  = currentIds.filter(id => userInfo.id === id.student_id ? !seenIds.includes(id.id) : '' );
  setNotif(newIds.length);
  newIds ? setNewNotifs(newIds) : [];
}, [news]);


const handleNotification = () => {
  const currentIds = getNotificationIds();
  const id = currentIds.map(item => item.id);
  localStorage.setItem('notifSeenIds', JSON.stringify(id));
  setNotif(0);
  setNewNotifs([]);
}
const navigate = useNavigate();

useEffect(() => {
  (async () => {
      try {
        const res1 = await fetch('https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/users');
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

const { logout } = useAuth();
const handleTokenDelete = () => {
  logout();            
  navigate('/login');  
};

const displayUser = userInfo ? {
    name: `${userInfo.first_name} ${userInfo.last_name}`,
    formation: userInfo.formation?.name || <Spinner/>,
} : null;


  return (
    <header className={classes.header}>
      <Image src={AfpalogoURL} h={70} w="auto" className='main-logo'/> {/* logo  */}
      {/* ouverture du menu responsive */}
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
            </Tabs>
          </Nav.Link>

              </Nav>
              

    {userInfo && (
      <>
        <aside className='header-right-side'>
          {student && (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton>
                  <section className="notification" >
                  {notif > 0
                    ?
                    <p className="notif-alarm">
                      <strong> {notif}</strong>
                    </p>
                    : ''
                  }
                  <BellIcon />
                  </section>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown id="notification">
                <Menu.Label>
                  Notification
                  <span onClick={() => handleNotification()}>
                      <CloseNotifications   />
                  </span>
                </Menu.Label>
                  {notif === 0
                    ? (
                    <Menu.Item disabled>
                      Vous n'avez pas encore des nouveaux notifications!
                    </Menu.Item>
                      ) : (
                
                    newNotifs.map(item => {
                    const dateStartConverted = new Date (item.dateStart).toLocaleDateString('fr-FR');
                    const dateEndFormated =  new Date (item.dateEnd).toLocaleDateString('fr-FR');

                      return (
                      <Menu.Item key={item.id} >
                        Votre convention du {dateStartConverted} au {dateEndFormated} a été traitée !
                      </Menu.Item>
                      );
                    })
                  )}
              </Menu.Dropdown>
            </Menu>
          )} {  /* fin student && seulement les utilisateur avec le role student peuvent voir les notifications */}

          {/* menu derolant pour se decconecter */}
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() =>  setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.userInfo, { [classes.userActive]: userMenuOpened })}
                >
                  <Group gap={7}>
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {displayUser?.name || <Spinner />}

                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                <IconUserFilled/>

                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Profil</Menu.Label>
                <Menu.Item leftSection={<IconSchool size={16} stroke={1.5} />}>
                  {displayUser?.formation || <Spinner />}
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconLogout size={16} stroke={1.5} />}
                  onClick={handleTokenDelete}
                >
                  <Text>Déconnexion</Text>
                </Menu.Item>
              </Menu.Dropdown>

            </Menu>
        </aside>
      </>
    )}
            </Navbar.Collapse>
        </Container>
      </Navbar>  {/* fermeture du menu responsive */}
    </header>
  );
}