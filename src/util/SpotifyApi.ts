let accessToken: string;

const clientID = "REDACTED";
const redirectUrl = "http://localhost:5173/";

const getAccessToken = ()  => {
    if(accessToken) {
        return accessToken;
    }
    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expireInURL = window.location.href.match(/expires_in=([^&]*)/);

    if(tokenInURL && expireInURL) {
        accessToken = tokenInURL[1];
        const expiresIn = Number(expireInURL[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState("Access token", "", "/");
        return accessToken;
    }

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
}

export const spotifySearch = async (term: string)  => {
    const accessToken = getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const jsonResponse = await response.json();

    if (!jsonResponse.tracks) {
        return [];
    }

    return jsonResponse.tracks.items.map((track: any) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        preview_url: track.preview_url
    }));
}

export const savedPlaylist = async (name: string, trackURIs: string[]) => {
    if(!name || !trackURIs.length) {
        return;
    }

    const accessToken = getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    const response = await fetch('https://api.spotify.com/v1/me', { headers });
    const jsonResponse = await response.json();
    const userID = jsonResponse.id;

    const response_1 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ name: name })
    });
    const jsonResponse_1 = await response_1.json();
    const playlistID = jsonResponse_1.id;

    const response_2 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ uris: trackURIs })
    });
    return await response_2.json();
}

export const getProfile = async () => {
    const accessToken = getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
    return await response.json()
}