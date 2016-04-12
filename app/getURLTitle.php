<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
 <?php
	function get_page_title($url){

	if( !($data = file_get_contents($url)) ) return false;

	if( preg_match("#(.+)<\/title>#iU", $data, $t))  {
		return trim($t[1]);
	} else {
		return false;
	}
	}
	?>
 </body>
</html>