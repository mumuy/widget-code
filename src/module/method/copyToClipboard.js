export default function(text){
    if(navigator.clipboard){
        return navigator.clipboard.writeText(text);
    }else{
        return new Promise((resolve,reject)=>{
            if(document.execCommand){
                window.getSelection().removeAllRanges();
                var selection = window.getSelection();
                var $dom = document.createElement('pre');
                $dom.style.position = 'absolute';
                $dom.style.left = '-99999px';
                document.body.appendChild($dom);
                $dom.innerText = text;
                $dom.focus();
                selection.selectAllChildren($dom);
                var ok = document.execCommand("Copy");
                window.setTimeout(function () {
                    document.body.removeChild($dom);
                    if(ok){
                        resolve();
                    }else{
                        reject();
                    }
                }, 100);
            }else{
                reject();
            }
        });
    }
};
