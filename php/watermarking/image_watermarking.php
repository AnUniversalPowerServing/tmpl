<?php
$filename = 'watermark.png';
$percent = 0.5;

// Content type
header('Content-Type: image/jpeg');

// Get new sizes
list($width, $height) = getimagesize($filename);
$newwidth = $width * $percent;
$newheight = $height * $percent;

// Load
$thumb = imagecreatetruecolor($newwidth, $newheight);
$source = imagecreatefrompng($filename);

// Resize
imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

// Output
$watermark = imagepng($thumb);
// $watermark = imagecreatefrompng('watermark.png');
$imageURL = imagecreatefrompng('bg.png');
$watermarkX = imagesx($watermark);
$watermarkY = imagesy($watermark);

// imagecopy($imageURL, $watermark, imagesx($imageURL)/5, imagesy($imageURL)/5, 0, 0, $watermarkX, $watermarkY);
// imagecopy($imageURL, $watermark, imagesx($imageURL)/2-($watermarkX/2), imagesy($imageURL)/2-($watermarkY/2),
// 0, 0, $watermarkX, $watermarkY);
 
imagecopy($imageURL, $watermark, imagesx($imageURL)/5, imagesy($imageURL)/5,
 0, 0, $newwidth, $newheight);
header('Content-type: image/png');
imagepng($imageURL);
imagedestroy($imageURL);

/*
header('content-type: image/jpeg');

$image = imagecreatefromjpeg('bg.png');
$imageSize = getimagesize('bg.png');

$watermark = imagecreatefrompng('watermark.png');

$watermark_o_width = imagesx($watermark);
$watermark_o_height = imagesy($watermark);

$newWatermarkWidth = $imageSize[0]-20;
$newWatermarkHeight = $watermark_o_height * $newWatermarkWidth / $watermark_o_width;

$success = imagecopyresized($image,                 // Destination image
           $watermark,                              // Source image
           $imageSize[0]/2 - $newWatermarkWidth/2,  // Destination X
           $imageSize[1]/2 - imagesy($watermark)/2, // Destination Y
           0,                                       // Source X
           0,                                       // Source Y
           $newWatermarkWidth,                      // Destination W
           imagesy($watermark),                     // Destination H
           imagesx($watermark),                     // Source W
           imagesy($watermark));                    // Source H
imagejpeg($image);

imagedestroy($image);
imagedestroy($watermark);
*/
?>