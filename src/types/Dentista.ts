import Paciente from "./Paciente";

export default interface Dentista {
    id: number;
    username: string;
    email: string;
    pacientes: Paciente[];
    cro: string;
}