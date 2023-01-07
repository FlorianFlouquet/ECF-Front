import React from 'react'
import { LocataireModel } from '../../model/LocataireModel'

interface Props {
    data: LocataireModel,
    delete: (id: number) => void,
    changeEdit: () => void
}

export const ListData = (props: Props) => {

    /**
     * Appelle la methode delete du parent
     * @param id 
     */
    const deleteLocataire = (id: number) => {
        props.delete(id);
    }

    /**
     * Appelle la methode changeEdit du parent
     */
    const changeEdit = () => {
        props.changeEdit();
    }

    return (
        <>
            <div>
                <h2 className='locataire-nom'>{props.data.firstname}</h2>
                <h3 className='locataire-prenom'>{props.data.surname}</h3>
            </div>
            <div>
                <p>Né le : {props.data.birthDate}</p>
                <p>Email : {props.data.email}</p>
                <p>Téléphone : {props.data.phoneNumber}</p>
            </div>
            <div>
                <button onClick={() => deleteLocataire(props.data.id)}>Supprimer</button>
                <button onClick={changeEdit}>Modifier</button>
            </div>
        </>
    )
}
