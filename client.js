$(document).ready(function() {
    var recipes = []
    , ingredients = []; 
    $.get("/data", function(data) {
        data = data.data;
        recipes = data;
    });

    $('#add-button').click(function() {
        var ing = $('#add-text').val();
        ingredients.push(ing);
        updateIngs(ing);
        updateRecipes(ing);
    });

    function updateIngs(ing) {
        $('#ingredient-container').append($('<div>'+ing+'</div>'));
    }
    
    function updateRecipes(ing) {
        var current = [];
        for (var i = 0, len = recipes.length; i < len; i++) {
            try { recipes[i] = JSON.parse(recipes[i]); } catch(e) { }
            if(recipes[i] == null) continue;
            for (var j = 0; j < recipes[i].ingredients.length; j++) {
                console.log(recipes[i].ingredients[j]);
                if(new RegExp(ing).test(recipes[i].ingredients[j])) {                    
                    current.push(recipes[i]);
                    j = recipes[i].ingredients.length;
                }
            }
        }

        fillRecipes(current);
        recipes = current;
    }

    function fillRecipes(currentList) {
        $("#recipe-container").html("");

        for(var i = 0; i < currentList.length; i++) {
            constructRecipe(currentList[i]).appendTo($("#recipe-container"));
        }
    }

    function constructRecipe(recipe) {
        return $("<div><a href='"+recipe.url+"'>"+recipe.name+"</a></div>")
    }

});