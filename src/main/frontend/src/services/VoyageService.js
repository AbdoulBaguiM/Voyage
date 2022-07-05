import axios from "axios";
const listeHotelsUrl=`${process.env.API_BASE_URL}/hotels`;
const listeChambresUrl=`${process.env.API_BASE_URL}/chambres`;
const listeAppartsUrl=`${process.env.API_BASE_URL}/appartements`;
const listeLogementsUrl=`${process.env.API_BASE_URL}/logements`;
const listeVillesUrl=`${process.env.API_BASE_URL}/villes`;
const listeVillasUrl=`${process.env.API_BASE_URL}/villas`;
const listeNaturesUrl=`${process.env.API_BASE_URL}/natures`;
const listeMonumentsUrl=`${process.env.API_BASE_URL}/monuments`;

const getHotelsList = () => {
    return (axios.get(listeHotelsUrl));
}

const getChambresList = () => {
    return (axios.get(listeChambresUrl));
}

const getAppartsList = () => {
    return (axios.get(listeAppartsUrl));
}

const getLogementsList = () => {
    return (axios.get(listeLogementsUrl));
}

const getVillesList = () => {
    return (axios.get(listeVillesUrl));
}

const getVillasList = () => {
    return (axios.get(listeVillasUrl));
}

const getNaturesList = () => {
    return (axios.get(listeNaturesUrl));
}

const getMonumentsList = () => {
    return (axios.get(listeMonumentsUrl));
}

const VoyageService = {
    getHotelsList,
    getChambresList,
    getAppartsList,
    getLogementsList,
    getVillesList,
    getVillasList,
    getNaturesList,
    getMonumentsList,
};

export default VoyageService;