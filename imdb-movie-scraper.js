var movieArray = ['http://www.imdb.com/title/tt1282015/', 'http://www.imdb.com/title/tt0402022/', 'http://www.imdb.com/title/tt0480239/', 'http://www.imdb.com/title/tt0808185/', 'http://www.imdb.com/title/tt0145600/', 'http://www.imdb.com/title/tt1825735/', 'http://www.imdb.com/title/tt0483607/', 'http://www.imdb.com/title/tt1343727/', 'http://www.imdb.com/title/tt0238380/', 'http://www.imdb.com/title/tt0060390/', 'http://www.imdb.com/title/tt0449590/', 'http://www.imdb.com/title/tt0893402/', 'http://www.imdb.com/title/tt0113264/', 'http://www.imdb.com/title/tt0074812/', 'http://www.imdb.com/title/tt0017136/', 'http://www.imdb.com/title/tt0181689/', 'http://www.imdb.com/title/tt0405296/', 'http://www.imdb.com/title/tt0114367/', 'http://www.imdb.com/title/tt0066434/', 'http://www.imdb.com/title/tt1386703/', 'http://www.imdb.com/title/tt0185183/', 'http://www.imdb.com/title/tt0118929/', 'http://www.imdb.com/title/tt0070544/', 'http://www.imdb.com/title/tt0113481/'];
var page;
var fs = require('fs');
// Function to load the specified page from IMDB, and extract the desired data.
function loadPage(arrayIndex) {
    var currentPage = movieArray[arrayIndex];
    console.log('Processing page: ' + currentPage);
    page = require('webpage').create();
    // Open the page, and grab information if load is successful. Otherwise, move onto the next page.
    page.open(currentPage, function(status) {
	console.log('Loaded page ' + currentPage + ' with status ' + status);
	if (status === 'success') {
	    var title = page.evaluate(function() {
		return $(".header")[0].firstChild.data.trim();
	    });
	    var storyline = page.evaluate(function() {
		return $('.article > p')[0].firstChild.data.trim()
	    });
	    var rating = page.evaluate(function () {
		return $('.star-box-details > [title]').attr('title')
	    });
	    fs.write('movies.rst', '\n\n', 'a');
	    fs.write('movies.rst', title, 'a');
	    fs.write('movies.rst', '\n', 'a');
	    fs.write('movies.rst', Array(title.length + 1).join('='), 'a');
	    fs.write('movies.rst', '\n\n', 'a');
	    fs.write('movies.rst', 'Rating', 'a');
	    fs.write('movies.rst', '\n------\n\n', 'a');
	    fs.write('movies.rst', rating, 'a');
	    fs.write('movies.rst', '\n\n', 'a');
	    fs.write('movies.rst', 'Storyline', 'a');
	    fs.write('movies.rst', '\n-----------\n\n', 'a');
	    fs.write('movies.rst', currentPage, 'a');
	    fs.write('movies.rst', '\n\n', 'a');
	    fs.write('movies.rst', storyline, 'a');
	}
	// When we're done reading information from the page, release it, and read the next page (if applicable).
	page.release();
	if (arrayIndex == movieArray.length) {
	    console.log('Exiting');
	    phantom.exit();
	} else {
	    loadPage(arrayIndex + 1);
	}
    });
}

loadPage(0);
