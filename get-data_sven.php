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

    try {
      $stmt = $db->prepare("SELECT * FROM bootstock_store_visits");
      $stmt->execute();

      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

      echo json_encode($result);
      
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
    }