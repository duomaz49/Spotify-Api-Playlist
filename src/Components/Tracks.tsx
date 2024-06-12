import {Button, Card, Typography} from "@mui/material";
import {TrackProps} from "../util/types.ts";

export default function Tracks({onAdd, onRemove, isRemoval, track}: TrackProps) {
    console.log(track)
    return (
        <Card
            sx={{
                m: 1,
                p: 1,
                width: '70%',
                minWidth: '300px',
                bgcolor: 'rgba(128, 128, 128, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignSelf: 'center',
            }}
            key={track?.id}>
            <Typography
            sx={{
                m: 0.5,
                color: '#ffffff'
            }}
            >Song: {track?.name}</Typography>
            <Typography
                sx={{
                    m: 0.5,
                    color: '#ffffff'
                }}
            >Artist: {track?.artist} </Typography>
            <Typography
                sx={{
                    m: 0.5,
                    color: '#ffffff'
                }}
            >Album: {track?.album} </Typography>
            {isRemoval &&
                    <audio controls>
                        <source src={track?.preview_url} type="audio/mpeg" />
                    </audio>
            }
            {isRemoval ?
                <Button
                    sx={{marginTop: '10px'}}
                    variant="contained"
                    color='secondary'
                    onClick={() => onRemove(track)}
                >Remove</Button>
                :
                <Button
                    sx={{marginTop: '10px'}}

                    variant="contained"
                    color='secondary'
                    onClick={() => onAdd(track)}
                >Add</Button>
            }
        </Card>
    )
}

