const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
// event listener
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})

// get meal list 

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = '';
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                <div class="meal-item" id = "${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a class="recipe-btn" src="#">Get recipe</a>
                        </div>
                    </div>
                `
                });
                mealList.classList.remove('notFound');
            }
            else {
                html = "Sorry, we didn't find any meal!!";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        })
}

// get meal recipe
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        //console.log(mealItem.id);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// create meals 
function mealRecipeModal(meal) {
    meal = meal[0];
    console.log(meal);

    //ss = "strIngredient"+"1"
    //console.log(meal[ss]);
    let ingredient = "";

    for (let i = 1; i <= 20; i++) {
        let mealIngredient = meal["strIngredient" + i.toString()];
        let mealMeasure = meal["strMeasure" + i.toString()];
        if (mealIngredient === "") {
            continue;
        }
        //console.log(ss);
        ingredient = ingredient + `
        <p">
        ${mealMeasure} ${mealIngredient}
        </p>
        `;
        document.getElementById("ingredients").innerHTML = ingredient;

    }
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}
    </p>
    <div class="recipe-instruct">
        <h3>Instructions:</h3>
        <p id="meal-recipe">${meal.strInstructions}
        </p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    
    `;
    document.getElementById("showRecipes").innerHTML = html;

    //mealDetailsContent.innerHTML = html;
    //console.log(mealDetailsContent.parentElement.parentElement)
    //mealDetailsContent.parentElement.parentElement.add('showRecipe');

}
