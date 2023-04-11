import { Card, TextField, Autocomplete, Box, IconButton, createFilterOptions } from "@mui/material"
import { useAppContext } from "../../middleware/context-provider";
import "./search-menu.css"
import { Asset, LngLat } from "../../types";


export const SearchMenu = ({ datos }: any) => {

    const dispatch = useAppContext()[1];

    const handleChange = (event: React.SyntheticEvent, value: any) => {
        const coordenadas: LngLat = { lat: value.lat, lng: value.lng };
        dispatch({ type: "GOTO_ASSET", payload: coordenadas });
    }

    /*const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option: any) => option.id,
    });*/

    const filterOptions = (datos: any, state: { inputValue: string }) => {
        const filteredOptions = datos.filter((data: any) => {

            //console.log("datos: " + datos);
            const optionLabel = data.id.toLowerCase() + data.autoID.toLowerCase();
            const removeAccentsOL = optionLabel.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            //console.log("optionLabel: " + optionLabel);
            const inputText = state.inputValue.toLowerCase();
            const removeAccentsIT = inputText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            //console.log("inputText: " + inputText);
            const inputTerms = removeAccentsIT.split(" ");
            //console.log("inputTerms: " + inputTerms);
            /*return true;*/
            return inputTerms.every((term) => removeAccentsOL.includes(term));
        });

        return filteredOptions;
    };

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
                filterOptions={filterOptions}
                autoHighlight
                blurOnSelect
                onChange={(e, datos) => handleChange(e, datos)}
                getOptionLabel={(data) => data?.id || ''}

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
                        <div className="options">{data.id}
                            <div className="sub-options">{data.autoID}</div>
                        </div>

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