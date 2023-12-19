let cati = document.getElementById("cati");
let random_img = document.getElementById("random-img");
let random_dish_name = document.getElementById("random-dish-name");
let search = document.getElementById("search");
let Search_name = document.getElementById("Search-name");
let search_result = document.getElementById("search-result");
let random_meal = document.getElementById("random-meal");
let Modal = document.getElementById("Modal");
let close_modal = document.getElementById("close_modal");
// modal
random_meal.onclick = () => {
  Modal.style.display = "Flex";
};
close_modal.onclick = () => {
  document.getElementById("Ingredi-list").innerHTML = ''
  Modal.style.display = "none";
};
// enter event for search box
search.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    search_result.innerHTML = "";
    Search_name.innerText = "";
    var search_val = search.value;
    // console.log(search_val)
    searchresult(search_val);
    
  }
});
// click event for search icon
document.getElementById("search-icon").addEventListener("click", function (e) {
  search_result.innerHTML = "";
  Search_name.innerText = "";
  var search_val = search.value;
  // console.log(search_val)
  searchresult(search_val);
});
// creating drop-list for search-box
function createList() {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.categories[0])
      data.categories.forEach((el) => {
        // console.log(el.strCategory)
        cati.innerHTML += `<option value="${el.strCategory}">`;
      });
    })
    .catch((error) => console.error("Error:", error));
}
// generating random dish with their name and img
function generaterandom() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.meals[0])
      showIngredients(data.meals[0].strMeal);
      random_img.src = data.meals[0].strMealThumb;
      random_dish_name.innerText = data.meals[0].strMeal;
      // document.getElementById("instructions").textContent = data.meals[0].strInstructions
      document.getElementById("area").textContent = data.meals[0].strArea
      document.getElementById("catigory").textContent = data.meals[0].strCategory
      document.getElementById("youtube").href = data.meals[0].strYoutube
      
    })
    .catch((error) => console.error("Error:", error));
}
// showing ingredients 
function showIngredients(name) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      let Ingredient = [
        data.meals[0].strIngredient1,
        data.meals[0].strIngredient2,
        data.meals[0].strIngredient3,
        data.meals[0].strIngredient4,
        data.meals[0].strIngredient5,
        data.meals[0].strIngredient6,
        data.meals[0].strIngredient7,
        data.meals[0].strIngredient8,
        data.meals[0].strIngredient9,
        data.meals[0].strIngredient10,
        data.meals[0].strIngredient11,
        data.meals[0].strIngredient12,
        data.meals[0].strIngredient13,
        data.meals[0].strIngredient14,
        data.meals[0].strIngredient15,
        data.meals[0].strIngredient16,
        data.meals[0].strIngredient17,
        data.meals[0].strIngredient18,
        data.meals[0].strIngredient19,
        data.meals[0].strIngredient20,
      ];
      Ingredient.forEach((el) => {
        if (el != "" && el!=null) {
          // console.log(el)
          document.getElementById("Ingredi-list").innerHTML += `<li>${el}</li>`;
        }
      });
    })
    .catch((error) => console.error("Error:", error));
}
// showing search results
function searchresult(search) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`)
    .then((response) => response.json())
    .then((data) => {
      location.href = '#Search-name'
      // console.log(data)
      let out = ``;
      if (data.meals != null) {
        Search_name.innerText = search;
        data.meals.forEach((el) => {
          // console.log(el)
          out += `<div class="result" id='result' onclick='showModal()'>
        <img src="${el.strMealThumb}" id="result-img" alt="">
        <h4 id="reuslt-name">${el.strMeal}</h4>
    </div>`;
        });
      }
      else {
        Search_name.innerText = 'Category Not Found';
      }

      search_result.innerHTML = out;
    })
    // .catch((error) => console.error("Error:", error));
}

search_result.onclick = (e) => {
  showIngredients(e.target.parentNode.innerText)
};

function showModal(){
  Modal.style.display = "Flex";
}
generaterandom();
createList();
