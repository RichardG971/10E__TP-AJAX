import { AffectPage } from "./TP-AJAX--Script_Export.js";

console.log('window.location.pathname\n résultat : '+ window.location.pathname);
console.log('window.location.pathname.includes("/TP-AJAX--Blog.html")\n résultat : '+ window.location.pathname.includes("/TP-AJAX--Blog.html"));
console.log('window.location.pathname.includes("/TP-AJAX--Admin.html")\n résultat : '+ window.location.pathname.includes("/TP-AJAX--Admin.html"));
// console.log(document.getElementById("navhead").children[0].children.length);
// console.log(document.getElementById("navhead").children[0].children[0]);
// console.log(document.getElementById("navhead").children[0].children[1].children[0].getAttribute('class'));
// console.log(document.getElementsByClassName('accClickNav')[0].getAttribute('class'));

// FONCTION D'APPEL DES PAGES /////////////////////////////////////////////////////////////////////
function getPageBase(data) { // data est le paramètre de la fonction getPageBase
    var article = data.getElementsByTagName("article");
    
    // console.log(article);
    // console.log(article.length);
    // console.log(article[0].children.length);
    
    // Condition d'ajout pour la page Accueil /////////////////////////////////////////////////////
    if(window.location.pathname.includes("/TP-AJAX--Blog.html")) {
        var texte = "<!-- ACCUEIL -------------------------------------------------------------------------><section id='SectAccueil'>";
        
        for(var i = 0; i < article.length; i++) {
            var j = 0;
            texte += '<h2>'+ article[i].children[j++].childNodes[0].nodeValue +'</h2>';
            texte += '<div class="flex">';
            texte += '<figure>';
            texte += '<img src='+ article[i].children[j++].childNodes[0].nodeValue +'/>';
            texte += '<figcaption>'+ article[i].children[j++].childNodes[0].nodeValue +'</figcaption>';
            texte += '</figure>';
            texte += '<div><article>'+ article[i].children[j++].childNodes[0].nodeValue +'</article>';
            texte += '<div class="auteur">'+ article[i].children[j++].childNodes[0].nodeValue +'</div>';
            texte += '</div></div>';
        }

        // document.getElementById('navhead').children[0].children[0].setAttribute('class', 'active');
        // document.getElementById('navfoot').children[0].children[0].setAttribute('class', 'active');

        texte += '</section>';
        document.getElementById("addContent").innerHTML = texte;
        addAllClicks();
        console.log('*************************');

        // Condition d'ajout pour la page Administration //////////////////////////////////////////
    } else if(window.location.pathname.includes("/TP-AJAX--Admin.html")) { 
        var texte = "<table class='col my-3 table table-bordered table-striped table-hover align-middle'>";
        texte += "<thead class='bg-primary text-light text-uppercase'><tr class='text-center'>";
        texte += '<th class="align-middle text-center">'+ article[0].children[0].nodeName +'</th>';
        texte += '<th class="align-middle text-center">'+ article[0].children[1].nodeName +'</th>';
        texte += '<th class="align-middle text-center">'+ article[0].children[3].nodeName +'</th>';
        texte += '<th class="align-middle text-center">'+ article[0].children[4].nodeName +'</th>';
        texte += '<th class="align-middle text-center">ACTION</th>'
        texte += '</tr></thead><tbody>';
    
        for(var i = 0; i < article.length; i++) {
            texte += '<tr>';
            texte += '<td class="p-0 align-middle"><div class="d-flex align-items-center py-3 px-1"><div><div class="titreArt font-weight-bolder text-center text-uppercase">'+ article[i].children[0].childNodes[0].nodeValue +'</div><div><u>'+ article[0].children[2].nodeName +'&nbsp;:</u></div><div class="small">'+ article[i].children[2].childNodes[0].nodeValue +'</div></div></div></td>';
            texte += '<td class="cellImg p-0 align-middle"><div><a href='+ article[i].children[1].childNodes[0].nodeValue +' target="blank_"><div class="d-flex align-items-center py-3 px-1"><div>'+ article[i].children[1].childNodes[0].nodeValue +'</div></div></a></div></td>';
            texte += '<td class="p-0 align-middle"><div class="d-flex align-items-center py-3 px-1"><div>'+ article[i].children[3].childNodes[0].nodeValue +'</div></div></td>';
            texte += '<td class="p-0 align-middle"><div class="d-flex align-items-center py-3 px-1"><div>'+ article[i].children[4].childNodes[0].nodeValue +'</div></div></td>';
            texte += '<td class="p-0 align-middle text-center"><a class="btn btn-success my-1 col d-block px-1 my-2 mx-1">Editer</a><a class="btn btn-danger my-1 col d-block px-1 my-2 mx-1">Supprimer</a></td>';
            texte += '</tr>';
        }

        texte += '</tbody></table>';
        document.getElementById("contAdmin").innerHTML = texte;
    }

}

function getPage(data) {
    document.getElementById("addContent").innerHTML = data;
    addAllClicks();
    console.log('*************************');
}

function getLog(data) {
    document.getElementById("addContent").innerHTML = data;

    var form = document.getElementById("formulaire");
    var log = document.getElementById("log");
    var pwd = document.getElementById("pwd");
    var errorLog = document.getElementById("errorLog");
    var errorPwd = document.getElementById("errorPwd");
    form.onsubmit = function() {
        if(log.value === "admin" && pwd.value === "admin") {
            return true;
        } else if(log.value !== "admin" && pwd.value !== "admin") {
            errorLog.innerHTML="<br><span class='alert alert-danger'>Identifiant incorrect !</span>";
            errorPwd.innerHTML="<br><span class='alert alert-danger'>Mot de passe incorrect !</span>";
            return false;
        } else if(log.value !== "admin") {
            errorLog.innerHTML="<br><span class='alert alert-danger'>Identifiant incorrect !</span>";
            errorPwd.innerHTML="";
            return false;
        } else if(pwd.value !== "admin") {
            errorLog.innerHTML= "";
            errorPwd.innerHTML= "<br><span class='alert alert-danger'>Mot de passe incorrect !</span>";
            return false;
        }
    }
    addAllClicks();
    console.log('*************************');

}

// Appel du xml et pour l'afficher en asynchrone
var accPage = new AffectPage(document.getElementsByClassName('accClickNav'));
accPage.setDataBase("TP-AJAX--Articles.xml", getPageBase);

// Appel des fonctions suivantes que dans l'url "/TP-AJAX--Blog.html" grace à la condition suivante
if(window.location.pathname.includes("/TP-AJAX--Blog.html")) {

    accPage.clickDataXml("TP-AJAX--Articles.xml", getPageBase, document.getElementsByClassName('accClickNav')[0].getAttribute('class'));

    var presentPage = new AffectPage(document.querySelectorAll('.presentClickNav'));
    presentPage.clickDataTxt("TP-AJAX--Blog_2-Presentation.html", getPage, document.querySelectorAll('.presentClickNav')[0].getAttribute('class'));

    var contPage = new AffectPage(document.getElementsByClassName('contClickNav'));
    contPage.clickDataTxt("TP-AJAX--Blog_3-Contacts.html", getPage, document.getElementsByClassName('contClickNav')[0].getAttribute('class'));

    var loginPage = new AffectPage(document.getElementsByClassName('loginClickNav'));
    loginPage.clickDataTxt("TP-AJAX--Blog_4-Connexion.html", getLog, document.getElementsByClassName('loginClickNav')[0].getAttribute('class'));
}

function addAllClicks() {
    accPage.setAllClicks(), presentPage.setAllClicks(), contPage.setAllClicks(), loginPage.setAllClicks();
}
// Fin condition pour l'appel des fonctions dans l'url "/TP-AJAX--Blog.html" //////////////////////