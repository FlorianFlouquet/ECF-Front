import React from 'react'
import { LocataireModel } from '../model/LocataireModel'
import '../styles/locataire.css'

interface Props {
    data: LocataireModel
}

export const Locataire = (props : Props) => {
    return (
        <li className='locataire'>
            <div className='locataire-content'>
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
                    <button>Supprimer</button>
                    <button>Modifier</button>
                </div>
            </div>
        </li>
    )
}
