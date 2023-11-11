const carrito = document.getElementById('carrito');
// const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners(){
    // elementos1.addEventListener('clic', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    // vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-me-gusta')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${elemento.imagen}" width=100>
    </td>
    <td>
        ${elemento.titulo}
    </td>
    <td>
        ${elemento.precio}
    </td>
    <td>
        <a href="#" class="borrar" data-id="${elemento.id}">X </a>
    </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e){
    e.preventDefault();
    let elemento,
        elementoId;
    if (e.target.classList.contains('borrar')){
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }
}

// function vaciarCarrito(){
//     while (lista.firstChild){
//         lista.removeChild(lista.firstChild);
//     }
//     return false;
// }

// Agregar Favoritos

let btnFavorito = document.querySelectorAll(".productos-container .producto .producto-info .info-container a");
console.log({btnFavorito});

for (let i = 0; i < btnFavorito.length; i++) {
    btnFavorito[i].addEventListener("click", function(e){
        e.preventDefault();
        let producto = e.target.parentElement.parentElement.parentElement;
        localStorage.setItem("producto", producto.outerHTML);
    });
}

const getRemineTime = deadline => {
    let now = new Date(),
        retime = (new Date(deadline) - now + 1000) / 1000,
        segundos = ('0' + Math.floor(retime % 60)).slice(-2),
        minutos = ('0' + Math.floor(retime / 60 % 60)).slice(-2),
        horas = ('0' + Math.floor(retime / 3600 % 24)).slice(-2),
        dias = Math.floor(retime / (3600 * 24));

    return {
        retime,
        segundos,
        minutos,
        horas,
        dias
    }
}

const conteo = document.getElementById('conteo');

setInterval(() => {
    const time = getRemineTime('Nov 15 2023 00:00:00 GMT-0300');
    conteo.innerHTML = `${time.dias} d ${time.horas} h ${time.minutos} m ${time.segundos} s.`;
}, 1000);

// const submenu = document.querySelector('.submenu');
// const star = document.querySelector('.submenu i');
// submenu.addEventListener('click', function(){
//     this.classList.toggle('active');
//     star.classList.toggle("fa-circle-xmark");
//     carrito.classList.toggle('active');
    

//     carrito.animate([
//         {transform: 'translateY(-30px)', opacity: 0},
//         {transform: 'translateY(-20px)', opacity: 1}
//     ], {
//         duration: 600,
//         iterations: 1
//     });
// });

