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

var paper_width = 1000;
var paper_height = 1000;
var paper = new Raphael(0, 0, paper_width, paper_height);
var radius = 25;
//Objet que l'application devra me retourner
var result = {
    '54': {
        links: [55, 56]
    },
    '55': {
        links: [54, 57]
    },
    '56': {
        links: [54]
    },
    '57': {
        links: [55]
    }
};

//Tableau des cercles
var probes = [];

//Premier parcours pour dessiner les cercles
var i = 0;
for(var id in result){
    var positionX = getRandomArbitrary(100, paper_width - 100);
    var positionY = getRandomArbitrary(100, paper_height - 100);
    var circle = paper.circle(positionX, positionY, radius).attr({fill: 'yellow'});
    circle.data("id", id);
    probes.push(circle);
    i++;
}

//Tableau qui doit contenir les liens dessinés
var links = [];
console.log(findLink("54", 55, links));
//Second parcours pour dessiner les liens
i = 0;
//for(var id in result){
//    result[id].links.forEach(function(element){
//        if(!findLink(id, element, links)){
//            var string_line = "M"+probes[i].attr("cx")+","+probes[i].attr("cy")+"L"
//        }
//    });
//    i++;
//}
