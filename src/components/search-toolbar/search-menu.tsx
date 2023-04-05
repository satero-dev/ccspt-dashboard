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
            <Autocomplete sx={{
                background: "#FFF",
                width: 250,
            }}

                isOptionEqualToValue={(option, value) => option.id === value.id}
                disablePortal
                id="fly-to-asset"
                options={datos || []}
                autoHighlight
                blurOnSelect
                onChange={(e, datos) => handleChange(e, datos)}
                getOptionLabel={(datos) => datos?.id || ''}


                renderOption={(props: object, data: any) => (
                    <Box component="li"
                        {...props}
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }} >
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
                    <TextField
                        {...params}
                        sx={{
                            '& .MuiAutocomplete-input, & .MuiInputLabel-root': {
                                fontSize: 14,
                                height: 16,
                                margin: 0,
                            }
                        }}
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