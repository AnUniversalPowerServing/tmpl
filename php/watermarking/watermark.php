<?php
// Create image instances
$image = 'bg.png';
$image_src = imagecreatefrompng($image);
list($image_width, $image_height) = getimagesize($image);
// echo $image_width.' '.$image_height.'<br/>';

$watermark = 'watermark.png';
$watermark_src = imagecreatefrompng($watermark);
list($watermark_width, $watermark_height) = getimagesize($watermark);
// echo $watermark_width.' '.$watermark_height;

imagecopyresized($image_src, $watermark_src, 0, 0, 0, 0, $image_width, $image_height, $watermark_width, $watermark_height);

// Output and free from memory
header('Content-type: image/png');
imagepng($image_src);
imagedestroy($image_src);
?>