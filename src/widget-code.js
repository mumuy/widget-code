import codeParser from './module/codeParser.js';
import copyToClipboard from './module/method/copyToClipboard.js';
import styleSheet from './style/default.css' assert { type: 'css'};

class WidgetCode extends HTMLElement {
    constructor() {
        super();
    }
    static get observedAttributes(){
        return ['language','theme'];
    }
    get language(){
        return this.getAttribute('language')||'text';
    }
    set language(theme){
        this.setAttribute('language',language);
    }
    get theme(){
        return this.getAttribute('theme')||'dark';
    }
    set theme(theme){
        this.setAttribute('theme',theme);
    }
    connectedCallback () {
        let _ = this;
        // 模板
        _.attachShadow({mode:'open'});

        setTimeout(function(){
            // 代码解析
            let content = _.textContent;
            let parser = new codeParser({
                'content':content,
                'theme':_.theme,
                'language':_.language
            });
            _.render(parser);
            _.addStyle(parser);

            let $module = _.shadowRoot.querySelector('.mod-panel');
            let $copyBtn = $module.querySelector('.btn');
            let $notice = $module.querySelector('.notice');
            // 代码复制
            $copyBtn.onclick = function(){
                console.log('[content]',content);
                copyToClipboard(content).then(function(){
                    $notice.classList.add('notice-success');
                    $notice.innerHTML = '复制成功';
                }).catch(function(){
                    $notice.classList.add('notice-error');
                    $notice.innerHTML = '复制失败';
                });
            };
            $notice.addEventListener('animationend', () => {
                $notice.classList.remove('notice-success','notice-error');
            });
        },0);
    }
    addStyle(parser){
        let themeOption = parser.getThemeOption();
        let themeSheet = themeOption.styleSheet;
        if(this.shadowRoot.adopteddefaultSheets){
            this.shadowRoot.adopteddefaultSheets = [styleSheet,themeSheet];
        }else{
            const $style = document.createElement('style');
            $style.rel = 'defaultSheet';
            $style.textContent = [...styleSheet.cssRules,...themeSheet.cssRules].map(item=>item.cssText).join('');
            this.shadowRoot.appendChild($style);
        }
    }
    render(parser){
        let languageOption = parser.getLanguageOption();
        let parseResult = parser.parse();
        let html = parseResult.map((group,index)=>{
            return `<div class="line">${
                group.map(item=>`<span class="${item.type}" language="${item.language}">${
                    (()=>{
                        let getHTML = function(item){
                            if(item.children){
                                return item.children.map(item=>`<span class="${item.type}">${getHTML(item)}</span>`).join('');
                            }else{
                                return item.value;
                            }
                        };
                        return getHTML(item);
                    })()
                }</span>`).join('')
            }</div>`;
        }).join('');
        this.shadowRoot.innerHTML = `<div class="mod-panel">
            <div class="hd">
                <span class="title">${languageOption.name}</span>
                <span class="notice">复制成功</span>
                <button class="btn">复制</button>
            </div>
            <div class="bd">
                <div class="outer">
                    <pre><code>${html}</code></pre>
                </div>
            </div>
        </div>`;
    }
}

if(!customElements.get('widget-code')){
    customElements.define('widget-code', WidgetCode);
}
