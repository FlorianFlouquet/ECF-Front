import React, { useEffect, useState } from 'react'
import { VehiculeLocation } from '../components/locations/VehiculeLocation'
import { VehiculesModel } from '../model/VehiculeModel'
import { vehiculesService } from '../services/VehiculesService'

import '../styles/locatairesPage.css'

export const LocationsPage = () => {

    const [vehicules, setVehicules] = useState<VehiculesModel[]>([{marque: "", type: "", prix: 0, modele: "", etat: "", immatriculation: "", id: 0, disponible: true}])

    useEffect(() => {
    findAllVehicules()
    }, [])

    /**
     * Appelle la methode findAllVehicules du service
     */
    const findAllVehicules = () => {
    vehiculesService.findAllVehicules().then((res: any) => {setVehicules(res)})
    }
    return (
        <>
            <div className='locatation-page'>
                <div className='locatation-page-content-holder'>
                    <h2>Location de vehicules</h2>
                    <div className='liste-locataires'>
                        <ul>
                            {vehicules.map((item) => (
                            <VehiculeLocation data={item} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

