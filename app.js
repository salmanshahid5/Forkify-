document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.getElementById('recipes');
    const searchBtn = document.getElementById('searchBtn');
    const userInput = document.getElementById('userInput');

    const fetchRecipes = (query) => {
        fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                recipesContainer.innerHTML = ''; 
                const recipes = data.data.recipes;  

                if (recipes.length === 0) {
                    recipesContainer.innerHTML = `<p>No recipes found for "${query}".</p>`;
                } else {
                    recipes.forEach(recipe => {
                        const recipeElement = document.createElement('div');
                        recipeElement.classList.add('recipe');

                        const recipeImage = document.createElement('img');
                        recipeImage.src = recipe.image_url;
                        recipeImage.alt = `Image of ${recipe.title}`;

                        const recipeTitle = document.createElement('h2');
                        recipeTitle.textContent = recipe.title;

                        const recipePublisher = document.createElement('p');
                        recipePublisher.textContent = `Publisher: ${recipe.publisher}`;

                        recipeElement.appendChild(recipeTitle);
                        recipeElement.appendChild(recipePublisher);
                        recipeElement.appendChild(recipeImage);

                        recipesContainer.appendChild(recipeElement);
                    });
                }
            })
            .catch(error => {
                console.error( error);
            });
    };

    // Search button click event
    searchBtn.addEventListener('click', () => {
        const query = userInput.value.trim();
        if (query) {
            fetchRecipes(query);
        }
        userInput.value = ""
    });
});