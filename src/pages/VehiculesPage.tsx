import React, { useEffect, useState } from 'react'
import { VehiculesModel } from '../model/VehiculeModel'
import { vehiculesService } from '../services/VehiculesService'

import '../styles/locatairesPage.css'

export const VehiculesPage = () => {

  const [vehicules, setVehicules] = useState<VehiculesModel[]>([{marque: "", type: "", prix: 0, modele: "", etat: "", immatriculation: "", id: 0}])

  useEffect(() => {
    findAllLocataire()
  }, [])

  const findAllLocataire = () => {
    vehiculesService.findAllVehicules().then((res: any) => setVehicules(res))
  }

  const addLocataire = (vehicule: VehiculesModel) => {
      vehiculesService.addVehicules(vehicule).then((res) => setVehicules(res))
  }

  const deleteLocataire = (id: number) => {
    vehiculesService.deleteVehicule(id).then((res) => setVehicules(res))
  }

  const editLocataire = (locataire: VehiculesModel) => {
    vehiculesService.patchVehicule(locataire).then((res) => setVehicules(res))
  }
  

  return (
    <>
      <div className='locataire-page'>
        <div className='locataire-page-content-holder'>
          <h2>Liste des locataires</h2>
          <div className='liste-locataires'>
            <ul>
              {/* {locataires.map((item) => (
                <Locataire data={item} delete={deleteLocataire} editLocataire={editLocataire} />
              ))} */}
            </ul>
          </div>
        </div>
        {/* <button>Ajouter un locataire</button> */}
        <div className='form-holder'>
          {/* <LocataireFrom addLocataire={addLocataire} /> */}
        </div>
      </div>
    </>
  )
}

