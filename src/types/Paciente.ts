import Panoramica from "./Panoramica";

export default interface Paciente {
    id: number,
    nome: string;
    cpf: string;
    celular: string;
    email: string;
    endereço: string;
    Panoramicas: Panoramica[];
}