"use strict"
let arrayTable = [];
let check = false;


window.onload = async function(){
    let busta = await fetch("http://localhost/TPSIT/Veterinari/server/prendi.php",{method:'GET'});
    let risposta = await busta.json();
    if(risposta.cod == 0){
        console.log(risposta);
    }
   
    var tabPazienti = document.getElementById("tabella");
    for(let paziente of risposta.pazienti){
    let data3 = (2023 - parseInt(paziente.dataNascita.split("-")[0]))
    console.log(data3);
    let tabella = `
    <tr class="trEvent" >
      <td>${paziente.nomePaziente}</td>
      <td>${paziente.cognomeProprietario}</td>
      <td>${paziente.dataNascita}</td>
      <td>${paziente.visita}</td>
      <td>${data3}</td>
    </tr>
    `;

    

    tabPazienti.innerHTML += tabella;

    let btPag2 = document.getElementById("btnPag2");
    btPag2.addEventListener("click",inputPag2);

    }

    var tr = document.querySelectorAll(".trEvent");
    for(let i = 0; i < tr.length; i++){
        console.log(tr[i]);
        tr[i].addEventListener("click",function(){
            check = true;
            mostraTr(tr[i]);
        });
    }

    

}

function inputPag2(){
    window.open("pag2.html?check=A");
}

function mostraTr(tr){
    let arrayTD = [];
    console.log(tr);
    let tdRows = tr.childNodes;
    let cont = 0;
    console.log(tdRows);
    for(let i = 0; i < tdRows.length;i++){
        if(i % 2 == 0){

        }else{
            arrayTD[cont]= tdRows[i].childNodes;
            cont++;
        }
    }
    console.log(arrayTD);
    console.log(arrayTD[0]);
    for(let i = 0; i < arrayTD.length; i++){
        const stringa = JSON.stringify(arrayTD[i][0].data);
        arrayTable[i] = stringa;
        console.log(stringa);
        console.log(arrayTable[i]);
    }
    check = true;
    
    window.open("pag2.html?NomePaziente=" + arrayTable[0] + "&CognomeProp=" + arrayTable[1] + "&DataNs=" + arrayTable[2] + "&Visita=" + arrayTable[3] + "&check=B");
    window.focus();
    // window.open("pag2.html");
    
}


//Qua dentro è tutto null,persino le variabili globa
// (Versione Luca): mi passo le informazioni tramite URL


// function init(){
//     // alert(check);
//     // let campi = document.getElementsByName("txtDati");
//     // console.log(campi);

//     // alert(campi);
//     // for(let i = 0; i < campi.length; i++){
//     //     campi[i].text = "DAJE";
//     //     console.log(arrayTable[i]);
        
//     // }
    
//     // if(arrayTable[0] != undefined){
//     //     alert("ciao");
        
//     // }

//     // Estrapolo i Valori tramite URL

// }