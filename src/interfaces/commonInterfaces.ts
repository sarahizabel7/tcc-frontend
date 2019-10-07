export enum District {
  Itacorubi = "Itacorubi",
  Centro = "Centro",
  Trindade = "Trindade",
  SantaMonica = "Santa Monica",
  Corrego = "Corrego Grande"
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum ChargingMethods {
  PerHour = "perHour",
  CloseService = "closeService"
}

export enum Grade {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5
}

export interface RegisterInterface {
  name: string;
  lastname: string;
  password: string;
  email: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface ProviderInterface {
  cpf: string;
  gender: Gender;
  phone: string;
}

export interface Service {
  name: string;
  description: string;
}

export interface ProvidedService {
  service: Service;
  price?: number;
  estimate: boolean;
  charging_method?: ChargingMethods;
}

export interface Rating {
  userId: string;
  grade: Grade;
  comment: string;
}
