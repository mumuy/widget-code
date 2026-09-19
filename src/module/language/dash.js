// Dash（Debian Almquist shell）：复用 Shell 规则，仅改名称与注册值
import shell from './shell.js';

export default {
    ...shell,
    name:'Dash',
    value:'dash'
};
