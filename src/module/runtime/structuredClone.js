let clone;
if(typeof structuredClone !== 'undefined'){
    clone =  structuredClone;
}else{
    clone = function(obj){
        return JSON.parse(JSON.stringify(obj));
    };
}

export default clone;