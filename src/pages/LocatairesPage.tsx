import React, { useEffect, useState } from 'react'
import { FilterLocataire } from '../components/locataires/FilterLocataire'
import { Locataire } from '../components/locataires/Locataire'
import { LocataireFrom } from '../components/locataires/LocataireFrom'
import { LocataireModel } from '../model/LocataireModel'
import { locataireService } from '../services/LocataireService'
import '../styles/locatairesPage.css'

export const LocatairesPage = () => {

  const [locataires, setLocataires] = useState<LocataireModel[]>([{nom: "", prenom: "", dateNaissance: "", telephone: 0, email: "", id: 0}]);
  const [sentData, setSentData] = useState<LocataireModel[]>([{nom: "", prenom: "", dateNaissance: "", telephone: 0, email: "", id: 0}]);
  const [filter, setFilter] = useState<string>("");
  const [filterContent, setFilterContent] = useState<string>("");

  useEffect(() => {
    findAllLocataire();
  }, [])

  useEffect(() => {
    handleFilter()
  }, [filterContent])

  const findAllLocataire = () => {
    locataireService.findAllLocataire().then((res: any) => {setLocataires(res); setSentData(res)});
  }

  const addLocataire = (locataire: LocataireModel) => {
      locataireService.addLocataire(locataire).then((res) => setLocataires(res))
  }

  const deleteLocataire = (id: number) => {
    locataireService.deleteLocataire(id).then((res) => setLocataires(res))
  }

  const editLocataire = (locataire: LocataireModel) => {
    locataireService.patchLocataire(locataire).then((res) => setLocataires(res))
  }

  const handleFilter = () => {
    let array : LocataireModel[];
    switch (filter) {
      case "nom":
        array = locataires.filter((item) => item.nom === filterContent);
        if(array.length > 0) {
          setSentData(array);
        } else {
          setSentData(locataires)
        }
        break;
      case "prenom":
        array = locataires.filter((item) => item.prenom === filterContent);
        if(array.length > 0) {
          setSentData(array);
        } else {
          setSentData(locataires)
        }
        break;
      case "dateNaissance":
        array = locataires.filter((item) => item.dateNaissance === filterContent);
        if(array.length > 0) {
          setSentData(array);
        } else {
          setSentData(locataires)
        }
        break;
      default:
        array = locataires.filter((item) => item.nom === filterContent);
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
              {sentData.map((item) => (
                <Locataire data={item} delete={deleteLocataire} editLocataire={editLocataire} />
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
