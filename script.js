let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let searchByTitle = document.getElementById("searchByTitle");
let searchByCategory = document.getElementById("searchByCategory");
let tmp;
mood = "create";


// Get total -----------------------------------------
function getTotal() {

    if (price.value != "") {
        create.style.backgroundColor = "#979797";
        create.style.borderColor = "#868585";
        create.style.color = "#ffffff";
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result + "$";
        total.style.backgroundColor = "#03C988";
        document.getElementById("totalInner").style.backgroundColor = "#03C988";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "#f73241";
        document.getElementById("totalInner").style.backgroundColor = "#f73241";
        create.style.backgroundColor = "#e7e7e7";
        create.style.borderColor = "#0075ff";
        create.style.color = "#0075ff";
    }
};


// Save LocalStorage
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
};

create.onclick = () => {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }


    if (title.value != "" && price.value != "" && category.value != "" && newProduct.count <= 200) {
        if (mood === "create") {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct)
            }
        } else {
            dataProduct[tmp] = newProduct;
            mood = "create"
            create.innerHTML = "Create";
            count.style.display = "block";
            document.getElementById("input-group").style.display = "flex";
        }
        clearData();
        SuccessOn()

    } else {
        document.querySelector(".note").style.display = "flex";
    }
    localStorage.setItem("product", JSON.stringify(dataProduct));
    readData()
}


// Success Note On
function SuccessOn() {
    setTimeout(function () {
        document.getElementById("overlay").style.display = "block";
    }, 100)

}

// Success Note Off
function SuccessOff() {
    document.getElementById("overlay").style.display = "none";
}


// Clear Inputs ---------------------------------------
function clearData() {

    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = ""
    count.value = "";
    category.value = "";
}

// Read ------------------------------------------------
function readData() {
    let table = "";
    for (let i = 0; i < dataProduct.length; i++) {

        table += `   
             <tr>
                <td>(${i + 1})</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button class="upda" onclick="updatePro(${i})">Update</button></td>
                <td><button class="dele" onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;

    let deleteAll = document.getElementById("deleteAll");
    if (dataProduct.length > 0) {
        deleteAll.style.display = "block";
    } else {
        deleteAll.style.display = "none";
    };

    document.getElementById("proCount").innerHTML = `(${dataProduct.length})`;
}
readData()


// Delete
function deleteData(i) {

    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    readData()
}

// delete All
function deleteAll() {

    localStorage.clear();
    dataProduct.splice(0);
    readData()

}


// Update
function updatePro(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    document.getElementById("input-group").style.display = "none"
    document.getElementById("cancel").style.display = "flex";
    create.innerHTML = "update";
    tmp = i;
    mood = "update"
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

// cancel Update
function cancelUpdate() {
    mood = "create"
    document.getElementById("input-group").style.display = "flex"
    document.getElementById("cancel").style.display = "none";
    create.innerHTML = "create"
    clearData()
}


// Search

let searchMood = "title";
function getSearchMood(id) {

    let search = document.getElementById("search");

    if (id == "searchByTitle") {
        searchMood = "title";
        document.getElementById("searchLabel").innerHTML = "search By Title";
    } else {
        searchMood = "category";
        document.getElementById("searchLabel").innerHTML = "search By category";
    }
    search.focus();
}




function searchData(value) {

    let table = "";
    if (searchMood == "title") {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.includes(value.toLowerCase())) {

                table += `   
                <tr>
                   <td>${i}</td>
                   <td>${dataProduct[i].title}</td>
                   <td>${dataProduct[i].price}</td>
                   <td>${dataProduct[i].taxes}</td>
                   <td>${dataProduct[i].ads}</td>
                   <td>${dataProduct[i].discount}</td>
                   <td>${dataProduct[i].total}</td>
                   <td>${dataProduct[i].category}</td>
                     <td><button class="upda" onclick="updatePro(${i})">Update</button></td>
                   <td><button class="dele" onclick="deleteData(${i})">Delete</button></td>
               </tr>
           `
            }
        }
    } else {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value.toLowerCase())) {

                table += `   
                <tr>
                   <td>${i}</td>
                   <td>${dataProduct[i].title}</td>
                   <td>${dataProduct[i].price}</td>
                   <td>${dataProduct[i].taxes}</td>
                   <td>${dataProduct[i].ads}</td>
                   <td>${dataProduct[i].discount}</td>
                   <td>${dataProduct[i].total}</td>
                   <td>${dataProduct[i].category}</td>
                   <td><button class="upda" onclick="updatePro(${i})">Update</button></td>
                   <td><button class="dele" onclick="deleteData(${i})">Delete</button></td>
               </tr>
           `
            }

        }
    }
    document.getElementById("tbody").innerHTML = table;


}


