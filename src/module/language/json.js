// JSON 规则（键名 / 字符串 / 数字 / 字面量）
export default {
    name:'JSON',
    value:'json',
    groups:[{
        type:'json',
        match:/[\s\S]+/g,
        default:true,
        rules:[{
            type:'property',    // 键（冒号前的字符串）
            match:/"(?:\\.|[^"\\])*"(?=\s*:)/g
        },{
            type:'string',
            match:/"(?:\\.|[^"\\])*"/g
        },{
            type:'literal',
            match:/(^|(?<=\W))(true|false|null)(?=\W)/g
        },{
            type:'number',
            match:/-?\d+(\.\d+)?([eE][+-]?\d+)?/g
        },{
            type:'punctuation',
            match:/[{}[\],:]/g
        }]
    }]
};
