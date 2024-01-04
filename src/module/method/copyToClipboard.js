export default function(text){
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
        	document.execCommand("Copy");
            window.setTimeout(function () {
                document.body.removeChild($dom);
                resolve();
            }, 100);
        }else{
            reject();
        }
    });
};
