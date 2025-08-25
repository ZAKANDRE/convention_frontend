import React, { useState, useEffect } from 'react';
import { AppShell, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { NavBar } from '../components/NavBar';
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.css';

export function HomePage() {
  const [mainLinks, setMainLinks] = useState([
    { id: 1, link: '#', label: 'Mes conventions de stage', value: 'stage', rows: [] },
    { id: 2, link: '#', label: 'Conventions en traitement', value: 'traitement', rows: [] },
  ]);

  const [activeTabId, setActiveTabId] = useState(1);

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
  const handleShow = (id: number) => setSelectedRowId(id);
  /**Les objects pour manipuler les arrays dans les fetch**/

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/conventions');
        if (!res.ok) throw new Error('Erreur fetch convenntion');
        const data = await res.json();
        const rows = data.member;

        setMainLinks([
          { id: 1, link: '#', label: 'Mes conventions de stage', value: 'stage', rows: rows },
          { id: 2, link: '#', label: 'Conventions en traitement', value: 'traitement', rows: rows },
        ]);

        const res1 = await fetch('http://127.0.0.1:8000/api/users');
        if (!res1.ok) throw new Error('Ошибка при загрузке конвенций');
        const data1 = await res1.json();
        const rows1 = data1.member;

        const usersData = rows1.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});
      setUser(usersData);
      
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

const getFormationName = (formationId : number) =>{
  const formation = getFormation[formationId];
  if(formation){
    return `${formation.name}`
  }
  return 'Téléchargement...';
};
const getSocietyName = (societyId: number) => {
  const getSocietyName = getSociety[societyId];
  if(getSocietyName){
    return `${getSocietyName.name}`;
  }
  return 'Téléchargement...';
};

const getSocietyAdresse = (societyId: number) => {
      const getSocietyAdresse = getSociety[societyId];
      if(getSocietyAdresse){
        return `${getSocietyAdresse.adresse}`;
      }
      return 'Téléchargement...';
}
const getSocietySiren = (societyId: number) => {
      const getSocietySiren = getSociety[societyId];
      if(getSocietySiren) {
        return `${getSocietySiren.siren}`;
      }
      return 'Téléchargement...';
}
// console.log(getSocietyName(1));
const getUserFirstName = (userId: number) => {
  const userFName = user[userId];
  if (userFName ) {
    return `${userFName.first_name}`;
  }
  return 'Téléchargement...'; 
};

const getUserLastName = (userId: number) => {
  const userLName = user[userId];
  if (userLName ) {
    return `${userLName.last_name}`;
  }
  return 'Téléchargement...'; 
};

  return (
    <AppShell header={{ height: 120 }} padding="md">
      <AppShell.Header>
        <NavBar news={mainLinks} activeTabId={activeTabId} onTabSelected={setActiveTabId} />
      </AppShell.Header>
      <AppShell.Main>
        <button className="btn btn-success offset-11 mb-3 text-uppercase">Ajouter </button>
        {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
        <Form>
          <Table striped highlightOnHover withTableBorder withColumnBorders horizontalSpacing="xl" verticalSpacing="xl">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Stagiaire</Table.Th>
                <Table.Th>Commandant</Table.Th>
                <Table.Th>AFPA Directeur</Table.Th>
                <Table.Th>Formation</Table.Th>
                <Table.Th>Entreprise</Table.Th>
                <Table.Th>Du</Table.Th>
                <Table.Th>Au</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>

              {activeTab?.rows.map(row => (
                <Table.Tr key={row.id}>
                  {/* <Table.Td>
                  {row}

                  </Table.Td> */}
                  <Table.Td>
                    {getUserLastName(row.studentId)} 
                    {getUserFirstName(row.studentId)} 
                  </Table.Td>
                  <Table.Td>
                    {getUserLastName(row.commanderId)} 
                    {getUserFirstName(row.commanderId)} 

                    {/* {usersMap[row.commanderId] ? `${usersMap[row.commanderId].first_name} ${usersMap[row.commanderId].last_name}` : row.commanderId} */}
                  </Table.Td>
                  <Table.Td>
                    {getUserLastName(row.afpaDirectorId)} 
                    {getUserFirstName(row.afpaDirectorId)} 
                    {/* {usersMap[row.afpaDirectorId] ? `${usersMap[row.afpaDirectorId].first_name} ${usersMap[row.afpaDirectorId].last_name}` : row.afpaDirectorId} */}
                  </Table.Td>
                  <Table.Td>
                   {getFormationName(row.formationId)} 
                    {/* {formationsMap[row.formationId] ? `${formationsMap[row.formationId].name} (${formationsMap[row.formationId].sigle})` : row.formationId} */}
                  </Table.Td>
                  <Table.Td>
                    <Button variant="primary" onClick={() => handleShow(row.id)} className="ms-3">
                      Détails
                    </Button>
                  </Table.Td>
                  <Table.Td>{new Date(row.dateStart).toLocaleDateString()}</Table.Td>
                  <Table.Td>{new Date(row.dateEnd).toLocaleDateString()}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Form>
        <Offcanvas show={selectedRowId !== null} onHide={handleClose} placement="top" name="top">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Informations de l'entreprise</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {selectedRow ? (
              <Form>
                {console.log(selectedRow)}
                <Form.Group className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  {/* <Form.Control type="text" value={selectedRow.society?.name || ''} disabled /> */}
                  <Form.Control type="text" value={getSocietyName(selectedRow.societyId)} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Adressesdfs</Form.Label>
                  <Form.Control type="text" value={getSocietyAdresse(selectedRow.societyId)} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>SIREN</Form.Label>
                  <Form.Control type="text" value={getSocietySiren(selectedRow.societyId)} disabled />
                </Form.Group>
                 <Button type="submit">Submit form</Button>
              </Form>
            ) : (
              <p>Aucune donnée sélectionnée</p>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </AppShell.Main>
    </AppShell>
  );
}
