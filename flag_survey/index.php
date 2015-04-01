<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />

		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

		<title>Flaggen der Welt - Umfrage</title>
		<meta name="author" content="Kevin Schiffer" />

		<meta name="viewport" content="width=device-width; initial-scale=1.0" />

		<!-- Replace favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
		<link rel="stylesheet" href="styles.css" />
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="main.js"></script>
	</head>

	<body>
		
		<div class="wrapper">
			<h2><?php $lines = file("fragen.txt"); echo "1. ".$lines[0]; ?></h2>
			<p>Bitte wählen Sie nur aus rein formal-ästhetischen Gründen und lassen Sie ihre Wahl soweit möglich nicht von ihrer Haltung zum jeweiligen Land beeinflussen. 
				Bitte sehen Sie sich alle Flaggen an, bevor Sie eine Entscheidung treffen. <strong>Vielen Dank!</strong></p>
			<hr>
<?php
$flags = array();
if ($handle = opendir('./flags')) {
    while (false !== ($file = readdir($handle))) {
        if (substr($file,-3) === 'png') {
        	array_push($flags, $file);
        }
    }
    closedir($handle);
	
	shuffle($flags);
	
	foreach ($flags as $file) {
		echo '<div class="holder"><img src="flags/'.$file.'" /></div>'."\n";
	}
}

?>
		<br style="clear:both;">
		</div>
		
		<div class="bottom"><div class="button-wrapper"><a href="#" class="cancel">Auswahl löschen</a><a href="#" class="submitter">Diese Flagge auswählen</a></div></div>
	</body>
</html>
