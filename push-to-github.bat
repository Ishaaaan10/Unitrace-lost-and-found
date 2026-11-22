@echo off
setlocal
echo ========================================================
echo   UniTrace - Push to Your GitHub Repository
echo ========================================================
echo.
set /p REPO_URL="Enter your GitHub repository URL (e.g., https://github.com/username/unitrace.git): "

if "%REPO_URL%"=="" (
    echo Error: No URL provided. Exiting.
    pause
    exit /b 1
)

echo.
echo Adding remote origin...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo Renaming branch to main...
git branch -M main

echo.
echo Pushing code to GitHub...
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! Your project has been pushed to GitHub!
    echo ========================================================
    echo Next Step: Go to https://vercel.com, click "Add New..." -> "Project",
    echo import this GitHub repository, and click Deploy!
    echo.
) else (
    echo.
    echo If push failed, please make sure you created the empty repository on GitHub
    echo and that you have sign-in credentials ready.
)

pause
