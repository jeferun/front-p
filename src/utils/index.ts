import { typesPatient } from './constants';


export const getType = (typeId: string): string => {
    if(!typeId) return '';

    const result = typesPatient.find((type) => type.id === typeId) as TypePatient;

    return result.name;
 };

 export const other = [];