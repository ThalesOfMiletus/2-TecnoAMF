import Relatorio from "./Relatorio";

export default interface Panoramica {
    id: number;
    foto: string;
    paciente_id: number;
    data: Date;
    Relatorio: Relatorio;
}