<?php

header("content-type : application/json");
$data = json_decode(file_get_contents("php://input"),true);


?>