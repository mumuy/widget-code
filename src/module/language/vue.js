import html from './html.js';

let groups = structuredClone(html.groups);

groups.find(group=>group.type=='html').rules.find(item=>item.type=='tag').rules.unshift({
    type:'directive',
    match:/(?<=\sv-\S+?=)".+?"(?=[\s>])/g,
    rules:[{
        type:'keyword',
        match:/(?<=\s)of|in(?=\s)/g,
    }]
});

export default {
    name:'Vue',
    value:'vue',
    groups:groups
};