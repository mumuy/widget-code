import scmascript from './rules/scmascript.js';

export default {
    name:'Javascript',
    value:'javascript',
    groups:[{
        type:'javascript',
        match:/[\s\S]+/g,
        default:true,
        rules:[
            ...scmascript.comment,
            ...scmascript.string,
            ...scmascript.parameter,
            ...scmascript.regex,
            ...scmascript.literal,
            ...scmascript.keyword,
            ...scmascript.buildin,
            ...scmascript.variable,
            {
                type:'variable',
                match:/(^|(?<=\W))(window|document)(?=\.)/g
            },
            ...scmascript.number,
            ...scmascript.operator,
            ...scmascript.punctuation,
            ...scmascript.function,
            ...scmascript.class,
            ...scmascript.property,
        ]
    }]
};
