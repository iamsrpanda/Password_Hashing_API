const app = require("./server/app.server");
// const environment = require("./config/env")

const port = process.env.PORT || 8080;
// const port = environment.serverPort || 8080;
const server = app.listen(port, () => {
    console.log(`Server: listening on port ${port}`);
});

server.setTimeout(3600000);