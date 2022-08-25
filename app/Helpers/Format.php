<?php
function responseFormat($code, $message, $params = null) {
    if ($code < 100) $code = 500;
    return response()->json([
        'message' => $message,
        'params' => $params
    ],$code);
}
function responseDataTable($params, $draw){
    return response()->json([
        'draw' => $draw,
        "recordsTotal" => $params->count(),
        "recordsFiltered" => $params->count(),
        'data' => $params
    ],200);
}
