import html from './html.js';

export default {
    name:'PHP',
    value:'php',
    groups:[{
        type:'php',
        match:/<\?php\s[\s\S]+?\?>/g,
        default: false,
        rules:[{
            type:'tag',
            match:/<\?php|\?>$/g
        },{
            type:'comment',
            match:/\/\*[^\/]*\*\/|\/\/.+\n?/g
        },{
            type:'string',
            match:/\".+?\"|\'.+?\'/g,
            rules:[{
                type:'variable',
                match:/{\$.+}/g
            }]
        },{
            type:'literal',
            match:/(?<=\W)true|false|null|undefined(?=\W)/g
        },{
            type:'keyword',
            match:/(?<=\W)(abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|iterable|object|mixed|never|resource|numeric)(?=\W)/g,        
        },{
            type:'variable',
            match:/(?<=\W)\$\w+?(?=\W)/g
        },{
            type:'operator',
            match:/[\+\-\*\/%=<>]/g
        },{
            type:'punctuation',
            match:/[\(\)\{\}\[\]\.;,:#]/g
        },{
            type:'number',
            match:/\-?\d+e?(_\d+)*(\.\d)?(_\d+)*/g
        },{
            type:'function',
            match:/(?<=[^\w])[\w$]+?(?=\()/g
        }]
    },...html.groups]
};
