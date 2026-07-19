$pass = 0; $fail = 0; $base = "http://localhost:5000/api"

function Test-API {
  param($Name, $Method, $Url, $Body, $Expected, $Headers)
  try {
    $params = @{Uri="$base$Url"; Method=$Method; UseBasicParsing=$true; ContentType="application/json"}
    if ($Body) { $params.Body = ($Body | ConvertTo-Json -Compress -Depth 10) }
    if ($Headers) { $params.Headers = $Headers }
    $r = Invoke-WebRequest @params
    $status = [int]$r.StatusCode
    if ($status -eq $Expected) {
      Write-Host "  PASS  $Name" -ForegroundColor Green; $script:pass++
    } else {
      Write-Host "  FAIL  $Name (expected $Expected, got $status)" -ForegroundColor Red; $script:fail++
    }
    return $r.Content
  } catch {
    $status = 0
    try { $status = [int]$_.Exception.Response.StatusCode } catch {}
    if ($status -eq $Expected) {
      Write-Host "  PASS  $Name ($status)" -ForegroundColor Green; $script:pass++
    } else {
      Write-Host "  FAIL  $Name (expected $Expected, got $status)" -ForegroundColor Red; $script:fail++
    }
  }
}

# 1. HEALTH
Write-Host "`n=== 1. HEALTH ===" -ForegroundColor Cyan
Test-API "Health check" GET "/health" $null 200

# 2. AUTH: Register
Write-Host "`n=== 2. AUTH: Register ===" -ForegroundColor Cyan
$rand = Get-Random -Max 99999
$testUser = @{name="TU$rand"; email="tu$rand@ex.com"; password="test123456"}
Test-API "Register user" POST "/auth/register" $testUser 201
Test-API "Duplicate email (409)" POST "/auth/register" $testUser 409
Test-API "Missing fields (400)" POST "/auth/register" @{name="x"} 400
Test-API "Weak password (400)" POST "/auth/register" @{name="x"; email="x@x.com"; password="12"} 400

# 3. AUTH: Login
Write-Host "`n=== 3. AUTH: Login ===" -ForegroundColor Cyan
try {
  $loginResp = Invoke-WebRequest -Uri "${base}/auth/login" -Method POST -Body (@{email=$testUser.email; password=$testUser.password} | ConvertTo-Json -Compress) -ContentType "application/json" -UseBasicParsing
  $token = ($loginResp.Content | ConvertFrom-Json).token
  $auth = @{Authorization="Bearer $token"}
  Write-Host "  PASS  Login + token" -ForegroundColor Green; $pass++
} catch {
  Write-Host "  FAIL  Login - $($_.Exception.Message)" -ForegroundColor Red; $fail++
  exit 1
}

# 4. AUTH: Me & Profile
Write-Host "`n=== 4. AUTH: Me & Profile ===" -ForegroundColor Cyan
Test-API "Bad password (401)" POST "/auth/login" @{email=$testUser.email; password="wrong"} 401
Test-API "Get current user" GET "/auth/me" $null 200 $auth
Test-API "Update profile" PATCH "/auth/me" @{name="Updated$rand"; theme="dark"} 200 $auth
Test-API "No token (401)" GET "/auth/me" $null 401

# 5. ENTRIES: Create (7 moods)
Write-Host "`n=== 5. ENTRIES: Create (7 moods) ===" -ForegroundColor Cyan
$entryIds = @()
$moods = @("happy","calm","neutral","sad","angry","anxious","excited")
foreach ($mood in $moods) {
  $resp = Test-API "Create: $mood" POST "/entries" @{moodId=$mood; note="Test note for $mood"; tags=@("test",$mood)} 201 $auth
  try { $entryIds += ($resp | ConvertFrom-Json).entry._id } catch {}
}

# 6. ENTRIES: List & Filter
Write-Host "`n=== 6. ENTRIES: List & Filter ===" -ForegroundColor Cyan
Test-API "List paginated" GET "/entries?page=1&limit=5" $null 200 $auth
Test-API "Filter by mood=happy" GET "/entries?mood=happy" $null 200 $auth

if ($entryIds.Count -gt 2) {
  # 7. ENTRIES: Update (moodId + note)
  Write-Host "`n=== 7. ENTRIES: Update ===" -ForegroundColor Cyan
  Test-API "Update entry" PATCH "/entries/$($entryIds[0])" @{note="Updated note text"; moodId="calm"} 200 $auth

  # 8. ENTRIES: Soft Delete → Trash → Restore → Hard Delete
  Write-Host "`n=== 8. ENTRIES: Soft Delete → Trash → Restore → Hard Delete ===" -ForegroundColor Cyan
  Test-API "Soft delete" DELETE "/entries/$($entryIds[1])" $null 200 $auth
  Test-API "Get trash" GET "/entries/trash" $null 200 $auth
  Test-API "Restore entry" PATCH "/entries/$($entryIds[1])/restore" $null 200 $auth
  Test-API "Hard delete" DELETE "/entries/$($entryIds[2])/hard" $null 200 $auth
}

# 9. ANALYTICS
Write-Host "`n=== 9. ANALYTICS ===" -ForegroundColor Cyan
Test-API "Stats" GET "/analytics/stats" $null 200 $auth
Test-API "Weekly trend" GET "/analytics/weekly" $null 200 $auth
Test-API "Mood distribution" GET "/analytics/distribution" $null 200 $auth
Test-API "Top moods" GET "/analytics/top-moods" $null 200 $auth

# 10. GOALS (today goal - PUT)
Write-Host "`n=== 10. GOALS (Today Goal) ===" -ForegroundColor Cyan
Test-API "Set today goal" PUT "/goals/today" @{text="Complete the testing"} 200 $auth
Test-API "Get today goal" GET "/goals/today" $null 200 $auth

# 11. AI (only /reflect exists)
Write-Host "`n=== 11. AI ===" -ForegroundColor Cyan
Test-API "AI reflection" POST "/ai/reflect" @{} 200 $auth

# 12. ERROR CASES
Write-Host "`n=== 12. ERROR CASES ===" -ForegroundColor Cyan
Test-API "Route not found (404)" GET "/nonexistent" $null 404

# RESULTS
Write-Host "`n============================================" -ForegroundColor Cyan
if ($fail -eq 0) { Write-Host "  ALL $pass TESTS PASSED!" -ForegroundColor Green }
else { Write-Host "  $pass passed, $fail failed" -ForegroundColor Red }
Write-Host "============================================" -ForegroundColor Cyan
