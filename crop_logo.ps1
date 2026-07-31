Add-Type -AssemblyName System.Drawing
$srcPath = "c:\Users\Aryan\Desktop\O3 Website\assets\o3_official_brand_poster.jpg"
$destPath = "c:\Users\Aryan\Desktop\O3 Website\assets\o3_official_logo.png"

$img = [System.Drawing.Image]::FromFile($srcPath)
# Poster size is typically around 680x1024 or similar aspect ratio.
# Let's crop the top left logo area
$cropRect = New-Object System.Drawing.Rectangle(20, 70, 420, 160)
$bmp = New-Object System.Drawing.Bitmap($cropRect.Width, $cropRect.Height)
$graphics = [System.Drawing.Graphics]::FromImage($bmp)
$graphics.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $cropRect.Width, $cropRect.Height)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)

$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Logo successfully cropped and saved to $destPath"
