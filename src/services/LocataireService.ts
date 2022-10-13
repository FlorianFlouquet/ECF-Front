import { LocataireModel } from "../model/LocataireModel";

const API_URL = "http://localhost:3000/locataires"

class LocataireService {
    findAllLocataire = () : any => {
        return fetch(API_URL).then(res => {
            return res.json();
        }).then(res => {
            return res;
        }).catch(err => {
            console.error(err)
        })
    }

    addLocataire = (locataire: LocataireModel) => {
        return fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(locataire)
        }).then(() => this.findAllLocataire());
    }

    deleteLocataire = (id : number) => {
        return fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        }).then(() => this.findAllLocataire()); 
    }

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