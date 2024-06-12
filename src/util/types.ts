export interface SearchResultProps {
    searchResults: object[];
    isRemoval: boolean;
    onRemove: (track: Track) => void;
    onAdd: (track: Track) => void;
}

export interface SearchBarProps {
    onSearch: (term: string) => void;
}

export interface TrackProps {
    track: Track;
    isRemoval: boolean;
    onAdd: (track: Track) => void;
    onRemove: (track: Track) => void;
}

export interface PlaylistProps {
    playlistName: string;
    playlistTracks: Track[];
    onRemove: (track: Track) => void;
    onNameChange: (name: string) => void;
    onSave: () => void;
    onAdd: (track: Track) => void;
}

export interface Track {
    id: string;
    name: string;
    artist: string;
    album: string;
    uri: string;
    preview_url: string;
}

