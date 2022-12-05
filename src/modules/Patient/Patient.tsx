import { useCallback, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useSelector, useDispatch } from 'react-redux';
import { getPatients, removePatient, selectPatientList, setIdPatient, setValidated } from 'store/patient';
import NavBar from 'components/NavBar';
import { Button, Col, Table } from 'react-bootstrap';
import { getType } from 'utils';
import { RootState } from 'store';
import FormPatien from './FormPatien';

function Patient() {
  const dispatch = useDispatch();

  const request = () => {
    const getPatientsDispatch: any = getPatients();
    dispatch(getPatientsDispatch);
  };

  useEffect(() => {
    request();
  }, []);

  const patientList = useSelector(selectPatientList, () => false);
  const { currentPatient } = useSelector((state: RootState) => state.patient);

  const show = useCallback((id: number) => {
    dispatch(setValidated(true));
    dispatch(setIdPatient(id));
  }, [currentPatient]);

  const remove = useCallback((data: Patient) => {
    const text = `Eliminar el paciente ${data.name}? `;
    if (window.confirm(text)) {
      const removePatientDispatch: any = removePatient(data.id);
      dispatch(removePatientDispatch);
    }
  }, [currentPatient]);

  return (
    <>
      <NavBar />
      <Container fluid='md'>
        <Row className='mb-4 '>
          <Col> <h3>Lista de pacientes</h3></Col>
          <Col xs lg='2'>
            <FormPatien />
          </Col>
        </Row>

        <Row className='justify-content-md-center'>
          <Col xs lg='8'>
            <Table striped>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Tipo paciente</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {patientList.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.name}</td>
                    <td>{patient.lastName}</td>
                    <td>{getType(patient.typeId)}</td>
                    <td>
                      <Button variant='info' size='sm' className='m-1' onClick={() => show(patient.id)}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' color='white' fill='currentColor' className='bi bi-eye-fill' viewBox='0 0 16 16'>
                          <path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z' />
                          <path d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z' />
                        </svg>
                      </Button>
                      <Button variant='danger' size='sm' className='m-1' onClick={() => remove(patient)}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' color='white' fill='currentColor' className='bi bi-trash3-fill' viewBox='0 0 16 16'>
                          <path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z' />
                        </svg>
                      </Button>

                    </td>
                  </tr>
                ))}
                {!patientList.length && (
                  <tr>
                    <td colSpan={4}>
                      <Col xs lg='12'> <p>Sin registros...</p></Col>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Patient;
