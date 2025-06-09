@echo off
cd /d "%~dp0"

echo Adicionando arquivos...
git add .

echo Fazendo commit...
set /p MSG="Mensagem do commit: "
git commit -m "%MSG%"

echo Enviando para o GitHub...
git push

pause