import React, { useEffect, useState } from 'react'
import { Locataire } from '../components/Locataire'
import { LocataireModel } from '../model/LocataireModel'
import '../styles/locatairesPage.css'

export const LocatairesPage = () => {

  const [locataires, setLocataires] = useState<LocataireModel[]>([])

  useEffect(() => {
    setLocataires([
      {nom: "George", prenom: "Francois", email: "george.francois@mail.com", telephone: 0o425236145, dateNaissance: "05/12/1989"},
      {nom: "Jacques", prenom: "Francois", email: "jacques.francois@mail.com", telephone: 0o524236145, dateNaissance: "05/12/1989"},
      {nom: "George", prenom: "Francois", email: "george.francois@mail.com", telephone: 0o425236145, dateNaissance: "05/12/1989"},
      {nom: "Jacques", prenom: "Francois", email: "jacques.francois@mail.com", telephone: 0o524236145, dateNaissance: "05/12/1989"},
      {nom: "George", prenom: "Francois", email: "george.francois@mail.com", telephone: 0o425236145, dateNaissance: "05/12/1989"},
      {nom: "Jacques", prenom: "Francois", email: "jacques.francois@mail.com", telephone: 0o524236145, dateNaissance: "05/12/1989"},
    ])
  }, [])
  

  return (
    <>
      <div className='locataire-page'>
        <div className='locataire-page-content-holder'>
          <h2>Liste des locataires</h2>
          <div className='liste-locataires'>
            <ul>
              {locataires.map((item) => (
                <Locataire data={item}/>
              ))}
            </ul>
          </div>
        </div>
        {/* <button>Ajouter un locataire</button> */}
        <div className='form-holder'>
          <form className='form-locataire' action="submit">
            <div>
              <div className='form-column'>
                <label htmlFor="nom" >Nom</label>
                <input type="text" name='nom' id='nom' />
                <label htmlFor="prenom" >Prenom</label>
                <input type="text" name='prenom' id='prenom' />
              </div>
            </div>
            <div>
              <div className='form-column'>
                <label htmlFor="dateNaissance" >Date de naissance</label>
                <input type="text" name='dateNaissance' id='dateNaissance' />
                <label htmlFor="email" >Email</label>
                <input type="text" name='email' id='email' />
              </div>    
            </div>
            <div>
              <div className='form-column'>
                <label htmlFor="" >Telephone</label>
                <input type="text" name='email' id='email' />
                <button type='submit'>Ajouter</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
