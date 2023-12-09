import express from "express";
import bodyParser from "body-parser";

import { routerMascotas } from "../rutas/mascotasRouter.js";
import {db} from "../database/conexion.js";


// crear instancia de express 
const app = express();
app.use(bodyParser.json())

// varificar conexion a base de datos
db.authenticate().then(() => {
    console.log(`Base de datos conectada de manera exitosa`);
}).catch(err => {
    console.log(`Error al conectarse a la base de datos ::: ${err}`);
})

app.get("/", (req, res) => {
    res.send(`Hola Backend Mysql`);
});

// rutas
app.use("/mascotas", routerMascotas);
// puerto de servidor 
const PORT = 8000;


// verificar que pueda sincronicar con la base de datos
db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor inicializado en puerto ${PORT}`);
    });
}).catch(err => {
    console.log(`Error al sincronizar base de datos ${err}`);
});

