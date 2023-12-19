// Todas las constantes de los elementos
const select = document.getElementById('producto');
const prName = document.getElementById('producto2');
const price2 = document.getElementById('precio2');
const price = document.getElementById('precio');
const units = document.getElementById('unidades');
const totalPrice = document.getElementById('importe');
const tableBody = document.querySelector('tbody');

const selectProducts = [];
let cartProducts = [];

// Muestra y oculta la division de alta de productos
function mostrar() {
    var e = document.getElementById("alta"); //recoge todo el elemento alta
    if (e.style.display == "block") { //si se ve
        e.style.display = "none" //que no se vea
    } else { //si no
        e.style.display = "block"; //que se vea
    }

}


// Añadir producto al desplegable
function addToSelect(){
    // Se crea el producto con los valores del formulario y se añaden al array de productos
    const product = { name: prName.value, price: price2.value, units: 0 };
    selectProducts.push(product);

    // Se crea la option en dentro del select
    const createOption = document.createElement('option');
    createOption.value = product.name;
    createOption.textContent = product.name;
    select.appendChild(createOption);
}

// Poner la info del producto en el formulario
function changeProduct(){
    const select = document.getElementById('producto');

    const product = selectProducts.find(pr => pr.name === select.value);
    price.value = product.price;
    units.value = product.units;
    totalPrice.value = units.value * product.price;
}

// Actualiza los campos del formulario
function updateFields(){
    const product = selectProducts.find(pr => pr.name === select.value);

    product.price = price.value;
    product.units = units.value;
    totalPrice.value = units.value * product.price;

    console.log(selectProducts);
}

// Añade un producto al carrito
function addToCart(){
    const product = selectProducts.find(pr => pr.name === select.value);

    if(!cartProducts.find(pr => pr.name === product.name)){
        const tr = document.createElement('tr');

        for (const key in product) {
            const element = document.createElement('td');
            element.textContent = product[key];
            tr.appendChild(element);
        }

        // Crea el importe dentro de la tabla
        const priceTd = document.createElement('td');
        priceTd.textContent = product.price * product.units;
        tr.appendChild(priceTd);

        // Crea la opción para eliminar el objeto de la tabla
        const remove = document.createElement('td');
        remove.textContent = 'X';
        remove.style.backgroundColor = 'red';
        remove.style.cursor = 'pointer';
        remove.id = 'remove' + cartProducts.length;
        tr.appendChild(remove);

        tableBody.appendChild(tr);
        cartProducts.push(product);
    }
}

// Borra todos los productos del carrito
function clearCart(){
    cartProducts = [];

    while(tableBody.firstChild){
        tableBody.removeChild(tableBody.firstChild);
    }
}