(function(){
    $.noConflict();
jQuery(document).ready(function($){
    $('[data-toggle="popover"]').popover();
    $('#probe').hide();
    $('#link').hide();
    
    /* create a paper - commented for Run */
    var paper_width = 1000;
    var paper_height = 600;
    var paper = Raphael("paper1", paper_width, paper_height);

    //Sonde de gestion
    var mp_x = paper_width / 2,
        mp_y = 100,
        radius = 25,
        mpl_x = '' + mp_x,
        mpl_y = mp_y + radius;
        mpl_y = '' + mpl_y;
    var management_probe = paper.circle(mp_x, mp_y, radius).attr({fill : "green", stroke: 'black', 'stroke-width': '3px'});
    var management_text = paper.text(mp_x, mp_y - radius - 15 , "Sonde de gestion");
    management_text.attr({'font-size': '15px'});
    //évènement
    management_probe.hover(function(){
        this.attr({stroke: 'blue'});
    }, function(){
        this.attr({stroke: 'black'});
    });
    $(management_probe.node).on('click', function(){
        $('#probe').trigger('click');
    });
    
    //autres sondes
    //(50, 600) (150, 600), 250, 600), (350, 600)
    var probe_number = 10;
    var distance_y = 200,
        width = 50;
    var probes = [];
    var probes_text = [];
    var probes_links = [];
    for(var i = 0; i < probe_number; i++){
        //dessin de la sonde
        probes[i] = paper.circle(width, paper_height - distance_y, radius);
        probes[i].attr({fill: 'blue', stroke: 'black', 'stroke-width': '3px'});
        //évènements des sondes
        probes[i].hover(function(){
        this.attr({stroke: 'yellow'});
        }, function(){
            this.attr({stroke: 'black'});
        });
        $(probes[i].node).on('click', function(){
            $('#probe').trigger('click');
        });
        //dessin du texte
        probes_text[i] = paper.text(width, paper_height - distance_y + 40, 'sonde');
        probes_text[i].attr({'font-size': '15px'});
        
        //dessin des lignes
        var x = '' + width;
        var y = paper_height - distance_y - radius;
        y = '' + y;
        var string = 'M' + x + ',' + y + 'L' + mpl_x + ',' + mpl_y;
        //console.log(string);
        probes_links[i] = paper.path(string).attr({'stroke-width': '5px'});
        //évènement des liens
        probes_links[i].hover(function(){
            this.attr({
                stroke: 'blue'
                //'stroke-width': '3px'
            });
        }, function(){
            this.attr({
                stroke: 'black'
                //'stroke-width': '1px'
            });
        });
        $(probes_links[i].node).on('click', function(){
            $('#link').trigger('click');
        });
        //on augmente x
        width += paper_width/probe_number;
    }
});
})();


//management_probe.hover(function(){
//    $(this.node).attr({
//        "data-toggle": 'popover',
//        'title': 'sonde de gestion',
//        'data-content': 'texte'
//    });
//}, null);


	