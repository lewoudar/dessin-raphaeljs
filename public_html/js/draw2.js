var paper_width = 1000;
var paper_heigth = 1000;
var paper = new Raphael(0, 0, paper_width, paper_heigth);
var radius = 25;
var circle1 = paper.circle(120, 110, radius).attr("fill", "yellow");
var circle2 = paper.circle(500, 310, radius).attr("fill", "yellow");
var line = paper.path("M120,110L500,310");
console.log(line);

circle1.drag(dragmove, dragstart, dragend);
circle2.drag(dragmove, dragstart, dragend);

function dragmove(dx, dy, x, y, e) {
       this.attr({
        cx: x,
        cy: y
    }); 
}

function dragstart(x, y, e) {
    this.attr("fill", "orange");
}

function dragend(e) {
    this.attr("fill", "yellow");
}