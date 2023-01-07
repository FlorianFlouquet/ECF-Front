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
                    <h2>{props.data.vehicle.model}</h2>
                    <p><span className='gras'>Loué du </span>{props.data.dateStart.toString()}</p> 
                    <p><span className='gras'>au </span>{props.data.dateEnd.toString()}</p>
                </div>
                <div>
                    <h3>{props.data.renter.firstname} {props.data.renter.surname}</h3>
                    <p>{props.data.renter.birthDate}</p>
                    <p>{props.data.renter.email}</p>
                    <p>{props.data.renter.phoneNumber}</p>
                </div>
                <div>
                    <button onClick={deleteLocation}>Delete</button>
                </div>
            </div>
        </>
    )
}
