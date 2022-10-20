import React from 'react'
import { LocationModel } from '../../model/LocationModel'
import voitureImg from '../../styles/assets/voiture.jpg'
import '../../styles/location.css'

interface Props {
    data: LocationModel,
    delete: (id: Number) => void
}

export const Location = (props : Props) => {

    const deleteLocation = () => {
        props.delete(props.data.id);
    }

    return (
        <>
            <div className='location'>
                <div>
                    <figure>
                        <img src={voitureImg} alt="voiture-img" />
                    </figure>
                </div>
                <div>
                    <h2>{props.data.vehicule.modele}</h2>
                    <p><span className='gras'>Loué du </span>{props.data.dateDebut.toString().slice(0, -14)}</p> 
                    <p><span className='gras'>au </span>{props.data.dateFin.toString().slice(0, -14)}</p>
                </div>
                <div>
                    <h3>{props.data.locataire.nom} {props.data.locataire.prenom}</h3>
                    <p>{props.data.locataire.dateNaissance}</p>
                    <p>{props.data.locataire.email}</p>
                    <p>{props.data.locataire.telephone}</p>
                </div>
                <div>
                    <button onClick={deleteLocation}>Delete</button>
                </div>
            </div>
        </>
    )
}
