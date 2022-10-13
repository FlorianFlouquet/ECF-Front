import React, { useState } from 'react'
import { VehiculesModel } from '../../model/VehiculeModel'
import { ListEditV } from './ListEditV'
import '../../styles/locataire.css'
import { ListDataV } from './ListDataV'

interface Props {
    data: VehiculesModel
    delete: (id: number) => void
    editVehicule: (locataire: VehiculesModel) => void
}

export const Vehicule = (props : Props) => {

    const [canEdit, setCanEdit] = useState(false)

    const deleteVehicule = (id: number) => {
        props.delete(id);
    }

    const changeEdit = () => {
        setCanEdit(!canEdit);
    }

    const editVehicule = (vehicule: VehiculesModel) => {
        props.editVehicule(vehicule);
    }

    return (
        <li  key={props.data.modele} className='locataire'>
            <div className='locataire-content'>
                {canEdit ? 
                    <ListEditV delete={deleteVehicule} editLocataire={editVehicule} changeEdit={changeEdit} data={props.data} />
                    :
                    <ListDataV delete={deleteVehicule} changeEdit={changeEdit} data={props.data} />
                }
            </div>
        </li>
    )
}
