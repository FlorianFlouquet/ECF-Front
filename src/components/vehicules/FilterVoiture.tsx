import React, { ChangeEvent } from 'react'

interface Props {
    changeFilter: (value: string) => void,
    setFilter: (value: string) => void
}

export const FilterVoiture = (props : Props) => {

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        props.changeFilter(event.target.value)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setFilter(event.target.value);
    }

    return (
        <>
            <div>
                <input type="text" name='filter' onChange={(event) => handleChange(event)} />
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
