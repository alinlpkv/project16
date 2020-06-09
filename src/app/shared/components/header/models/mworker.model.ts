

export interface Mworker {
    id?: number;
    name: string;
    surname: string;
    patronymic: string;
    phone: string;
    email: string;
    dateOfBirth: Date;
    ages:string;
    department: number;
}

export enum MyWorkerDepartament {
    it,
    sale,
    delivery,
    lawyer,
}