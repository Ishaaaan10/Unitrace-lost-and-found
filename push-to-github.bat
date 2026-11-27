@echo off
setlocal
set PATH=C:\Users\HP\AppData\Local\Programs\portable-tools\nodejs;C:\Users\HP\AppData\Local\Programs\portable-tools\git\cmd;C:\Users\HP\AppData\Local\Programs\portable-tools\git\mingw64\bin;%PATH%
cd /d "%~dp0"

echo ========================================================
echo   UniTrace - Push to GitHub (Ishaaaan10)
echo ========================================================
echo Target Repository: https://github.com/Ishaaaan10/unitrace-lost-and-found.git
echo.

git remote remove origin 2>nul
git remote add origin https://github.com/Ishaaaan10/unitrace-lost-and-found.git
git branch -M main

echo Pushing all files to GitHub...
echo (If prompted by GitHub, click 'Sign in with your browser' in the popup window)
echo.

git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! Your project is now LIVE on GitHub!
    echo   URL: https://github.com/Ishaaaan10/unitrace-lost-and-found
    echo ========================================================
    echo.
    echo Next Step: Go to https://vercel.com, click "Add New..." -> "Project",
    echo select "unitrace-lost-and-found", and click Deploy!
    echo.
) else (
    echo.
    echo If authentication failed, you can generate a Personal Access Token on GitHub
    echo at https://github.com/settings/tokens and use it as your password.
)

pause
