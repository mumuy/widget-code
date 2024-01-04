import languageList from './language.js';
import themeList from './theme.js';

class codeParser{
    #content = '';
    #languageList = languageList;
    #themeList = themeList;
    #language = null;
    #theme = null;
    constructor(param) {
        this.#content = param['content'];
        this.setLanguage(param['language']);
        this.setTheme(param['theme']);
    }
    setLanguage(value='text'){
        this.#language = this.#languageList.find(item=>item.value==value)||this.#languageList?.[0]||null;
    }
    setTheme(value){
        if(value){
            this.#theme = this.#themeList.find(item=>item.value==value)||null;
        }else{
            this.#theme = this.#themeList?.[0]||null;
        }
    }
    getLanguageOption(){
        return this.#language;
    }
    getThemeOption(){
        return this.#theme;
    }
    parse(){
        let _ = this;
        let getTokenKeys = function(language){
            let tokenKeys = []; // 只有主题配置中有的特征段才起作用
            if(_.#theme){
                let themeSheet = _.#theme.styleSheet;
                for(let rule of themeSheet.cssRules){
                    let isMatch = true;
                    if(rule.selectorText.match(/\[language=.+\]/)){
                        let attribute = `[language="${language}"]`;
                        isMatch = rule.selectorText.includes(attribute);
                    }
                    if(isMatch){
                        rule.styleMap.forEach(function(type,value){
                            if(value.includes('--code-')){
                                tokenKeys.push(value.replace('--code-',''));
                            }
                        });
                    }
                }
            }
            return tokenKeys;
        };
        let parseEntity = function(language,content){
            if(['html','php'].includes(language)){
                return content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            }
            return content;
        };
        let parseContent = function(language,content,rules){
            let tokenKeys = getTokenKeys(language);
            let parseResult = [];
            rules.forEach(rule=>{
                if(tokenKeys.includes(rule.type)){
                    let matchList = content.matchAll(rule.match);
                    if(matchList){
                        for(let item of matchList){
                            let value = item[0];
                            let start = item.index;
                            let tokens = value.match(/\n|.+/g).map(function(subValue){
                                let end = start + subValue.length;
                                let token = {
                                    'language':language,
                                    'type':rule.type,
                                    'value':parseEntity(language,subValue),
                                    'start':start,
                                    'end':end
                                };
                                if(rule.rules){
                                    token['children'] = parseContent(language,subValue,rule.rules);
                                }
                                start = end;
                                return token;
                            });
                            parseResult = parseResult.concat(tokens);
                        }
                    }
                }
            });
            parseResult.sort((item1,item2)=>item1.start>=item2.start?1:-1);
            let index = 0;
            let endIndex = content.length;
            let result = [];
            parseResult.forEach(item=>{
                if(index<item.start){
                    let value = content.substring(index,item.start);
                    let start = index;
                    let tokens = value.match(/\n|.+/g).map(function(subValue){
                        let end = start + subValue.length;
                        let token = {
                            'language':language,
                            'type':'plain',
                            'value':parseEntity(language,subValue),
                            'start':start,
                            'end':end
                        };
                        start = end;
                        return token;
                    });
                    result = result.concat(tokens);
                    index = item.start;
                }
                if(index==item.start){
                    result.push(item);
                    index = item.end;
                }
            });
            if(index<endIndex){
                let value = content.substring(index,endIndex);
                let start = index;
                let tokens = value.match(/\n|.+/g).map(function(subValue){
                    let end = start + subValue.length;
                    let token = {
                        'language':language,
                        'type':'plain',
                        'value':parseEntity(language,subValue),
                        'start':start,
                        'end':end
                    };
                    start = end;
                    return token;
                });
                result = result.concat(tokens);
            }
            return result;
        };
        let parseResult = [];
        let result = [];
        let lineItems = [];
        // 语言分组解析
        if(_.#language?.groups){
            let ranges = [];
            _.#language.groups.filter(item=>!item.default).forEach(function(item){
                let matchList = _.#content.matchAll(item.match);
                if(matchList){
                    for(let temp of matchList){
                        let value = temp[0];
                        let range = {
                            value:value,
                            start:temp.index,
                            end:temp.index + value.length
                        };
                        ranges.push(range);
                        parseResult = parseResult.concat(
                            parseContent(item.type,_.#content,item.rules).filter(item=>item.start>=range.start&&item.end<=range.end)
                        );
                    }
                }
            });
            let inOtherRanges = function(item){
                let isInRange = false;
                ranges.forEach(function(range){
                    if(item.start>=range.start&&item.end<=range.end){
                        isInRange = true;
                    }
                });
                return isInRange;
            }
            _.#language.groups.filter(item=>item.default).forEach(function(group){
                let matchList = _.#content.matchAll(group.match);
                if(matchList){
                    for(let temp of matchList){
                        parseResult = parseResult.concat(
                            parseContent(group.type,_.#content,group.rules).filter(item=>!inOtherRanges(item))
                        )
                    }
                }
            });
            parseResult.sort((item1,item2)=>item1.start>=item2.start?1:-1);
        }
        // console.log('[parseResult]',parseResult);
        // 归纳成单行
        parseResult.forEach((item,index)=>{
            if(item.value!='\n'){
                lineItems.push(item);
            }else{
                result.push(lineItems);
                if(index==parseResult.length-1){
                    lineItems = [{
                        'type':'plain',
                        'language':'',
                        'value':'',
                        'start':index,
                        'end':index+1
                    }];
                }else{
                    lineItems = [];
                }
            }
        });
        if(lineItems.length){
            result.push(lineItems);
        }
        // console.log('[result]',result);
        return result;
    }
}

export default codeParser;
