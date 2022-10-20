import React, { useEffect, useState } from 'react'
import { isTemplateExpression } from 'typescript';
import { Location } from '../components/gestionLocations/Location';
import { LocationModel } from '../model/LocationModel';
import { locataireService } from '../services/LocataireService';
import { locationService } from '../services/LocationService';

export const GestionLocation = () => {

    const [locations, setLocations] = useState<LocationModel[]>();

    useEffect(() => {
        locationService.findAllLocations().then((data) => setLocations(data));
    }, [])
    

    return (
        <>
            <>
                <div className='locataire-page'>
                    <div className='locataire-page-content-holder'>
                        <h2>Liste des locations</h2>
                        <div className='liste-locataires'>
                            <ul>
                            {locations && locations.map((item, index) => (
                                <Location key={index} data={item} />
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
                </>
        </>
    )
}
