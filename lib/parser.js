var path = require('path');
var request = require('request');
var _ = require('lodash');

function SearchEngineParser(options){
    this._options = _.extend({
        headers : {
            'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
        }
    }, options);
    this._sid = _.uniqueId('crawler_');
}

SearchEngineParser.prototype.search = function(query, callback){
    var _query = encodeURIComponent(query);
    var that = this;
    var requestOptions = _.extend(this._options, {
        url : that._strategy.getSearchURL(_query)
    });

    request(requestOptions, parseResponse, query);

    function parseResponse(error, response, body){
        if(error){
            callback(error);
        }

        if(_.isString(body) && body.length === 0){
            callback('Response from Search Engine is empty!');
        }

        that._strategy.getResults(body, function(err, result){
            var _result = (_.isArray(result)) ? result.map(formatResponse) : formatResponse(result);
            callback(null, _result);
        });
    }
};

SearchEngineParser.prototype.setUserAgent = function(userAgent){
    this._options.headers['User-Agent'] = userAgent;
};

SearchEngineParser.prototype._setStrategy = function(strategy){
    this._strategy = strategy
};

function formatResponse(result){
    // TODO: Add formatting
    return result;
}

function createParser(crawlerStrategy, options){
    if(_.isString(crawlerStrategy)){
        var _crawlStrategy = getDefaultStrategyByName(crawlerStrategy);
        if(_.isNull(_crawlStrategy)){
            throw new Error('Strategy for parsing not found!');
        }
        
        var imageCrawler = new SearchEngineParser(options);
        imageCrawler._setStrategy(_crawlStrategy);

        return imageCrawler;
    }

    throw new Error('Strategy for parsing should be a string or an object!');
}

function getDefaultStrategyByName(name){
    var defaultStrategies = require('./list-of-strategies.json');

    if(_.has(defaultStrategies, name)){
        return require(path.resolve(__dirname, defaultStrategies[name]));
    }

    return null;
}

module.exports = createParser;
