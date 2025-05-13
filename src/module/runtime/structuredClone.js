let structuredClone = structuredClone||function structuredClone(obj){
    return JSON.parse(JSON.stringify(obj));
};

export default structuredClone;