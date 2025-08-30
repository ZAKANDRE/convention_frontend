import { Modal, Button } from 'react-bootstrap';

export const Window = ({
    show,
    onHide,
    backdrop,
    keyboard,
    headerTitle,
    children,
    footerButtons = [],
    showFooter
}) => {
    return (
        <Modal show={show} onHide={onHide} backdrop={backdrop} keyboard={keyboard}>
            <Modal.Header closeButton>
            <Modal.Title>{headerTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body> {children} </Modal.Body>
                {showFooter ? (
                <Modal.Footer>
                    {footerButtons.map(({variant, onClick, text},idx) => (
                        <Button key={idx} variant={variant} onClick={onClick}>
                            {text}
                        </Button>
                    ))}
                </Modal.Footer>) : ''
                }
        </Modal>        
    );
}
