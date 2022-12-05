import Modal from 'components/Modal';
import { ChangeEvent, useEffect } from 'react';
import { Alert, Button, ButtonGroup, Col, Form, Row, ToggleButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getPatient, setIdPatient, setPatient, savePatient, setValidated } from 'store/patient';
import CONSTANTS, { typesPatient } from 'utils/constants';

function AlertMsg() {
  return (
    <Alert variant='danger'>
      Complete todos los campos! (*)
    </Alert>
  );
};

function FormPatien() {
  const dispatch = useDispatch();
  
  const { idPatient, currentPatient, validated } = useSelector((state: RootState) => state.patient);
  const title = idPatient === CONSTANTS.NEW ? 'Crear paciente' : 'Editar paciente';
  const show = Boolean(idPatient || idPatient === CONSTANTS.NEW);

  const request = () => {
    const id = idPatient as number;
    const getPatients: any = getPatient(id);
    dispatch(getPatients);
  };

  useEffect(() => {
    if (idPatient && idPatient !== CONSTANTS.NEW) {
      request();
    }
  }, [idPatient]);

  const handleShow = () => {
    dispatch(setIdPatient(CONSTANTS.NEW));
  };

  const handleClose = () => {
    dispatch(setIdPatient(0));
    dispatch(setPatient({}));
  };

  const validateForm = () => {
    if (!currentPatient.name || !currentPatient.lastName || !currentPatient.typeId || !currentPatient.sex) {
      dispatch(setValidated(false));
      return false;
    }
    
    dispatch(setValidated(true));
    return true;
  };

  const handleAccept = () => {
    const validatedForm = validateForm();
    if (!validatedForm) return;

    const id = idPatient === CONSTANTS.NEW ? 0 : idPatient as number;
    const patient = currentPatient as Patient;
    const savePatientDispatch: any = savePatient({ currentPatient: patient, id });
    dispatch(savePatientDispatch);
    dispatch(setIdPatient(0));

  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const newInfoPatient = { ...currentPatient } as Obj;
    const { name, value } = e.target;
    newInfoPatient[name] = value;

    dispatch(setPatient(newInfoPatient));
  };

  return (
    <>
      <Button
        type='button'
        variant='outline-success'
        size='sm'
        onClick={handleShow}
      >
        <strong>+</strong>
      </Button>
      <Modal
        title={title}
        btnTitle='Guardar'
        show={show}
        handleClose={handleClose}
        handleAccept={handleAccept}>
        {!validated && <AlertMsg />}

        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name='name'
              required
              value={currentPatient.name || ''}
              type='text'
              placeholder='Ingrese el nombre *'
              autoFocus
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              name='lastName'
              required
              value={currentPatient.lastName || ''}
              type='text'
              placeholder='Ingrese el apellido *'
              onChange={handleOnChange}
            />
          </Form.Group>
          <Row className='justify-content-md-center'>
            <Col>
              <Form.Label className='ml-2'>Sexo * </Form.Label>
              <ButtonGroup>
                <ToggleButton
                  type='radio'
                  id='sex-female'
                  variant='outline-info'
                  name='sex'
                  value='f'
                  checked={currentPatient.sex === 'f'}
                  onChange={handleOnChange}
                >
                  Mujer
                </ToggleButton>
                <ToggleButton
                  type='radio'
                  id='sex-male'
                  variant='outline-success'
                  name='sex'
                  value='m'
                  checked={currentPatient.sex === 'm'}
                  onChange={handleOnChange}
                >
                  Hombre
                </ToggleButton>
              </ButtonGroup>
            </Col>
            <Col>
              <Form.Select
                name='typeId'
                required
                id='selectType'
                onChange={handleOnChange}
                value={currentPatient.typeId || ''}
              >
                <option value=''>Tipo de paciente *</option>
                {typesPatient.map((type) => (
                  <option value={type.id} key={type.id}>{type.name}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default FormPatien;