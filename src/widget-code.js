import codeParser from './module/codeParser.js';
import copyToClipboard from './module/method/copyToClipboard.js';
import styleSheet from './style/default.css' with { type: 'css'};

class WidgetCode extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }
    static get observedAttributes(){
        return ['language','theme'];
    }
    get language(){
        return this.getAttribute('language')||'text';
    }
    set language(value){
        this.setAttribute('language',value);
    }
    get theme(){
        return this.getAttribute('theme')||'dark';
    }
    set theme(value){
        this.setAttribute('theme',value);
    }
    connectedCallback () {
        this.#render();
    }
    attributeChangedCallback(){
        this.#render();
    }
    #render(){
        let _ = this;
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
    }
    addStyle(parser){
        let themeOption = parser.getThemeOption();
        let themeSheet = themeOption.styleSheet;
        // 移除旧的 style 节点，避免重复渲染时样式叠加
        let oldStyle = this.shadowRoot.querySelector('style[data-widget-code]');
        if(oldStyle){
            oldStyle.remove();
        }
        if(this.shadowRoot.adoptedStyleSheets){
            this.shadowRoot.adoptedStyleSheets = [styleSheet,themeSheet];
        }else{
            const $style = document.createElement('style');
            $style.rel = 'defaultSheet';
            $style.dataset.widgetCode = '1';   // 标记以便重复渲染时清理
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
