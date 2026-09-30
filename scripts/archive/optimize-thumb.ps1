param(
    [string]$FilePath,
    [int]$TargetWidth = 360,
    [int]$Quality = 80
)

Add-Type -AssemblyName System.Drawing

$fullPath = Resolve-Path $FilePath
$bytes = [System.IO.File]::ReadAllBytes($fullPath)
$ms = New-Object System.IO.MemoryStream(,$bytes)
$img = [System.Drawing.Image]::FromStream($ms)

$newHeight = [int]($img.Height * ($TargetWidth / $img.Width))
$thumb = New-Object System.Drawing.Bitmap($TargetWidth, $newHeight)
$graph = [System.Drawing.Graphics]::FromImage($thumb)
$graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graph.DrawImage($img, 0, 0, $TargetWidth, $newHeight)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

$outMs = New-Object System.IO.MemoryStream
$thumb.Save($outMs, $codec, $encoderParams)

$img.Dispose()
$graph.Dispose()
$thumb.Dispose()
$ms.Dispose()

[System.IO.File]::WriteAllBytes($fullPath, $outMs.ToArray())
$outMs.Dispose()

$newSize = (Get-Item $fullPath).Length
Write-Host "Optimized $FilePath - New size: $([math]::Round($newSize / 1KB, 2)) KB"
