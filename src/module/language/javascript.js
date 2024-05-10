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
            ...scmascript.literal,
            ...scmascript.regex,
            {
                type:'variable',
                match:/(?<=\W)window|document(?=\.)/g
            },
            ...scmascript.variable,
            ...scmascript.keyword,
            ...scmascript.buildin,
            ...scmascript.operator,
            ...scmascript.punctuation,
            ...scmascript.number,
            ...scmascript.class,
            ...scmascript.property,
            ...scmascript.function,
            ...scmascript.parameter,
        ]
    }]
};
