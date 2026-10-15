// SQL 规则（常用方言：MySQL / PostgreSQL / SQLite 关键字）
export default {
    name:'SQL',
    value:'sql',
    groups:[{
        type:'sql',
        match:/[\s\S]+/g,
        default:true,
        rules:[{
            type:'comment',
            match:/--[^\n]*|\/\*[\s\S]*?\*\//g
        },{
            type:'string',      // SQL 单引号转义为 ''，双引号亦常见
            match:/'(?:''|[^'])*'|"(?:\\.|[^"\\])*"/g
        },{
            type:'keyword',
            match:/(^|(?<=\W))(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|CROSS|ON|AS|AND|OR|NOT|NULL|IS|IN|LIKE|BETWEEN|EXISTS|CASE|WHEN|THEN|ELSE|END|CREATE|TABLE|ALTER|DROP|INDEX|VIEW|PRIMARY|KEY|FOREIGN|REFERENCES|DEFAULT|UNIQUE|CONSTRAINT|BEGIN|COMMIT|ROLLBACK|TRANSACTION|INTO|VALUES|SET|UNION|ALL|DISTINCT|ASC|DESC|IF|WHILE|RETURN|DECLARE|PROCEDURE|FUNCTION|TRIGGER|DATABASE|USE|SHOW|DESCRIBE|EXPLAIN|GRANT|REVOKE)(?=\W)/gi
        },{
            type:'buildin',     // 聚合与常用函数
            match:/(^|(?<=\W))(COUNT|SUM|AVG|MIN|MAX|NOW|DATE|YEAR|MONTH|DAY|LENGTH|UPPER|LOWER|TRIM|COALESCE|CONCAT|SUBSTRING|ROUND|ABS|IFNULL|CURRENT_DATE|CURRENT_TIMESTAMP)(?=\W)/gi
        },{
            type:'number',
            match:/(?<=[\s=\(,+\-*\/<>])-?\d+(\.\d+)?(?=[\s;,\)\]+\-*\/<>]|$)/g
        },{
            type:'operator',
            match:/<=|>=|<>|<|>|=|\+|-|\*|\/|%/g
        },{
            type:'punctuation',
            match:/[\(\)\[\];,.]/g
        }]
    }]
};
