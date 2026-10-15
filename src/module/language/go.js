// Go 规则（含原始字符串 / rune / 切片语法）
export default {
    name:'Go',
    value:'go',
    groups:[{
        type:'go',
        match:/[\s\S]+/g,
        default:true,
        rules:[{
            type:'comment',
            match:/\/\/[^\n]*|\/\*[\s\S]*?\*\//g
        },{
            type:'string',      // 反引号原始字符串
            match:/`[^`]*`/g
        },{
            type:'string',
            match:/"(?:\\.|[^"\\])*"/g
        },{
            type:'string',      // rune
            match:/'(?:\\.|[^'\\])'/g
        },{
            type:'keyword',
            match:/(^|(?<=\W))(package|import|func|var|const|type|struct|interface|map|chan|go|defer|return|if|else|for|range|switch|case|default|break|continue|fallthrough|select|goto|nil|true|false|iota)(?=\W)/g
        },{
            type:'buildin',
            match:/(^|(?<=\W))(len|cap|append|copy|make|new|panic|recover|print|println|printf|error|string|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|uintptr|float32|float64|bool|byte|rune|complex64|complex128|any|comparable)(?=\W)/g
        },{
            type:'class',       // type 定义名
            match:/(?<=type\s)[\w]+/g
        },{
            type:'function',    // 函数定义与调用
            match:/(?<=[^\w.])[\w]+(?=\s*\()/g
        },{
            type:'property',    // 字段访问 obj.field
            match:/(?<=\.)[\w]+/g
        },{
            type:'number',
            match:/(?<=[\s=\(\[\],+\-*\/%<>])-?\d+(\.\d+)?[i]?|0x[\da-fA-F]+|0b[01]+|0o[0-7]+/g
        },{
            type:'operator',
            match:/==|!=|<=|>=|\+=|-=|\*=|\/=|%=|&&|\|\||\+\+|--|:=|<<|>>|<|>|=|\+|-|\*|\/|%|!|&|\||\^|~|<-/g
        },{
            type:'punctuation',
            match:/[\(\)\{\}\[\];,.:]/g
        }]
    }]
};
