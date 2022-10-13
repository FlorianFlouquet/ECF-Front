import React, { useEffect, useState } from 'react'
import { FilterVoiture } from '../components/vehicules/FilterVoiture'
import { Vehicule } from '../components/vehicules/Vehicule'
import { VehiculeFrom } from '../components/vehicules/VehiculeFrom'
import { VehiculesModel } from '../model/VehiculeModel'
import { vehiculesService } from '../services/VehiculesService'

import '../styles/locatairesPage.css'

export const VehiculesPage = () => {

  const [vehicules, setVehicules] = useState<VehiculesModel[]>([{marque: "", type: "", prix: 0, modele: "", etat: "", immatriculation: "", id: 0, disponible: true}])
  const [sentData, setSentData] = useState<VehiculesModel[]>([{marque: "", type: "", prix: 0, modele: "", etat: "", immatriculation: "", id: 0, disponible: true}]);
  const [filter, setFilter] = useState<string>("");
  const [filterContent, setFilterContent] = useState<string>("");

  useEffect(() => {
    findAllVehicules()
  }, [])

  useEffect(() => {
    handleFilter()
  }, [filterContent])

  const findAllVehicules = () => {
    vehiculesService.findAllVehicules().then((res: any) => {setVehicules(res); setSentData(res)})
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

  const handleFilter = () => {
    let array : VehiculesModel[];
    switch (filter) {
      case "marque":
        array = vehicules.filter((item) => item.marque === filterContent);
        if(array.length > 0) {
          setSentData(array);
        } else {
          setSentData(vehicules)
        }
        break;
      case "modele":
        array = vehicules.filter((item) => item.modele === filterContent);
        if(array.length > 0) {
          setSentData(array);
        } else {
          setSentData(vehicules)
        }
        break;
      case "type":
        array = vehicules.filter((item) => item.type === filterContent);
        if(array.length > 0) {
          setSentData(array);
        } else {
          setSentData(vehicules)
        }
        break;
      default:
        array = vehicules.filter((item) => item.etat === filterContent);
        if(array.length > 0) {
          setSentData(array);
        } else {
          setSentData(vehicules)
        }
        break;
    }
  }
  

  return (
    <>
      <div className='locataire-page'>
        <div className='locataire-page-content-holder'>
          <h2>Liste des vehicules</h2>
          <FilterVoiture setFilter={setFilterContent} changeFilter={setFilter} />
          <div className='liste-locataires'>
            <ul>
              {sentData.map((item) => (
                <Vehicule data={item} delete={deleteVehicule} editVehicule={editVehicule} />
              ))}
            </ul>
          </div>
        </div>
        <h2>Ajouter des véhicules</h2>
        <div className='form-holder'>
          <VehiculeFrom addVehicule={addVehicule} />
        </div>
      </div>
    </>
  )
}

