import Box from '@mui/material/Box';
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {SearchBarProps} from "../util/types.ts";

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [term, setTerm] = useState('')

    return (
        <Box
            sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            component="form"
             noValidate autoComplete="off"
        >
            <TextField
                sx={{
                    width: '15%',
                    minWidth: '200px',
                    background: 'white',
            }}
                id="search"
                label='Search for your favorite Song'
                variant="filled"
                color='secondary'
                value={term}
                onChange={e => setTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onSearch(term))}
            />
            <Button
                sx={{marginTop: '10px'}}
                variant="contained"
                color='secondary'
                onClick={() => onSearch(term)}
            >Search</Button>
        </Box>
    )
}

