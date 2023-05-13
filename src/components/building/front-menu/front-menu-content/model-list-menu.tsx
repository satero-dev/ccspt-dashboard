import { useAppContext } from "../../../../middleware/context-provider";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Clear"

import "./front-menu-content.css";

type Props = {
    children?: React.ReactNode;
};

export const ModelListMenu = ({ children }: Props) => {

    const [{ building, user }, dispatch] = useAppContext();

    if (!building || !user) {
        throw new Error("Error: no se encuentra el usuario o el edificio!")
    }

    return <div>
        {building?.models.length ? (
            building.models.map((model =>
                <div className="list-item" key={model.id}>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                    <span className="margin-left">{model.name}</span>
                </div>
            ))
        ) : (
            <p>Este edificio no tiene modelos asociados</p>
        )}

        <div className="list-item">
            <Button>Upload model</Button>
        </div>
    </div>


};