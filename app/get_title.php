<?php # get_title.php

    if ( $_POST["url"] ) {
        $doc = new DOMDocument();
        @$doc->loadHTML( file_get_contents( $_POST["url"] ) );
        $xpt = new DOMXPath( $doc );
        $output = $xpt->query("//title")->item(0)->nodeValue;
    } else {
        $output = "URL not provided";
    }

    echo $output;

?>
