// Shell / Bash / Dash 通用规则（POSIX 子集 + bash 扩展）
export default {
    name:'Shell',
    value:'shell',
    groups:[{
        type:'shell',
        match:/[\s\S]+/g,
        default:true,
        rules:[{
            type:'shell',       // shebang 行（须在注释前，避免被 # 注释规则吃掉）
            match:/#![^\n]*/g
        },{
            type:'comment',
            match:/(^|(?<=\s))#[^\n]*/g
        },{
            type:'string',      // 双引号：内部变量可展开
            match:/"(?:\\.|[^"\\])*"/g,
            rules:[{
                type:'variable',
                match:/\$\{[^}]*\}|\$[A-Za-z_][\w]*/g
            }]
        },{
            type:'string',      // 单引号：原样输出
            match:/'(?:\\.|[^'\\])*'/g
        },{
            type:'variable',    // $VAR ${VAR} $1 $@ $? $# $-
            match:/\$\{[^}]*\}|\$[A-Za-z_][\w]*|\$[@*#?!0-9-]+/g
        },{
            type:'keyword',     // 语法结构词
            match:/(^|(?<=\W))(if|then|elif|else|fi|for|while|until|do|done|case|esac|in|function|select|time|coproc)(?=\W)/g
        },{
            type:'buildin',     // 常用内建与外部命令
            match:/(^|(?<=\s))(echo|printf|read|cd|pwd|export|local|readonly|return|exit|break|continue|shift|set|unset|eval|exec|source|alias|unalias|trap|wait|type|builtin|command|declare|typeset|test|\[|\]|kill|jobs|bg|fg|ulimit|umask|env|true|false|\.)(?=\s|;|\)|$)/g
        },{
            type:'function',    // foo() 定义 / function foo
            match:/(?<=function\s)[A-Za-z_][\w]*|(?<=^|\s)[A-Za-z_][\w]*(?=\s*\(\s*\))/g
        },{
            type:'property',    // 变量赋值 VAR=value
            match:/(^|(?<=\s))[A-Za-z_][A-Za-z0-9_]*(?==)/g
        },{
            type:'literal',
            match:/(?<=\W)(true|false|null)(?=\W)/g
        },{
            type:'number',
            match:/(?<=[\s=\(])\-?\d+(\.\d+)?(?=[\s;\)]|$)/g
        },{
            type:'operator',
            match:/&&|\|\||>>|<<|<<<|&>|>=|<=|==|!=|\+=|-=|\*=|\/=|%=|\+|-|\*|\/|%|!|=|<|>|&|\||\?/g
        },{
            type:'punctuation',
            match:/[\(\)\{\}\[\];:,]/g
        }]
    }]
};
