import { createSelector } from 'reselect';
import { RootState } from 'store';

const selectPatients = (state: RootState) => state.patient.patients;

export const selectPatientList = createSelector(
  [selectPatients],
  (patients) => patients
);

export const other = [];