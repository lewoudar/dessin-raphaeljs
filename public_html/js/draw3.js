//Fonctions utiles
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function findLink(id1, id2, links){
    var find = false;
    var string_id2 = "" + id2;
    links.forEach(function(string){
        if(string.indexOf(id1) !== -1 && string.indexOf(string_id2) !== -1){
            find = true;
        }
    });
    return find;
}

function getLink(id1, id2, links){
    id2 = "" + id2;
    var key = id2 + "-" + id1;
    return links[key];
}

function getPosition(id){
    id = "" + id;
    for(var j = 0; j < probes.length; j++){
        if(probes[j].data("id") === id){
            return {x: probes[j].attr("cx"), y: probes[j].attr("cy")};
        }
    }
}

//Gestion des évènements
//==DRAG==
function dragstart(x, y, e) {
    this.attr({
        stroke: "green",
        "stroke-width": "3px"
    });
}

function dragend(e) {
    this.attr({
        stroke: "black",
        "stroke-width": "1px"
    });
}

function dragmove(dx, dy, x, y, e) {
    this.attr({
        cx : x,
        cy: y
    });
    //Gestion des textes
    var index = this.data("index");
    texts[index].attr({
        x: this.attr("cx"),
        y: this.attr("cy") + radius + text_offset
    });
    //Gestion des liens
    this.data("links").forEach(function(element){
        //console.log(element);
        var path = element[2].attr("path");
        //console.log(path);
        //Si le cercle est impliqué sur le début de la ligne
        if(element[1] === "start"){
            //path[0] contient un tableau de ce style [M, x, y]
            path[0][1] = x;
            path[0][2] = y;
        }
        else{
            //path[1] contient un tableau de ce style [L, x, y]
            path[1][1] = x;
            path[1][2] = y;
        }
        element[2].attr({path: path});
    });
}

//==HOVER==
function enterLink(){
    this.attr({
        stroke: "blue",
        "stroke-width": "3px"
    });
}

function exitLink(){
    this.attr({
        stroke: "black"
    });
}

var paper_width = 1000;
var paper_height = 1000;
var paper = new Raphael(0, 0, paper_width, paper_height);
var radius = 25;
var text_offset = 15;
//Objet que l'application devra me retourner
var result = {
    '54': {
        links: [55, 56],
        equipement: "sonde-54",
        pop: "pop",
        dsp: "",
        mac: "aa:bb:cc:dd:ee:ff",
        uptime: "2jours,5min",
        temperature: "50°C",
        disk_usage: "60%",
        state: "on service",
        performances: [0.05, 0.01, 0.00]
    },
    '55': {
        links: [54, 57],
        equipement: "sonde-55",
        pop: "pop",
        dsp: "",
        mac: "aa:bb:cc:dd:ee:ff",
        uptime: "2jours,5min",
        temperature: "50°C",
        disk_usage: "60%",
        state: "on service",
        performances: [0.05, 0.01, 0.00]
    },
    '56': {
        links: [54],
        equipement: "sonde-56",
        pop: "pop",
        dsp: "",
        mac: "aa:bb:cc:dd:ee:ff",
        uptime: "2jours,5min",
        temperature: "50°C",
        disk_usage: "60%",
        state: "on pause",
        performances: [0.05, 0.01, 0.00]
    },
    '57': {
        links: [55],
        equipement: "sonde-57",
        pop: "pop",
        dsp: "",
        mac: "aa:bb:cc:dd:ee:ff",
        uptime: "2jours,5min",
        temperature: "50°C",
        disk_usage: "60%",
        state: "on service",
        performances: [0.05, 0.01, 0.00]
    }
};

//Tableau des cercles
var probes = [];
//Tableau des noms
var texts = [];

//Premier parcours pour dessiner les cercles
var i = 0;
for(var id in result){
    var positionX = getRandomArbitrary(100, paper_width - 100);
    var positionY = getRandomArbitrary(100, paper_height - 100);
    //cercle
    var circle = paper.circle(positionX, positionY, radius);
    var infos = "Température: " + result[id].temperature + "\nMise en service: "
                + result[id].uptime + "\nUtilisation disque: " + result[id].disk_usage
                + "\nAdresse Mac: " + result[id].mac + "\nEtat: " + result[id].state;
    //On choisit la couleur de la sonde en fonction de certaines de ses informations
    var fill = ""; //Couleur de la sonde
    if(result[id].state === "on service"){
        fill = "blue";
    }
    else{
        fill = "yellow";
    }
    circle.attr({
        fill: fill,
        title: infos
    });
    circle.data({
        id: id,
        links: [],
        index: i
    });
    //texte
    var text = paper.text(positionX, positionY + radius + text_offset, result[id].equipement + "\n" + result[id].pop);
    text.attr({'font-size': '13px'});
    //On ajoute dans les tableaux
    texts.push(text);
    probes.push(circle);
    i++;
}

//Objet qui va contenir les liens dessinés
//ex{"54-55":objet link}
var links = {};
//Second parcours pour dessiner les liens
i = 0;
for(var id in result){
    result[id].links.forEach(function(element){
        var link = null;
        //Si le lien a déjà été dessiné, on enregistre le cercle comme
        //étant la fin de la ligne
        if(findLink(id, element, Object.keys(links))){
            link = getLink(id, element, links);
            probes[i].data("links").push([element, "end", link]);
        }
        //Sinon on crée le lien, on l'enregistre dans le tableau des liens et on
        //enregistre le cercle comme étant le début de la ligne
        else{
            var position = getPosition(element);
            var string_line = "M"+probes[i].attr("cx")+","+probes[i].attr("cy")+"L"+position.x+","+position.y;
            var link = paper.path(string_line);
            //infobulle du lien
            var title = "Latence: " + result[id].performances[0] + "ms\nGigue: "
                        + result[id].performances[1] + "ms\nPerte de paquets: "
                        + result[id].performances[2] + "%";
            
            link.attr({
                "stroke-width": "3px",
                title: title
            });
            probes[i].data("links").push([element, "start", link]);
            //On enregistre le lien
            var link_string = id + "-" + element;
            links[link_string] = link;
        }
    });
    i++;
}

//On ajoute les évènements aux éléments
//Pour les sondes
probes.forEach(function(element){
    element.drag(dragmove, dragstart, dragend);
});
//Pour les liens
for(var key in links){
    links[key].hover(enterLink, exitLink);
}