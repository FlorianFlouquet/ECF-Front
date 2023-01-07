import { LocataireModel } from "./LocataireModel";
import { VehiculesModel } from "./VehiculeModel";

export interface LocationModel {
    renter: LocataireModel,
    vehicle: VehiculesModel,
    dateStart: Date,
    dateEnd: Date,
    totalPrice: Number,
    id: Number
}