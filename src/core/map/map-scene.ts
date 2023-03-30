import * as THREE from "three";
import * as OBC from "openbim-components";
import * as MAPBOX from "mapbox-gl";
import { GisParameters } from "../../types";


export class MapScene {
    private components = new OBC.Components();
    private readonly style = "mapbox://styles/mapbox/streets-v12";
    private map: MAPBOX.Map;


    constructor(container: HTMLDivElement) {
        const config = this.getConfig(container);
        this.map = this.createMap(config);
        this.initializeComponent(config);
        this.createScene();
    }

    dispose() {
        this.components.dispose();
        (this.map as any) = null;
        (this.components as any) = null;

    }


    private initializeComponent(config: GisParameters) {
        this.components.scene = new OBC.SimpleScene(this.components);
        this.components.camera = new OBC.MapboxCamera();
        this.components.renderer = this.createRenderer(config);
        this.components.init();
    }

    private getCoordinates(config: GisParameters) {
        const merc = MAPBOX.MercatorCoordinate;
        return merc.fromLngLat(config.center, 0);
    }

    private createRenderer(config: GisParameters) {
        const coords = this.getCoordinates(config);
        return new OBC.MapboxRenderer(this.components, this.map, coords);
    }

    private createMap(config: GisParameters) {
        const map = new MAPBOX.Map({
            ...config,
            style: this.style,
            antialias: true,
        });

        map.addControl(
            new MAPBOX.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
                // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true,
                showAccuracyCircle: false,
            })
        );

        return map;
    }

    private createScene() {
        const scene = this.components.scene.get();
        scene.background = null;
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        scene.add(directionalLight);
        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        scene.add(directionalLight2);
    }

    private getConfig(container: HTMLDivElement) {
        const center = [2.112, 41.556] as [number, number];
        let token = process.env.REACT_APP_MAPBOX_KEY;
        //let token = "pk.eyJ1Ijoic2F0ZXJvIiwiYSI6ImNsZXk5Zzl5YjJpdG8zenAxOHp3bmJ1c2oifQ.f_vSjnzZ4IzwP1HjGWOemQ";

        return {
            container,
            accessToken: token,
            zoom: 17,
            pitch: 50,
            bearing: -10,
            center,
            buildings: [],
        };
    }
}
