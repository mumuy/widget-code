// Python 规则（含 f-string / 三引号 / 装饰器）
export default {
    name:'Python',
    value:'python',
    groups:[{
        type:'python',
        match:/[\s\S]+/g,
        default:true,
        rules:[{
            type:'comment',
            match:/#[^\n]*/g
        },{
            type:'string',      // 三引号（可多行）
            match:/[rRbBuUfF]{0,2}("""[\s\S]*?"""|'''[\s\S]*?''')/g
        },{
            type:'string',      // 普通 / f / r / b 字符串
            match:/[rRbBuUfF]{0,2}"(?:\\.|[^"\\])*"|[rRbBuUfF]{0,2}'(?:\\.|[^'\\])*'/g,
            rules:[{
                type:'variable',// f-string 内插值 {expr}
                match:/\{[^}]+\}/g
            }]
        },{
            type:'keyword',
            match:/(^|(?<=\W))(def|class|if|elif|else|for|while|return|import|from|as|with|try|except|finally|raise|lambda|yield|global|nonlocal|pass|break|continue|in|is|not|and|or|del|assert|async|await|match|case)(?=\W)/g
        },{
            type:'literal',
            match:/(^|(?<=\W))(True|False|None)(?=\W)/g
        },{
            type:'buildin',
            match:/(^|(?<=\W))(print|len|range|type|str|int|float|bool|list|dict|set|tuple|open|input|isinstance|id|map|filter|zip|enumerate|sorted|reversed|sum|min|max|abs|round|repr|object|super|staticmethod|classmethod|property|hasattr|getattr|setattr|delattr|callable|iter|next|format|vars|dir|help)(?=\W)/g
        },{
            type:'meta',        // 装饰器 @decorator
            match:/(^|(?<=\s))@[\w.]+/g
        },{
            type:'class',       // class 名
            match:/(?<=class\s)[A-Za-z_]\w*/g
        },{
            type:'function',    // def 函数名 / 函数调用
            match:/(?<=def\s)[A-Za-z_]\w*|(?<=[^\w.])[A-Za-z_]\w*(?=\()/g
        },{
            type:'property',    // 对象属性访问 obj.attr
            match:/(?<=\.)[A-Za-z_]\w*/g
        },{
            type:'number',
            match:/(?<=[\s=\(\[\],+\-*\/%])-?\d+(\.\d+)?([eE][+-]?\d+)?[jJ]?|0x[\da-fA-F]+|0b[01]+|0o[0-7]+/g
        },{
            type:'operator',
            match:/==|!=|<=|>=|\+=|-=|\*=|\/=|\/\/=|%=|\*\*=|&=|\|=|\^=|<<=|>>=|:=|->|\*\*|\/\/|<<|>>|<|>|=|\+|-|\*|\/|%|&|\||\^|~|@/g
        },{
            type:'punctuation',
            match:/[\(\)\[\]\{\},:;.]/g
        }]
    }]
};
