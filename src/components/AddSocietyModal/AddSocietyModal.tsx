import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { ModalFormWindow } from '../ModalFormWindow/ModalFormWindow'
import { postSociety } from '../../api/societyApi';

export const AddSocietyModal = ({
  show,
  handleClose,
  addSocietyName,
  addSocietyAdresse,
  addSocietyNumber,
  setAddSocietyName,
  setAddSocietyAdresse,
  setAddSocietyNumber,
  selectedRow,
  setMainLinks,
  setShowAlert

}) => {
  const navigate = useNavigate();

  return (
    <ModalFormWindow
      show={show}
      onHide={handleClose}
      headerTitle="Ajoutez les données de l'entreprise."
      footerButtons={[
        {
          text: 'AJOUTER',
          variant: 'primary',
          onClick: async () =>{
            await postSociety(addSocietyName, addSocietyAdresse, addSocietyNumber,selectedRow, selectedRow.id,setMainLinks);
            setShowAlert(true);
            handleClose()
          } 
        },
        {
          text: 'CLOSE',
          variant: 'secondary',
          onClick: handleClose
        }
      ]}
      formFields={[
        <Form.Group key="name" className="mb-3">
          <Form.Label>Nom de l'entreprise</Form.Label>
          <Form.Control
            type="text"
            value={addSocietyName}
            onChange={(e) => setAddSocietyName(e.target.value)}
          />
        </Form.Group>,
        <Form.Group key="address" className="mb-3">
          <Form.Label>Adresse de l'entreprise</Form.Label>
          <Form.Control
            type="text"
            value={addSocietyAdresse}
            onChange={(e) => setAddSocietyAdresse(e.target.value)}
          />
        </Form.Group>,
        <Form.Group key="number" className="mb-3">
          <Form.Label>N° de l'entreprise</Form.Label>
          <Form.Control
            type="text"
            value={addSocietyNumber}
            onChange={(e) => setAddSocietyNumber(e.target.value)}
          />
        </Form.Group>
      ]}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    />
  );
};