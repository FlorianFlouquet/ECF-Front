import React, { useEffect, useState } from 'react'
import { Locataire } from '../components/locataires/Locataire'
import { LocataireFrom } from '../components/locataires/LocataireFrom'
import { LocataireModel } from '../model/LocataireModel'
import { locataireService } from '../services/LocataireService'
import '../styles/locatairesPage.css'

export const LocatairesPage = () => {

  const [locataires, setLocataires] = useState<LocataireModel[]>([{nom: "", prenom: "", dateNaissance: "", telephone: 0, email: "", id: 0}])

  useEffect(() => {
    findAllLocataire()
  }, [])

  const findAllLocataire = () => {
    locataireService.findAllLocataire().then((res: any) => setLocataires(res))
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
  

  return (
    <>
      <div className='locataire-page'>
        <div className='locataire-page-content-holder'>
          <h2>Liste des locataires</h2>
          <div className='liste-locataires'>
            <ul>
              {locataires.map((item) => (
                <Locataire data={item} delete={deleteLocataire} editLocataire={editLocataire} />
              ))}
            </ul>
          </div>
        </div>
        {/* <button>Ajouter un locataire</button> */}
        <div className='form-holder'>
          <LocataireFrom addLocataire={addLocataire} />
        </div>
      </div>
    </>
  )
}
