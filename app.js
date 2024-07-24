document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.getElementById('recipies')

    fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const recipes = data.data.recipes;
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

                recipesContainer.appendChild(recipeElement)
            })
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
})