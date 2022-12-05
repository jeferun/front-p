import { ToastContainer } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setNotification } from 'store/patient';

function CustomToast() {
  const dispatch = useDispatch();
  const { notification } = useSelector((state: RootState) => state.patient);
  const show = Boolean(notification);

  const handleClose = () => {
    dispatch(setNotification(''));
  };

  return (
    <Row>
      <Col xs={6}>
        <ToastContainer position="bottom-end" className="p-3">
          <Toast onClose={handleClose} show={show} delay={3000} autohide bg='info'>
            <Toast.Header>
              <strong className="me-auto">Alerta !</strong>
            </Toast.Header>
            <Toast.Body>{notification}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}

export default CustomToast;