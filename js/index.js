// index.js

function get(dataParameter) {

    var entry = document.getElementById("searchBox");

    if (entry.value.length > 0) {
      dataParameter["srsearch"] = entry.value;
    }
    else {
      dataParameter["srsearch"] = "freeCodeCamp";
    }

    $.ajax({
      type: 'GET',
      url: 'https://en.wikipedia.org/w/api.php',
      data: dataParameter,
      datatype: 'json',
      success: function(json) {
          extract(json);
      }

    });

}

function extract(data){
    // clear the #results panel elements
    $("#results, .pagerSection").empty();

    var results = data.query.search;

    displayToHtml(results);

}

function displayToHtml(searchResults) {

  if(searchResults.length > 1) {
      // loops each results data and show it in the #results panel
       for(var i=0; i < searchResults.length; i++) {

         var openTag = "<div class='col-md-4'><div class='panel panel-default'>";
         var title = searchResults[i]['title'];
         var titleLink = "<a href='https://en.wikipedia.org/wiki/" + title + "'" + "target='_blank'>" + title + "</a>";
         var snippet = searchResults[i]['snippet'] + ' ...';
         var closeTag = "</div></div>";

         $("#results").append(openTag +
                              "<h4>" + titleLink + "</h4>" +
                              "<p>" + snippet + "</p>" +
                              closeTag);

         // match the panel height columns using matchHeight.js
         $(".panel").matchHeight();

      };

      $(".pagerSection").append(addPager);

    };
}

function addPager() {
    var htmlPager = "<div class='pager_section'><ul class='pager'> \
                <li><a href='#'><i class='fa fa-angle-left' aria-hidden='true'></i></a></li> \
                <li><a href='#'><i class='fa fa-angle-right' aria-hidden='true'></i></a></li> \
                </ul></div>";

    return htmlPager;
}

$(document).ready(function() {

  var searchParameter = {
        action: 'query',
        format: 'json',
        prop:'info',
        origin: '*',
        list: 'search',
        continue: '',
        srsearch:'',
        srlimit: '6',
        srwhat: 'text',
        srprop: 'snippet',
}

  get(searchParameter);

  // if users click or press search button
  $("#buttonGet").on("click", get(searchParameter));

  // if users press enter
  $("#searchBox").on("keypress", function(e) {
      if (e.which == 13) {
          get(searchParameter);
      }
    });

})
