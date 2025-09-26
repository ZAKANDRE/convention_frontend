import { TableRow } from '../TableRow/TableRow';
import { Table } from 'react-bootstrap';
import { SortUpIcon, SortDownIcon } from '../SvgIcons/SvgIcons.tsx';
import { sortUp, sortDown } from '../../utils/dataFormatters.tsx';

import './MainTable.css';
import './css/media/320maintable.css'
import './css/media/576maintable.css'
import './css/media/768maintable.css'
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


// /* Filtrage pour la ligne vide  */

  let filteredRows = [];

  if (userInfo.roles[0] === "ROLE_STUDENT") {
     filteredRows = activeTab?.rows.filter(row => row.studentId === userInfo.id) || [];
  } 
  else if (userInfo.roles[0] === "ROLE_SOCIETY") {
    filteredRows = mainLinks[1].rows.filter(row => row.progress === 25);
  } 
  else if (userInfo.roles[0] === "ROLE_COMMANDER") {
    filteredRows = activeTab?.rows.filter(row => row.progress === 50 || row.progress === 100) || [];
  } 
  else if (userInfo.roles[0] === "ROLE_DIRECTOR") {
    filteredRows = activeTab?.rows.filter(row => row.progress === 75 || row.progress === 100) || [];
  }

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
            <span className='sort-btn' onClick={() => sortUp(setMainLinks, activeTab, activeTabId)}>
              <SortUpIcon />
            </span>
          </th>
          <th>
            AU - 
            <span className='sort-btn' onClick={() => sortDown(setMainLinks, activeTab, activeTabId)}>
              <SortDownIcon />
            </span>
          </th>
          <th>Progress </th>
          <th>Visualisation</th>
          <th>Signature</th>
        </tr>
      </thead>
      <tbody>
        {
        /* affichage de l'information de row par rapport du role*/
        userInfo.roles[0] === "ROLE_STUDENT" && (
          activeTab?.rows
          .filter(row => row.studentId === userInfo.id )
          .map(row => (
              <TableRow
                key={row.id}
                row={row}
                users={user}
                getFormation={getFormation}
                handleShowSociety={handleShowSociety}
                handleShow={() => handleShow(row.id)}
                setMainLinks={setMainLinks}
                userInfo={userInfo}
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
              key={row.id}
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
              key={row.id}
              row={row}
              users={user}
              getFormation={getFormation}
              handleShowSociety={handleShowSociety}
              handleShow={() => handleShow(row.id)}
              setMainLinks={setMainLinks}
              userInfo={userInfo}
            />
          )))} 

          {filteredRows.length === 0 && (
            <tr>
              <td colSpan={10} className="text-center">
                <strong className="unknown-text">Aucunes {activeTab.label} pour le moment!</strong>
              </td>
            </tr>
          )}
 
      </tbody>
    </Table>
    </>
  );
}