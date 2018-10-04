const port = process.env.PORT || 4200;
const server = require('./dist/server');

server.post('/assets/uploads', upload);

server.app.listen(port, () => {
    console.log("Listening on: http://localhost:" + port);
});
