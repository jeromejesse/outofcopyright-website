if (typeof require !== 'undefined') {
    var Github = module.exports;
}

var github = new Github({
    username: USERNAME,
    password: PASSWORD,
    auth: "basic"
});

var content = '';

    
var repo = github.getRepo(USERNAME, REPONAME);

//Fonction pour mettre à jour un fichier
function updateFile(pays, fileName, content, commitText){
    repo.write(BRANCH, 
        pays+'/'+fileName, 
        content, 
        commitText, 
        function(err) { 
            console.log(err); 
        });
}

//Lecture du fichier contenant les diagrammes et les informations d'un pays. Cette fonction peu être aussi utilisé pour la lecture des fichiers de traduction.
function readFile(pays, fileName, callback){
    
    repo.read(BRANCH, pays+'/'+fileName, 
        function(err, data) {
            callback(data);
        });
    
}

//Fonction permettant d'écrire un nouveau fichier 
function writeFile(pays, fileName, content, commitText){
    repo.write(BRANCH, pays+'/'+fileName, content, commitText, function(err) {console.log(err);});
}

//Fonction permetant la suppression d'un fichier sur github
function deleteFile(pays, fileName){
    repo.remove(BRANCH, pays+'/'+fileName, function(err) {});
}
//Permet d'obtenir des informations sur le repository
function repoShow(){
    repo.show(function(err, repo) {console.log(repo);});
}

//Récupération de l'abre des dossiers présent sur le GIT
function getTree(){
    repo.getTree('master', function(err, tree) {console.log(tree);});
}

//Récupération de la liste des pays 
function getCountries(callback){
    repo.getTree('master', function(err, tree) {
        var listCountries = [];
        for(var i = 0; i < tree.length; i++){
            listCountries.push(tree[i].path);
        }
        callback(listCountries);
    });
}


function getGist(){
    var user = github.getUser();
    user.userGists(USERNAME, function(err, gists) { console.log(gists);});
}

//Récupération des issues sur le git
function readIssues(){
    var issues = github.getIssues(USERNAME, REPONAME);
    issues.list(options, function(err, issues) { console.log(issues); });
}

//Récupération des commits pour un fichier défini
function commits(pays, fileName, callback){
    repo.commits(pays+'/'+fileName, function(err, commits){ 
        callback(commits);
    });
}

