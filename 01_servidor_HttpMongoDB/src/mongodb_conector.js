"use strict"

//importar el paquete mysql para realizar la conexion

import {MongoClient} from "mongodb";
import {config} from 'dotenv';

config()

const URI= process.env.MONGO_URI;

// crear la instancia del cliente de mongodb utilizando la URI que nos ha proporcionado MongoDB
const client = new MongoClient(URI);

let conexion;
const conexionBD=async()=>{
    try {
        //Conectar al servidor de forma asincrona
        if(!conexion){
            conexion = await client.connect();
            console.log("conectada la base de datos MongoDB");
        }
        return conexion.db("Tareas");
    } catch (error) {
        console.log("Error, base dedff datos no conectada");
    }
    
}

export default conexionBD;