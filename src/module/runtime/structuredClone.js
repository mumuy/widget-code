let structuredClone = structuredClone||function(obj){
    return JSON.parse(JSON.stringify(obj));
}; 

export default structuredClone;