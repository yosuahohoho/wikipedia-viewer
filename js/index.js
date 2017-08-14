// index.js

function request(dataParameter) {

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

function search(offset) {

    var entry = document.getElementById("search");

    var searchParameter = {
          action: 'query',
	      format: 'json',
	      prop: 'extracts',
          origin: '*',
	      generator: 'search',
	      exchars: '200',
	      exlimit: '6',
	      exintro: '1',
	      gsrsearch: entry.value,
	      gsrlimit: '6',
          gsroffset: offset,
	      gsrwhat: 'text',
	      gsrprop: 'snippet|titlesnippet'

    };

   request(searchParameter);

}

function random() {

  var randomParameter = {
        action: 'query',
        format: 'json',
        prop: 'extracts',
        continue: 'gsroffset||',
        origin: '*',
        generator: 'random',
	    exchars: '200',
	    exlimit: '6',
	    exintro: '1',
	    grnnamespace: '0',
	    grnlimit: '6',
  };

  request(randomParameter);

}

function extract(data){
    // clear the #results panel elements
    $("#results").empty();

    var results = data.query.pages;

    displayToHtml(results);

}

function displayToHtml(searchResults) {


    for (var prop in searchResults) {
       //console.log(results[prop]['title']);

       var openTag = "<div class='col-md-4'><div class='panel panel-default'>";
       var title = searchResults[prop]['title'];
       var titleLink = "<a href='https://en.wikipedia.org/wiki/" + title + "'" + "target='_blank'>" + title + "</a>";
       var snippet = searchResults[prop]['extract'];
       var closeTag = "</div></div>";

         $("#results").append(openTag +
                              "<h4>" + titleLink + "</h4>" +
                              "<p>" + snippet + "</p>" +
                              closeTag);

         // match the panel height columns using matchHeight.js
         $(".panel").matchHeight();

      };
      // display the pager button
      $(".pagerSection").show();

   /*else {

        $("#results").html("<h1 class='text-center'>Entry Not Found..</h1>");
        $(".pagerSection").hide();

  }*/

}


$(document).ready(function() {

  var currentOffset = 6;

  console.log(currentOffset);

  $("#previous").hide();

  random();

  // if users press enter
  $("#search").on("keypress", function(e) {
      if (e.which == 13) {
          e.preventDefault();
          search(6);
      }
    });

  $("#next").on("click", function() {

      currentOffset += 6;
      search(currentOffset);

      $("#previous").show();

  });

  $("#previous").on("click", function() {

      if (currentOffset > 6) {
         currentOffset -= 6;
         search(currentOffset);
     }
     else if (currentOffset === 6) {
         $("#previous").hide();
     }

  });

})
