<?php
define("DB_HOST", "localhost");
define("DB_USERNAME", "root");
define("DB_PASSWORD", "");
define("DB_DATABASE", "PHPoll");
define("DB_PORT", 3306);

$link = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT);
// Check connection
if ($link->connect_error) {
    die("Connection failed: " . $link->connect_error);
}
//echo "Connected successfully";echo '<br>';

?>