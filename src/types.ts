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
