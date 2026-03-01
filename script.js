function calcular() {
    const dolar = 1542;
    const feess = 2.25;
    const feecs= 5.5;

    var valorInput = document.getElementById("valor_usd").value;
    var valorDiv = document.getElementById("valor_div").value;
    var styDiv = document.getElementById("valor_div");
    var valorNumerico = parseFloat(valorInput.replace(',', '.'));
    var esConSeguro=document.getElementById("seguro");
    var checkOculto=document.getElementById("checkOculto");
    var subtotal;
    var totalARS;
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv.textContent = "";
    if (isNaN(valorNumerico) || valorNumerico<=0) {
        errorMessageDiv.textContent = "Ingresá un número";
        document.getElementById("resultado").innerHTML = "";
        document.getElementById("aclaracion").innerHTML = "";
        return;
    }else if(valorNumerico===25120206){
        if(!checkOculto.checked){
            errorMessageDiv.textContent = "Hola Yeye/Noah/Juju";
            document.getElementById("resultado").innerHTML = "";
            document.getElementById("aclaracion").innerHTML = "";
            checkOculto.checked = !checkOculto.checked;
            styDiv.setAttribute('style', 'display:flex;');
            return;
        }else{
            errorMessageDiv.textContent = "Adiós Yeye/Noah/Juju";
            document.getElementById("resultado").innerHTML = "";
            document.getElementById("aclaracion").innerHTML = "";
            checkOculto.checked = !checkOculto.checked;
            styDiv.setAttribute('style', 'display:none;');
            valorDiv=1;
            return;
        }
    }
    if(esConSeguro.checked){
        subtotal = (valorNumerico + feecs) * dolar;
        totalARS = Math.round(subtotal/valorDiv);
    }else{
        subtotal = (valorNumerico + feess) * dolar;
        totalARS = Math.round(subtotal/valorDiv);
    }
    
    
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
