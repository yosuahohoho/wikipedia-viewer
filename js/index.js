// index.js

function showEntries(dataType){
    // clear the #results panel elements
    $("#results").empty();

    var data = dataType.query.search;

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

      $("#results").append(addPager);

    }; // end of if statement
}


function getWikipediaEntries() {

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
      datatype: 'json',
      success: function(json) {
          showEntries(json);
      }

    }) // end of ajax calling function

}

function addPager() {
    var htmlPager = "<div class='pager_section'><ul class='pager'> \
                <li><a href='#'><i class='fa fa-angle-left' aria-hidden='true'></i></a></li> \
                <li><a href='#'><i class='fa fa-angle-right' aria-hidden='true'></i></a></li> \
                </ul></div>";

    return htmlPager;
}

$(document).ready(function() {

  // if users click or press search button
  $("#get").on("click", getWikipediaEntries);

  // if users press enter
  $("#search").on("keypress", function(e) {
      if (e.which == 13) {
          getWikipediaEntries();
      }
  })

})
