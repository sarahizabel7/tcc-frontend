import { ProvidedService, District, Rating } from "../interfaces/commonInterfaces";

class Provider {
    provided_services: ProvidedService[];
    atendency_region: District[];
    rating: Rating[];
    gallery: any[];

    constructor(provided_services?: ProvidedService[], atendency_region?: District[], rating?: Rating[], gallery?: any[]) {
        this.provided_services = provided_services || [];
        this.atendency_region = atendency_region || [] ;
        this.rating = rating || [];
        this.gallery = gallery || [];
    }
}

export default Provider