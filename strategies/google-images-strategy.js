var cheerio = require('cheerio');

var GIS_PREFIX_REGEX = /.*imgurl=/;
var GIS_SUFFIX_REGEX = /&imgrefurl.*/;
var IMAGE_LINKS_SELECTOR = '#rg_s a';
var GOOGLE_SEARCH_URL = 'http://images.google.com/search?tbm=isch&q=';

var GoogleImageStrategy = {
    getSearchURL : function(query){
        return GOOGLE_SEARCH_URL + query
    },

    getImageLinksFromHTML : function(html, callback){
        var $ = cheerio.load(html);
        var imageLinks = $(IMAGE_LINKS_SELECTOR);
        var imageHrefs = [];

        imageLinks.each(function collectHref(i, element){
            imageHrefs.push(element.attribs.href);
        });
        
        callback(null, imageHrefs.map(sanitazeImageHref));
    }
};

module.exports = GoogleImageStrategy;

function sanitazeImageHref(gisURL){
    return gisURL
        .replace(GIS_PREFIX_REGEX, '')
        .replace(GIS_SUFFIX_REGEX, '');
}