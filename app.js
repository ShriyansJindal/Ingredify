let cati = document.getElementById("cati")
let random_img = document.getElementById("random-img")
let random_dish_name = document.getElementById("random-dish-name")
let search = document.getElementById("search")
let Search_name = document.getElementById("Search-name")
let search_result = document.getElementById("search-result") 
let random_meal = document.getElementById("random-meal")
let myModal = document.getElementById("myModal")
let close_modal = document.getElementById("close_modal")

random_meal.onclick=()=>{
  myModal.style.display = 'Flex'
}
close_modal.onclick=()=>{
  myModal.style.display = 'none'
}

search.addEventListener('keypress',function (e){
  if(e.key=='Enter'){
    var search_val = search.value;
    // console.log(search_val)
    Search_name.innerText = search_val
    searchresult(search_val)
  }
})

function createList(){
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then(response => response.json())
  .then(data =>{
  
    // console.log(data.categories[0])
    data.categories.forEach(el => {
      // console.log(el.strCategory)
      cati.innerHTML += `<option value="${el.strCategory}">`
    });
  } )
  .catch(error => console.error('Error:', error));
}
function generaterandom(){
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then(response => response.json())
  .then(data =>{
  
    console.log(data.meals[0])
    random_img.src =data.meals[0].strMealThumb
    random_dish_name.innerText = data.meals[0].strMeal 
    // let x = data.meals[0].strIngredient
    let x = data.meals[0].strIngredient+'1'
    // console.log(data.meals[0].strIngredient1)
    console.log(x)
  } )
  .catch(error => console.error('Error:', error));
}
function searchresult(search){
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`)
  .then(response => response.json())
  .then(data =>{
    
    // console.log(data.meals)
    let out=``
    data.meals.forEach((el)=>{
      // console.log(el)
      out +=  `<div class="result">
      <img src="${el.strMealThumb}" id="result-img" alt="">
      <h4 id="reuslt-name">${el.strMeal}</h4>
  </div>`

    })
    search_result.innerHTML = out

  } )
  .catch(error => console.error('Error:', error));
}
generaterandom()
createList()