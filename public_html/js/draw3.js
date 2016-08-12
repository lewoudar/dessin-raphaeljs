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

var paper_width = 1000;
var paper_height = 1000;
var paper = new Raphael(0, 0, paper_width, paper_height);
var radius = 25;
//Objet que l'application devra me retourner
var result = {
    '54': {
        links: [55, 56],
        equipement: "sonde-54",
        pop: "pop",
        dsp: ""
    },
    '55': {
        links: [54, 57],
        equipement: "sonde-55",
        pop: "pop",
        dsp: ""
    },
    '56': {
        links: [54],
        equipement: "sonde-56",
        pop: "pop",
        dsp: ""
    },
    '57': {
        links: [55],
        equipement: "sonde-57",
        pop: "pop",
        dsp: ""
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
    var circle = paper.circle(positionX, positionY, radius).attr({fill: 'yellow'});
    circle.data("id", id);
    circle.data("links", []);
    //texte
    var text = paper.text(positionX, positionY + radius + 15, result[id].equipement + "\n" + result[id].pop);
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
