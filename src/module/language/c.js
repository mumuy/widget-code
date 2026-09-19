// C 规则（含预处理指令）
export default {
    name:'C',
    value:'c',
    groups:[{
        type:'c',
        match:/[\s\S]+/g,
        default:true,
        rules:[{
            type:'directive',   // 预处理指令（含 include 头文件）
            match:/^\s*#\s*(include|define|ifdef|ifndef|endif|else|elif|pragma|error|warning|undef|line)\b[^\n]*$/gm
        },{
            type:'comment',
            match:/\/\/[^\n]*|\/\*[\s\S]*?\*\//g
        },{
            type:'string',
            match:/"(?:\\.|[^"\\])*"/g
        },{
            type:'string',      // char
            match:/'(?:\\.|[^'\\])'/g
        },{
            type:'keyword',
            match:/(^|(?<=\W))(int|char|float|double|void|long|short|unsigned|signed|struct|union|enum|typedef|const|static|extern|volatile|register|auto|return|if|else|for|while|do|switch|case|default|break|continue|goto|sizeof|inline|restrict|_Bool|_Complex|_Atomic)(?=\W)/g
        },{
            type:'buildin',
            match:/(^|(?<=\W))(printf|scanf|malloc|calloc|realloc|free|memcpy|memset|strlen|strcpy|strcmp|strcat|fopen|fclose|fread|fwrite|fprintf|fscanf|sprintf|snprintf|exit|abort|assert|NULL|EOF|size_t|FILE)(?=\W)/g
        },{
            type:'class',       // struct / enum / union 名
            match:/(?<=(struct|enum|union)\s)[\w]+/g
        },{
            type:'function',    // 函数定义与调用
            match:/(?<=[^\w.])[\w$]+(?=\s*\()/g
        },{
            type:'number',
            match:/(?<=[\s=\(\[\],+\-*\/%<>])-?\d+(\.\d+)?[uUlLfF]*|0x[\da-fA-F]+[uUlL]*|0[bB][01]+[uUlL]*/g
        },{
            type:'operator',
            match:/==|!=|<=|>=|\+=|-=|\*=|\/=|%=|<<=|>>=|&&|\|\||\+\+|--|->|<<|>>|<|>|=|\+|-|\*|\/|%|!|&|\||\^|~|\?/g
        },{
            type:'punctuation',
            match:/[\(\)\{\}\[\];,.:]/g
        }]
    }]
};
