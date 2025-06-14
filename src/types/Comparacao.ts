import Panoramica from "./Panoramica";

export default interface Comparacao {
    id: number;
    atual_panoramica: Panoramica;
    anterior_panoramica: Panoramica;
    progressao: string; 
}