document.addEventListener('DOMContentLoaded', ()=>{
    iniciarApp();
});

function iniciarApp(){
    NavegacionFija();
    crearGaleria();
    scrollNav();
}
function NavegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', () =>{
        if(sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }
        else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a')
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', (e) =>{
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: 'smooth'});
        })
    });
}
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i<=12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source src="build/img/thumb/${i}.avif" type="imagen/avif">
            <source src="build/img/thumb/${i}.webp" type="imagen/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagenes galeria">
        `;
        imagen.onclick = () =>{
            mostrarImagen(i);
        }



        galeria.appendChild(imagen)
    } 
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source src="build/img/grande/${id}.avif" type="imagen/avif">
        <source src="build/img/grande/${id}.webp" type="imagen/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagenes galeria">
    `;
    //Crea el Overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = () =>{
        const body = document.querySelector('body');
        body.classList.remove('fijarBody');
        overlay.remove();
    }

    //Boton para cerrar el Modal 
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btnCerrar');
    cerrarModal.onclick = ()=>{
        const body = document.querySelector('body');
        body.classList.remove('fijarBody');
        overlay.remove();
        
    }

    overlay.appendChild(cerrarModal);

    //Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay)
    body.classList.add('fijarBody');
}