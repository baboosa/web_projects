require('dotenv').config(); // arquivo de configuração usado para armazenar variáveis de ambiente em um projeto

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// nessa conexão com mongo foi usado assincrono pois é necessário uma resposta quando a base conectar para assim prosseguir
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log("Database connected")
        app.emit('ready')
    })
    .catch(e => console.log("Error connecting to the database"));

const session = require('express-session'); // identificar navegador de um cliente por meio de um cookie
const MongoStore = require('connect-mongo'); // diz aonde vai ser salva as sessões
const flash = require('connect-flash'); // mensagens auto-destrutivas. OBS: para usar flash é necessário chamar a session

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet'); // 
const csrf = require('csurf'); // criar tokens CSRF afim de evitar invasão e trazer mais segurança
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
const exp = require('constants');

app.use(helmet());
const PORT = 3000;

app.use(express.urlencoded({ extended: true })); // indica que pode postar formulários para dentro da aplicação
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'public'))); // indica todos arquivos estaticos, ou seja, arquivos que podem ser acesados diretamente

const sessionOptions = session({
    secret: "secretoXiuuuu_aaaa",
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUnitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // local onde ficar arquivos que renderiza na tela
app.set('view engine', 'ejs'); // engine usada para renderizar o html
app.use(csrf());

app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(routes);

app.on('ready', () => {
    // lista a porta para o express funcionar
    app.listen(PORT, () => {
        console.log(`Access port http://localhost:${PORT}`);
        console.log('Server iniciated');
    })
})
