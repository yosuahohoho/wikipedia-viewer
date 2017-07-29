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

        if(data.length > 1) {
          for(var i=0; i < data.length; i++) {
            var html1 = "<div class='col-md-4'><div class='panel panel-default'>";

            var title = data[i]['title'];
            var snippet = data[i]['snippet'];

            var html2 = "<p><a href='https://en.wikipedia.org/wiki/" + title + "'" + " target='_blank'>read more ...</a></p></div></div>";

            $("#results").append(html1 + "<h4>" + title + "</h4>" + "<p>" + snippet + "</p>" + html2);
          }

        }; // end of if

      }

    })

  })

 })
