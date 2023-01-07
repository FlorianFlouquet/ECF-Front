import React, { useEffect, useState } from 'react'
import { FilterVoiture } from '../components/vehicules/FilterVoiture'
import { Vehicule } from '../components/vehicules/Vehicule'
import { VehiculeFrom } from '../components/vehicules/VehiculeFrom'
import { VehiculesModel } from '../model/VehiculeModel'
import { vehiculesService } from '../services/VehiculesService'

import '../styles/locatairesPage.css'

export const VehiculesPage = () => {

  const [vehicules, setVehicules] = useState<VehiculesModel[]>([{brand: "", type: "", price: 0, model: "", state: "", licenseNumber: "", id: 0, available: true}])
  const [sentData, setSentData] = useState<VehiculesModel[]>([{brand: "", type: "", price: 0, model: "", state: "", licenseNumber: "", id: 0, available: true}]);
  const [filter, setFilter] = useState<string>("");
  const [filterContent, setFilterContent] = useState<string>("");

  useEffect(() => {
    findAllVehicules()
  }, [])

  useEffect(() => {
    handleFilter()
  }, [filterContent])

  /**
   * Appelle la methode findAllVehicules du service
   */
  const findAllVehicules = () => {
    vehiculesService.findAllVehicules().then((res: any) => {
      setVehicules(res); setSentData(res)
    })
  }

  /**
   * Appelle la methode addVehicules du service et update le contenu des states vehicules et sentData
   * @param vehicule 
   */
  const addVehicule = (vehicule: VehiculesModel) => {
      vehiculesService.addVehicules(vehicule).then((res) => {setVehicules(res); setSentData(res)})
  }

  /**
   * Appelle la methode deleteVehicules du service et update le contenu des states vehicules et sentData
   * @param id 
   */
  const deleteVehicule = (id: number) => {
    vehiculesService.deleteVehicule(id).then((res) => {setVehicules(res); setSentData(res)})
  }

  /**
   * Appelle la methode edit Vehicules du service et update le contenu des states vehicules et sentData
   * @param id 
   */
  const editVehicule = (vehicule: VehiculesModel) => {
    vehiculesService.patchVehicule(vehicule).then((res) => {setVehicules(res); setSentData(res)})
  }

  /**
   * Affiche les vehicules qui correspondent à la valeur contenu dans la state filterContent.
   * Si aucun vehicule ne correspond à filterContent, affiche toute la liste des vehicules 
   */
  const handleFilter = () => {
    let array : VehiculesModel[];
    switch (filter) {
      case "marque":
        array = vehicules.filter((item) => item.brand === filterContent);
        if(array.length > 0) {
          setSentData(array);
        } else {
          setSentData(vehicules)
        }
        break;
      case "modele":
        array = vehicules.filter((item) => item.model === filterContent);
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
        array = vehicules.filter((item) => item.state === filterContent);
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

