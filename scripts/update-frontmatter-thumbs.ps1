$map = @{
    "docs/kelas-xi/bab-1-usmani.md" = "/img/thumbs/xi-1-usmani.jpg"
    "docs/kelas-xi/bab-2-safawi.md" = "/img/thumbs/xi-2-safawi.jpg"
    "docs/kelas-xi/bab-3-mughal.md" = "/img/thumbs/xi-3-mughal.jpg"
    "docs/kelas-xi/bab-4-masuknya-islam-indonesia.md" = "/img/thumbs/xi-4-masuknya-islam-indonesia.jpg"
    "docs/kelas-xi/bab-5-wali-sanga.md" = "/img/thumbs/xi-5-wali-sanga.jpg"
    "docs/kelas-xii/bab-1-kerajaan-nusantara.md" = "/img/thumbs/xii-1-kerajaan-nusantara.jpg"
    "docs/kelas-xii/bab-2-ulama-awal.md" = "/img/thumbs/xii-2-ulama-awal.jpg"
    "docs/kelas-xii/bab-3-organisasi-islam.md" = "/img/thumbs/xii-3-organisasi-islam.jpg"
    "docs/kelas-xii/bab-4-kemerdekaan.md" = "/img/thumbs/xii-4-kemerdekaan.jpg"
    "docs/kelas-xii/bab-5-tokoh-berpengaruh.md" = "/img/thumbs/xii-5-tokoh-berpengaruh.jpg"
}

foreach ($item in $map.GetEnumerator()) {
    $filePath = $item.Key
    $thumb = $item.Value
    if (Test-Path $filePath) {
        $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
        if ($content -notmatch "thumbnail:\s*") {
            $content = $content -replace "(terakhir_diperbarui:\s*`"[^`"]*`")", "thumbnail: `"$thumb`"`n`$1"
            [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
            Write-Host "Updated thumbnail in $filePath"
        }
    }
}
