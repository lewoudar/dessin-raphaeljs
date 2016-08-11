function bubbleInfos(nom, temperature, diskUsage, uptime){
    var panel = $('<div class="panel panel-info"></div>');
    panel.append('<div class="panel-heading"><h3 class="panel-title">'+nom+'</h3></div>');
    var listGroup = $('<div class="list-group"><div>');
    var liTemp = $('<li class="list-group-item">Temp:'+temperature+' °C</li>');
    var liUptime = $('<li class="list-group-item">uptime:'+uptime+'</li>');
    var liDisk = $('<li class="list-group-item">Mémoire:'+diskUsage+' %</li>');
    listGroup.append(liTemp, liDisk, liUptime);
    panel.append(listGroup);
    $('#bubble').append(panel);
}
