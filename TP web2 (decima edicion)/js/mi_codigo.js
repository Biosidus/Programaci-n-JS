/* 
Archivo mi_codigo.js
En este archivo programaremos el código correspondiente
al juego de Trivia.
 */
let indice_pregunta_actual;
let total_puntos;

indice_pregunta_actual=1;
total_puntos=8;

const nombre="Emiliano";
const maximo_preguntas_por_jugada=4;
const puntos_resultado_bien=4;

function mostrar_resultado(){
	document.querySelector("#pantalla-juego").classList.add("d-none");
	document.querySelector("#pantalla-resultado").classList.remove("d-none");
	document.querySelector("#pantalla-juego").classList.remove("bien");
    if(total_puntos >= puntos_resultado_bien){
	document.querySelector("#pantalla-juego").classList.add("bien");
    }
    else{
    document.querySelector("#pantalla-juego").classList.add("mal");
    }
    document.querySelector("#resultado_puntos").textContent =total_puntos;
    document.querySelector("#resultado-boton-volver-a-jugar").classList.remove("d-none");
   
}

document.querySelector("#resultado-boton-volver-a-jugar").addEventListener("click", iniciarJuego);


function obtenerSiguientePregunta(){
    indice_pregunta_actual++;
    if (indice_pregunta_actual < maximo_preguntas_por_jugada && indice_pregunta_actual < preguntas.length) {
    return preguntas[indice_pregunta_actual];	
    } else{
    	return null;
    }
}

function mostrarPregunta(pregunta){
    	document.querySelector("#pregunta-numero").textContent = indice_pregunta_actual + 1 +") ";
    	document.querySelector("#pregunta-texto").textContent = pregunta.pregunta;
    	document.querySelector("#pregunta-imagen").src = pregunta.imagen_src;
		let div_opciones = document.querySelectorAll("#opciones div");
		let input_opciones = document.querySelectorAll("#opciones input");
		let label_opciones = document.querySelectorAll("#opciones label");

		for (let i = 0; i < 3; i++) {
			div_opciones[i].classList.remove("correcta");
			div_opciones[i].classList.remove("erronea");
			input_opciones[i].checked= false;
			input_opciones[i].value = pregunta.opciones[i];
			label_opciones[i].textContent =pregunta.opciones[i];}
}

function verificarPreguntaActual(){
	let input_opciones=document.querySelectorAll("#opciones input");
	let pregunta=preguntas[indice_pregunta_actual];
	for(let i=0; i < input_opciones.length; i++){
		let recuadro= document.querySelector("."+input_opciones[i].id);
		if(input_opciones[i].value == pregunta.respuesta_correcta){
			recuadro.classList.add("correcta");
			if(input_opciones[i].checked){
				total_puntos++;
			} 
		} else {
			if (input_opciones[i].checked){
				recuadro.classList.add("erronea");}
		}
	}
}

function manejadorBotonVerificar(){
	if (document.querySelector("input:checked")) {
		verificarPreguntaActual();
		document.querySelector("#boton-verificar").classList.add("d-none");
		document.querySelector("#boton-siguiente").classList.remove("d-none");
	}
}

document.querySelector("#boton-verificar").addEventListener("click", manejadorBotonVerificar);

function manejadorBotonSiguiente(){
	let pregunta =obtenerSiguientePregunta();
	if(pregunta != null){
		mostrarPregunta(pregunta);
	} else{
		mostrar_resultado();
	}
		document.querySelector("#boton-verificar").classList.remove("d-none");
		document.querySelector("#boton-siguiente").classList.add("d-none");
}

document.querySelector("#boton-siguiente").addEventListener("click", manejadorBotonSiguiente);

/*console.log("Total de puntos: "+ total_puntos);*/

function iniciarJuego(){
	document.querySelector("#pantalla-resultado").classList.add("d-none");
    document.querySelector("#pantalla-inicio").classList.add("d-none");
    document.querySelector("nav").classList.add("d-none");
    document.querySelector("#header").classList.remove("d-none");
    document.querySelector("#pantalla-juego").classList.remove("d-none");
    indice_pregunta_actual=0;
    total_puntos=0;
    desordenarArray(preguntas);
    mostrarPregunta(preguntas[indice_pregunta_actual]);
}

document.querySelector("#inicio-boton-jugar").addEventListener("click", iniciarJuego);

