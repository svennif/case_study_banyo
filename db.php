<?php
class DB {
    
    const DB_HOST = 'localhost';
    const DB_NAME = 'development';
    const DB_USER = 'development';
    const DB_PASSWORD = 'ym0UTh8i6Tx0';

    public static function Connection(){
        
        $db = new PDO("mysql:host=".self::DB_HOST.";dbname=".self::DB_NAME.";charset=utf8", self::DB_USER, self::DB_PASSWORD);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

        return $db;
    }
}
?>
