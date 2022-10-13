import React, { ChangeEvent, FormEvent, useState } from 'react'
import { LocataireModel } from '../../model/LocataireModel'
import { VehiculesModel } from '../../model/VehiculeModel'

interface Props {
    addVehicule: (vehicule: VehiculesModel) => void
}

export const VehiculeFrom = (props: Props) => {

    const [newVehicule, setNewVehicule] = useState<VehiculesModel>({marque: "", type: "", prix: 0, modele: "", etat: "", immatriculation: "", id: 0, disponible: true})

    /**
     * Change la valeur d'une clé dans la state newVehicule
     * @param event 
     */
    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        setNewVehicule({...newVehicule, [event.target.name] : event.target.value});
    } 

    /**
     * Appelle la methode addVehicule du parent avec la contenu de la state newVehicule en parametre
     * Reinitialise la valeur de la state newVehicule
     * @param event 
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.addVehicule(newVehicule);
        setNewVehicule({marque: "", type: "", prix: 0, modele: "", etat: "", immatriculation: "", id: 0, disponible: true});
    }

    return (
    <form className='form-voiture' action="submit" onSubmit={(event) => handleSubmit(event)}>
        <div>
            <div className='form-column-v'>
                <label htmlFor="marque" >Marque</label>
                <input onChange={(event) => handleChange(event)} value={newVehicule.marque} type="text" name='marque' id='marque' />
                <label htmlFor="etat" >Etat</label>
                <input onChange={(event) => handleChange(event)} value={newVehicule.etat} type="text" name='etat' id='etat' />
            </div>
        </div>
        <div>
            <div className='form-column-v'>
                <label htmlFor="type" >Type</label>
                <input onChange={(event) => handleChange(event)} value={newVehicule.type} type="text" name='type' id='type' />
                <label htmlFor="immatriculation" >Immatriculation</label>
                <input onChange={(event) => handleChange(event)} value={newVehicule.immatriculation} type="text" name='immatriculation' id='immatriculation' />
            </div>    
        </div>
        <div>
            <div className='form-column-v'>
                <label htmlFor="Modele" >Modele</label>
                <input onChange={(event) => handleChange(event)} value={newVehicule.modele} type="text" name='modele' id='modele' />
                <label htmlFor="Prix" >Prix</label>
                <input onChange={(event) => handleChange(event)} value={newVehicule.prix} type="text" name='prix' id='prix' />
            </div>
        </div>
        <div>
            <div className='from-column-v'>
                <button type='submit'>Ajouter</button>
            </div>
        </div>
    </form>
    )
}
