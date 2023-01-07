import React, { useState } from 'react'
import { VehiculesModel } from '../../model/VehiculeModel'
import { ListEditV } from './ListEditV'
import '../../styles/vehicule.css'
import { ListDataV } from './ListDataV'

interface Props {
    data: VehiculesModel
    delete: (id: number) => void
    editVehicule: (locataire: VehiculesModel) => void
}

export const Vehicule = (props : Props) => {

    const [canEdit, setCanEdit] = useState(false)

    /**
     * Appelle la methode delete du parent
     * @param id 
     */
    const deleteVehicule = (id: number) => {
        props.delete(id);
    }

    /**
     * Inverse la valeur dans la state canEdit pour soit afficher le formulaire, soit afficher les données du véhicule
     */
    const changeEdit = () => {
        setCanEdit(!canEdit);
    }

    /**
     * appelle la méthode editVehicule du parent
     * @param vehicule 
     */
    const editVehicule = (vehicule: VehiculesModel) => {
        props.editVehicule(vehicule);
    }

    return (
        <li  key={props.data.model} className='locataire'>
            <div className='vehicule-content'>
                {canEdit ? 
                    <ListEditV delete={deleteVehicule} editLocataire={editVehicule} changeEdit={changeEdit} data={props.data} />
                    :
                    <ListDataV delete={deleteVehicule} changeEdit={changeEdit} data={props.data} />
                }
            </div>
        </li>
    )
}
