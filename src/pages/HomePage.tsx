import { useState, useEffect } from 'react';
/* bootstrap import */
import {Form, Button, Modal, Container, Row, Col, Table } from 'react-bootstrap';
/* Mantine import */
import { AppShell, ActionIcon, RingProgress, Text, Center } from '@mantine/core';
/** checkin component* */
import { useAuth } from '../context/AuthContext.js';
/** another components* */
import { IconCheck } from '@tabler/icons-react';
/** personnal components* */
import { NavBar } from '../components/NavBar';
import {
  getFormationName,
  getUserFirstName,
  getUserLastName
} from '../utils/dataFormatters';
import { ProgressCheckButton } from '../components/ProgressCheckButton/ProgressCheckButton'
import { Window } from '../components/Window/Window'

import {
  fetchDate,
  putMethod,
  postConvention,
  deleteConvention,
  updateRing
} from '../api/conventionsApi';
import { postSociety } from '../api/societyApi';

/** css files**/
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.css';

export function HomePage() {

  const [mainLinks, setMainLinks] = useState([
    { id: 1, link: '#', label: 'Mes conventions de stage', value: 'stage', rows: [] },
    { id: 2, link: '#', label: 'Conventions en traitement', value: 'traitement', rows: [] },
  ]);
 const chiffre = [{
    id : 1,
    name : '33'
 },
{
    id : 2,
    name : '55'
 }];
  /** Get data from modal input**/
  const [inputDateStart, setinputDateStart] = useState('');
  const [inputDateEnd, setinputDateEnd] = useState('');
  /** end of Get data from modal input**/

  /** Add society form**/
  const [addSocietyName,setAddSocietyName] = useState('');
  const [addSocietyAdresse,setAddSocietyAdresse] = useState('');
  const [addSocietyNumber, setAddSocietyNumber] = useState('');
  /** fin Add society form**/

  const [activeTabId, setActiveTabId] = useState(1);
  const { userInfo, isLoading } = useAuth();
  // console.log(userInfo);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
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
  /**Les objects pour manipuler les arrays dans les fetch**/
 
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
  const handleShowAddSociety = () => setShowAddSociety(true);

  /** Update Ring variables **/

  const ringValues = [{ id: 1, value: 25},{id: 2, value: 50},{id: 3,value: 75},{id: 4,value: 100}];



useEffect(() => {
     ( async () => {
      try {
        fetchDate(setMainLinks).catch(err => {
        console.error(err);
      });

      
      
      const formation  = await fetch('http://127.0.0.1:8000/api/formations?page=1');
      if(!formation.ok) throw new Error('Erreur fetch formation');
      const dataFormation = await formation.json();
      const infoFormation = dataFormation.member;
      const formationDataObj = infoFormation.reduce((formationArray, item) => {
          formationArray[item.id] = item;
          return formationArray;
      },{});

      setGetFormation(formationDataObj);
   
   
      const society1 = await fetch('http://127.0.0.1:8000/api/societies');
      if(!society1.ok) throw new Error ('Erreur fetch society');
      const dataSociety = await society1.json();
      const check = dataSociety.member;

      const societyDataObj = check.reduce((formationArray, item) => {
          formationArray[item.id] = item;
          return formationArray;
      },{});

      setGetSociety(societyDataObj);

      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, []);


  return (
    <AppShell header={{ height: 120 }} padding="md">

      <AppShell.Header>
        <NavBar news={mainLinks} activeTabId={activeTabId} onTabSelected={setActiveTabId} />
      </AppShell.Header>
      {/* <AppShell.Main> */}
        <Container>
              {/* Stack the columns on mobile by making one full-width and the other half-width */}
              <Row>
                <Col xl={{offset:10, span:2}} id="group-btn">
                <div className='d-flex justify-content-end action-group-btn'>
                   <button className="btn btn-success offset-11 mb-3 text-uppercase "
                      onClick={handleShowModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-folder-plus" viewBox="0 0 16 16">
                      <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
                      <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                    </button>
                  </div>  
                </Col>
              </Row>
        </Container>
 
  <Table striped responsive bordered  hover>
      <thead>
        <tr className='text-center'>
          <th>Stagiaire</th>
          <th>Capitaine</th>
          <th>Directeur AFPA</th>
          <th>Libelle stage</th>
          <th>Entreprise</th>
          <th>DU</th>
          <th>AU</th>
          <th>Signature</th>
          <th>Progression</th>
          <th>Suppresion</th>
        </tr>
      </thead>
      <tbody>
      {activeTab?.rows
              .filter(row => row.studentId === userInfo.id)
              .map(row => (
            <tr key={row.id} data-fe={row.progress}>
                  <td> 
                      {getUserLastName(row.studentId,user)}<br/>{getUserFirstName(row.studentId, user)} 
                  </td>
                  <td> 
                      {getUserLastName(row.commanderId, user)} <br/> {getUserFirstName(row.commanderId, user)} 
                  </td>
                  <td>
                      {getUserLastName(row.afpaDirectorId, user)}  <br/> {getUserFirstName(row.afpaDirectorId,user)} 
                  </td>
                  <td>
                      {getFormationName(row.formationId, getFormation)} 
                  </td>
                  <td>
                      <Button variant="info" onClick={() => { handleShow(row.id); handleShowSociety() }} className='me-3' >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" className="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                        </svg>
                      </Button>
                      <Button variant="success" onClick={()=> {  handleShow(row.id);      handleShowAddSociety()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-building-fill-add" viewBox="0 0 16 16">
                          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
                          <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-3.59 1.787A.5.5 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.5 4.5 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                        </svg>
                    </Button>
                  </td>
                  <td>
                      {new Date(row.dateStart).toLocaleDateString()}
                  </td>
                  <td>
                      {new Date(row.dateEnd).toLocaleDateString()}
                  </td>
                  <td>
                      {ringValues.map(val => (
                        <ProgressCheckButton  
                              key={val.id}
                              digitValue={val.value} 
                              updateProgress={updateRing(row, setMainLinks)} 
                              btn_txt={val.value}
                        /> 
                      ))}
                  </td>
                  <td>
                    {row.progress !== 100 && (
                      <RingProgress
                          className='ring'
                          sections={[{ value: row.progress, color: 'blue' }]}
                          transitionDuration={1000}
                          label={
                            <Text c="blue" fw={700} ta="center" size="xl">
                              {row.progress}%
                            </Text>
                          }
                        />
                      )}

                    {row.progress === 100 && (
                      <RingProgress
                        className='ring'
                        sections={[{ value: 100, color: 'teal' }]}
                          transitionDuration={1000}

                        label={
                          <Center>
                            <ActionIcon color="teal" variant="light" radius="xl" size="xl">
                              <IconCheck size={22} />
                            </ActionIcon>
                          </Center>
                        }
                      /> 
                      )}
                  </td>
                  <td>
                     <button type="button" className="btn btn-danger offset-11 mb-3 text-uppercase delete-btn" 
                            onClick={()=> {
                              deleteConvention(row.id,setError, setMainLinks)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-folder-minus" viewBox="0 0 16 16">
                                  <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
                                  <path d="M11 11.5a.5.5 0 0 1 .5-.5h4a.5.5 0 1 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
                                </svg>
                            </button>
                  </td>
                </tr>
              ))}
            </tbody>
    </Table>

    <Window
          show={showAddSociety}
          onHide={handleCloseAddSociety}
          backdrop={'static'}  
          keyboard={true} 
          headerTitle={'Ajoutez les données de l\'entreprise.'}
          footerButtons={[
            { text: 'AJOUTER', type: 'submit', variant: 'primary', onClick: () => {
              postSociety( addSocietyName,
                          addSocietyAdresse,
                          addSocietyNumber,
                          selectedRow,
                          selectedRow.id,
                          setMainLinks)
            } },
            { text: 'CLOSE', variant: 'secondary', onClick: handleCloseAddSociety }
          ]}
          showFooter={true}
    >
      <Form onSubmit={(e) => {
                  e.preventDefault();
                  postSociety( addSocietyName,
                          addSocietyAdresse,
                          addSocietyNumber,
                          selectedRow,
                          selectedRow.id)
                }}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Remplir le Nom de l'entreprise
                    </Form.Label>
                    <Form.Control type="text"
                                  value={addSocietyName}
                                  onChange={(event) => {
                                      setAddSocietyName(event.target.value);
                                  }} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Remplir l'adresse de l'entreprise</Form.Label>
                    <Form.Control type="text"
                                  value={addSocietyAdresse}
                                  onChange={(event) => {
                                      setAddSocietyAdresse(event.target.value);
                                  }} />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Remplir le N° de l'entreprise
                    </Form.Label>
                    <Form.Control type="text"
                                  value={addSocietyNumber}
                                  onChange={(event) => {
                                      setAddSocietyNumber(event.target.value);
                                  }} />
                  </Form.Group>
                  </Form>
    </Window>
    <Window
        show={showSociety}
        onHide={handleCloseSociety}
        backdrop="static"
        keyboard={false}
        headerTitle={'L\'info d\'entreprise!'}
        footerButtons={['']}
        showFooter={false}

    >
       {selectedRow && (selectedRow.society.name !=="")? (
            <>
              <Form>
                {/* {console.log(selectedRow.society)} */}
                <Form.Group className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  {/* <Form.Control type="text" value={selectedRow.society?.name || ''} disabled /> */}
                  <Form.Control type="text" value={selectedRow.society.name} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Adressesdfs</Form.Label>
                  <Form.Control type="text" value={selectedRow.society.adresse} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>SIREN</Form.Label>
                  <Form.Control type="text" value={selectedRow.society.siren} disabled />
                </Form.Group>
              </Form>
             
                </>) : (
              <p className='text-center'>
                Aucune information relative à l'entreprise <br/> n'est disponible pour le moment!
              </p>
            
            )}
    </Window>         
  <Window
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        headerTitle={'Saisissez les dates :'}
          footerButtons={[
            { text: 'Créer', type: 'submit', variant: 'primary', onClick:()=> {
              postConvention(
                  userInfo,
                  inputDateStart,
                  inputDateEnd,
                  setMainLinks,
                  handleCloseModal,
                  setError
            )}},
            { text: 'Fermer', variant: 'secondary', onClick:()=> handleCloseModal }
          ]}
        showFooter={true}

    >
<Form>
                <Form.Group className="mb-3">
                  <Form.Label>du</Form.Label>
                  <Form.Control type="date"
                                value={inputDateStart} 
                                onChange={(event)=> {
                                  setinputDateStart(event.target.value);
                                }} 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>au</Form.Label>
                  <Form.Control type="date" 
                                value={inputDateEnd}
                                onChange={(event)=>{
                                  setinputDateEnd(event.target.value);
                                }}  />
                </Form.Group>
              </Form>

    </Window>

      {/* </AppShell.Main> */}
    </AppShell>
  );
}
