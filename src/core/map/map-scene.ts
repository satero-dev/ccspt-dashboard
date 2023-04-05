import * as THREE from "three";
import * as OBC from "openbim-components";
import * as MAPBOX from "mapbox-gl";
import { Building, GisParameters, LngLat, Asset } from "../../types";
import React, { useState } from "react";
import { User } from "firebase/auth";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import { MapDataBase } from "./map-database";

export let lnglat = [0, 0];

export class MapScene {

    private components = new OBC.Components();
    private readonly style = "mapbox://styles/mapbox/streets-v12";
    private map: MAPBOX.Map;
    private center: LngLat = { lat: 0, lng: 0 }; //Centro de la escena
    private clickedCoordinates: LngLat = { lat: 0, lng: 0 };
    private labels: { [id: string]: CSS2DObject } = {};
    private database = new MapDataBase();


    constructor(container: HTMLDivElement) {
        const config = this.getConfig(container);
        //const [isCreatingBuilding, setIsCreatingBuilding] = useState(false);
        this.map = this.createMap(config);
        this.initializeComponent(config);
        this.createScene();
    }

    dispose() {
        this.components.dispose();
        (this.map as any) = null;
        (this.components as any) = null;
        for (const id in this.labels) {
            const label = this.labels[id];
            label.removeFromParent();
            label.element.remove();
        }
        this.labels = {};

    }

    async getAllBuildings(user: User) {
        const buildings = await this.database.getBuildings(user);
        if (!this.components) return;
        this.addBuildingToScene(buildings);
        console.log("BUILDINGS: " + buildings[0].uid);
    }

    async getAllAssets(user: User) {

        console.log("ALL USERS");

        const assets = await this.database.getAssets(user);

        for (const asset of assets) {
            const { id } = asset;
            //console.log("assets: " + id);
        }

        if (!this.components) return;
        this.addAssetToScene(assets);
    }

    async updateData(data: string) {
        console.log("MAP-SCENE: " + data);
        return "cordiales";
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
            }), 'top-right'
        );

        map.on("contextmenu", this.storeMousePosition);

        //console.log(map.getCenter().lat);
        //this.setGeoLocation(map.getCenter().lng, map.getCenter().lat);
        return map;
    }



    /*//Añadimos edificio, esta opción solo ha de ser visible para el administrador en Escritorio
    async addAsset(user: User) {
        const { lat, lng } = this.clickedCoordinates;
        const userID = user.uid;
        const asset = { id: "", lat, lng };
        asset.id = await this.database.addAsset(asset);
        this.addUserLocation([asset]);
    }*/

    async addAsset(user: User) {

        //console.log("INTENTOLO")

        let longitud = 0;
        let latitud = 0;

        navigator.geolocation.getCurrentPosition(position => {

            longitud = position.coords.longitude;
            latitud = position.coords.latitude;
            this.datos(longitud, latitud);

        });

    }

    async datos(longitud: number, latitud: number) {

        const { lat, lng } = { lat: latitud, lng: longitud };
        const tipo = "Activo";
        const asset = { autoID: "", id: "Activo nuevo", lat, lng, tipo };
        asset.id = await this.database.addAsset(asset);

        this.addAssetToScene([asset]);


    }

    private addAssetToScene(assets: Asset[]) {
        for (const asset of assets) {
            //console.log("ADDUSERLOCATION");

            const { id, lng, lat } = asset;
            const htmlElement = this.createHTMLElement("🚩");
            const label = new CSS2DObject(htmlElement);

            //console.log("addUserLocation lng: " + lng);
            //console.log("addUserLocation lat: " + lat);

            const center = MAPBOX.MercatorCoordinate.fromLngLat(
                { ...this.center },
                0
            );

            const units = center.meterInMercatorCoordinateUnits();
            const model = MAPBOX.MercatorCoordinate.fromLngLat({ lng, lat }, 0);
            model.x /= units;
            model.y /= units;
            center.x /= units;
            center.y /= units;

            //console.log("ASSET center.x: " + center.x + " center.y: " + center.y);
            //console.log("ASSET model.x: " + model.x + " model.y: " + model.y);

            label.position.set(model.x - center.x, 0, model.y - center.y);

            //console.log("ASSET LABEL POSITION: " + label.position.x);

            this.components.scene.get().add(label);
            this.labels[id] = label;


        }

    }

    async gotoAsset(asset: Asset) {


        this.map.flyTo({
            center: [asset.lng, asset.lat],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    }

    //Añadimos edificio, esta opción solo ha de ser visible para el administrador en Escritorio
    async addBuilding(user: User) {
        const { lat, lng } = this.clickedCoordinates;
        const id = "Nombre";
        const tipo = "Edificio";
        const userID = user.uid;
        const building = { autoID: "", id, userID, lat, lng, uid: "", tipo };
        building.uid = await this.database.addBuilding(building);
        this.addBuildingToScene([building]);
    }


    private addBuildingToScene(buildings: Building[]) {
        for (const building of buildings) {

            const { uid, lng, lat } = building;
            const htmlElement = this.createHTMLElement("🏥");
            const label = new CSS2DObject(htmlElement);

            /*console.log("addToScene lng: " + lng);
            console.log("addToScene lat: " + lat);*/

            const center = MAPBOX.MercatorCoordinate.fromLngLat(
                { ...this.center },
                0
            );

            const units = center.meterInMercatorCoordinateUnits();
            const model = MAPBOX.MercatorCoordinate.fromLngLat({ lng, lat }, 0);
            model.x /= units;
            model.y /= units;
            center.x /= units;
            center.y /= units;

            //console.log("BUILDING center.x: " + center.x + " center.y: " + center.y);
            //console.log("BUILDING model.x: " + model.x + " model.y: " + model.y);

            label.position.set(model.x - center.x, 0, model.y - center.y);

            //console.log("BUILDING LABEL POSITION: " + label.position.x);

            this.components.scene.get().add(label);
            this.labels[uid] = label;

        }
    }

    private createHTMLElement(content: string) {

        //console.log("PONIENDO LA PICA");
        const div = document.createElement("div");
        div.textContent = content;
        div.classList.add("thumbnail");
        return div;
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

    //Capturamos la posición del mouse
    private storeMousePosition = (event: MAPBOX.MapMouseEvent) => {
        this.clickedCoordinates = { ...event.lngLat };
    }

    private getConfig(container: HTMLDivElement) {
        const center = [2.112, 41.556] as [number, number];
        this.center = { lng: center[0], lat: center[1] };
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
