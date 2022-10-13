import React, { ChangeEvent, FormEvent, useState } from 'react'
import { LocataireModel } from '../../model/LocataireModel'

interface Props {
    addLocataire: (locataire: LocataireModel) => void
}

export const LocataireFrom = (props: Props) => {

    const [newLocataire, setNewLocataire] = useState<LocataireModel>({nom:'', prenom: '',dateNaissance: '', email: '', telephone: 0, id: 0})

    /**
     * Modifie la valeur d'une clé dans la state newLocataire
     * @param event 
     */
    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        setNewLocataire({...newLocataire, [event.target.name] : event.target.value});
    } 

    /**
     * Appelle la methode addLocataire du parent avec la state newLocataire en parametre
     * Reinitialise la valeur de newLocataire
     * @param event 
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.addLocataire(newLocataire);
        setNewLocataire({nom:'', prenom: '',dateNaissance: '', email: '', telephone: 0, id: 0});
    }

    return (
    <form className='form-locataire' action="submit" onSubmit={(event) => handleSubmit(event)}>
        <div>
            <div className='form-column'>
            <label htmlFor="nom" >Nom</label>
            <input onChange={(event) => handleChange(event)} value={newLocataire.nom} type="text" name='nom' id='nom' />
            <label htmlFor="prenom" >Prenom</label>
            <input onChange={(event) => handleChange(event)} value={newLocataire.prenom} type="text" name='prenom' id='prenom' />
            </div>
        </div>
        <div>
            <div className='form-column'>
            <label htmlFor="dateNaissance" >Date de naissance</label>
            <input onChange={(event) => handleChange(event)} value={newLocataire.dateNaissance} type="text" name='dateNaissance' id='dateNaissance' />
            <label htmlFor="email" >Email</label>
            <input onChange={(event) => handleChange(event)} value={newLocataire.email} type="text" name='email' id='email' />
            </div>    
        </div>
        <div>
            <div className='form-column'>
            <label htmlFor="telephone" >Telephone</label>
            <input onChange={(event) => handleChange(event)} value={newLocataire.telephone} type="text" name='telephone' id='telephone' />
            <button type='submit'>Ajouter</button>
            </div>
        </div>
    </form>
    )
}
