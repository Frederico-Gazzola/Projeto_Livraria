﻿import app = require("teem");

app.run({
    sqlConfig: {
        connectionLimit: 30,
        waitForConnections: true,
        charset: "utf8",
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "livraria"
    }
});
