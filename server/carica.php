<?php
$jObj = null;

//1. Collegarci al db

$indirizzoServerDBMS = "localhost";
$nomeDb = "veterinari";
$conn = mysqli_connect($indirizzoServerDBMS, "root", "", $nomeDb);
if($conn->connect_errno>0){
    $jObj = preparaRisp(-1, "Connessione rifiutata");
}else{
    $jObj = preparaRisp(0, "Connessione ok");
}


//2. Prelevare un dato json che arriva dal client
$record = file_get_contents("php://input");
$record = json_decode($record);

$nome= $record[0];
$cognomeProp= $record[1];
$dataN = $record[2];
$visita = $record[3];



//4. Costruire la INSERT
$query = "INSERT INTO pazienti (nomePaziente,cognomeProprietario,dataNascita,visita) VALUES ('$nome','$cognomeProp','$dataN','$visita')";
$ris = $conn->query($query);
if($ris && $conn->affected_rows > 0){
    $jObj = preparaRisp(0, "Inserimento avvenuto con successo");
}else{
            $jObj = preparaRisp(-2, "Errore nella query: ".$conn->error);
}



//Rispondo al javascript (al client)
echo json_encode($jObj);


function preparaRisp($cod, $desc, $jObj = null){
    if(is_null($jObj)){
        $jObj = new stdClass();
    }
    $jObj->cod = $cod;
    $jObj->desc = $desc;
    return $jObj;
}

