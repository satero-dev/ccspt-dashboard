export interface GisParameters {
  container: HTMLDivElement;
  accessToken: any;
  zoom: number;
  pitch: number;
  center: [number, number];
  bearing: number;
  buildings: Building[];
}

export interface Building {
  autoID: string;
  name: string;
  uid: string;
  userID: string;
  lat: number;
  lng: number;
  tipo: string;
  models: Model[];  //Un edificio puede tener varios modelos asociados
}

//Modelo 3D
export interface Model {
  name: string;   //Nombre del modelo
  id: string;     //Identificador único
}

export interface Asset {
  autoID: string;
  id: string;
  lat: number;
  lng: number;
  tipo: string;
}

export interface LngLat {
  lng: number;
  lat: number;
}

export interface Tool {
  name: string;
  active: boolean;
  icon: any;
  action: (...args: any) => void;
}

export interface Floorplan {
  name: string;
  id: string;
}

export interface Property {
  name: string;
  value: string;
}

