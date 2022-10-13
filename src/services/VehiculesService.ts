import { VehiculesModel } from "../model/VehiculeModel";

const API_URL = "http://localhost:3000/vehicules"

class VehiculeService {
    findAllVehicules = () : any => {
        return fetch(API_URL).then(res => {
            return res.json();
        }).then(res => {
            return res;
        }).catch(err => {
            console.error(err)
        })
    }

    addVehicules = (vehicule: VehiculesModel) => {
        return fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehicule)
        }).then(() => this.findAllVehicules());
    }

    deleteVehicule = (id : number) => {
        return fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        }).then(() => this.findAllVehicules()); 
    }

    patchVehicule = (vehicule: VehiculesModel) => {
        return fetch(`${API_URL}/${vehicule.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehicule)
        }).then(() => this.findAllVehicules());  
    }
}

export const vehiculesService = Object.freeze(new VehiculeService());