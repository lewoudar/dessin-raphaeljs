var paper_width = 1000;
var paper_heigth = 1000;
var paper = new Raphael(0, 0, paper_width, paper_heigth);
var radius = 25;
var circle1 = paper.circle(120, 110, radius).attr("fill", "yellow");
var circle2 = paper.circle(500, 310, radius).attr("fill", "yellow");
var line = paper.path("M120,110L500,310");
console.log(line);
console.log(line.attr("path")[0]);

//enregistrement de la ligne dans les cercle
circle1.data("line", line);
circle1.data('begin_line', true);
circle2.data("line", line);
circle2.data('begin_line', false);
//Evènements
circle1.drag(dragmove, dragstart, dragend);
circle2.drag(dragmove, dragstart, dragend);

function dragmove(dx, dy, x, y, e) {
    //==Gestion des collisions==
    //bord gauche
    if(this.attr("cx") - radius < 0){
        this.attr({cx: radius});
    }
    //bord droit
    if(this.attr("cx") + radius > paper_width){
        var width_max = paper_width - radius;
        console.log(paper_width - radius);
        this.attr({cx: width_max});
    }
    //bord haut
    if(this.attr("cy") - radius < 0){
        this.attr({cy: radius});
    }
    //bord bas
    if(this.attr("cx") + radius > paper_heigth){
        var heigth_max = paper_width - radius;
        this.attr({cy: heigth_max});
    }
    //==on déplace le cercle==
       this.attr({
        cx: x,
        cy: y
    });
    var string_line = '';
    //Si le cercle contient le début de la ligne, on la déplace
    if(this.data("begin_line")){
        string_line = "M"+x+","+y+"L"+line.attr("path")[1][1] +","+ line.attr("path")[1][2];
        //console.log(string_line);
        line.attr({path: string_line});
    }
    else{
        string_line = "M"+line.attr("path")[0][1]+","+line.attr("path")[0][2]+"L"+x+","+y;
        line.attr({path: string_line});
    }
}

function dragstart(x, y, e) {
    this.attr("fill", "orange");
}

function dragend(e) {
    this.attr("fill", "yellow");
}