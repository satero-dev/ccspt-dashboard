export interface GisParameters {
  container: HTMLDivElement;
  accessToken: any;
  zoom: number;
  pitch: number;
  center: [number, number];
  bearing: number;
  buildings: GisBuilding[];
}

export interface GisBuilding {
  uid: string;
  userID: string;
  lat: number;
  lng: number;
  htmlElement: HTMLElement;
}
