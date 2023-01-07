import React, { VideoHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { VehiculesModel } from '../../model/VehiculeModel'
import voitureImg from '../../styles/assets/voiture.jpg'

interface Props {
    data : VehiculesModel,
}

export const VehiculeLocation = (props: Props) => {
  return (
    <li  key={props.data.model} className='locataire'>
            <div className='locataire-content'>
                <div>
                    <h2>{props.data.model}</h2>
                    <h3>{props.data.price}€</h3>
                    <figure className='voiture'>
                        <img src={voitureImg} alt="car-image" />
                    </figure>
                </div>
                <div>
                    <p>Immatriculation : {props.data.licenseNumber}</p>
                    <p>Etat : {props.data.state}</p>
                    <p>Type : {props.data.type}</p>
                    <p>Modele : {props.data.brand}</p>
                </div>
                <div>
                    {props.data.available
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