import express from "express";
import { buscar, buscarId, crear, actualizar, eliminar } from "../controladores/mascotasController.js";

const routerMascotas = express.Router();

routerMascotas.get("/", (req, res) => {
    res.send("Bienvenido a Mascotas");
});

routerMascotas.post("/crear", (req, res) => {
    crear(req, res);
});

routerMascotas.get("/buscar", (req, res) => {
    // res.send("Buscar Mascota");
    buscar(req, res);
});

routerMascotas.get("/buscar/:id",(req,res)=>{
    buscarId(req,res);
});

routerMascotas.put("/actualizar/:id", (req, res) => {
    // res.send("Actualizar Mascota");
    actualizar(req, res);
});

routerMascotas.delete("/eliminar/:id", (req, res) => {
    // res.send("Eliminar Mascota");
    eliminar(req, res);
});

export {routerMascotas}