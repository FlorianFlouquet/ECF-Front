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
        renter: {firstname: "", surname: "", birthDate: "", phoneNumber: 0, email: "", id: 0},
        vehicle: {
            brand: "Peugeot",
            model: "207",
            state: "Tres bien",
            price: 250,
            licenseNumber: "AXF-12F-45F",
            type: "citadine",
            id: 0,
            available: true
        },
        dateStart: new Date(),
        dateEnd: new Date(),
        totalPrice: 0,
        id: 0
    });

    const [dateInvalid, setDateInvalid] = useState(false);
    const [selectedLocataire, setSelectedLocataire] = useState(false);

    // useEffects 

    useEffect(() => {
        getAllLocataire();
        setLocation(prevState => (
            {...prevState, vehicle: vehicule}
        ))
    }, [])

    useEffect(() => {
        calculerPrix();
    }, [location.dateStart, location.dateEnd])

    useEffect(() => {
        setLocation(prevState => (
            {...prevState, totalPrice : prix}
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
                {...prevState, locataire : {firstname: "", surname: "", birthDate: "", phoneNumber: 0, email: "", id: 0}}
            ));
        } 
    }

    /**
     * Calcule le prix total de la location en fonction de la durée de la location
     * @param event 
     */
    const calculerPrix = () => {
        const timeDiffInMilli = (location.dateEnd.getTime() - location.dateStart.getTime());
        const timeDiffInDays = timeDiffInMilli / (1000*60*60*24);
        const prix = timeDiffInDays * vehicule.price;
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
        vehicule.available = false;
        vehiculesService.patchVehicule(vehicule);
    }

    /**
     * Verifie que la date de debut est anterieur à la date de fin
     * @returns 
     */
    const isDatesCorrect = () : boolean => {
        return location.dateEnd.getTime() > location.dateStart.getTime()
    }

    const hasSelectedLocataire = () : boolean => {
        return location.renter.firstname !== "";
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
                            <h2>{vehicule.brand}</h2>
                            <h3>{vehicule.model}</h3>
                            <h4>{vehicule.price}€ / jour</h4>
                        </div>
                    </div>
                }
                <span className='trait'></span>
                <div className='form-louer'>
                    <div className='choix-locataire'>
                        <select onChange={handleSelect}>
                            <option value="">Veuillez choisir un locataire</option>
                            {locataires?.map((item) => (
                                <option key={item.id} value={item.id}>{item.firstname} {item.surname}</option>
                            ))}
                        </select>
                        {selectedLocataire && <p className='error'>Choisissez un locataire</p>}
                        {location.renter.firstname !== "" &&
                            <div className=''>
                                <h2>Locataire choisi :</h2>
                                <div>
                                    <p><span className='gras'>Nom:</span> {location.renter.firstname}</p>
                                    <p><span className='gras'>Prenom:</span> {location.renter.surname}</p>
                                    <p><span className='gras'>Né le:</span> {location.renter.birthDate}</p>
                                    <p><span className='gras'>Email:</span> {location.renter.email}</p>
                                    <p><span className='gras'>Tel:</span> {location.renter.phoneNumber}</p>
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