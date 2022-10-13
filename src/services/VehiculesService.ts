import { VehiculesModel } from "../model/VehiculeModel";

const API_URL = "http://localhost:3000/vehicules"

class VehiculeService {
    /**
     * Recupere la liste des vehicules dans la base de donnée
     * @returns 
     */
    findAllVehicules = () : any => {
        return fetch(API_URL).then(res => {
            return res.json();
        }).then(res => {
            return res;
        }).catch(err => {
            console.error(err)
        })
    }

    /**
     * Ajoute un vehicule à la base de donnée
     * @param vehicule 
     * @returns 
     */
    addVehicules = (vehicule: VehiculesModel) => {
        return fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehicule)
        }).then(() => this.findAllVehicules());
    }

    /**
     * Supprime un vehicule à la base de donnée
     * @param id 
     * @returns 
     */
    deleteVehicule = (id : number) => {
        return fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        }).then(() => this.findAllVehicules()); 
    }

    /**
     * modifie un véhicule dans la base de donnée
     * @param vehicule 
     * @returns 
     */
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