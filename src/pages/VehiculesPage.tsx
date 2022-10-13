import React, { useEffect, useState } from 'react'
import { Vehicule } from '../components/vehicules/Vehicule'
import { VehiculeFrom } from '../components/vehicules/VehiculeFrom'
import { VehiculesModel } from '../model/VehiculeModel'
import { vehiculesService } from '../services/VehiculesService'

import '../styles/locatairesPage.css'

export const VehiculesPage = () => {

  const [vehicules, setVehicules] = useState<VehiculesModel[]>([{marque: "", type: "", prix: 0, modele: "", etat: "", immatriculation: "", id: 0, disponible: true}])

  useEffect(() => {
    findAllVehicules()
  }, [])

  const findAllVehicules = () => {
    vehiculesService.findAllVehicules().then((res: any) => setVehicules(res))
  }

  const addVehicule = (vehicule: VehiculesModel) => {
      vehiculesService.addVehicules(vehicule).then((res) => setVehicules(res))
  }

  const deleteVehicule = (id: number) => {
    vehiculesService.deleteVehicule(id).then((res) => setVehicules(res))
  }

  const editVehicule = (vehicule: VehiculesModel) => {
    vehiculesService.patchVehicule(vehicule).then((res) => setVehicules(res))
  }
  

  return (
    <>
      <div className='locataire-page'>
        <div className='locataire-page-content-holder'>
          <h2>Liste des vehicules</h2>
          <div className='liste-locataires'>
            <ul>
              {vehicules.map((item) => (
                <Vehicule data={item} delete={deleteVehicule} editVehicule={editVehicule} />
              ))}
            </ul>
          </div>
        </div>
        {/* <button>Ajouter un locataire</button> */}
        <div className='form-holder'>
          <VehiculeFrom addVehicule={addVehicule} />
        </div>
      </div>
    </>
  )
}

