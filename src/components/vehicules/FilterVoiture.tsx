import React, { ChangeEvent } from 'react'
import '../../styles/filter.css'


interface Props {
    changeFilter: (value: string) => void,
    setFilter: (value: string) => void
}

export const FilterVoiture = (props : Props) => {

    /**
     * Prend la valeur du select et l'envoie dans la méthode changeFilter du parent
     * @param event 
     */
    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        props.changeFilter(event.target.value)
    }

    /**
     * Prend la valeur du select et l'envoie dans la méthode setFilter du parent
     * @param event 
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setFilter(event.target.value);
    }

    return (
        <>
            <div className='filter'>
                <input className='input-filter' type="text" name='filter' onChange={(event) => handleChange(event)} />
                <select onChange={(event) => handleSelect(event)}>
                    <option value="">Choisir un filtre</option>
                    <option value="marque">Marque</option>
                    <option value="modele">Modele</option>
                    <option value="type">Type</option>
                    <option value="etat">Etat</option>
                </select>
            </div>
        </>
    )
}
