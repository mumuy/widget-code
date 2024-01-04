export default {
    name:'Text',
    value:'text',
    groups:[{
        type:'text',
        match:/[\s\S]+/g,
        default:true,
        rules:[]
    }]
};