import React, { VideoHTMLAttributes } from 'react'
import { VehiculesModel } from '../../model/VehiculeModel'
import voitureImg from '../../styles/assets/voiture.jpg'

interface Props {
    data : VehiculesModel,
}

export const VehiculeLocation = (props: Props) => {
  return (
    <li  key={props.data.modele} className='locataire'>
            <div className='locataire-content'>
                <div>
                    <h2>{props.data.marque}</h2>
                    <h3>{props.data.prix}€</h3>
                    <figure className='voiture'>
                        <img src={voitureImg} alt="car-image" />
                    </figure>
                </div>
                <div>
                    <p>Immatriculation : {props.data.immatriculation}</p>
                    <p>Etat : {props.data.etat}</p>
                    <p>Type : {props.data.type}</p>
                    <p>Modele : {props.data.modele}</p>
                </div>
                <div>
                    {props.data.disponible
                    ? <button>Louer</button>
                    : <h2>INDISPONIBLE</h2>
                    }
                </div>
            </div>
        </li>
  )
}