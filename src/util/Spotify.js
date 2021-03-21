
const CLIENT_ID = "d78f0268d75c4e1dbf1078db42bdc848"
const REDIRECT_URI = "http://plator.surge.sh"
const url = "https://api.spotify.com/v1/search?type=track"
let accessToken;
let expiresIn;
    
const Spotify = {

    getAccessToken() {
        if (accessToken) return accessToken;
        var accessToken_match = window.location.href.match(/access_token=([^&]*)/)
        var expiresIn_match = window.location.href.match(/expires_in=([^&]*)/)

        if(accessToken_match && expiresIn_match) {
            
            expiresIn = Number(expiresIn_match[1]);
            accessToken = accessToken_match[1]
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}/&scope=playlist-modify-public`   
        }

        

    },
    async search(searchTerm) {
        let urlToFetch = `${url}&q=${searchTerm}`
        let credentials = { headers: {Authorization: `Bearer ${accessToken}`}}
        try {
            let response = await fetch(urlToFetch, credentials)
            if (response.ok) {
                let responseJson = await response.json()
                return responseJson.tracks.items.map(item => {
                    return { 
                        id: item.id,
                        album: item.album.name,
                        name: item.name,
                        artist: item.artists[0].name,
                        uri: item.uri
                    }
                })
            }
        } catch(error) {
            console.log(error)
        }
    },
    async savePlaylist(playlistName, trackURIs) {
        if(!playlistName || !trackURIs) return;
        let headers = { 
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
        var user_id;
        var playlist_id;
        try {
            let getUserID = await fetch("https://api.spotify.com/v1/me", {headers: headers})

            if (getUserID.ok) {
                let responseJson = await getUserID.json()
                user_id = responseJson.id
            }

            let getPlaylistID = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({
                    name: playlistName,
                    description: "Created by Jammming"
                })
            
            })
            if (getPlaylistID.ok) {
                let responseJson = await getPlaylistID.json()
                playlist_id = responseJson.id
            }
            let addTracksToPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({
                    uris: trackURIs
                })
            })
            if (addTracksToPlaylist.ok) {
                let responseJson = addTracksToPlaylist.json()
                return responseJson
            }

        } catch(err) {
            console.log(err)
        }
            




    }
}

export default Spotify;