 export const getData = async url => {
    let response;
    try {
        response = await fetch(url);
    } catch (ex) {
        console.log(ex)
    }
    const data = await response.json();
    return data;
}