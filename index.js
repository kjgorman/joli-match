var request = require('request')
, stream = require('stream')
, read = require('readline');

function getAllRecipesLinksOnPage(page, callback) {
    request(page, function(err, response, body) {
        if(err) if(callback) { callback(err); return; } else throw err;
        var linkRex = /<p class="crop">\s+<a href="(.+)"/g
            , recipes = []
        while ( (match = linkRex.exec(body)) != null) {

            if(match && match.length > 1)
                recipes.push(match[1]);
        }

        console.log(recipes);
        if(callback) callback(undefined, recipes);
    });
}


function getIngredientsFromPage(link, callback) {
    request("http://jamieoliver.com"+link, function(err, response, body) {
        if(err) if(callback) { callback(err); return } else throw err;
        var ingredientRex = /<p class="ingredient">\s+<span class="value">(.+)<\/span>/g
          , ingredients = []
        while( (match = ingredientRex.exec(body)) != null) {
            if(match && match.length > 1)
                ingredients.push(match[1]);
        }
        var pageToIngredient = {
            "url" : "http://www.jamieoliver.com"+link,
            "name" : link.split("/")[3] || "unnamed",
            "ingredients" : ingredients
        }

        if(callback) callback(undefined, pageToIngredient);
    });
}

function doGetAll() {
    var masterUrl = "http://www.jamieoliver.com/recipes/beef-recipes"
     
    getAllRecipesLinksOnPage(masterUrl, readPage);

    return eventBus;
}

function readPage (err, recipeUrls){
    
    var linkers = []
    for(i = 0, len = recipeUrls.length; i < len; i++) {
        getIngredientsFromPage(recipeUrls[i], function(err, link) {
            linkers.push(link);
            eventBus.write(JSON.stringify(link));
        });
    }       
}

eventBus = new stream.Stream();
eventBus.writable = true;
eventBus.write = function(data) { this.emit('data', data); }

doGetAll();

allOfTheThings = []

eventBus.on('data', function(data) {
    allOfTheThings.push(allOfTheThings);
});

module.exports = doGetAll
