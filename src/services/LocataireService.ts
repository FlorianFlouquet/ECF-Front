import { LocataireModel } from "../model/LocataireModel";

const API_URL = "http://localhost:8080/users"

class LocataireService {
    /**
     * Recupere tous les locataires dans la base de données
     * @returns 
     */
    findAllLocataire = () : any => {
        return fetch(API_URL).then(res => {
            return res.json();
        }).then(res => {
            return res;
        }).catch(err => {
            console.error(err)
        })
    }

    /**
     * Ajoute un locataire à la base de donnée
     * @param locataire 
     * @returns 
     */
    addLocataire = (locataire: LocataireModel) => {
        return fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(locataire)
        }).then(() => this.findAllLocataire());
    }

    /**
     * Supprime un locataire à la base de donnée
     * @param id 
     * @returns 
     */
    deleteLocataire = (id : number) => {
        return fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        }).then(() => this.findAllLocataire()); 
    }

    /**
     * Modifie un locataire à la base de donnée
     * @param locataire 
     * @returns 
     */
    patchLocataire = (locataire: LocataireModel) => {
        return fetch(`${API_URL}/${locataire.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(locataire)
        }).then(() => this.findAllLocataire());  
    }
}

export const locataireService = Object.freeze(new LocataireService());