import { Card, TextField, Autocomplete, Box, IconButton } from "@mui/material"
import { useAppContext } from "../../middleware/context-provider";
import "./search-menu.css"
import { LngLat } from "../../types";


export const SearchMenu = ({ datos }: any) => {

    const dispatch = useAppContext()[1];

    const handleChange = (event: React.SyntheticEvent, value: any) => {
        const coordenadas: LngLat = { lat: value.lat, lng: value.lng };
        dispatch({ type: "GOTO_ASSET", payload: coordenadas });
    }

    return (
        <div className="search-menu">
            <Autocomplete

                isOptionEqualToValue={(option, value) => option.id === value.id}
                disablePortal
                id="country-select-demo"
                options={datos || []}
                autoHighlight
                blurOnSelect
                onChange={(e, datos) => handleChange(e, datos)}
                getOptionLabel={(datos) => datos?.id || ''}


                renderOption={(props: object, data: any) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`./${data.tipo}.png`}
                            alt=""
                        />
                        {data.id}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField sx={{ width: 400 }}
                        {...params}
                        label="Buscar"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />
        </div>
    );
};