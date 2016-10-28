<?php

# Requerir archivo base..
require_once 'base.php';

// Peticion GET.
$app->get('/eventos',function($request,$response,$args) use ($db) {
});

// Eliminar conexión a base de datos.
unset($db);

// Salida del Framewrok.
$app->run();