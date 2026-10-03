// Variable global para almacenar la tasa de cambio JPY -> USD
let tasaJpyToUsd = null;

// Función para obtener la cotización del Yen en tiempo real al cargar la página
async function obtenerCotizacionYen() {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/JPY');
        const data = await response.json();
        tasaJpyToUsd = data.rates.USD;
    } catch (error) {
        console.error("Error obteniendo la cotización del Yen:", error);
        // Valor de respaldo (fallback) por si falla la API
        tasaJpyToUsd = 0.0066; 
    }
}

async function calcular() {
    const dolar = 1650;
    const feesPaypal = 1.035;

    // Si aún no se cargó la cotización del yen, la obtenemos antes de calcular
    if (!tasaJpyToUsd) {
        await obtenerCotizacionYen();
    }

    // Calculamos el valor en USD de los 200 yenes de tarifa proxy de Doorzo
    const feesDoorzoUSD = 200 * tasaJpyToUsd;

    var valorInput = document.getElementById("valor_usd").value;
    var valorDiv = document.getElementById("valor_div").value;
    var styDiv = document.getElementById("valor_div");
    
    var valorNumerico = parseFloat(valorInput.toString().replace(',', '.'));
    
    var esConSeguro = false;
    var checkOculto = document.getElementById("checkOculto");
    var subtotal;
    var totalARS;
    
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv.textContent = "";

    // Validación de entrada
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
        errorMessageDiv.textContent = "Ingresá un número";
        document.getElementById("resultado").innerHTML = "";
        document.getElementById("aclaracion").innerHTML = "";
        return;
    } else if (valorNumerico === 251202) {
        if (!checkOculto.checked) {
            errorMessageDiv.textContent = "Hola Yeye y Samu";
            document.getElementById("resultado").innerHTML = "";
            document.getElementById("aclaracion").innerHTML = "";
            checkOculto.checked = !checkOculto.checked;
            styDiv.setAttribute('style', 'display:flex;');
            return;
        } else {
            errorMessageDiv.textContent = "Adiós Yeye y Samu";
            document.getElementById("resultado").innerHTML = "";
            document.getElementById("aclaracion").innerHTML = "";
            checkOculto.checked = !checkOculto.checked;
            styDiv.setAttribute('style', 'display:none;');
            valorDiv = 1;
            return;
        }
    }

    // Cálculo dinámico de Doorzo:
    // (Precio Buyee USD + 200 Yenes pasados a USD) * 3.5% Paypal * Cotización Dólar ARS
    subtotal = ((valorNumerico + feesDoorzoUSD) * feesPaypal) * dolar;
    totalARS = Math.ceil(subtotal / valorDiv);

    // Mostrar resultados en el HTML
    document.getElementById("resultado").innerHTML = 
    `$${totalARS.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
    
    document.getElementById("aclaracion").innerHTML = 
    "Cotización sin envío a Corea";
}

document.addEventListener('DOMContentLoaded', () => {
    // Consultar el yen apenas carga la página para que el cálculo sea instantáneo al presionar el botón
    obtenerCotizacionYen();

    document.getElementById("valor_usd").focus();
    
    // Si la persona presiona 'Enter' en el input de USD, ejecuta calcular()
    document.getElementById("valor_usd").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            calcular();
        }
    });

    const disclaimer = document.querySelector("img[alt='www.000webhost.com']");
    if (disclaimer) disclaimer.remove();
});
