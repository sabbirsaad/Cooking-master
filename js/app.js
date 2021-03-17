// Find Food Items
document.getElementById("search-item").addEventListener("click", () => {
    const inputItems = document.getElementById("input-item").value;
    document.getElementById("input-item").value = "";
    if (!inputItems) {
        alert("Please input a item first");
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputItems}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals === null) {
                    alert("Item not matching");
                }
                else {
                    displayFoodItem(data.meals);
                }
            })
    }
})


// Display Food Items
const displayFoodItem = items =>{
    const foodItems = document.getElementById("items");
    foodItems.innerHTML = "";
    items.forEach( item => {
        const showFoodItems = document.createElement("div");
        showFoodItems.className = "food-items";

        const foodInfo = `
        <img class="img-fluid" role="button" onclick="displayFoodDetails('${item.idMeal}')" src="${item.strMealThumb}"  alt=""> <br> <br>
        <h4 role="button" onclick="displayFoodDetails('${item.idMeal}')">${item.strMeal}</h4>`;

        showFoodItems.innerHTML = foodInfo;
        foodItems.appendChild(showFoodItems);
    })
}


// Find Food Details
const displayFoodDetails = id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => foodDetails(data.meals[0]))
        .catch(error => alert("Item not found"));
}


// Display Food Details
const foodDetails = foodItem => {
    const itemDetails = document.getElementById("item-details");
    itemDetails.style.display = "block";

    itemDetails.innerHTML = `
   <img class="img-fluid rounded" src="${foodItem.strMealThumb}"> <br><br>
   <h3>${foodItem.strMeal}</h3> <br>
   <h5>Ingredients</h5>`;

   // Ingredients
    const ul = document.createElement('ul');
    const ingredients = [foodItem.strIngredient1, foodItem.strIngredient2, foodItem.strIngredient3, foodItem.strIngredient4, foodItem.strIngredient5, foodItem.strIngredient6, foodItem.strIngredient7, foodItem.strIngredient8, foodItem.strIngredient9, foodItem.strIngredient10, foodItem.strIngredient11, foodItem.strIngredient12, foodItem.strIngredient13, foodItem.strIngredient14, foodItem.strIngredient15, foodItem.strIngredient16, foodItem.strIngredient17, foodItem.strIngredient18, foodItem.strIngredient19, foodItem.strIngredient20];
    ingredients.forEach(item => {
        const li = document.createElement('li');
        if (item != null && item != "") {
            li.innerText = item;
            ul.appendChild(li);
        }
    });
    itemDetails.appendChild(ul);

    // document.getElementsByClassName(".refresh").addEventListener("click",()=>{
    //     window.location.refresh();
    // })

}