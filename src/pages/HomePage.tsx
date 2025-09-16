import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/* Mantine import */
import { Input, CloseButton } from '@mantine/core';
/** checkin component* */
import { useAuth } from '../context/AuthContext.js';
/** personnal components* */
import { NavBar }           from '../components/NavBar/NavBar.tsx';
import { fetchDate}         from '../api/conventionsApi';
import { fetchAllUsers, 
         fetchAllFormation,
         fetchAllSocieties 
        }                   from '../api/useffects.js';
import { MainTable }        from '../components/MainTable/MainTable';
import { SocietyInfoModal } from '../components/SocietyInfoModal/SocietyInfoModal';
import { ConventionModal  } from '../components/ConventionModal/ConventionModal';
import { AddConventionBtn } from '../components/AddConventionBtn/AddConventionBtn';

import {
  getFormationName,
  getUserFirstName,
  getUserLastName
} from '../utils/dataFormatters';
import { Pagination } from '../components/Pagination/Pagination.tsx';
/** css files**/
import './css/HomePage.css';
import './css/media/320homePage.css';
import './css/media/992homePage.css';
import './css/media/1200homePage.css';
import 'bootstrap/dist/css/bootstrap.css';

export function HomePage() {
    const [mainLinks, setMainLinks] = useState([
        { id: 1, link: '#', label: 'Conventions de stage signés', value: 'stage', rows: [] },
        { id: 2, link: '#', label: 'Conventions en traitement', value: 'traitement', rows: [] },
      ]);
  const location = useLocation();
  const { state } = location;
  /** Get data from modal input**/
  const [inputDateStart, setinputDateStart] = useState('');
  const [inputDateEnd, setinputDateEnd] = useState('');
  /** end of Get data from modal input**/
  /** fin Add society form**/
  const [activeTabId, setActiveTabId] = useState(2);
  const { userInfo, isLoading } = useAuth();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [selRowAddSoc, setSelRowAddSoc] = useState(null); 
  const [error, setError] = useState<string | null>(null);
  /** GetInfo from API **/
  const [user, setUser] = useState({});
  const [getFormation, setGetFormation] = useState({});
  const [getSociety, setGetSociety] = useState({});
  /** Active link form menu **/
  const activeTab = mainLinks.find((tab) => tab.id === activeTabId);
  const selectedRow = activeTab?.rows.find((row) => row.id === selectedRowId);
  /** Offcanvas show - hide elements **/
  const handleClose = () => setSelectedRowId(null);
  const handleShow = (id: number) => { setSelectedRowId(id); };
  /** Modal window**/
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  /** Show convention Date **/
  const [showSociety, setShowSociety] = useState(false);
  const handleCloseSociety = () => setShowSociety(false);
  const handleShowSociety = () => setShowSociety(true);
  /** Modal add Society**/
  const [showAddSociety, setShowAddSociety] = useState(false);
  const handleCloseAddSociety = () => setShowAddSociety(false);

  const handleShowAddSociety = (row) => { 
    setSelRowAddSoc(row); 
    setShowAddSociety(true);
  };
console.log(activeTab.label)

  /** Update Ring variables **/
  const ringValues = [{ id: 1, value: 25},{id: 2, value: 50},{id: 3,value: 75},{id: 4,value: 100}];
  const [showAlert, setShowAlert] = useState(false);

  const [value, setValue] = useState('');

  /* recherche sur tableau */
  const filteredRows :string [] = value.length !== 0
  ? activeTab?.rows.filter((row) => {
      const firstName = getUserFirstName(row.studentId, user);
      const lastName = getUserLastName(row.studentId, user);
      const formationName = getFormationName(row.formationId, getFormation);
      const fullName = `${firstName} ${lastName} ${formationName}`.toLowerCase();
      return fullName.includes(value.toLowerCase());
    })
  : activeTab?.rows || [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  // Создаем массив элементов
  const allItems = activeTab.rows;
  // Вычисляем данные для текущей страницы
  const startIndex = (currentPage - 1) * itemsPerPage;
  let currentItems : string [] = [];
  if(value.length === 0){
      currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);
  }
  else{
      currentItems = filteredRows;
  }
  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(allItems.length / itemsPerPage);
    let pageNumbers = [];
    // Создаем массив номеров страниц [1, 2, 3, ...]
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
useEffect(() => {
  (async () => {
    try {
      await Promise.all([
       fetchDate(setMainLinks), 
       fetchAllUsers('http://127.0.0.1:8000/api/users', setUser),
       fetchAllFormation('http://127.0.0.1:8000/api/formations?page=1', setGetFormation),
       fetchAllSocieties('http://127.0.0.1:8000/api/societies', setGetSociety),
      ]);
    } catch (err: any) {
      console.error('Error lors du téléchargement:', err);
      setError(err.message);  
    }
  })();
}, []); 

useEffect(() => {
  if (showAlert) {
    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [showAlert]);

return (
  <>
  <NavBar news={mainLinks} activeTabId={activeTabId} onTabSelected={setActiveTabId} />
  
  <main id="main">
      <section className='top-table mb-3'>

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
              className='searching-input'
            />
            }
            id="serching-input"  
        />
   
        <AddConventionBtn 
            handleShowModal={handleShowModal}
            userInfo={userInfo}
        />

      </section>  

  {activeTab && userInfo && user && ringValues && (
    <>
        <MainTable
          // activeTab={{ ...activeTab, rows: filteredRows }}
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
      {activeTabId === 1 ? 
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageNumbers={pageNumbers} totalPages={totalPages}/> 
                         : ''
      }
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
