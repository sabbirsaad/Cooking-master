// Find Food Items
document.getElementById("search-item").addEventListener("click",()=>{
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


//display Food Items
const displayFoodItem = items =>{
    const foodItems = document.getElementById("items");
    foodItems.innerHTML="";
    items.forEach( item => {
        const showFoodItems = document.createElement("div");
        showFoodItems.className="food-items";

        const foodInfo =`
        <img class="img-fluid rounded" role="button" onclick="displayFoodDetails('${item.idMeal}')" src="${item.strMealThumb}"  alt=""> <br> <br>
        <h4>${item.strMeal}</h4>`;

        showFoodItems.innerHTML = foodInfo;
        foodItems.appendChild(showFoodItems);
    })
}


// Find Food Details
const displayFoodDetails = id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => foodDetails(data.meals[0]))
        .catch(error => alert("Please search foods by their first letter!"));
}


// Display Food Details
const foodDetails= foodItem =>{

   const itemDetails= document.getElementById("item-details");
   itemDetails.style.display="block";
   
   itemDetails.innerHTML=`
   <img class="img-fluid rounded" src="${foodItem.strMealThumb}"> <br> <br>
   <h4>${foodItem.strMeal}</h4>`;
 
}