import { Form } from 'react-bootstrap';
import { ModalFormWindow } from '../ModalFormWindow/ModalFormWindow'

export const SocietyInfoModal = ({ show, handleClose, selectedRow }) => {
  return (
    <ModalFormWindow
      show={show}
      onHide={handleClose}
      headerTitle="L'info d'entreprise!"
      footerButtons={[]}
      formFields={
        selectedRow && selectedRow.society.name !== "" ? [
          <Form.Group key="name" className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" value={selectedRow.society.name} disabled />
          </Form.Group>,
          <Form.Group key="address" className="mb-3">
            <Form.Label>Adresse</Form.Label>
            <Form.Control type="text" value={selectedRow.society.adresse} disabled />
          </Form.Group>,
          <Form.Group key="siren" className="mb-3">
            <Form.Label>SIREN</Form.Label>
            <Form.Control type="text" value={selectedRow.society.siren} disabled />
          </Form.Group>
        ] : [
          <p key="no-society" className="text-center">
            Aucune information relative à l'entreprise <br /> n'est disponible pour le moment!
          </p>
        ]
      }
      onSubmit={() => {}}
    />
  );
};