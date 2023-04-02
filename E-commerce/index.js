async function FetchData() {
    try {
      let res = await fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products")
      res = await res.json()
      console.log(res)
      FilterData(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  FetchData()
  let filterBy = document.getElementById("filter")
  filterBy.addEventListener("change", () => {
    FetchData()
  })
  function FilterData(data) {
    let filterValue = filterBy.value
    if (filterValue === "") {
      DisplayProduct(data)
    } else {
      data = data.filter((product) => {
        return product.category == filterValue
      })
      DisplayProduct(data)
    }

  }
  let CartArr = JSON.parse(localStorage.getItem("cart")) || []
  let Container = document.getElementById("product-container")
  function DisplayProduct(data) {
    Container.innerHTML = ""
    data.forEach((product) => {
      let card = document.createElement("div")
      let image = document.createElement("img")
      let brand = document.createElement("h3")
      let category = document.createElement("p")
      let details = document.createElement("p")
      let price = document.createElement("h4")
      let add_to_cart = document.createElement("button")
      add_to_cart.textContent = "Add to Cart"
      image.src = product.img;
      brand.textContent = product.brand;
      category.textContent = product.category;
      price.textContent = `₹${product.price}`;
      details.textContent = product.details
      add_to_cart.addEventListener("click", () => {
        if (checkDuplicate(product)) {
          alert("Product Already in Cart")
        } else {
          CartArr.push({ ...product, quantity: 1 })
          localStorage.setItem("cart", JSON.stringify(CartArr))
          alert("Product Added To Cart")

        }
      })
      card.append(image, brand, price, details, category, add_to_cart)
      Container.append(card)
    })
  }
  function checkDuplicate(product) {
    for (let i = 0; i < CartArr.length; i++) {
      if (CartArr[i].id === product.id) {
        return true
      }
    }
    return false
  }