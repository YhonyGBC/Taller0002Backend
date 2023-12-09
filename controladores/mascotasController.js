import { mascotas } from "../modelos/mascotasModelo.js";

// buscar mascotas
const buscar = (req, res) => {
    mascotas.findAll()
        .then((resultados) => {
            if (resultados.length === 0) {
                res.status(404).json({
                    mensaje: "No se encontraron mascotas."
                });
            } else {
                res.status(200).json({
                    mensaje: "Búsqueda exitosa",
                    mascotas: resultados
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al realizar la búsqueda: ${err}`
            });
        });
};

// buscar una única mascota por Id
const buscarId = (req,res)=>{
    const mascotaId = req.params.id;

    if (!mascotaId || isNaN(mascotaId)) {
        res.status(400).json({
            mensaje: "No es válido el Id de mascota."
        });
        return;
    }

    mascotas.findByPk(mascotaId)
        .then((resultado) => {
            if (!resultado) {
                res.status(404).json({
                    mensaje: "No se encontraró la mascota."
                });
            } else {
                res.status(200).json({
                    mensaje: "Búsqueda exitosa",
                    mascota: resultado
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al realizar la búsqueda: ${err}`
            });
        });
}

// crear un recurso 
const crear = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).json({
            mensaje: "El nombre no puede estar vacío."
        });
        return;
    }
    const dataset = {
        nombre: req.body.nombre,
        edad: req.body.edad
    };

    // usar sequelize para crear el recurso
    mascotas.create(dataset).then((resultado) => {
        res.status(200).json({
            mensaje: "Registro creado correctamente"
        });
    }).catch((err) => {
        res.status(500).json({
            mensaje: `Error al crear el registro ::: ${err}`
        });
    })
}

// actualizar mascota
const actualizar = (req, res) => {
    const mascotaId = req.params.id;

    if (!mascotaId || isNaN(mascotaId)) {
        res.status(400).json({
            mensaje: "No es válido el Id de mascota."
        });
        return;
    }

    mascotas.findByPk(mascotaId)
        .then((mascota) => {
            if (!mascota) {
                res.status(404).json({
                    mensaje: "No se encontró la mascota."
                });
                return;
            } else {
                res.status(200).json({
                    mensaje: "Actualización exitosa."
                });

                mascota.nombre = req.body.nombre || mascota.nombre;
                mascota.edad = req.body.edad || mascota.edad;

                return mascota.save();
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al realizar la actualización: ${err}`
            });
        });
}

// eliminar mascota
const eliminar = (req, res) => {
    const mascotaId = req.params.id;

    if (!mascotaId || isNaN(mascotaId)) {
        res.status(400).json({
            mensaje: "No es válido el Id de mascota."
        });
        return;
    }

    mascotas.destroy({
        where: {
            id: mascotaId
        }
    })
        .then((resultado) => {
            if (resultado === 0) {
                res.status(404).json({
                    mensaje: "No se encontró la mascota."
                });
            } else {
                res.status(200).json({
                    mensaje: "Eliminación exitosa."
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al realizar la eliminación: ${err}`
            });
        });
};

export {
    buscar,
    buscarId,
    crear,
    actualizar,
    eliminar}