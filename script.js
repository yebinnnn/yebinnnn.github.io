function calcular() {
    const dolar = 1500;
    const feess = 12.2;
    const feecs= 15.4;
    const feessSec = 2.2;
    const feecsSec= 5.4;

    var valorInput = document.getElementById("valor_usd").value;
    var valorNumerico = parseFloat(valorInput.replace(',', '.'));
    var esConSeguro=document.getElementById("seguro");
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
    if(esConSeguro.checked){
        subtotal = (valorNumerico + feecs) * dolar;
        totalARS = Math.round(subtotal);
    }else{
        subtotal = (valorNumerico + feess) * dolar;
        totalARS = Math.round(subtotal);
    }
    
    
    document.getElementById("resultado").innerHTML = 
    `$${totalARS.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
    
    document.getElementById("aclaracion").innerHTML = 
    "precio sin envío e imp.";
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("valor_usd").focus();
    const disclaimer = document.querySelector("img[alt='www.000webhost.com']");
    if(disclaimer) disclaimer.remove();
});
