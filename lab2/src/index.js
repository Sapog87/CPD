import {MiniMaple} from "./miniMaple";

const miniMaple = new MiniMaple();

document.addEventListener('DOMContentLoaded',setup)

function setup() {
    document.getElementById('diff').onclick = differentiate;
}

function differentiate() {
    const polynomial = document.getElementById("polynomialInput").value;
    const variable = document.getElementById("variableInput").value;
    const resultDiv = document.getElementById("result");

    try {
        const result = miniMaple.diffPolynomial(polynomial, variable);
        resultDiv.innerHTML = result;
    } catch (error) {
        resultDiv.innerHTML = error.message;
    }
}