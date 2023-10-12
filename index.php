<?php 
include './dbcon.php';
//querySelect();

function querySelect(){
    global $link;

    $sql = 'SELECT * FROM candidato';
    $result = $link->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()){
            echo 'ID: '.$row['id']; echo '<br>';
            echo 'Nombre: '.$row['nombre_completo']; echo '<br>';
            echo 'RUT: '.$row['rut']; echo '<br>';
            echo 'Vigente: '.$row['activo']; echo '<br>';
        }
    } else {
        echo "Error: " . $sql . "<br>" . $link->error;
    }
    
    $link->close();

}

function fillRegion(){
    global $link;

    $sql = 'SELECT * FROM region';
    $result = $link->query($sql);

    while($row = $result->fetch_assoc()){      
        $regiones[] = array(
            'ID'      => trim($row['id']),
            'NOMBRE'  => trim($row['nombre']),
            'SIMBOLO' => trim($row['simbolo']),
            'ACTIVO'  => trim($row['activo'])
        );
    }
    
    echo json_encode($regiones);

    $link->close();
}

if (isset($_GET["get_region"])){
    fillRegion();
}

function fillComuna($id_region){
    global $link;

    $sql = "SELECT * FROM comuna WHERE id_region = $id_region";
    $result = $link->query($sql);

    while($row = $result->fetch_assoc()){      
        $comunas[] = array(
            'ID'        => trim($row['id']),
            'NOMBRE'    => trim($row['nombre']),
            'ID_REGION' => trim($row['id_region']),
            'ACTIVO'    => trim($row['activo'])
        );
    }
    
    echo json_encode($comunas);

    $link->close();
}

if (isset($_GET["get_comuna"])){
    $id_region = $_GET["region"];
    fillComuna($id_region);
}

function fillCandidato(){
    global $link;

    $sql = "SELECT * FROM candidato";
    $result = $link->query($sql);

    while($row = $result->fetch_assoc()){      
        $candidatos[] = array(
            'ID'        => trim($row['id']),
            'NOMBRE'    => trim($row['nombre_completo']),
            'RUT' => trim($row['rut']),
            'ACTIVO'    => trim($row['activo'])
        );
    }
    
    echo json_encode($candidatos);

    $link->close();
}

if (isset($_GET["get_candidato"])){    
    fillCandidato();
}


function insertVoto($nombre, $alias, $rut, $email, $region, $comuna, $candidato,
                        $in_web, $in_tv, $in_rrss, $in_amigo, $activo){
    global $link;

    $sqlCount = "SELECT COUNT(*) AS COUNT FROM voto WHERE rut = '$rut'";
    $resultCount = $link->query($sqlCount);
    $row = $resultCount->fetch_assoc(); // Obtiene el resultado de la consulta
    $count = $row['COUNT']; // Obtiene el valor del conteo

    if ($count > 0) {
        echo "ERROR DE DUPLICIDAD."; echo '<br>'; echo '<br>';
        http_response_code(409);
    } else {
        $sqlInsert = "INSERT INTO voto (nombre_completo, alias, rut, email, region, comuna, candidato, in_web, in_tv, in_rrss, in_amigo, activo)
            VALUES ('$nombre', '$alias', '$rut', '$email', $region, $comuna, $candidato, $in_web, $in_tv, $in_rrss, $in_amigo, $activo)";
        $resultInsert = $link->query($sqlInsert);
        
        if ($resultInsert) {
            echo "Se insertó el voto correctamente."; echo '<br>';
        } else {
            echo "Error: " . $sql . "<br>" . $link->error; echo '<br>';
            http_response_code(409);
        }
    }

}

if (isset($_POST['isSubmit'])){
    submitDatos();
}

function submitDatos(){
    $nombre = $_POST["nombreCompleto"];
    $alias  = $_POST["alias"];
    $rut    = $_POST["rut"];
    $email  = $_POST["email"];
    $region = $_POST["region"];
    $comuna = $_POST["comuna"];
    $candidato = $_POST["candidato"];

    $in_web = $_POST["inWeb"]; 
    if ($in_web == 'true'){
        $in_web = 1;
    }else { 
        $in_web = 0;
    }

    $in_tv = $_POST["inTV"];
    if ($in_tv == 'true'){
        $in_tv = 1;
    }else { 
        $in_tv = 0;
    }

    $in_rrss = $_POST["inRRSS"];
    if ($in_rrss == 'true'){
        $in_rrss = 1;
    }else { 
        $in_rrss = 0;
    }

    $in_amigo = $_POST["inAmigo"];
    if ($in_amigo == 'true'){
        $in_amigo = 1;
    }else { 
        $in_amigo = 0;
    }

    $activo = 1;

    insertVoto($nombre, $alias, $rut, $email, $region, $comuna, $candidato, $in_web, $in_tv, $in_rrss, $in_amigo, $activo);
    echo "INFORMACIÓN DEL VOTO"; echo '<br>';
    echo "----------------------------------"; echo '<br>';
    echo "Nombre: ".$nombre; echo '<br>';
    echo "Alias: ".$alias; echo '<br>';
    echo "RUT: ".$rut; echo '<br>';
    echo "Correo: ".$email; echo '<br>';
    echo "Region: ".$region; echo '<br>';
    echo "Comuna: ".$comuna; echo '<br>';
    echo "Candidato: ".$candidato; echo '<br>';
    echo "Web: ".$in_web; echo '<br>';
    echo "TV: ".$in_tv; echo '<br>';
    echo "RRSS: ".$in_rrss; echo '<br>';
    echo "Amigo: ".$in_amigo; echo '<br>';

}
?>
