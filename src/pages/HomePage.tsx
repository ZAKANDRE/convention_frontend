import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/* bootstrap import */
import {Container, Row, Col, Alert, Toast } from 'react-bootstrap';
/* Mantine import */
import { AppShell } from '@mantine/core';
/** checkin component* */
import { useAuth } from '../context/AuthContext.js';
/** another components* */
/** personnal components* */
import { NavBar } from '../components/NavBar';
import { fetchDate} from '../api/conventionsApi';
import { fetchAllUsers, fetchAllFormation, fetchAllSocieties } from '../api/useffects.js';
import { MainTable } from '../components/MainTable/MainTable';
import { AddSocietyModal } from '../components/AddSocietyModal/AddSocietyModal';
import { SocietyInfoModal } from '../components/SocietyInfoModal/SocietyInfoModal';
import { ConventionModal } from '../components/ConventionModal/ConventionModal';
import { AddConventionBtn } from '../components/AddConventionBtn/AddConventionBtn';
/** css files**/
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.css';
// import ImageToPDFGenerator from '../components/ImageToPDFGenerator/ImageToPDFGenerator.tsx';

export function HomePage() {
    const [mainLinks, setMainLinks] = useState([
        { id: 1, link: '#', label: 'Mes conventions de stage', value: 'stage', rows: [] },
        { id: 2, link: '#', label: 'Conventions en traitement', value: 'traitement', rows: [] },
      ]);
  const location = useLocation();
  const { state } = location;
  /** Get data from modal input**/
  const [inputDateStart, setinputDateStart] = useState('');
  const [inputDateEnd, setinputDateEnd] = useState('');
  /** end of Get data from modal input**/
  /** Add society form**/
  const [addSocietyName,setAddSocietyName] = useState('');
  const [addSocietyAdresse,setAddSocietyAdresse] = useState('');
  const [addSocietyNumber, setAddSocietyNumber] = useState('');
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
  /** Update Ring variables **/
  const ringValues = [{ id: 1, value: 25},{id: 2, value: 50},{id: 3,value: 75},{id: 4,value: 100}];
  const [showAlert, setShowAlert] = useState(false);
useEffect(() => {
  (async () => {
    try {
      await fetchDate(setMainLinks); 
      await fetchAllUsers('http://127.0.0.1:8000/api/users', setUser);
      await fetchAllFormation('http://127.0.0.1:8000/api/formations?page=1', setGetFormation);
      await fetchAllSocieties('http://127.0.0.1:8000/api/societies', setGetSociety);
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
    <AppShell header={{ height: 120 }} padding="md">
            {showAlert && (  
                        <Toast>
                          <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Message</strong>
                            <small></small>
                          </Toast.Header>
                          <Toast.Body>Réussi avec succès !</Toast.Body>
                        </Toast>
                    )
                  }
      <AppShell.Header>
        {/* {userInfo.roles[0] === "ROLE_STUDENT" && ( */}
          <NavBar news={mainLinks} activeTabId={activeTabId} onTabSelected={setActiveTabId} />
        {/* )} */}
      {/* {userInfo.roles[0] !== "ROLE_STUDENT" && (
         <Container>
              <Row>
                <Col xl={{offset:4, span:2}}>
                  <p>
                    <strong>Mes convention à signer: </strong>
                  </p>
                </Col>
              </Row>
        </Container>
      )}  */}

      </AppShell.Header>
      {/* <AppShell.Main> */}
      
        <Container>
              <Row>
                <Col xl={{offset:10, span:3}} id="group-btn">
                {/* <strong>Créer une convention</strong> */}
                  <AddConventionBtn 
                        handleShowModal={handleShowModal}
                        userInfo={userInfo}/>
                </Col>
              </Row>
        </Container>
 <video width="" height=""  autoPlay muted loop playsInline className='back-video'>
      <source src="/upload/video.mp4" type="video/mp4" />
      Votre navigatteur ne support pas video.
    </video> 
  {activeTab && userInfo && user && ringValues && (
        <MainTable
          activeTab={activeTab}
          userInfo={userInfo}
          user={user}
          getFormation={getFormation}
          ringValues={ringValues}
          handleShowSociety={handleShowSociety}
          handleShowAddSociety={handleShowAddSociety}
          handleShow={handleShow}
          setMainLinks={setMainLinks}
          setError={setError}
          mainLinks={mainLinks}
          setShowAlert={setShowAlert} 
 
        />
  )}

    <AddSocietyModal
        show={showAddSociety}
        handleClose={handleCloseAddSociety}
        addSocietyName={addSocietyName}
        addSocietyAdresse={addSocietyAdresse}
        addSocietyNumber={addSocietyNumber}
        setAddSocietyName={setAddSocietyName}
        setAddSocietyAdresse={setAddSocietyAdresse}
        setAddSocietyNumber={setAddSocietyNumber}
        selectedRow={selRowAddSoc}
        setMainLinks={setMainLinks}
        setShowAlert={setShowAlert} 
      />
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
      {/* </AppShell.Main> */}
    </AppShell>
  );
}
