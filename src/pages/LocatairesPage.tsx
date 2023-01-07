import React, { useEffect, useState } from 'react'
import { FilterLocataire } from '../components/locataires/FilterLocataire'
import { Locataire } from '../components/locataires/Locataire'
import { LocataireFrom } from '../components/locataires/LocataireFrom'
import { LocataireModel } from '../model/LocataireModel'
import { locataireService } from '../services/LocataireService'
import '../styles/locatairesPage.css'

export const LocatairesPage = () => {

  const [locataires, setLocataires] = useState<LocataireModel[]>([{firstname: "", surname: "", birthDate: "", phoneNumber: 0, email: "", id: 0}]);
  const [sentData, setSentData] = useState<LocataireModel[]>([{firstname: "", surname: "", birthDate: "", phoneNumber: 0, email: "", id: 0}]);
  const [filter, setFilter] = useState<string>("");
  const [filterContent, setFilterContent] = useState<string>("");

  useEffect(() => {
    findAllLocataire();
  }, [])

  useEffect(() => {
    handleFilter()
  }, [filterContent])

  /**
   * Appelle la methode findAllLocataire du service
   */
  const findAllLocataire = () => {
    locataireService.findAllLocataire().then((res: any) => {setLocataires(res); setSentData(res)});
  }

  /**
   * Appelle la methode addLocataire du service, puis update le contenu des states locataire et sentData
   * @param locataire 
   */
  const addLocataire = (locataire: LocataireModel) => {
      locataireService.addLocataire(locataire).then((res) => {setLocataires(res); setSentData(res)})
  }

  /**
   * Appelle la methode deleteLocataire du service, puis update le contenu des states locataire et sentData
   * @param id 
   */
  const deleteLocataire = (id: number) => {
    locataireService.deleteLocataire(id).then((res) => {setLocataires(res); setSentData(res)})
  }

  /**
   * Appelle la methode editLocataire du service, puis update le contenu des states locataire et sentData
   * @param locataire 
   */
  const editLocataire = (locataire: LocataireModel) => {
    locataireService.patchLocataire(locataire).then((res) => {setLocataires(res); setSentData(res)})
  }

  /**
   * Affiche les locatairess qui correspondent à la valeur contenu dans la state filterContent.
   * Si aucun locataire ne correspond à filterContent, affiche toute la liste des locataires 
   */
  const handleFilter = () => {
    let array : LocataireModel[];
    switch (filter) {
      case "nom":
        array = locataires.filter((item) => item.firstname === filterContent);
        if(array.length > 0) {
          setSentData(array);
        } else {
          setSentData(locataires)
        }
        break;
      case "prenom":
        array = locataires.filter((item) => item.surname === filterContent);
        if(array.length > 0) {
          setSentData(array);
        } else {
          setSentData(locataires)
        }
        break;
      case "dateNaissance":
        array = locataires.filter((item) => item.birthDate === filterContent);
        if(array.length > 0) {
          setSentData(array);
        } else {
          setSentData(locataires)
        }
        break;
      default:
        array = locataires.filter((item) => item.firstname === filterContent);
        if(array.length > 0) {
          setSentData(array);
        } else {
          setSentData(locataires)
        }
        break;
    }
  }
  

  return (
    <>
      <div className='locataire-page'>
        <div className='locataire-page-content-holder'>
          <h2>Liste des locataires</h2>
          <FilterLocataire setFilter={setFilterContent} changeFilter={setFilter}/>
          <div className='liste-locataires'>
            <ul>
              {sentData.map((item, index) => (
                <Locataire key={index} data={item} delete={deleteLocataire} editLocataire={editLocataire} />
              ))}
            </ul>
          </div>
        </div>
        <h2>Ajouter des locataires</h2>
        <div className='form-holder'>
          <LocataireFrom addLocataire={addLocataire} />
        </div>
      </div>
    </>
  )
}
