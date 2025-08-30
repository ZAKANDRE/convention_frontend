import { Form, Button } from 'react-bootstrap';
import { Window } from '../Window/Window';

export const ModalFormWindow = ({ show, onHide, headerTitle, footerButtons, formFields, onSubmit }) => {
  return (
    <Window
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      headerTitle={headerTitle}
      footerButtons={footerButtons}
      showFooter={true}
    >
      <Form onSubmit={onSubmit}>
        {formFields}
      </Form>
    </Window>
  );
};