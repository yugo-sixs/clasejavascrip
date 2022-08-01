//Metodo sin jQuery
document.addEventListener("DOMContentLoaded", function(event) {
    let element = document.getElementById("header")
    if (window.innerWidth>768){
        element.classList.add("sticky-top")
        document.getElementById('Temario').style.display="none"
    }
})

document.addEventListener("DOMContentLoaded", function(event) {
    window.addEventListener('resize',()=>{
        let element = document.getElementById("header")
        if (window.innerWidth<768){
            element.classList.remove("sticky-top")
            document.getElementById('Temario').style.display="block"
        }else
        {
            element.classList.add("sticky-top")
            document.getElementById('Temario').style.display="none"
        }
    })
})

//Usando jQuery
$(document).ready(function(){
    $('#myFiltroAlumnos').keyup(()=>{
        let filtro = $("#myFiltroAlumnos");
		let value  = filtro.val().toLowerCase();
        $("#tAlumnos tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    })
})

let alumnos=[]
let nA = 0

//Codigo que se ejecuta al dar click en el boton registrar de la Modal
$(document).ready(function(){
    $('#btnRegistrar').click(()=>{
        nA++
        let alumno = {}
        alumno.id = 'Alumno'+nA
        alumno.nombre =  $('#nombre').val()
        alumno.edad = $('#edad').val()
        alumno.fechaNacimiento = $('#fechaNacimiento').val()
        alumno.email = $('#email').val()
        alumno.calif = $('#calificacion').val()
        alumno.motivo = $('#motivo').val()
        if ($('#sexoMasculino:checked').val()=='on')
            alumno.sexo='Masculino'
        else
            alumno.sexo='Femenino'
        alumnos.push(alumno)
        agregarAlumno(alumno)
    })
})
//Funcion para cargar el documento de alumnos desde el sitio
$(document).ready(function(){
    let element = document.getElementById('cargarALumnosFromFile')
    element.addEventListener('click',()=>{
        window.fetch('http://localhost:8080/alumnos.json',{method: 'GET',headers:{"Accept": "application/json"}})
        .then((respuesta)=>respuesta.json())
        .then((data)=>{
            data.forEach((alumno)=>{
                nA++
                agregarAlumno(alumno)
            })
        })
    })
})

function agregarAlumno(alumno){
    let tr = document.createElement('tr')
    tr.setAttribute('id','Alumno'+nA)
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let td3 = document.createElement('td')
    let td4 = document.createElement('td')
    let td5 = document.createElement('td')
    let td6 = document.createElement('td')
    let td7 = document.createElement('td')

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
    tr.appendChild(td7)

    td1.innerHTML = `<i class="fa fa-trash text-danger" aria-hidden="true" id="A${nA}"></i> `+alumno.nombre
    td2.innerHTML = alumno.edad
    td3.innerHTML = alumno.fechaNacimiento
    td4.innerHTML = alumno.sexo
    td5.innerHTML = alumno.email
    if (alumno.calif<70){
        td6.innerHTML = alumno.calif + '  (Reprobado)'
        td6.classList.add('text-danger')
    }
    else {
        td6.innerHTML = alumno.calif + '  (Aprobado)'
        td6.classList.add('text-success')
    }
    td7.innerHTML = alumno.motivo
    
    document.getElementById('tAlumnos').appendChild(tr)
    agregarEventoBorrar(nA)
    $('#CantAlumnos').text(`Alumnos(${alumnos.length})`)
}

function agregarEventoBorrar(nA){
    let element = document.getElementById('A'+nA)
    element.addEventListener('click',(event)=>{
        let alumno = document.getElementById('Alumno'+nA)
        alumno.remove()
        let Pos=-1
        alumnos.forEach((alum,index)=>{
            if (alum.id==alumno.id)
                Pos = index
        })
        alumnos.splice(Pos,1)
        $('#CantAlumnos').text(`Alumnos(${alumnos.length})`)
    })
}
//para evitar eso se debe poner dentro del evento click del boton
//event.stopPropagation()   //en donde event es la variable que cacha el evento
