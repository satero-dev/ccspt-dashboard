import { Card, CardContent, IconButton } from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { BuildingInfoMenu } from "./front-menu-content/building-info-menu";
import { CreateBuilding } from "./front-menu-content/create-building";
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
    content.set("BuildingInfo", <BuildingInfoMenu onToggleMenu={onToggleMenu} />);
    content.set("CreateBuilding", <CreateBuilding onToggleMenu={onToggleMenu} />);
    /*content.set("Properties", <PropertiesMenu />);
    content.set("Floorplans", <FloorplanMenu />);*/

    const titles = {
        BuildingInfo: "Building Information",
        CreateBuilding: "Create Building",
        ModelList: "Model List",
        Properties: "Properties",
        Floorplans: "Floorplans",
    };

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