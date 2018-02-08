
function botonCambio() { // ESTO SOLUCIONO EL PROBLEMA https://stackoverflow.com/questions/4340690/javascript-onclick-alert-not-working-in-chrome
    var selectList = $('select#tipo_pago');
    var selectedValue = $('option:selected', selectList).val();

    //alert(selectedValue);

    if (selectedValue == 'DEBITO') {
        mostrardebito();
    }
    if (selectedValue == 'CREDITO') {
        mostrarcredito();
    }
}



document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("botonCredito").addEventListener("click", mostrarcredito);
});
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("botonDebito").addEventListener("click", mostrardebito);
});

function mostrarcredito() {
  div = document.getElementById('formulariocredito');
  div.style.display = '';
  div = document.getElementById('formulariodebito');
  div.style.display = 'none';
};

function mostrardebito() {
  div = document.getElementById('formulariodebito');
  div.style.display = '';
  div2 = document.getElementById('formulariocredito');
  div2.style.display = 'none';
}

function mostrarnuevos() {
  document.getElementById('formularionuevocredito').style.display = '';
  document.getElementById('formularionuevodebito').style.display = '';
}

function ocultarnuevos() {
  document.getElementById('formularionuevocredito').style.display = 'none';
  document.getElementById('formularionuevodebito').style.display = 'none';
};
