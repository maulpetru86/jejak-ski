Add-Type -AssemblyName System.Drawing

function New-Thumbnail {
    param(
        [string]$SourcePath,
        [string]$DestPath,
        [int]$TargetWidth = 360,
        [int]$Quality = 80,
        [float]$CropXRatio = 0.0,
        [float]$CropYRatio = 0.0,
        [float]$CropWidthRatio = 1.0,
        [float]$CropHeightRatio = 1.0
    )

    $srcFull = Resolve-Path $SourcePath
    $destFull = [System.IO.Path]::GetFullPath($DestPath)

    $bytes = [System.IO.File]::ReadAllBytes($srcFull)
    $ms = New-Object System.IO.MemoryStream(,$bytes)
    $srcImg = [System.Drawing.Image]::FromStream($ms)

    $srcX = [int]($srcImg.Width * $CropXRatio)
    $srcY = [int]($srcImg.Height * $CropYRatio)
    $srcW = [int]($srcImg.Width * $CropWidthRatio)
    $srcH = [int]($srcImg.Height * $CropHeightRatio)

    $targetHeight = [int]($TargetWidth * ($srcH / $srcW))
    $destBitmap = New-Object System.Drawing.Bitmap($TargetWidth, $targetHeight)
    $g = [System.Drawing.Graphics]::FromImage($destBitmap)
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $srcRect = New-Object System.Drawing.Rectangle($srcX, $srcY, $srcW, $srcH)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $TargetWidth, $targetHeight)
    $g.DrawImage($srcImg, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

    $outMs = New-Object System.IO.MemoryStream
    $destBitmap.Save($outMs, $codec, $encoderParams)

    $srcImg.Dispose()
    $g.Dispose()
    $destBitmap.Dispose()
    $ms.Dispose()

    [System.IO.File]::WriteAllBytes($destFull, $outMs.ToArray())
    $outMs.Dispose()

    $size = (Get-Item $destFull).Length
    Write-Host "Created $destFull - $([math]::Round($size / 1KB, 2)) KB"
}

# Create remaining thumbnails from high quality authentic assets
New-Thumbnail -SourcePath "static/img/card-kelas-xi-bg.png" -DestPath "static/img/thumbs/xi-3-mughal.jpg" -CropXRatio 0.4 -CropYRatio 0.3 -CropWidthRatio 0.6 -CropHeightRatio 0.65
New-Thumbnail -SourcePath "static/img/card-kelas-xi-bg.png" -DestPath "static/img/thumbs/xi-4-masuknya-islam-indonesia.jpg" -CropXRatio 0.0 -CropYRatio 0.2 -CropWidthRatio 0.7 -CropHeightRatio 0.7
New-Thumbnail -SourcePath "static/img/card-kelas-xii-bg.png" -DestPath "static/img/thumbs/xi-5-wali-sanga.jpg" -CropXRatio 0.05 -CropYRatio 0.15 -CropWidthRatio 0.5 -CropHeightRatio 0.65

New-Thumbnail -SourcePath "static/img/card-kelas-xii-bg.png" -DestPath "static/img/thumbs/xii-1-kerajaan-nusantara.jpg" -CropXRatio 0.3 -CropYRatio 0.1 -CropWidthRatio 0.65 -CropHeightRatio 0.7
New-Thumbnail -SourcePath "static/img/card-kelas-xii-bg.png" -DestPath "static/img/thumbs/xii-2-ulama-awal.jpg" -CropXRatio 0.45 -CropYRatio 0.2 -CropWidthRatio 0.55 -CropHeightRatio 0.7
New-Thumbnail -SourcePath "static/img/banner-kelas.png" -DestPath "static/img/thumbs/xii-3-organisasi-islam.jpg" -CropXRatio 0.1 -CropYRatio 0.1 -CropWidthRatio 0.8 -CropHeightRatio 0.8
New-Thumbnail -SourcePath "static/img/footer-bg.png" -DestPath "static/img/thumbs/xii-4-kemerdekaan.jpg" -CropXRatio 0.2 -CropYRatio 0.1 -CropWidthRatio 0.7 -CropHeightRatio 0.8
New-Thumbnail -SourcePath "static/img/hero-bg.png" -DestPath "static/img/thumbs/xii-5-tokoh-berpengaruh.jpg" -CropXRatio 0.2 -CropYRatio 0.1 -CropWidthRatio 0.6 -CropHeightRatio 0.8
