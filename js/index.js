$(document).ready(function() {
    onLoad();
    btnVotar();
    fillRegion();

    //fillComuna
    $("#region").change(function(){
        fillComuna();
    });

    fillCandidato()
});

function onLoad(){
    alert('Sólo cuentas con 1 voto.')
}

function resetForm(){
    $('#comuna').empty();
    $("form").trigger("reset");
}

function btnVotar(){
    $("#btnSubmit").click(function(event){

        var nombreCompleto = $("#nombreCompleto").val();
        var alias   = $("#alias").val();
        var rut     = $("#rut").val();
        var email   = $("#email").val();
        
        var region    = $("#region option:selected").val();
        var comuna    = $("#comuna option:selected").val();
        var candidato = $("#candidato option:selected").val();
        
        var canales = $("input[type='checkbox']:checked").length;

        var inWeb = $('#in_web').is(':checked'); //true or false
        var inTV = $('#in_tv').is(':checked'); 
        var inRRSS = $('#in_rrss').is(':checked'); 
        var inAmigo = $('#in_amigo').is(':checked'); 

        if (nombreCompleto == ""){
            alert('Debe especificar un Nombre.');
            event.preventDefault();
        }else if(alias == "" || alias.length <= 5){
            alert('Debe especificar un Alias válido.');
            event.preventDefault();
        }else if (!Fn.validaRut(rut)){
            alert('Debe especificar un RUT válido.');
            event.preventDefault();
        }else if(!validateEmail()){
            alert('Debe especificar un Correo válido.');
            event.preventDefault();
        }else if(region == ""){
            alert('Debe especificar una Región.');
            event.preventDefault();
        }else if(comuna == ""){
            alert('Debe especificar una Comuna.');
            event.preventDefault();
        }else if(candidato == ""){
            alert('Debe seleccionar un Candidato.');
            event.preventDefault();
        }else if(canales < 2){
            alert('Debe especificar al menos 2 canales de ¿Cómo se enteró de Nosotros?');
            event.preventDefault();
        }else{
            resetForm();
            insertVote(nombreCompleto, alias, rut, email, region, comuna, candidato, inWeb, inTV, inRRSS, inAmigo);
            event.preventDefault();
        }
        
    }); 
}

function insertVote(nombre, alias, rut, email, region, comuna, candidato, inWeb, inTV, inRRSS, inAmigo) {
    //var formData = $("form").serialize();
    $.ajax({
        url: 'index.php',
        method: "POST",
        data: {
            'nombreCompleto':nombre,
            'alias':alias,
            'rut':rut,
            'email':email,
            'region':region,
            'comuna':comuna,
            'candidato':candidato,
            'inWeb':inWeb,
            'inTV':inTV,
            'inRRSS':inRRSS,
            'inAmigo':inAmigo,
            'isSubmit':'isSubmit'
        },
        dataType: "text",
        success: function(txt) {
            alert('Se insertó el voto.');
        },
        error: function (request, status, error) {            
            alert("ERROR DE DUPLICIDAD.\nNo se insertó el voto.");
        }
    });
}


function fillRegion(){
    $.ajax({
        url: "index.php",
        method: "GET",
        data: {'get_region':'get_region'},
        dataType: 'json',
        success: function(json) {
            var options = '';
            $.each(json, function(index, value){
                //options += '<option value="' + value.ID + '" text="' + value.NOMBRE + ' - ' + value.SIMBOLO+ '" />';
                options += "<option value='" + value.ID + "'>" + value.NOMBRE + ' - ' + value.SIMBOLO + "</option>"
                
            });
            
            $('#region').append(options);

        }
    })
}

function fillComuna(){

    var region = $("#region option:selected").val();
    $('#comuna').empty();
    $.ajax({
        url: "index.php",
        method: "GET",
        data: {
            'get_comuna':'get_comuna',
            'region':region
        },
        dataType: 'json',
        success: function(json) {
            var options = '';
            $.each(json, function(index, value){
                //options += '<option value="' + value.ID + '" text="' + value.NOMBRE + ' - ' + value.SIMBOLO+ '" />';
                options += "<option value='" + value.ID + "'>" + value.NOMBRE + "</option>"
                
            });
            
            $('#comuna').append(options);

        }
    })
}

function fillCandidato(){
    $.ajax({
        url: "index.php",
        method: "GET",
        data: {
            'get_candidato':'get_candidato',
        },
        dataType: 'json',
        success: function(json) {
            var options = '';
            $.each(json, function(index, value){
                //options += '<option value="' + value.ID + '" text="' + value.NOMBRE + ' - ' + value.SIMBOLO+ '" />';
                options += "<option value='" + value.ID + "'>" + value.NOMBRE + "</option>"

            });
            
            $('#candidato').append(options);

        }
    })
}

var Fn = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto) {
		rutCompleto = rutCompleto.replace("‐","-");
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		
		return (Fn.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}


//Limita input a solo numeros, caracteres o ambos.
function permite(elEvento, permitidos) {
    var numeros = "0123456789";
    var caracteres = " aábcdeéfghiíjklmnñoópqrstuvwxyzAÁBCDEÉFGHIÍJKLMNÑOÓPQRSTUVWXYZ";
    var numeros_caracteres = numeros + caracteres;
    var teclas_especiales = [8, 37, 39, 46];
   
    switch(permitidos) {
      case 'num':
        permitidos = numeros;
        break;
      case 'car':
        permitidos = caracteres;
        break;
      case 'num_car':
        permitidos = numeros_caracteres;
        break;
    }
   
    var evento = elEvento || window.event;
    var codigoCaracter = evento.charCode || evento.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);
   
    var tecla_especial = false;
    for(var i in teclas_especiales) {
      if(codigoCaracter == teclas_especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    if (caracter === "." && permitidos.indexOf(".") === -1) {
        return false;
    }else if (caracter === "%" && permitidos.indexOf("%") === -1) {
        return false;
    }

    return permitidos.indexOf(caracter) != -1 || tecla_especial;
}

  
function validateEmail(){
                
    var inputEmail = document.getElementById('email');
    
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if( validEmail.test(inputEmail.value) ){
        return true;
    }else{
        return false;
    }
}
