import config from '../config'

const URL_VIDEOS = `${config.URL_BACKEND}/videos`;

function createVideo(videoObject) {
    
    return fetch(`${URL_VIDEOS}?_embed=videos`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(videoObject),
    })
        .then(async (response) => {   
            
            if(response.ok) {
                const data = await response.json();
                return data;
            }

            throw new Error("Não foi possível cadastrar os dados");
        });
}

export default {
    createVideo,
};