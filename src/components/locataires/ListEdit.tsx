import React, { ChangeEvent, FormEvent, useState } from 'react'
import { LocataireModel } from '../../model/LocataireModel'

interface Props {
    data: LocataireModel,
    delete: (id: number) => void,
    changeEdit: () => void,
    editLocataire: (locataire: LocataireModel) => void
}

export const ListEdit = (props: Props) => {

    const [locataire, setLocataire] = useState<LocataireModel>(props.data)

    /**
     * Modifie la valeur d'une clé de la state locataire
     * @param event 
     */
    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        setLocataire({...locataire, [event.target.name] : event.target.value});
    } 

    /**
     * Appelle la methode delete du parent
     */
    const deleteLocataire = (id: number) => {
        props.delete(id);
    }

    /**
     * Appelle la methode editlocataire puis changeEdit du parent
     */
    const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
    
        event.preventDefault();
        props.editLocataire(locataire);
        props.changeEdit();
    }

    return (
        <>
            <div>
                <p>Nom: <input name='nom' onChange={(event) => handleChange(event)} type="text" value={locataire.firstname}/></p>
                <p>Prenom: <input name='prenom' onChange={(event) => handleChange(event)} type="text" value={locataire.surname}/></p>
            </div>
            <div>
                <p>Né le : <input name='dateNaissance' onChange={(event) => handleChange(event)} type="text" value={locataire.birthDate} /></p>
                <p>Email : <input name='email' onChange={(event) => handleChange(event)} type="text" value={locataire.email} /></p>
                <p>Téléphone : <input name='telephone' onChange={(event) => handleChange(event)} type="text" value={locataire.phoneNumber} /></p>
            </div>
            <div>
                <button onClick={() => deleteLocataire(props.data.id)}>Supprimer</button>
                <button onClick={(event) => handleSubmit(event)}>Modifier</button>
            </div>
        </>
    )
}
