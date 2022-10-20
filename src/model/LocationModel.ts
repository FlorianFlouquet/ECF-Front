import { LocataireModel } from "./LocataireModel";
import { VehiculesModel } from "./VehiculeModel";

export interface LocationModel {
    locataire: LocataireModel,
    vehicule: VehiculesModel,
    dateDebut: Date,
    dateFin: Date,
    prixTotal: Number,
    id: Number
}