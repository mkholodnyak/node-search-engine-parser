Node.js - Search Engine Parser
=====================

This module allows you to search google by scraping the results.
You can add your own search engine.

Installation
------------

    npm install --save search-engine-parser


Built-in strategies
------------
 -  Google Images


Usage
-------

This prints out the first 20 search results of the query `kitten` in Google Images.

```js

var createParser = require('search-engine-parser');

var googleImagesParser = createParser('google-images');

googleImagesParser.search('kitten', function(err, results){
    results.map(function(result){
        console.log(result);
    });
});
```

Own search engine
-------

You need to implement Search Strategy interface:

 ```js

var cheerio = require('cheerio');

var SearchEngineStrategy = {
    getSearchURL : function(query){
        return "http://your-search-engine.com?query=" + query;
    },

    getResults : function(html, callback){
        var $ = cheerio.load(html);
        var imageLinks = $('.link');
        var imageHrefs = [];

        imageLinks.each(function(i, element){
            imageHrefs.push(element.attribs.href);
        });

        callback(null, imageHrefs);
    }
};
 ```

Example [Google Images strategy](https://github.com/mkholodnyak/node-search-engine-parser/blob/master/strategies/google-images-strategy.js).

License
-------

Licensed under MIT.
