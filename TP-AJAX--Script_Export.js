export { AffectPage };

class AffectPage {
    addClick;
    constructor(addClick) {
        this.addClick = addClick;
    }

    setDataBase(xhrUrl, fGetData) {
        var xhr = new XMLHttpRequest();
        if(xhr) {
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    var donnees = xhr.responseXML;
                    fGetData(donnees);
                }
            }
            xhr.open("GET", xhrUrl, true);
            xhr.send();
        }
        if(window.location.pathname.includes("/TP-AJAX--Blog.html")) {
            for(var i = 0; i < document.getElementById("navhead").children[0].children.length; i++) {
                if(this.addClick[0].getAttribute('class') == document.getElementById("navhead").children[0].children[i].children[0].getAttribute('class')) {
                    document.getElementById("navhead").children[0].children[i].setAttribute('class', 'active');
                    document.getElementById("navfoot").children[0].children[i].setAttribute('class', 'active');
                } else {
                    document.getElementById("navhead").children[0].children[i].removeAttribute('class');
                    document.getElementById("navfoot").children[0].children[i].removeAttribute('class');
                }
            }
        }
    }
    
    clickDataXml(xhrUrl, fGetData, etatClass) {
        this.addClick[0].onclick = function() {
            var xhr = new XMLHttpRequest();
            if(xhr) {
                xhr.onreadystatechange = function() {
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        var donnees = xhr.responseXML;
                        fGetData(donnees);
                    }
                }
                xhr.open("GET", xhrUrl, true);
                xhr.send();
            }
            for(var i = 0; i < document.getElementById("navhead").children[0].children.length; i++) {
                if(etatClass == document.getElementById("navhead").children[0].children[i].children[0].getAttribute('class')) {
                    document.getElementById("navhead").children[0].children[i].setAttribute('class', 'active');
                    document.getElementById("navfoot").children[0].children[i].setAttribute('class', 'active');
                } else {
                    document.getElementById("navhead").children[0].children[i].removeAttribute('class');
                    document.getElementById("navfoot").children[0].children[i].removeAttribute('class');
                }
            }
        }
    }
    
    clickDataTxt(xhrUrl, fGetData, etatClass) {
        this.addClick[0].onclick = function() {
            var xhr = new XMLHttpRequest();
            if(xhr) {
                xhr.onreadystatechange = function() {
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        var donnees = xhr.responseText;
                        fGetData(donnees);
                    }
                }
                xhr.open("GET", xhrUrl, true);
                xhr.send();
            }
            for(var i = 0; i < document.getElementById("navhead").children[0].children.length; i++) {
                if(etatClass == document.getElementById("navhead").children[0].children[i].children[0].getAttribute('class')) {
                    document.getElementById("navhead").children[0].children[i].setAttribute('class', 'active');
                    document.getElementById("navfoot").children[0].children[i].setAttribute('class', 'active');
                } else {
                    document.getElementById("navhead").children[0].children[i].removeAttribute('class');
                    document.getElementById("navfoot").children[0].children[i].removeAttribute('class');
                }
            }
        }
    }

    addLiNav(addTextNav, addClassNav) {
        var addLiNavH = document.createElement("li");
        var addLiNavF = document.createElement("li");
        addLiNavH.innerHTML = "<a href='#' class='"+ addClassNav +"' alt='"+ addTextNav +"'><div>"+ addTextNav +"</div></a>";
        addLiNavF.innerHTML = "<a href='#' class='"+ addClassNav +"' alt='"+ addTextNav +"'><div>"+ addTextNav +"</div></a>";
        document.getElementById("navhead").children[0].appendChild(addLiNavH);
        document.getElementById("navfoot").children[0].appendChild(addLiNavF);
    }

    addIdNav(elemId, addClassNav) {
        if(document.getElementById(elemId)) {
            document.getElementById(elemId).setAttribute("class", addClassNav);
        }
    }

    setAllClicks() {
        for(var i = 0; i < this.addClick.length; ++i) {
            this.addClick[i].onclick = this.addClick[0].onclick;
        }
        console.log(this.addClick);
    }

}