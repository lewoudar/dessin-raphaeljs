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

function getPosition(id){
    id = "" + id;
    for(var j = 0; j < probes.length; j++){
        if(probes[j].data("id") === id){
            return {x: probes[j].attr("cx"), y: probes[j].attr("cy")};
        }
    }
}

//Gestion des évènements
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
    var index = this.data("index");
    texts[index].attr({
        x: this.attr("cx"),
        y: this.attr("cy") + radius + text_offset
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
        disk_usage: "60%"
    },
    '55': {
        links: [54, 57],
        equipement: "sonde-55",
        pop: "pop",
        dsp: "",
        mac: "aa:bb:cc:dd:ee:ff",
        uptime: "2jours,5min",
        temperature: "50°C",
        disk_usage: "60%"
    },
    '56': {
        links: [54],
        equipement: "sonde-56",
        pop: "pop",
        dsp: "",
        mac: "aa:bb:cc:dd:ee:ff",
        uptime: "2jours,5min",
        temperature: "50°C",
        disk_usage: "60%"
    },
    '57': {
        links: [55],
        equipement: "sonde-57",
        pop: "pop",
        dsp: "",
        mac: "aa:bb:cc:dd:ee:ff",
        uptime: "2jours,5min",
        temperature: "50°C",
        disk_usage: "60%"
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
    var circle = paper.circle(positionX, positionY, radius).attr({fill: 'blue'});
    var infos = "Température: " + result[id].temperature + "\nMise en service: "
                + result[id].uptime + "\nUtilisation disque: " + result[id].disk_usage;
    circle.attr({title: infos});
    circle.data("id", id);
    circle.data("links", []);
    circle.data("index", i); //Utile pour repérer le texte associé au cercle
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
        if(findLink(id, element, Object.keys(links))){
            probes[i].data("links").push([element]);
        }
        else{
            var position = getPosition(element);
            var string_line = "M"+probes[i].attr("cx")+","+probes[i].attr("cy")+"L"+position.x+","+position.y;
            var line = paper.path(string_line);
            probes[i].data("links").push([element, line]);
        }
    });
    i++;
}

//On ajoute les évènements aux éléments
probes.forEach(function(element){
    element.drag(dragmove, dragstart, dragend);
});