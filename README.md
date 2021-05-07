# klinikpintar

## Installation & usage

```
git clone https://github.com/faropedia/klinikpintar.git
cd klinikpintar

cp ./backend/.env.example ./backend/.env
cp ./frontend/.env.local.example ./frontend/.env.local

cd ./backend
npm install
npm run build

cd ../frontend
npm install
npm run build
cd ..

docker-compose build
docker-compose up -d
```

Frontend: http://localhost:3000

Backend: http://localhost:3001

go to first http://localhost:3001/init for creating tables.

MySQL: localhost:3306
