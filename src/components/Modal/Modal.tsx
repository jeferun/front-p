import { ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Props {
  title: string;
  btnTitle: string;
  children: ReactNode;
  show: boolean;
  handleClose: () => void;
  handleAccept: () => void;
}

function CustomModal(props: Props) {
  const { children, title, btnTitle, show, handleClose, handleAccept } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleAccept}>
          {btnTitle}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;