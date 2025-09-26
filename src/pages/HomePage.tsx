import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/* Mantine import */
import { Input, CloseButton } from '@mantine/core';
/** checkin component **/
import { useAuth } from '../context/AuthContext.js';
/** personnal components **/
import { NavBar } from '../components/NavBar/NavBar.tsx';
import { fetchDate } from '../api/conventionsApi';

import {
  fetchAllUsers,
  fetchAllFormation,
  fetchAllSocieties,
} from '../api/useffects.js';

import { MainTable } from '../components/MainTable/MainTable';
import { SocietyInfoModal } from '../components/SocietyInfoModal/SocietyInfoModal';
import { ConventionModal } from '../components/ConventionModal/ConventionModal';
import { AddConventionBtn } from '../components/AddConventionBtn/AddConventionBtn';
import { Spinner } from '../components/Spinner/Spinner.tsx';
import {
  getFormationName,
  getUserFirstName,
  getUserLastName,
} from '../utils/dataFormatters';
import { Pagination } from '../components/Pagination/Pagination.tsx';

/** css files **/
import './css/HomePage.css';
import './css/media/320homePage.css';
import './css/media/576homePage.css';
import './css/media/768homePage.css';
import './css/media/992homePage.css';
import './css/media/1200homePage.css';
import 'bootstrap/dist/css/bootstrap.css';

export function HomePage() {
  const [mainLinks, setMainLinks] = useState([
    {
      id: 1,
      link: '#',
      label: 'Conventions de stage signés',
      value: 'stage',
      rows: [],
    },
    {
      id: 2,
      link: '#',
      label: 'Conventions en traitement',
      value: 'traitement',
      rows: [],
    },
  ]);

  const location = useLocation();
  const { state } = location;

  const [inputDateStart, setinputDateStart] = useState('');
  const [inputDateEnd, setinputDateEnd] = useState('');
  const [activeTabId, setActiveTabId] = useState(2);
  const { userInfo, isLoading } = useAuth();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState({});
  const [getFormation, setGetFormation] = useState({});
  const [getSociety, setGetSociety] = useState({});

  const activeTab = mainLinks.find((tab) => tab.id === activeTabId);
  const selectedRow = activeTab?.rows.find((row) => row.id === selectedRowId);

  const handleClose = () => setSelectedRowId(null);
  const handleShow = (id: number) => {
    setSelectedRowId(id);
  };

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showSociety, setShowSociety] = useState(false);
  const handleCloseSociety = () => setShowSociety(false);
  const handleShowSociety = () => setShowSociety(true);

  const [showAlert, setShowAlert] = useState(false);
  const [value, setValue] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Сброс страницы при поиске
  useEffect(() => {
    setCurrentPage(1);
  }, [value]);

  // filtration par rapport d'onglet
  const filteredByTab =
    activeTab?.rows.filter((row) => {
      if (activeTabId === 1) return row.progress === 100;
      if (activeTabId === 2) return row.progress < 100;
      return true;
    }) || [];

  //  la recherche
  const searchedRows = filteredByTab.filter((row) => {
    if (!value.trim()) return true;

    const firstName = getUserFirstName(row.studentId, user);
    const lastName = getUserLastName(row.studentId, user);
    const formationName = getFormationName(row.formationId, getFormation);
    const fullText = `${firstName} ${lastName} ${formationName}`.toLowerCase();

    return fullText.includes(value.toLowerCase());
  });

  // pagination
  let currentItems;
  const totalPages = Math.ceil(searchedRows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
    if(userInfo.roles[0] === "ROLE_STUDENT") {
      currentItems = searchedRows; 
    }
    else{
      currentItems = searchedRows.slice(
        startIndex,
        startIndex + itemsPerPage
      );
  }
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          fetchDate(setMainLinks),
          fetchAllUsers(
            'https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/users',
            setUser
          ),
          fetchAllFormation(
            'https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/formations?page=1',
            setGetFormation
          ),
          fetchAllSocieties(
            'https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/societies',
            setGetSociety
          ),
        ]);
      } catch (err: any) {
        console.error('Error lors du téléchargement:', err);
        setError(err.message);
      }
    })();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

         
  return (
    <>
      <NavBar
        news={mainLinks}
        activeTabId={activeTabId}
        onTabSelected={setActiveTabId}
      />

      <main id="main">
        <section className="top-table mb-3">
          <Input
            placeholder="Recherche..."
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
            }}
            rightSectionPointerEvents="all"
            mt="md"
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setValue('')}
                style={{ display: value ? undefined : 'none' }}
                className="searching-input"
              />
            }
            id="serching-input"
          />

          <AddConventionBtn
            handleShowModal={handleShowModal}
            userInfo={userInfo}
          />
        </section>

        {activeTab && userInfo && user && (
          <>
            <MainTable
              activeTab={{ ...activeTab, rows: currentItems }}
              activeTabId={activeTabId}
              userInfo={userInfo}
              user={user}
              getFormation={getFormation}
              handleShowSociety={handleShowSociety}
              handleShow={handleShow}
              setMainLinks={setMainLinks}
              mainLinks={mainLinks}
            />

            {activeTabId === 1 &&
              userInfo.roles[0] !== 'ROLE_STUDENT' && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageNumbers={pageNumbers}
                  totalPages={totalPages}
                />
              )}
          </>
        )}

        <SocietyInfoModal
          show={showSociety}
          handleClose={handleCloseSociety}
          selectedRow={selectedRow}
        />

        <ConventionModal
          show={showModal}
          handleClose={handleCloseModal}
          userInfo={userInfo}
          inputDateStart={inputDateStart}
          inputDateEnd={inputDateEnd}
          setMainLinks={setMainLinks}
          setinputDateStart={setinputDateStart}
          setinputDateEnd={setinputDateEnd}
          setError={setError}
          setShowAlert={setShowAlert}
        />
      </main>
    </>
  );
}
