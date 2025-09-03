import { TableRow } from '../TableRow/TableRow'

import { Table } from 'react-bootstrap';

export function MainTable({
  activeTab,
  userInfo,
  user,
  getFormation,
  ringValues,
  handleShowSociety,
  handleShowAddSociety,
  handleShow,
  setMainLinks,
  setError,
  mainLinks,
  setShowAlert
}) {

  return (
  <>
    <Table striped responsive bordered hover>
      {/* {console.log(mainLinks[1].rows[0].progress)} */}
      <thead>
        <tr className="text-center">
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
        {
        userInfo.roles[0] === "ROLE_STUDENT" && (
          activeTab?.rows
          .filter(row => row.studentId === userInfo.id)
          .map(row => (
            <TableRow
              key={row.id}
              row={row}
              users={user}
              getFormation={getFormation}
              handleShowSociety={handleShowSociety}
              handleShowAddSociety={handleShowAddSociety}
              handleShow={() => handleShow(row.id)}
              ringValues={ringValues}
              setMainLinks={setMainLinks}
              setError={setError}
              userInfo={userInfo}
              disableCase={()=> true}
              setShowAlert={setShowAlert}
            />
          )))}
          {userInfo.roles[0] === "ROLE_SOCIETY" && (
          mainLinks[1].rows
          .filter(row => row.progress === 25)
          .map(row => (
               <TableRow
              key={row.id}
              row={row}
              users={user}
              getFormation={getFormation}
              handleShowSociety={handleShowSociety}
              handleShowAddSociety={handleShowAddSociety}
              handleShow={() => handleShow(row.id)}
              ringValues={ringValues}
              setMainLinks={setMainLinks}
              setError={setError}
              userInfo={userInfo}
              setShowAlert={setShowAlert}
            />
          )))} 
          
          {userInfo.roles[0] === "ROLE_CAPITAINE" && (
          activeTab?.rows
          .filter(row => (row.progress === 50) || (row.progress ===100))
          .map(row => (
               <TableRow
              key={row.id}
              row={row}
              users={user}
              getFormation={getFormation}
              handleShowSociety={handleShowSociety}
              handleShowAddSociety={handleShowAddSociety}
              handleShow={() => handleShow(row.id)}
              ringValues={ringValues}
              setMainLinks={setMainLinks}
              setError={setError}
              userInfo={userInfo}
              setShowAlert={setShowAlert}

            />
          )))} 
          
          {userInfo.roles[0] === "ROLE_DIRECTOR" && (
          activeTab?.rows
          .filter(row => row.progress === 75)
          .map(row => (
               <TableRow
              key={row.id}
              row={row}
              users={user}
              getFormation={getFormation}
              handleShowSociety={handleShowSociety}
              handleShowAddSociety={handleShowAddSociety}
              handleShow={() => handleShow(row.id)}
              ringValues={ringValues}
              setMainLinks={setMainLinks}
              setError={setError}
              userInfo={userInfo}
              setShowAlert={setShowAlert}
            />
          )))} 
      { userInfo.roles[0] === "ROLE_STUDENT"  && activeTab?.rows.length === 0 && (

         <tr>
          <td colSpan="10" className="text-center">
           <strong>Aucune convention signée pour le moment!</strong> 
          </td>
         </tr>
          )}

      </tbody>
    </Table>
          </>
  );
}