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

        // clear the #results panel elements
        $("#results").empty();

        var data = json.query.search;

        if(data.length > 1) {
          // loops each results data and show it in the #results panel
           for(var i=0; i < data.length; i++) {

             var openTag = "<div class='col-md-4'><div class='panel panel-default'>";
             var title = data[i]['title'];
             var titleLink = "<a href='https://en.wikipedia.org/wiki/" + title + "'" + "target='_blank'>" + title + "</a>";
             var snippet = data[i]['snippet'] + ' ...';
             var closeTag = "</div></div>";

             $("#results").append(openTag + "<h4>" + titleLink + "</h4>" + "<p>" + snippet + "</p>" + closeTag);

             // match the panel height columns using matchHeight.js
             $(".panel").matchHeight();

          }; // end of loops

        }; // end of if statement

     } // end of ajax success function

    }) // end of ajax calling functin

  }) // end of get button function

})
