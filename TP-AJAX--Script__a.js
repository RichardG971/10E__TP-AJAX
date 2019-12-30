console.log('window.location.pathname\n résultat : '+ window.location.pathname);
console.log('window.location.pathname.includes("/TP-AJAX--Blog.html")\n résultat : '+ window.location.pathname.includes("/TP-AJAX--Blog.html"));
console.log('window.location.pathname.includes("/TP-AJAX--Admin.html")\n résultat : '+ window.location.pathname.includes("/TP-AJAX--Admin.html"));

// Appel du xml et pour l'afficher en asynchrone
var xhr = new XMLHttpRequest();
if(xhr) {
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var donnees = xhr.responseXML; // response : réponse du serveur. Ici on demande du XML
            // Condition pour choisir la fonction selon la page Accueil ou la page Administration
            getData(donnees); // donnees est un argument utilisé pour la fonction getData qui a été créée en dessous
        }
    }

    xhr.open("GET", "TP-AJAX--Articles.xml", true); // Définir la requête, : méthode, url, asynchrone
    xhr.send();
}

function getData(data) { // data est le paramètre de la fonction getData
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
        
        texte += '</section>';
        document.getElementById("addContent").innerHTML = texte;
        addClick();
        addClass(accClick);


        // Condition d'ajout pour la page Administration //////////////////////////////////////////
    } else if(window.location.pathname.includes("/TP-AJAX--Admin.html")) { 
        var texte = "<table class='col my-3 table table-bordered table-striped table-hover'><thead class='bg-primary text-light text-uppercase'>";
        texte += '<tr class="text-center"><th>'+ article[0].children[0].nodeName +'</th>'
        texte += '<th>'+ article[0].children[1].nodeName +'</th>'
        texte += '<th>'+ article[0].children[3].nodeName +'</th>'
        texte += '<th>'+ article[0].children[4].nodeName +'</th>'
        texte += '<th>ACTION</th></tr></thead><tbody>';
    
        for(var i = 0; i < article.length; i++) {
            texte += '<tr><td class="p-0"><div class="d-flex align-items-center"><div class="cellScroll"><div class="titreArt font-weight-bolder text-uppercase text-center">'+ article[i].children[0].childNodes[0].nodeValue +'</div><div><u>'+ article[0].children[2].nodeName +'&nbsp;:</u></div><div class="small">'+ article[i].children[2].childNodes[0].nodeValue +'</div></div></div></td>'
            texte += '<td class="p-0"><div class="d-flex align-items-center"><a href='+ article[i].children[1].childNodes[0].nodeValue +' target="blank_"><div class="cellScroll cellImg">'+ article[i].children[1].childNodes[0].nodeValue +'</div></a></div></td>'
            texte += '<td class="p-0"><div class="d-flex align-items-center"><div class="cellScroll">'+ article[i].children[3].childNodes[0].nodeValue +'</div></div></td>'
            texte += '<td>'+ article[i].children[4].childNodes[0].nodeValue +'</td>'
            texte += '<td class="text-center"><a class="btn btn-success my-1 col">Editer</a><br><a class="btn btn-danger my-1 col">Supprimer</a></td>'
            texte += '</tr>';
        }
        
        texte += '</tbody></table>';
        document.getElementById("contAdmin").innerHTML = texte;
    }
    
}

// Appel des fonctions suivantes que dans l'url "/TP-AJAX--Blog.html" grace à la condition suivante
if(window.location.pathname.includes("/TP-AJAX--Blog.html")) {
    
    // console.log(document.getElementsByClassName('accClickNav'));
    // console.log(document.querySelectorAll('.accClickNav'));
    
    var accClick = document.getElementsByClassName('accClickNav');
    var presentClick = document.querySelectorAll('.presentClickNav');
    var contClick = document.getElementsByClassName('contClickNav');
    var loginClick = document.getElementsByClassName('loginClickNav');
    // console.log(tabClick[0]);
    // console.log(tabClick[1][0]);
    
    // Fonction permettant d'ajouter la fonction onclick à chaque élément concerné ////////////////
    function addClick() {
        for(var i = 0; i < accClick.length; ++i) {
            accClick[i].onclick = accClick[0].onclick;
        }
        for(var i = 0; i < presentClick.length; ++i) {
            presentClick[i].onclick = presentClick[0].onclick;
        }
        for(var i = 0; i < loginClick.length; ++i) {
            loginClick[i].onclick = loginClick[0].onclick;
        }
        for(var i = 0; i < contClick.length; ++i) {
            contClick[i].onclick = contClick[0].onclick;
        }
        console.log(accClick);
        console.log(presentClick);
        console.log(loginClick);
        console.log(contClick);
        console.log("*************************");
    }
    
    // Fonction permettant d'ajouter et retirer la class active selon la page active //////////////
    console.log(document.getElementById("navhead").children[0].children);

    function addClass(nClick) {
        for (var j = 0; j < document.getElementById("navhead").children[0].children.length; j++) {
            if (nClick[0].getAttribute('class') == document.getElementById("navhead").children[0].children[j].children[0].getAttribute('class')) {
                document.getElementById("navhead").children[0].children[j].setAttribute('class', 'active');
                document.getElementById("navfoot").children[0].children[j].setAttribute('class', 'active');
            } else {
                document.getElementById("navhead").children[0].children[j].removeAttribute('class');
                document.getElementById("navfoot").children[0].children[j].removeAttribute('class');
            }
            console.log(document.getElementById("navhead").children[0].children[j]);
            console.log(document.getElementById("navfoot").children[0].children[j]);
        }
        console.log("*************************");
    }

    // Fontcion appel page Acceuil Xml ////////////////////////////////////////////////////////////
    accClick[0].onclick = function() {
        // var xhr = new XMLHttpRequest(); // La variable xhr est générale, il n'est donc pas nécessaire de la redéfinir.
        if(xhr) {
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    var donnees = xhr.responseXML;
                    getData(donnees);
                }
            }

            xhr.open("GET", "TP-AJAX--Articles.xml", true);
            xhr.send();
        }
        addClass(accClick);
    }

    // Fonction appel page Présentation Html //////////////////////////////////////////////////////
    presentClick[0].onclick = function() {
    var xhr = new XMLHttpRequest();
    if(xhr) {
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                var donnees = xhr.responseText;
                getPres(donnees);
            }
        }
        
        xhr.open("GET", "TP-AJAX--Blog_2-Presentation.html", true);
        xhr.send();
        }
        addClass(presentClick);
    }
    
    function getPres(data) {
        document.getElementById("addContent").innerHTML = data;
        addClick();
    }

    // Fonction appel page Contacts Html //////////////////////////////////////////////////////////
    contClick[0].onclick = function() {
        var xhr = new XMLHttpRequest();
        if(xhr) {
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                var donnees = xhr.responseText;
                getCont(donnees);
            }
        }

        xhr.open("GET", "TP-AJAX--Blog_3-Contacts.html", true);
        xhr.send();
        }
        addClass(contClick);
    }

    function getCont(data) {       
        document.getElementById("addContent").innerHTML = data;
        addClick();
    }

    // Fonction appel page Connexion Html /////////////////////////////////////////////////////////
    loginClick[0].onclick = function() {
        var xhr = new XMLHttpRequest();
        if(xhr) {
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    var donnees = xhr.responseText;
                    getLog(donnees);
                }
            }

            xhr.open("GET", "TP-AJAX--Blog_4-Connexion.html", true);
            xhr.send();
        }
        addClass(loginClick);
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
        addClick();

    }

}
// Fin condition pour l'appel des fonctions dans l'url "/TP-AJAX--Blog.html" //////////////////////