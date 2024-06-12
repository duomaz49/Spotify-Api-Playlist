import styles from "./App.module.css";
import SearchBar from "./Components/SearchBar.tsx";
import {getProfile, savedPlaylist, spotifySearch} from "./util/SpotifyApi.ts";
import {useEffect, useState} from "react";
import SearchResults from "./Components/SearchResults.tsx";
import Box from "@mui/material/Box";
import {Container, Typography} from "@mui/material";
import Playlist from "./Components/Playlist.tsx";
import {Track} from "./util/types.ts";

export default function App() {
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [playlistName, setPlaylistName] = useState<string>('New Playlist');
    const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        getProfile()
            .then(profile => {
                const userName = profile?.display_name;
                setUserName(userName);
            })
            .catch(error => {
                console.error("Error fetching profile:", error);
            });
    }, []);

    const addTrack = (track: Track) => {
        const existingTracks = playlistTracks.find((trackToSearch) => trackToSearch?.id === track?.id);
        const newTrack = [track, ...playlistTracks]

        if (!existingTracks) {
            setPlaylistTracks(newTrack);
            setSearchResults(prevResults => prevResults.filter(result => result.id !== track.id));
        } else {
            alert('Track already exists in playlist');
        }
    }

    const removeTrack = (track: Track) => {
        const existingTracks = playlistTracks.filter((trackToSearch) => trackToSearch?.id !== track?.id);
        setPlaylistTracks(existingTracks);
        setSearchResults(prevResults => [track, ...prevResults]);
    }

    const updatePlayListName = (name: string) => {
        setPlaylistName(name);
    }

    const savePlaylist = () => {
        const trackURIs = playlistTracks.map(track => track?.uri);
        savedPlaylist(playlistName, trackURIs)
            .then(() => {
                setPlaylistName('New Playlist');
                setPlaylistTracks([]);
                alert('Playlist saved successfully!');
            })
            .catch(error => {
                console.error('Error saving playlist:', error);
                alert('There was an error saving the playlist.');
            });
    };

    const search = (term: string) => {
        spotifySearch(term).then(results =>
            setSearchResults(results)
        );
    }

    return (
        <Box className={styles.App}>
            <Typography variant="h1"
                        sx={{
                            p: 3,
                            color: '#f8e2e2',
                            textAlign: 'center',
                            fontSize: '2rem',
                            letterSpacing: '.2rem',
                        }}
            >
                Welcome {userName ? userName : 'to Spotify Playlist Maker'}
            </Typography>
            <SearchBar onSearch={search}/>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: ['center', 'flex-start'],
                    p: 5,
                    flexDirection: ['column-reverse', 'row'],
                }}
            >
                <Box sx={{
                    width: '40%',
                    minWidth: '300px',
                    maxHeight: '500px',
                    overflowY: 'scroll',
                    p: 1,
                    backgroundColor: 'rgba(1,12,63,.7)',
                    boxShadow: '0 0 10px 5px rgba(0,0,0,.5)',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    display: searchResults.length ? 'block' : 'none',
                }}>
                    {searchResults.length > 0 && (
                        <SearchResults searchResults={searchResults} onAdd={addTrack} onRemove={removeTrack} isRemoval/>
                    )}
                </Box>
                <Box sx={{
                    width: '40%',
                    minWidth: '300px',
                    maxHeight: '500px',
                    overflowY: 'scroll',
                    p: 1,
                    backgroundColor: 'rgba(1,12,63,.7)',
                    boxShadow: '0 0 10px 5px rgba(0,0,0,.5)',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    marginBottom: '30px'

                }}>
                    <Playlist
                        playlistTracks={playlistTracks}
                        onRemove={removeTrack}
                        onNameChange={updatePlayListName}
                        onSave={savePlaylist}
                        onAdd={addTrack}
                        playlistName={playlistName}/>
                </Box>
            </Container>
        </Box>
    )
}

