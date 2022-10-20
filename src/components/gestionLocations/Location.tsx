import React from 'react'
import { LocationModel } from '../../model/LocationModel'

interface Props {
    data: LocationModel
}

export const Location = (props : Props) => {
    return (
        <>
            <h2>{props.data.locataire.nom}</h2>
        </>
    )
}
