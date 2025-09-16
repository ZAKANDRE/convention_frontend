import { TableRow } from '../TableRow/TableRow'
import { Table } from 'react-bootstrap';

import './MainTable.css';
import './css/media/320maintable.css'
import './css/media/992maintable.css'
import './css/media/1200maintable.css'
export function MainTable({
  activeTab,
  activeTabId,
  userInfo,
  user,
  getFormation,
  handleShowSociety,
  handleShow,
  setMainLinks,
  mainLinks,
}) {
  const sortUp = () => {
  if (!activeTab) return;
  
  setMainLinks(prevMainLinks => prevMainLinks.map(tab => {
    if (tab.id === activeTabId) {
      return {
        ...tab,
        rows: [...tab.rows].sort((a, b) => new Date(a.dateStart) - new Date(b.dateStart))
      };
    }
    return tab;
  }));
};
  const sortDown = () => {
  if (!activeTab) return;
  
  setMainLinks(prevMainLinks => prevMainLinks.map(tab => {
    if (tab.id === activeTabId) {
      return {
        ...tab,
        rows: [...tab.rows].sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart))
      };
    }
    return tab;
  }));
};
  return (
  <>
      
    <Table striped responsive bordered hover>
      <thead>
        <tr className="text-center">
          <th>Prénom</th>
          <th>Nom</th>
          <th>Formation</th>
          <th>Entreprise</th>
          <th>DU - 
          <span className='sort-btn' onClick={sortUp}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sort-up-alt" viewBox="0 0 16 16">
              <path d="M3.5 13.5a.5.5 0 0 1-1 0V4.707L1.354 5.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 4.707zm4-9.5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5"/>
            </svg>
          </span>
         
          </th>
          <th>
            AU - 
          <span className='sort-btn' onClick={sortDown}>
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sort-down" viewBox="0 0 16 16">
  <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
</svg>
          </span>
          </th>
          <th>Progress </th>
          <th>Visualisation</th>
          <th>Signature</th>
        </tr>
      </thead>
      <tbody>
        {
        userInfo.roles[0] === "ROLE_STUDENT" && (
          activeTab?.rows
          .filter(row => row.studentId === userInfo.id)
          .map(row => (
            <>
              <TableRow
                // key={row.id}
                row={row}
                users={user}
                getFormation={getFormation}
                handleShowSociety={handleShowSociety}
                handleShow={() => handleShow(row.id)}
                setMainLinks={setMainLinks}
                userInfo={userInfo}
                // disableCase={()=> true}
              />
              
            </>
          )))}
          {userInfo.roles[0] === "ROLE_SOCIETY" && (
          mainLinks[1].rows
          .filter(row => row.progress === 25)
          .map(row => (
               <TableRow
              // key={row.id}
              row={row}
              users={user}
              getFormation={getFormation}
              handleShowSociety={handleShowSociety}
              handleShow={() => handleShow(row.id)}
              setMainLinks={setMainLinks}
              userInfo={userInfo}
            />
          )))} 
          
         {userInfo.roles[0] === "ROLE_COMMANDER" && (
          activeTab?.rows
          .filter(row => (row.progress === 50) || (row.progress === 100))
          .map(row => (
            <TableRow
              // key={row.id}
              row={row}
              users={user}
              getFormation={getFormation}
              handleShowSociety={handleShowSociety}
              handleShow={() => handleShow(row.id)}
              setMainLinks={setMainLinks}
              userInfo={userInfo}
            />
          )))} 
          
          {userInfo.roles[0] === "ROLE_DIRECTOR" && (
          activeTab?.rows
          .filter(row => row.progress === 75 || (row.progress === 100))
          .map(row => (

              <TableRow
              // key={row.id}
              row={row}
              users={user}
              getFormation={getFormation}
              handleShowSociety={handleShowSociety}
              handleShow={() => handleShow(row.id)}
              setMainLinks={setMainLinks}
              userInfo={userInfo}
            />

          )))} 
      {activeTab?.rows.length === 0 && (
         <tr>
          <td colSpan={10} className="text-center">
           <strong>Aucune {activeTab.label}  pour le moment!</strong> 
          </td>
         </tr>
          )}
 
      </tbody>
    </Table>
          </>
  );
}