import Box from '@mui/material/Box';
import TrackList from "./TrackList.tsx";
import {PlaylistProps} from "../util/types.ts";
import {Button, TextField} from "@mui/material";
import {ChangeEvent} from "react";

export default function Playlist({playlistTracks, onRemove, onAdd, onSave, onNameChange}: PlaylistProps) {
    return (
        <>
            <Box
                sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}
                component="form"
                noValidate autoComplete="off"
            >
                <Box
                    sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-end', flexDirection: 'row'}}
                >
                    <TextField
                        sx={{
                            width: '60%',
                            "& .MuiInputBase-root": {
                                color: "#FFFFFF",
                                fontFamily: "Arial",
                                fontWeight: "bold",
                                borderBottom: "2px solid #FFFFFF",
                            },
                            "& .MuiFormLabel-root": {
                                color: "#FFFFFF",
                                fontWeight: "bold",
                            },
                        }}
                        id="search"
                        label='New Playlist'
                        variant="standard"
                        color='secondary'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => onNameChange(event.target.value)}
                    />
                    <Button
                        sx={{
                            width: '20%'}}
                        variant="contained"
                        color='secondary'
                        onClick={() => onSave()}
                    >Save
                    </Button>
                </Box>
                <TrackList
                    searchResults={playlistTracks}
                    onRemove={onRemove}
                    isRemoval={true}
                    onAdd={onAdd}
                />
            </Box>
        </>

    );
}

