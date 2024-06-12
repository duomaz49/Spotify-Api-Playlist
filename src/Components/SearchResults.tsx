import TrackList from "./TrackList.tsx";
import { SearchResultProps } from "../util/types.ts";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";


export default function SearchResults({searchResults, onAdd, onRemove}: SearchResultProps) {
    return (
        <Box
            sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column'}}
        >
            <Typography
                sx={{color: 'white', fontSize: '20px', fontWeight: 'bold', alignSelf: 'baseline', marginLeft: '40px', marginBottom: '10px'}}
            >Results</Typography>
            <TrackList
                searchResults={searchResults}
                isRemoval={false}
                onAdd={onAdd}
                onRemove={onRemove}
            />
        </Box>
    )
}

