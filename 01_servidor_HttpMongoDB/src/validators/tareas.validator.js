"use strict";
import {check, validationResult} from "express-validator"

export const validacion=[
    
    check("titulo").exists().notEmpty().withMessage("El titulo no debe estar vacio"),
    check("descripcion").exists().notEmpty().withMessage("La descripcion no debe de estar vacia"),
    check("fecha").exists().notEmpty().withMessage("La fecha no debe de estar vacía"),
    check("estado").exists().notEmpty().matches(/^(pendiente|progreso|completada)$/).withMessage("El estado no debe estar vacio, y debe de ser pendiente, en progreso o completada"),
    check("idusu").exists().notEmpty().withMessage("El id del usuario no debe estar vacio"),
    check("importancia").exists().notEmpty().isNumeric().withMessage("La importancia no debe estar vacia, y debe de ser numérica"),
    
    (req,res,next)=>{
        const errors = validationResult(req); //Array tantas filas como campos valide
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors:errors.array() //Devolver el mensaje
            })
        } else { //todo correcto
            next(); //Sigue la ejecución del siguiente middleware
        }
    }
]
