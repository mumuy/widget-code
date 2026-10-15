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
            type:'buildin',     // 常用内建、外部命令与子命令（npm/git/docker…）
            match:/(^|(?<=\s))(echo|printf|read|cd|pwd|export|local|readonly|return|exit|break|continue|shift|set|unset|eval|exec|source|alias|unalias|trap|wait|type|builtin|command|declare|typeset|test|\[|\]|kill|jobs|bg|fg|ulimit|umask|env|true|false|\.|npm|npx|pnpm|yarn|node|deno|bun|git|curl|wget|ssh|scp|rsync|docker|docker-compose|kubectl|helm|brew|apt|apt-get|yum|dnf|pacman|pip|pip3|python|python3|go|cargo|rustc|java|javac|mvn|gradle|make|cmake|gcc|g\+\+|clang|ruby|gem|bundle|composer|php|mysql|psql|redis-cli|mongosh|sqlite3|systemctl|service|sudo|su|whoami|hostname|uname|man|info|clear|history|date|sleep|time|watch|top|htop|ps|free|df|du|tar|gzip|gunzip|zip|unzip|find|grep|awk|sed|sort|uniq|wc|head|tail|cat|less|more|touch|mkdir|rmdir|rm|cp|mv|ln|chmod|chown|basename|dirname|readlink|xargs|tee|cut|tr|diff|patch|xxd|od|hexdump|install|init|run|build|start|dev|test|add|remove|update|upgrade|uninstall|publish|login|logout|list|clean|clone|commit|push|pull|fetch|merge|rebase|status|log|branch|checkout|reset|stash|tag|config|remote|compose|up|down|ps|exec|logs)(?=\s|;|\)|$)/g
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
