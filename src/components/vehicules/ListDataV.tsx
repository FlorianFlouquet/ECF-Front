import React from 'react'
import { VehiculesModel } from '../../model/VehiculeModel'
import voitureImg from '../../styles/assets/voiture.jpg'

interface Props {
    data: VehiculesModel,
    delete: (id: number) => void,
    changeEdit: () => void
}

export const ListDataV = (props: Props) => {

    const deleteLocataire = (id: number) => {
        props.delete(id);
    }

    const changeEdit = () => {
        props.changeEdit();
    }

    return (
        <>
            <div>
                <h2>{props.data.marque}</h2>
                <h3>{props.data.prix}€</h3>
                <figure className='voiture'>
                    <img src={voitureImg} alt="car-image    " />
                </figure>
            </div>
            <div>
                <p>Immatriculation : {props.data.immatriculation}</p>
                <p>Etat : {props.data.etat}</p>
                <p>Type : {props.data.type}</p>
                <p>Modele : {props.data.modele}</p>
                <p>Disponible : {props.data.disponible ? "Oui" : "Non"}</p>
            </div>
            <div>
                <button onClick={() => deleteLocataire(props.data.id)}>Supprimer</button>
                <button onClick={changeEdit}>Modifier</button>
            </div>
        </>
    )
}
