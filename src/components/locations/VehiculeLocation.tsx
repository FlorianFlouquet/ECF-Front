import React, { VideoHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
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
                    <h2>{props.data.modele}</h2>
                    <h3>{props.data.prix}€</h3>
                    <figure className='voiture'>
                        <img src={voitureImg} alt="car-image" />
                    </figure>
                </div>
                <div>
                    <p>Immatriculation : {props.data.immatriculation}</p>
                    <p>Etat : {props.data.etat}</p>
                    <p>Type : {props.data.type}</p>
                    <p>Modele : {props.data.marque}</p>
                </div>
                <div>
                    {props.data.disponible
                    ?   <Link to="/louer" state={props.data}>
                            <button className='button-louer'>Louer</button>
                        </Link>
                    : <h4 className='indisponible'>INDISPONIBLE</h4>
                    }
                </div>
            </div>
        </li>
  )
}