<?php
$jObj = null;
    $indirizzoServer = "localhost";
    $nomeDB = "veterinari";
    $conn = mysqli_connect($indirizzoServer,"root","",$nomeDB);
    if($conn->connect_errno > 0){
        $jObj = preparaRisp(-1,"Connessione rifiutata");
    }else{
        $jObj = preparaRisp(0,"Connessione OK");
    }

    $Query = "SELECT * from pazienti";
    $ris = $conn->query($Query);
    if($ris){
        $jObj->pazienti = array();
        $cont = 0;
        if($ris->num_rows > 0){
            while($vet = $ris->fetch_assoc()){
                array_push($jObj->pazienti,$vet);
            }
        }else{
            $jObj = preparaRisp(-1,"NO FOUND");
        }
    }else{
        $jObj = preparaRisp(-1,"ERROR Query!!!!");
    }

    echo json_encode($jObj);

function preparaRisp($cod, $desc, $jObj = null){
        if(is_null($jObj)){
            $jObj = new stdClass();
        }
        $jObj->cod = $cod;
        $jObj->desc = $desc;
        return $jObj;
    }


?>