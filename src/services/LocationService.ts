import { LocationModel } from "../model/LocationModel";

const API_URL = "http://localhost:8080/rentals"

class LocationService {
    /**
     * Recupere toutes les locations dans la base de donnée
     * @returns 
     */
    findAllLocations = () => {
        return fetch(API_URL).then(res => {
            return res.json();
        }).then(res => {
            return res;
        }).catch(err => {
            console.error(err);
        })
    }

    /**
     * Supprime une location à la base de donnée
     * @param id 
     * @returns 
     */
    deleteLocaction = (id : Number) => {
        return fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        }).then(() => this.findAllLocations()); 
    }

    addLocation = (newLocation : LocationModel ) => {
        return fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLocation)
        });
    }
}

export const locationService = Object.freeze(new LocationService());