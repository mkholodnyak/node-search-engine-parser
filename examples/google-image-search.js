var createParser = require('../index');

var googleImagesParser = createParser('google-images');

googleImagesParser.search('kitten', function(err, result){
    console.log(result);
});