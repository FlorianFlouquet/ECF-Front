import React, { useState } from 'react'
import { LocataireModel } from '../../model/LocataireModel'
import '../../styles/locataire.css'
import { ListData } from './ListData'
import { ListEdit } from './ListEdit'

interface Props {
    data: LocataireModel
    delete: (id: number) => void
    editLocataire: (locataire: LocataireModel) => void
}

export const Locataire = (props : Props) => {

    const [canEdit, setCanEdit] = useState(false)

    const deleteLocataire = (id: number) => {
        props.delete(id);
    }

    const changeEdit = () => {
        setCanEdit(!canEdit);
    }

    const editLocataire = (locataire: LocataireModel) => {
        props.editLocataire(locataire);
    }

    return (
        <li  key={props.data.dateNaissance} className='locataire'>
            <div className='locataire-content'>
                {canEdit ? 
                    <ListEdit delete={deleteLocataire} editLocataire={editLocataire} changeEdit={changeEdit} data={props.data} />
                    :
                    <ListData delete={deleteLocataire} changeEdit={changeEdit} data={props.data} />
                }
            </div>
        </li>
    )
}
