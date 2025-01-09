const express = require('express');
const cors = require('cors');
const port = 8080;
const app = express();
app.use(express.json());
const witheList = ['http://localhost:8080', 'https://myapp.co'];
const corsOptions = {
    origin: function (origin, callback) {
        if (witheList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}
app.use(cors(corsOptions));
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

routerApi(app);
app.use(logErrors);

app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(port, (req, res) => {
    console.log('listeninig on port ' + port);

})
