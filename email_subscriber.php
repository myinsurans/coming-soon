<?php
$servername = "localhost";
$username = "yogesh"; //server username
//$username = "root";
$password = "SENLm34EQcu6tjt3"; //Server password
//$password = "1270yoge@5754"; //localhost password
$dbname = "yogesh_db";

// Create connection
$conn = mysqli_connect($servername,$username,$password,$dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if($_GET["user-email"] == "") {
    $errors["user-email"] = "Please enter your e-mail";
} else {
    $user_mail = $_GET["user-email"];
}

$created_datetime = date("Y-m-d H:i:s");

$message = "";
if(empty($errors))
{
    $sql = "INSERT INTO subscribers (email, created_datetime)
                VALUES ('".$user_mail."', '".$created_datetime."')";
    if (mysqli_query($conn, $sql)) {
        $response["ok"] = 1;
        $message = "Thank you for subscribing myinsurans.";
    } else {
        $message = "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
} else {

    foreach($errors as $error) {
        $message .= "<p>".$error."</p>";
    }

}
$response["message"] = $message;
echo json_encode($response);
mysqli_close($conn);

?>