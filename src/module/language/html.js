import javascript from './javascript.js';
import css from './css.js';
import xml from './xml.js';

export default {
    name:'HTML',
    value:'html',
    groups:[{
        type:'javascript',
        match:/(?<=<script\s?.*>)[\s\S]+(?=<\/script>)/g,
        default:false,
        rules:javascript.groups.find(item=>item.default).rules
    },{
        type:'css',
        match:/(?<=<style\s?.*>)[\s\S]+(?=<\/style>)/g,
        default:false,
        rules:css.groups.find(item=>item.default).rules
    },{
        type:'html',
        match:/[\s\S]+/g,
        default:true,
        rules: xml.groups.find(item=>item.default).rules
    }]
};
