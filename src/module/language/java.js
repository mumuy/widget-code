// Java 规则（含注解 / 文本块）
export default {
    name:'Java',
    value:'java',
    groups:[{
        type:'java',
        match:/[\s\S]+/g,
        default:true,
        rules:[{
            type:'comment',
            match:/\/\/[^\n]*|\/\*[\s\S]*?\*\//g
        },{
            type:'meta',        // 注解 @Override
            match:/@[\w.]+/g
        },{
            type:'string',      // 文本块优先
            match:/"""[\s\S]*?"""/g
        },{
            type:'string',
            match:/"(?:\\.|[^"\\])*"/g
        },{
            type:'string',      // char
            match:/'(?:\\.|[^'\\])'/g
        },{
            type:'keyword',
            match:/(^|(?<=\W))(public|private|protected|class|interface|enum|extends|implements|import|package|new|return|if|else|for|while|do|switch|case|default|break|continue|void|static|final|abstract|synchronized|volatile|transient|native|throws|throw|try|catch|finally|this|super|instanceof|null|true|false|var|record|sealed|permits|yield|assert)(?=\W)/g
        },{
            type:'buildin',
            match:/(^|(?<=\W))(String|Integer|Long|Double|Float|Boolean|Character|Byte|Short|Object|System|Math|Arrays|List|Map|Set|Collection|ArrayList|HashMap|HashSet|LinkedHashMap|Optional|StringBuilder|StringBuffer|Thread|Runnable|Exception|RuntimeException|Error|Class|Enum|Iterable|Comparator|Stream|IntStream|Function|Consumer|Supplier|Predicate)(?=\W)/g
        },{
            type:'class',       // class / interface / enum 名
            match:/(?<=(class|interface|enum)\s)[\w$]+/g
        },{
            type:'function',    // 方法定义与调用
            match:/(?<=[^\w.])[\w$]+(?=\s*\()/g
        },{
            type:'property',    // 字段 / 常量访问 obj.field
            match:/(?<=\.)[\w$]+(?!\()/g
        },{
            type:'number',
            match:/(?<=[\s=\(\[\],+\-*\/%<>])0x[\da-fA-F]+[lL]?|\d+(\.\d+)?[fFdDlL]?(?=[\s;,\)\]+\-*\/%<>]|$)/g
        },{
            type:'operator',
            match:/==|!=|<=|>=|\+=|-=|\*=|\/=|%=|<<=|>>=|>>>=|&&|\|\||\+\+|--|->|::|<<|>>|<|>|=|\+|-|\*|\/|%|!|&|\||\^|~/g
        },{
            type:'punctuation',
            match:/[\(\)\{\}\[\];,.:]/g
        }]
    }]
};
