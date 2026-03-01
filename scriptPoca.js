function calcular() {
    const dolar = 1495;

    var valorInput = document.getElementById("valor_usd").value;
    var valorNumerico = parseFloat(valorInput.replace(',', '.'));
    var subtotal;
    var totalARS;
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv.textContent = "";
    if (isNaN(valorNumerico) || valorNumerico<=0) {
        errorMessageDiv.textContent = "Ingresá un número";
        document.getElementById("resultado").innerHTML = "";
        document.getElementById("aclaracion").innerHTML = "";
        return;
    }
    subtotal = valorNumerico * dolar;
    totalARS = Math.round(subtotal);
            
    
    
    document.getElementById("resultado").innerHTML = 
    `$${totalARS.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
    
    document.getElementById("aclaracion").innerHTML = 
    "Cotización sin envío a Corea";
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("valor_usd").focus();
    const disclaimer = document.querySelector("img[alt='www.000webhost.com']");
    if(disclaimer) disclaimer.remove();
});