:: Deploy.cmd

echo Installing dependencies...
call npm install

echo Building the application...
call npm run build

echo Starting the application...
call npm start
