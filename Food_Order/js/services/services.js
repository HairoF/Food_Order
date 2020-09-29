const postData = async (url,data) => {
    const result = await fetch(url, { //this is Promise
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data       
    });
    
    return await result.json();
};

const getResours = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Couldn't fetch ${url}, with status: ${result.status}`);
    }
    
    return await result.json();
};

export {postData};
export {getResours};