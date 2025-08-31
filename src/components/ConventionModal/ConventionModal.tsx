import { useNavigate } from 'react-router-dom';

import { Form } from 'react-bootstrap';
import { ModalFormWindow } from '../ModalFormWindow/ModalFormWindow'
import { postConvention } from '../../api/conventionsApi';

export const ConventionModal = ({
  show,
  handleClose,
  userInfo,
  inputDateStart,
  inputDateEnd,
  setMainLinks,
  setinputDateStart,
  setinputDateEnd,
  setError,
  setShowAlert
}) => {
  const navigate = useNavigate();
  return (
    <ModalFormWindow
      show={show}
      onHide={handleClose}
      headerTitle="Saisissez les dates :"
      footerButtons={[
        {
          text: 'Créer',
          variant: 'primary',
          onClick: async () => {
                    try { 
                      await postConvention(userInfo, inputDateStart, inputDateEnd,setMainLinks,handleClose,setError);
                      setShowAlert(true);

                    } 
                    catch (err) {
                      setError('Erreur lors de l’envoi de la convention');
                    }
                  }
        },
        {
          text: 'Fermer',
          variant: 'secondary',
          onClick: handleClose
        }
      ]}
      formFields={[
        <Form.Group key="start-date" className="mb-3">
          <Form.Label>du</Form.Label>
          <Form.Control
            type="date"
            value={inputDateStart}
            onChange={(e) => setinputDateStart(e.target.value)}
          />
        </Form.Group>,
        <Form.Group key="end-date" className="mb-3">
          <Form.Label>au</Form.Label>
          <Form.Control
            type="date"
            value={inputDateEnd}
            onChange={(e) => setinputDateEnd(e.target.value)}
          />
        </Form.Group>
      ]}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    />
  );
};