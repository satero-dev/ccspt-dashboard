import { Card, CardContent, IconButton } from "@mui/material";
import { FC } from "react";
import "./map-front-menu.css";
import CloseIcon from "@mui/icons-material/Close";
import { BuildingInfoMenu } from "./front-menu-content/building-info-menu";
import { CreateBuilding } from "./front-menu-content/create-building";
import { SearchAssetsMenu } from "./front-menu-content/search-assets";
/*import { PropertiesMenu } from "./front-menu-content/properties-menu";
import { FloorplanMenu } from "./front-menu-content/floorplan-menu";*/
import { FrontMenuMode } from "./types";

export const BuildingFrontMenu: FC<{
    mode: FrontMenuMode;
    open: boolean;
    onToggleMenu: (active: boolean) => void;
}> = ({ mode, open, onToggleMenu }) => {
    if (!open) {
        return <></>;
    }

    const content = new Map<FrontMenuMode, any>();
    /*content.set("BuildingInfo", <BuildingInfoMenu onToggleMenu={onToggleMenu} />);
    content.set("CreateBuilding", <CreateBuilding onToggleMenu={onToggleMenu} />);
    content.set("SearchAssets", <SearchAssetsMenu onToggleMenu={onToggleMenu} />);
    content.set("Properties", <PropertiesMenu />);
    content.set("Floorplans", <FloorplanMenu />);*/

    const titles = {
        BuildingInfo: "Building Information",
        SearchAssets: "Search Assets",
        CreateBuilding: "Crear Edificio",
        ModelList: "Model List",
        Properties: "Properties",
        Floorplans: "Floorplans",
    };

    console.log("MODE: " + mode);

    const title = titles[mode];

    return (

        <Card className="front-menu">
            <CardContent>
                <div className="front-menu-header">
                    <h2>{title}</h2>
                    <IconButton onClick={() => onToggleMenu(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="front-menu-content">{content.get(mode)}</div>
            </CardContent>
        </Card>
    );
};