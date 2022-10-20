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

    const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(isDatesCorrect()) {
            changeDisponibility();
            addLocation(location);
        } else {
            setDateInvalid(true);
        }
    }

    const addLocation = (newLocation : LocationModel) => {
        locationService.addLocation(newLocation);
    }

    const changeDisponibility = () => {
        vehicule.disponible = false;
        vehiculesService.patchVehicule(vehicule);
    }

    const isDatesCorrect = () : boolean => {
        return location.dateFin.getTime() > location.dateDebut.getTime()
    }

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
            {vehicule && 
                <div>
                    <figure className='voiture-location'>
                        <img src={voitureImg} alt="voiture-image" />
                    </figure>
                    <h2>{vehicule.marque}</h2>
                    <h3>{vehicule.modele}</h3>
                    <h3>{vehicule.prix}€ / jour</h3>
                </div>
            }
            <select onChange={handleSelect}>
                <option value="">Veuillez choisir un locataire</option>
                {locataires?.map((item) => (
                    <option key={item.id} value={item.id}>{item.nom} {item.prenom}</option>
                ))}
            </select>
            {location.locataire.nom !== "" &&
                <div>
                    <h2>Locataire choisi :</h2>
                    <div>
                        <p>{location.locataire.nom}</p>
                        <p>{location.locataire.prenom}</p>
                        <p>{location.locataire.dateNaissance}</p>
                        <p>{location.locataire.email}</p>
                        <p>{location.locataire.telephone}</p>
                    </div>
                </div>
            }
            {dateInvalid && <h2>La location ne peut se terminer avant d'avoir commencée</h2>}
            <form action='submit' onSubmit={handleSubmit}>
                <label htmlFor="dateDebut">Date de debut de location</label>
                <input onChange={handleChange} min={new Date().toISOString().slice(0, -14)} type="date" name='dateDebut' />
                <label htmlFor="dateFin">Date de fin de location</label>
                <input onChange={handleChange} min={new Date().toISOString().slice(0, -14)} type="date" name='dateFin' />
                <div>Prix total de la location : {prix}€</div>
                <button>Valider</button>
            </form>
        </>
    )
}