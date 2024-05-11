@echo off

REM Open frontend folder in VS Code and run npm i and npm start
start cmd /k "cd frontend && code . && npm run start"

REM Open backend folder in VS Code and run npm i and npm run dev
start cmd /k "cd backend && code . && npm run dev"

exit
