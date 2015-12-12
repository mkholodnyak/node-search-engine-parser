var createCrawler = require('../lib/crawler');

var googleImagesCrawler = createCrawler('google-images');

googleImagesCrawler.search('kitten', function(err, result, query){
    console.log(result);
});