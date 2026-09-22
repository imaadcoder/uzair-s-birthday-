$root = (Resolve-Path $PSScriptRoot).Path
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://localhost:8010/')
$listener.Start()
Write-Host "Serving $root on http://localhost:8010/"

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $relative = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
  if ([string]::IsNullOrWhiteSpace($relative)) { $relative = 'index.html' }
  $file = Join-Path $root ($relative -replace '/', '\')
  $full = [IO.Path]::GetFullPath($file)

  if (-not $full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -or -not [IO.File]::Exists($full)) {
    $context.Response.StatusCode = 404
    $context.Response.Close()
    continue
  }

  $bytes = [IO.File]::ReadAllBytes($full)
  $extension = [IO.Path]::GetExtension($full).ToLowerInvariant()
  $mime = @{ '.html' = 'text/html'; '.css' = 'text/css'; '.js' = 'text/javascript'; '.mp3' = 'audio/mpeg'; '.jpg' = 'image/jpeg'; '.png' = 'image/png'; '.svg' = 'image/svg+xml' }[$extension]
  if (-not $mime) { $mime = 'application/octet-stream' }
  $context.Response.ContentType = $mime
  $context.Response.ContentLength64 = $bytes.Length
  $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $context.Response.Close()
}