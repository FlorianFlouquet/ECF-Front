import React from 'react'
import { LocataireModel } from '../../model/LocataireModel'

interface Props {
    data: LocataireModel,
    delete: (id: number) => void,
    changeEdit: () => void
}

export const ListData = (props: Props) => {

    const deleteLocataire = (id: number) => {
        props.delete(id);
    }

    const changeEdit = () => {
        props.changeEdit();
    }

    return (
        <>
            <div>
                <h2>{props.data.nom}</h2>
                <h3>{props.data.prenom}</h3>
            </div>
            <div>
                <p>Né le : {props.data.dateNaissance}</p>
                <p>Email : {props.data.email}</p>
                <p>Téléphone : {props.data.telephone}</p>
            </div>
            <div>
                <button onClick={() => deleteLocataire(props.data.id)}>Supprimer</button>
                <button onClick={changeEdit}>Modifier</button>
            </div>
        </>
    )
}
