//Variables
let puntaje = 15;//yo ya se que va ser 15
let numeroObjetivo = generarNumeroAleatorio();
let intentos = puntaje;
let numeroElegido;
let highscore = parseInt(localStorage.getItem("highscore")) || 0;

// Mostrar valores iniciales al comienzo del juego
document.getElementById("puntaje").innerHTML = puntaje;
document.getElementById("highscore").innerHTML = highscore;
document.getElementById("intentos-restantes").innerHTML = intentos;

document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);//Para el boton reiniciar


//FUNCIONES UTILES
//Generar numero aleatoreo
function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 15) + 1;
}

//Ingreso de nombre
function ValidarNombre() {
    const nombreJugador = document.getElementById("nombre").value;
    const ocultarContenedor = document.getElementById("OcultarContenedor");
    const juego = document.getElementById("juego");
    const nombreJugadorElement = document.getElementById("nombreJugador");

    if (!nombreJugador) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa tu nombre antes de continuar.'
        });
    } else if (!/^[A-Za-z\s]+$/.test(nombreJugador)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre ingresado no es válido, volvé a intentar.'
        });
    } else {
        ocultarContenedor.classList.add("hidden");
        juego.classList.remove("hidden");//Muestro la seccion del juego
        const saludo = `Tu puntaje inicial es 15.`;
        nombreJugadorElement.innerText = nombreJugador;
        mensaje.innerText = saludo;
    }
}

//Confetti para festejar que se ganó
function activarConfeti() {
    confetti({
        particleCount: 150,
        spread: 200,
        size: 8,
        gravity: 1,
        colors: ['#FF0000', '#00FF00', '#0000FF'],
    });//Le agrego un config para modificar particulas
}


//FUNCIONES DE LA PARTIDA
// Función para reiniciar el juego
function reiniciarJuego() {
    puntaje = 15;
    intentos = puntaje;
    numeroObjetivo = generarNumeroAleatorio();

    // Actualiza el contenido en la vista HTML
    document.getElementById("numeroElegido").value = "";
    document.getElementById("puntaje").innerHTML = puntaje;
    document.getElementById("highscore").innerHTML = highscore;
    document.getElementById("intentos-restantes").innerHTML = intentos;
    document.getElementById("mensaje").innerHTML = "Tu puntaje inicial es 15.";
    document.getElementById("juego").classList.remove("hidden");
}

//Logica de la partida
document.getElementById("adivinar").addEventListener("click", function () {
    numeroElegido = parseInt(document.getElementById("numeroElegido").value);

    if (isNaN(numeroElegido) || numeroElegido < 1 || numeroElegido > 15) {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ingresa un número válido del 1 al 15.'
        });
        return; // Sale de la función si el número no es válido. Chequear esto, me salia error, asi se solicionó, buscar mas alternativas
    }

    if (numeroElegido === numeroObjetivo) {
        activarConfeti();
        Swal.fire({
            iconHtml: '<img src="../imagenes/festejando.avif" style="width: 50px;">',
            title: 'Genial',
            text: `¡Felicidades! Adivinaste el número en ${15 - intentos + 1} intentos!!!!.`
        }).then(() => {
            document.getElementById("mensaje").innerHTML = "Tu puntaje inicial es 15.";
        });

    if (puntaje > highscore) {
        highscore = puntaje;
        localStorage.setItem("highscore", highscore.toString());
        document.getElementById("highscore").innerHTML = highscore;
    }

        reiniciarJuego();//Partida ganada reinicio juego

    } 
    else {
        puntaje -= 1;
        intentos -= 1;

            if (puntaje <= 0) {
                Swal.fire({
                   iconHtml: '<img src="../imagenes/perdiste.jpeg" style="width: 50px;">',
                   title: 'Ups...',
                   text: `Perdiste! Tu puntaje llegó a ${puntaje}.`
            }).then(() => {
                document.getElementById("mensaje").innerHTML = "Tu puntaje inicial es 15.";
            });
            reiniciarJuego();//Jugador perdio, se quedo sin intentos
        } 
    else {
        mensaje = `Te quedan ${puntaje} puntos para seguir intentando`;
            if (numeroElegido < numeroObjetivo) {
                Swal.fire({
                    iconHtml: '<img src="../imagenes/crying.jpeg" style="width: 50px;">',
                    title: 'Ups...',
                    text: `Estás muy cerca. El número a adivinar es más alto. Te quedan ${puntaje} puntos para seguir intentando`
                });
            } else if (numeroElegido > numeroObjetivo) {
                Swal.fire({
                    iconHtml: '<img src="../imagenes/crying.jpeg" style="width: 50px;">',
                    title: 'Ups...',
                    text: `Estás muy cerca. El número a adivinar es más bajo. Te quedan ${puntaje} puntos para seguir intentando`
                });
            }
        }
    }

    // Asignar el mensaje al elemento "mensaje"
    document.getElementById("mensaje").innerHTML = mensaje;

    // Actualiza los intentos restantes en la vista
    document.getElementById("puntaje").innerHTML = puntaje;
    document.getElementById("intentos-restantes").innerHTML = intentos;
});

