import scmascript from './rules/scmascript.js';

export default {
    name:'TypeScript',
    value:'typescript',
    groups:[{
        type:'typescript',
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
            {
                type:'keyword',
                match:/(?<=\W)(type|any|private|protected|abstract|never|readonly)(?=\W)/g,
            },
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
