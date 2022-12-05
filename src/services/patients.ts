import axios from 'axios';
import { patientEndpoint, patientsEndpoint } from './endpoints';

interface Api {
  message: string;
  status: boolean;
  data: Patient[] | Patient;
}

let service: Api = { message: '', status: false, data: [] };

export const getPatientsService = async () => {
  try {
    const res = await axios.get(patientsEndpoint);    
    service = res.data;

    return service;
  } catch (error) {
    return service;
  }
};

export const getPatientService = async (id: number) => {
  try {
    const res = await axios.get(`${patientEndpoint}/${id}`);
    service = res.data;

    return service;
  } catch (error) {
    return service;
  }
};

export const savePatientService = async (data: Patient, id: number) => {
  let res: any;
  
  try {
    if (id) {
      res = await axios.put(`${patientEndpoint}/${id}`,  data);

    } else {
      res = await axios.post(patientEndpoint,  data);

    }
    service = res.data;

    return service;
  } catch (error) {
    return service;
  }
};

export const removePatientService = async (id: number) => {
  try {
    const res = await axios.delete(`${patientEndpoint}/${id}`);
    service = res.data;

    return service;
  } catch (error) {
    return service;
  }
};