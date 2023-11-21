//...................................CRUD Create Read Update Delete............................................... 
//variables 
let productName = document.getElementById('productName');
let productPrice = document.getElementById('productPrice');
let productCategory = document.getElementById('productCategory');
let productDescription = document.getElementById('productDescription');
let addBtn = document.getElementById('addBtn');
let editBtn = document.getElementById('editBtn');
let updateBtn = document.getElementById('updateBtn');
let myTable = document.getElementById('info');
let error = document.getElementById('error');
let allProuductData = []; //array carry all objects of products 
let 

//get Products form local 
if(window.localStorage.getItem(`Products`)) {
    allProuductData = JSON.parse(window.localStorage.getItem(`Products`) );
    handelData();
}
//Add button 
addBtn.addEventListener(`click`, function(){
    if( productName.value && productPrice.value && productCategory.value && productDescription.value) {
        error.classList.add('hide')
        let productData = {  //object for each product 
            pname: productName.value, 
            pprice: productPrice.value,
            pcat: productCategory.value,
            pdesc: productDescription.value
        }
        allProuductData.push(productData);
        UpdatelocalStorage();
        handelData();
        emptyInputs()
    }
    else {
        error.classList.remove('hide')
    }
});

//Loop in all products and handel it in html 
function handelData(){
    let  tableData = ``; //html in table 
    let id = 1 ;
    for(let i=0 ; i < allProuductData.length ; i++){
        tableData += `
        <td scope="row">${id++}</td>
        <td>${allProuductData[i].pname}</td>
        <td>${allProuductData[i].pprice}</td>
        <td>${allProuductData[i].pcat}</td>
        <td>${allProuductData[i].pdesc}</td>
        <td>
            <div class="table-options flex">
                <button id="edit" class="flex"  onclick="updateProduct(${i})"><i class="fa-solid fa-pen"></i></button>
                <button id="delete" class="flex" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </td>
    </tr>
        `
    }
    myTable.innerHTML = tableData;
}
//Update local storage 
function UpdatelocalStorage(){
    window.localStorage.setItem(`Products`,JSON.stringify(allProuductData));
}
//empty inputs
function emptyInputs()  {
    productName.value = null;
    productPrice.value = null;
    productCategory.value = null;
    productDescription.value = null;
}
//Delete Product 
function deleteProduct(productID) {
    allProuductData.splice(productID,1);
    handelData();
    UpdatelocalStorage();
}

//Update Product 
let updatedProductId ;
function updateProduct(productID){
    updatedProductId = productID ;
    productName.value = allProuductData[productID].pname;
    productPrice.value = allProuductData[productID].pprice;
    productCategory.value = allProuductData[productID].pcat;
    productDescription.value =  allProuductData[productID].pdesc;

    addBtn.classList.add('hide');
    updateBtn.classList.remove('hide');
}


updateBtn.addEventListener('click', function(){

    allProuductData[updatedProductId].pname = productName.value ;
    allProuductData[updatedProductId].pprice = productPrice.value ;
    allProuductData[updatedProductId].pcat  =  productCategory.value ;
    allProuductData[updatedProductId].pdesc  = productDescription.value ;
    handelData();
    UpdatelocalStorage();
    emptyInputs() 
    
    addBtn.classList.remove('hide');
    updateBtn.classList.add('hide');
});

//search parmeters 
let searchInput = document.getElementById('searchInput');
let searchIcon = document.getElementById('searchIcon');
let searchTable = document.getElementById('infoSearch');
let NotingToShow = document.getElementById('NotingToShow');
let refresh = document.getElementById('refresh');
//search function 
function searchByPname(productName) {
    if (searchInput.value) {
        return allProuductData
            .filter(product => product.pname.toLowerCase().includes(productName.toLowerCase()))
            .map((product, index) => ({
                originalIndex: allProuductData.indexOf(product),
                pname: product.pname,
                pprice: product.pprice,
                pcat: product.pcat,
                pdesc: product.pdesc
            }));
    }
    return [];
}

//call search function when click search 
searchIcon.addEventListener('click', function () {
    let results = searchByPname(searchInput.value);
    let searchContent = ``;
    if(searchInput.value) {
        if(results.length !==0){
            myTable.classList.add('hide');
            searchTable.classList.remove('hide');
            NotingToShow.classList.add('hide');
            searchContent = `
            <td scope="row">${results[0].originalIndex +1}</td>
            <td>${results[0].pname}</td>
            <td>${results[0].pprice}</td>
            <td>${results[0].pcat}</td>
            <td>${results[0].pdesc}</td>
            <td>
                <div class="table-options flex">
                    <button id="edit" class="flex"  onclick="updateProduct(${results[0].originalIndex})"><i class="fa-solid fa-pen"></i></button>
                    <button id="delete" class="flex" onclick="deleteProduct(${results[0].originalIndex})"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </td>
        </tr>
            `
            console.log(searchContent);
        }
        else if (results.length == 0){
            searchContent = `No Result Found`;
            NotingToShow.classList.remove('hide');
            myTable.classList.add('hide');
            searchTable.classList.add('hide');
            NotingToShow.innerHTML =  searchContent;
        }
        searchTable.innerHTML =  searchContent ;
    }
    else {
        myTable.classList.remove('hide');
        searchTable.classList.add('hide');
    }

});

refresh.addEventListener('click', function(){
    location.reload();
});




