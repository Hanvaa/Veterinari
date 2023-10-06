"use script"

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    let input = document.getElementsByClassName("txtDati");
    console.log(input);
    const check = urlParams.get("check");

    $("#btnElenco").on("click",function(){
        window.location.replace("pag1.html");
    })

   
    
    if(check == 'A'){
        let cnt = 0;
        let h1 = document.createElement("h1");
        h1.innerHTML="Inserisci i dati!!";
        $("#titleHidd").append(h1);
        console.log(input[0].value);
        $("#btnInvia").on("click",function(){
            for(let i = 0; i < input.length; i++){
                if(input[i].value == ""){
                    $("#btnInvia").attr('disabled','disabled');
                    input[i].style.border="2px solid red";
                    cnt++;
                }
            }
            if(cnt > 0){
                let h2 = document.createElement("h2");
                h2.innerHTML = "Inserisci i Dati in tutti i campi!!!";
                h2.style.color="red";
                $("#titleHidd").append(h2);
            }else{
                $("#btnInvia").attr("disabled","false");
                let v = new Array(4);
                for(let i = 0; i < v.length;i++){
                    v[i] = input[i].value;
                }
                inviaDati(v);
              
            }
        })
    }else{
        $("#btnInvia").attr('disabled','disabled');
        alert("Bashuri");
        const nomePaziente = urlParams.get("NomePaziente");
        const cognProprietario = urlParams.get("CognomeProp");
        const dataNascita = urlParams.get("DataNs");
        const visita = urlParams.get("Visita");
        console.log(nomePaziente);
        console.log(cognProprietario);
        console.log(dataNascita);
        console.log(visita);
        console.log(check);

        input[0].value = nomePaziente;
        input[1].value = cognProprietario;
        input[2].value = dataNascita;
        input[3].value = visita;

        for(let i = 0; i < input.length;i++){
            input[i].disabled = true;
        }
        console.log(input[0]);
    
    }

    

}

async function inviaDati(v){
    console.log(v);
    let busta = await fetch("http://localhost/TPSIT/Veterinari/server/carica.php",{
        method:"post",
        body:JSON.stringify(v)
        }
    );
}