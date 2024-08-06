"use strict"

import { Router } from "express"
import { addTarea, deleteTarea, editTarea, getTareas,getTarea, getTareasUsu, getUsuarios, getTareasEstado } from "../controllers/tareas.controllers.js";
import { validacion } from "../validators/tareas.validator.js";

const router = Router();

router.get("/usuarios",getUsuarios);

router.get("/tarea/:idtarea",getTarea);

router.post("/tarea",validacion,addTarea);

router.put("/tarea/:idtarea",validacion,editTarea);

router.delete("/tarea/:idtarea",deleteTarea);

router.get("/tareas",getTareas);
router.get("/tareas/:estado",getTareasEstado);

router.get("/tareas/usuario/:idusu",getTareasUsu);



export default router; //exportamos