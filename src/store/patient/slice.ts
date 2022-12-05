import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPatientService, getPatientsService, removePatientService, savePatientService } from '../../services';

interface State {
  patients: Patient[];
  currentPatient: Patient | Obj;
  idPatient: number | string;
  typeId: string;
  notification: string;
  validated: boolean;
}

const initialState: State = {
  // sample data
  patients: [],
  currentPatient: {},
  idPatient: 0,
  typeId: '',
  notification: '',
  validated: true,
};

export const getPatients = createAsyncThunk(
  'patient/listPatient',
  async () => {
    const result = await getPatientsService();
    return result;
  }
);

export const getPatient = createAsyncThunk(
  'patient/patient',
  async (id: number) => {
    const result = await getPatientService(id);
    return result;
  }
);

export const savePatient = createAsyncThunk(
  'patient/savePatient',
  async (arg: { currentPatient: Patient, id: number }) => {
    const result = await savePatientService(arg.currentPatient, arg.id);
    return result;
  }
);

export const removePatient = createAsyncThunk(
  'patient/removePatient',
  async (id: number) => {
    const result = await removePatientService(id);
    return result;
  }
);

export const slice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setIdPatient: (state, { payload }: PayloadAction<number | string>) => (
      {
        ...state,
        idPatient: payload
      }
    ),
    setPatient: (state, { payload }: PayloadAction<Patient | Obj>) => (
      {
        ...state,
        currentPatient: payload
      }
    ),
    setNotification: (state, { payload }: PayloadAction<string>) => (
      {
        ...state,
        notification: payload
      }
    ),
    setValidated: (state, { payload }: PayloadAction<boolean>) => (
      {
        ...state,
        validated: payload
      }
    ),
  },
  extraReducers: (builder) => {
    // patients
    builder.addCase(getPatients.fulfilled, (state, action) => {
      const s = state;
      const patients = action.payload.data as Patient[];
      s.patients = patients;
    }).addCase(getPatients.rejected, (state) => {
      const s = state;
    });
    // patient
    builder.addCase(getPatient.fulfilled, (state, action) => {
      const s = state;
      const patient = action.payload.data as Patient;
      s.currentPatient = patient;
    });
    // remove
    builder.addCase(removePatient.fulfilled, (state, action) => {
      const s = state;
      const patients = action.payload.data as Patient[];
      s.patients = patients;
      s.notification = action.payload.message;
    });
    // save
    builder.addCase(savePatient.fulfilled, (state, action) => {
      const s = state;
      const patients = action.payload.data as Patient[];
      if (patients && patients.length) {
        s.patients = patients;
        s.notification = action.payload.message;
      }
      s.currentPatient = {};
    });
  }
});

export const { setIdPatient, setPatient, setNotification, setValidated } = slice.actions;

export default slice.reducer;