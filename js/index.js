$(document).ready(function() {
  $("#get").on("click", function() {
    
    var input = document.getElementById('search');
    
    var entry = input.value;
    
    $.ajax({
      type: 'GET',
      url: 'https://en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        format: 'json',
        prop:'info',
        origin: '*',
        list: 'search',
        titles: 'Main Page',
        continue: '',
        srsearch: entry,
        srlimit: '6',
        srwhat: 'text',
        srprop: 'snippet',
      },
      datatype: 'jsonp',
      success: function(json) {
        $("#results").empty();
        
        var data = json.query.search;
        
        var html1 = "<div class='col-md-4'><div class='panel panel-default'>";
        var html2 = "<p><a href='#'>read more ...</a></p></div></div>";
        
        if(data.length > 1) {
          for(var i=0; i < data.length; i++) {
            $("#results").append(html1 + "<h4>" + data[i]['title'] + "</h4>" + data[i]['snippet'] + html2);
          }
        };
      }
      
    })
    
  })
  
 })