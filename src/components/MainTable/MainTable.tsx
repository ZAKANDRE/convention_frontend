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
  setError
}) {
  return (
    <Table striped responsive bordered hover>
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
        {activeTab?.rows
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
            />
          ))}
      </tbody>
    </Table>
  );
}