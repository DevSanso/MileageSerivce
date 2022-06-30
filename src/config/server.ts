

export const port = (()=> {
    const echo = process.env.SERVER_PORT != undefined ? process.env.SERVER_PORT : "3000";
    const p = parseInt(echo);
    if(isNaN(p))return 3000;
    return p;
})(); 