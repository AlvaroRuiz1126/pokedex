const API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=25/';

export const pokeapi = async (url = '') => {

    if (url.length > 10) {
        const resp = await fetch(url);
        const results = await resp.json();
        //console.log(results);
        return results;
    }

    const resp = await fetch(API_URL);
    const { results, next } = await resp.json();
    //console.log(results, next);
    return { results, next };
};

export const pokeapiSearch = async (name) => {
    const apiSearch = `https://pokeapi.co/api/v2/pokemon/${name}/`;
    const resp = await fetch(apiSearch);
    const results = await resp.json();
    //console.log(results);
    return results;
}; 