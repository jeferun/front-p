interface Patient {
  id: number;
  name: string;
  lastName: string;
  typeId: string;
  sex: string;
}

interface TypePatient {
  id: string;
  name: string;
}