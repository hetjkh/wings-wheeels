# PowerShell Script to Clean Up Unused Images
# This script removes unused image folders that are not referenced in the codebase

Write-Host "🧹 Cleaning up unused images..." -ForegroundColor Cyan
Write-Host ""

# Folders to delete (confirmed NOT used in code)
$foldersToDelete = @(
    "public\gallery\adventure",
    "public\gallery\season specials"
)

$totalSize = 0
$totalFiles = 0

foreach ($folder in $foldersToDelete) {
    if (Test-Path $folder) {
        Write-Host "📁 Checking: $folder" -ForegroundColor Yellow
        
        $files = Get-ChildItem -Path $folder -Recurse -File -ErrorAction SilentlyContinue
        $folderSize = ($files | Measure-Object -Property Length -Sum).Sum
        $fileCount = $files.Count
        
        $totalSize += $folderSize
        $totalFiles += $fileCount
        
        $sizeMB = [math]::Round($folderSize / 1MB, 2)
        Write-Host "   Found: $fileCount files, $sizeMB MB" -ForegroundColor Gray
        
        # Ask for confirmation
        $confirm = Read-Host "   Delete this folder? (y/n)"
        if ($confirm -eq 'y' -or $confirm -eq 'Y') {
            Remove-Item -Path $folder -Recurse -Force
            Write-Host "   ✅ Deleted: $folder" -ForegroundColor Green
        } else {
            Write-Host "   ⏭️  Skipped: $folder" -ForegroundColor Yellow
        }
        Write-Host ""
    } else {
        Write-Host "   ⚠️  Folder not found: $folder" -ForegroundColor Yellow
        Write-Host ""
    }
}

$totalSizeMB = [math]::Round($totalSize / 1MB, 2)
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "   Total files checked: $totalFiles" -ForegroundColor White
Write-Host "   Total size: $totalSizeMB MB" -ForegroundColor White
Write-Host ""
Write-Host "✅ Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Optimize remaining images (use Squoosh.app or similar)" -ForegroundColor White
Write-Host "   2. Run: npm run build" -ForegroundColor White
Write-Host "   3. Test your website to ensure everything works" -ForegroundColor White

