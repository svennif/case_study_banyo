<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

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
  $stmt = $db->prepare("
  SELECT 
    bootstock_store_visits.order_date, 
    bootstock_store_visits.order_number,
    bootstock_store_visits.market,
    bootstock_store_visits.store_id,
    bootstock_transaction_products.transaction_type AS transaction_type,
    bootstock_transaction_products.amount,
    bootstock_transaction_products.product_id,
    bootstock_products.name as product_name,
    bootstock_stores.name as store_name
  FROM 
    development.bootstock_store_visits
  JOIN 
    development.bootstock_transaction_products ON bootstock_store_visits.order_number = bootstock_transaction_products.order_number
  JOIN
    development.bootstock_products ON bootstock_transaction_products.product_id = bootstock_products.product_id
  JOIN 
    development.bootstock_stores ON bootstock_store_visits.store_id = bootstock_stores.store_id
  WHERE 
    bootstock_store_visits.is_processed = 'no' AND bootstock_store_visits.market = 'DK';
  ");

  $stmt->execute();

  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($result);
  return json_encode($result);
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}
