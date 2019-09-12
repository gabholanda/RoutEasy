# RoutEasy - Como inicializar o projeto

<p>Inicialmente use o comando CLI 'npm install' em ambas as pastas API e a do React</p>
<p>Após isto crie um arquivo .env na root de ambas as pastas</p>
Na pasta do React o .env deve seguir o seguinte exemplo:

<p>PORT=3000</p>
<p>REACT_APP_API_URL=http://localhost:5000/api</p>
<p>REACT_APP_URL=http://localhost:3000</p>
<p>REACT_APP_MAP_KEY=SUA-KEY-DA-API-DO-GOOGLE</p>
<p>REACT_APP_MAP_URL=https://maps.googleapis.com/maps/api/geocode/json?</p>

Enquanto na da API:

<p>REACT_APP='http://localhost:3000'</p>
<p>MONGODB_URI='mongodb://localhost:27017/nomedobanco'</p>
<p>PORT=5000</p>

<p>Por fim utilize do comando 'nodemon start' na API e 'npm run start' no React</p>
