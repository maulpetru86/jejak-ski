$files = @(
    "docs/kelas-x/index.md",
    "docs/kelas-xi/index.md",
    "docs/kelas-xii/index.md"
)

foreach ($f in $files) {
    if (Test-Path $f) {
        $content = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
        $newContent = [System.Text.RegularExpressions.Regex]::Replace(
            $content,
            '<p className="chapter-catalog-desc">([\s\S]*?)</p>',
            '<div className="chapter-catalog-desc">$1</div>'
        )
        [System.IO.File]::WriteAllText($f, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed nested p in $f"
    }
}
