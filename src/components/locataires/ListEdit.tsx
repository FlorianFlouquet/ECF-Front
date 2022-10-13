import React, { ChangeEvent, FormEvent, useState } from 'react'
import { LocataireModel } from '../../model/LocataireModel'

interface Props {
    data: LocataireModel,
    delete: (id: number) => void,
    changeEdit: () => void,
    editLocataire: (locataire: LocataireModel) => void
}

export const ListEdit = (props: Props) => {

    const [locataire, setLocataire] = useState<LocataireModel>(props.data)

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        setLocataire({...locataire, [event.target.name] : event.target.value});
    } 

    const deleteLocataire = (id: number) => {
        props.delete(id);
    }

    const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
        console.log("oui");
        
        event.preventDefault();
        props.editLocataire(locataire);
        props.changeEdit();
    }

    return (
        <>
            <div>
                <p>Nom: <input name='nom' onChange={(event) => handleChange(event)} type="text" value={locataire.nom}/></p>
                <p>Prenom: <input name='prenom' onChange={(event) => handleChange(event)} type="text" value={locataire.prenom}/></p>
            </div>
            <div>
                <p>Né le : <input name='dateNaissance' onChange={(event) => handleChange(event)} type="text" value={locataire.dateNaissance} /></p>
                <p>Email : <input name='email' onChange={(event) => handleChange(event)} type="text" value={locataire.email} /></p>
                <p>Téléphone : <input name='telephone' onChange={(event) => handleChange(event)} type="text" value={locataire.telephone} /></p>
            </div>
            <div>
                <button onClick={() => deleteLocataire(props.data.id)}>Supprimer</button>
                <button onClick={(event) => handleSubmit(event)}>Modifier</button>
            </div>
        </>
    )
}
