<?php
    header("Access-Control-Allow-Origin: *");

    /**
     * Error logging for debugging:
     * 
     * ini_set('display_errors', 1);
     * ini_set('display_startup_errors', 1);
     * error_reporting(E_ALL);
     */

    include("db.php");

    $db = DB::Connection();