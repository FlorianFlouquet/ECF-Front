import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LocataireModel } from '../model/LocataireModel'
import { LocationModel } from '../model/LocationModel'
import { VehiculesModel } from '../model/VehiculeModel'
import { locataireService } from '../services/LocataireService'
import { locationService } from '../services/LocationService'
import { vehiculesService } from '../services/VehiculesService'
import voitureImg from '../styles/assets/voiture.jpg'
import '../styles/locationsPage.css'

export const LouerPage = () => {

    // Attributs et States

    const vehicule : VehiculesModel = useLocation().state;

    const [locataires, setLocataires] = useState<LocataireModel[]>();

    const [prix, setPrix] = useState(0);

    const [location, setLocation] = useState<LocationModel>({
        locataire: {
            nom: "",
            prenom: "",
            email: "",
            telephone: 0,
            dateNaissance: "",
            id: 0
        },
        vehicule: {
            marque: "Peugeot",
            modele: "207",
            etat: "Tres bien",
            prix: 250,
            immatriculation: "AXF-12F-45F",
            type: "citadine",
            id: 0,
            disponible: true
        },
        dateDebut: new Date(),
        dateFin: new Date(),
        prixTotal: 0,
        id: 0
    });

    const [dateInvalid, setDateInvalid] = useState(false);
    const [selectedLocataire, setSelectedLocataire] = useState(false);

    // useEffects 

    useEffect(() => {
        getAllLocataire();
        setLocation(prevState => (
            {...prevState, vehicule: vehicule}
        ))
    }, [])

    useEffect(() => {
        calculerPrix();
    }, [location.dateDebut, location.dateFin])

    useEffect(() => {
        setLocation(prevState => (
            {...prevState, prixTotal : prix}
        ))
    }, [prix])


    // Methodes


    /**
     * Modifie le contenu de la state location
     * @param event 
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocation(prevState => (
            {...prevState, [event.target.name] : new Date(event.target.value)}
        ));
    }

    /**
     * Place la liste des locataires dans la state locataires
     */
    const getAllLocataire = () => {
        locataireService.findAllLocataire().then((data: LocataireModel[]) => setLocataires(data))
    }

    /**
     * Place le locataire séléctionné dans la state selectedLocataire
     * @param event 
     */
    const handleSelect = (event : ChangeEvent<HTMLSelectElement>) => {
        const selectValue : string = (event.target.value);
        if(locataires && selectValue !== "") {
            const chosenLocataire : LocataireModel = locataires.filter(item => item.id === Number(selectValue))[0];
            setLocation(prevState => (
                {...prevState, locataire : chosenLocataire}
            ));
        } else if(selectValue == "") {
            setLocation(prevState => (
                {...prevState, locataire : {
                    nom: "",
                    prenom: "",
                    email: "",
                    telephone: 0,
                    dateNaissance: "",
                    id: 0
                }}
            ));
        } 
    }

    /**
     * Calcule le prix total de la location en fonction de la durée de la location
     * @param event 
     */
    const calculerPrix = () => {
        const timeDiffInMilli = (location.dateFin.getTime() - location.dateDebut.getTime());
        const timeDiffInDays = timeDiffInMilli / (1000*60*60*24);
        const prix = timeDiffInDays * vehicule.prix;
        if(prix > 0) {
            setPrix(prix);
        } else {
            setPrix(0);
        }
    }

    /**
     * Si la date de debut est bien anterieur à la date de fin, alors change la disponibilité du véhicule,
     * envoie le detaillé de la location au addLocation et renvoie l'utilisateur vers la page la page location
     * @param event 
     */
    const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(isDatesCorrect() && hasSelectedLocataire()) {
            changeDisponibility();
            addLocation(location);
            window.location.replace('/location');
        } else if(!hasSelectedLocataire()) {
            setSelectedLocataire(true);
        }
        else {
            setDateInvalid(true);
        }
    }

    /**
     * Appelle la methode addLocation du service
     * @param newLocation 
     */
    const addLocation = (newLocation : LocationModel) => {
        locationService.addLocation(newLocation);
    }

    /**
     * Change la disponibilité du véhicule à false
     */
    const changeDisponibility = () => {
        vehicule.disponible = false;
        vehiculesService.patchVehicule(vehicule);
    }

    /**
     * Verifie que la date de debut est anterieur à la date de fin
     * @returns 
     */
    const isDatesCorrect = () : boolean => {
        return location.dateFin.getTime() > location.dateDebut.getTime()
    }

    const hasSelectedLocataire = () : boolean => {
        return location.locataire.nom !== "";
    }

    /**
     * Recupere la date d'aujourd'hui et la retourne au format string pour l'utiliser dans l'attribut "min" de l'input date.
     * Ainsi l'utilisateur ne peut pas séléctionner de date antérieur à celle d'aujourd'hui
     * @returns 
     */
    const getTodayDateInString = () : string => {
        const date = new Date();
        let year = date.getFullYear();
        let dayInt = date.getDay();
        let dayString = "";
        if(dayInt < 10) {
            dayString = "0" + dayInt; 
        }
        else {
            dayString = `${dayInt}`
        }
        let monthInt = date.getMonth();
        let monthString = "";
        if(monthInt < 10) {
            monthString = "0" + monthInt;
        }
        else {
            monthString = `${monthInt}`
        }
        return `${dayString}-${monthString}-${year}`;
    }

    return (
        <>
            <div className='louer-page'>
                {vehicule && 
                    <div className='voiture-details'>
                        <figure className='voiture-location'>
                            <img src={voitureImg} alt="voiture-image" />
                        </figure>
                        <div>
                            <h2>{vehicule.marque}</h2>
                            <h3>{vehicule.modele}</h3>
                            <h4>{vehicule.prix}€ / jour</h4>
                        </div>
                    </div>
                }
                <span className='trait'></span>
                <div className='form-louer'>
                    <div className='choix-locataire'>
                        <select onChange={handleSelect}>
                            <option value="">Veuillez choisir un locataire</option>
                            {locataires?.map((item) => (
                                <option key={item.id} value={item.id}>{item.nom} {item.prenom}</option>
                            ))}
                        </select>
                        {selectedLocataire && <p className='error'>Choisissez un locataire</p>}
                        {location.locataire.nom !== "" &&
                            <div className=''>
                                <h2>Locataire choisi :</h2>
                                <div>
                                    <p><span className='gras'>Nom:</span> {location.locataire.nom}</p>
                                    <p><span className='gras'>Prenom:</span> {location.locataire.prenom}</p>
                                    <p><span className='gras'>Né le:</span> {location.locataire.dateNaissance}</p>
                                    <p><span className='gras'>Email:</span> {location.locataire.email}</p>
                                    <p><span className='gras'>Tel:</span> {location.locataire.telephone}</p>
                                </div>
                            </div>
                        }
                    </div>
                    <form action='submit' onSubmit={handleSubmit}>
                        {dateInvalid && <p className='error'>La location ne peut pas se terminer avant d'avoir commencée</p>}
                        <label htmlFor="dateDebut">Date de debut de location :</label>
                        <input onChange={handleChange} min={new Date().toISOString().slice(0, -14)} type="date" name='dateDebut' />
                        <label htmlFor="dateFin">Date de fin de location :</label>
                        <input onChange={handleChange} min={new Date().toISOString().slice(0, -14)} type="date" name='dateFin' />
                        <div>Prix total de la location : <span className='gras price'>{prix}€</span></div>
                        <button>Valider</button>
                    </form>
                </div>
            </div>
        </>
    )
}