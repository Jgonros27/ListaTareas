import { ObjectId } from "mongodb";
import conexionBD from "../mongodb_conector.js";



export const getUsuarios= async (req,res)=>{
   try {
      ///acceder base datos
      const database = await conexionBD();
      const collection = database.collection("usuario");
      //indicar la instruccion MQL
      const result = await collection.find({}).toArray();
      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}

export const getTarea= async (req,res)=>{
   try {
      console.log(req.params);
      const { idtarea } = req.params
      console.log(idtarea);
      ///acceder base datos
      const database = await conexionBD();
      const collection = database.collection("tarea");
      //indicar la instruccion MQL
      const result = await collection.find({_id: new ObjectId(idtarea)}).toArray();
      console.log(result);
      res.status(200).json(result[0]);
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}

export const getTareas= async (req,res)=>{
   try {
      console.log(req.params);
      ///acceder base datos
      const database = await conexionBD();
      const collection = database.collection("tarea");
      //indicar la instruccion MQL
      const result = await collection.find({}).toArray();
      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   } 
}

export const getTareasEstado= async (req,res)=>{
   try {
      console.log(req.params);
      const {estado} = req.params
      ///acceder base datos
      const database = await conexionBD();
      const collection = database.collection("tarea");
      //indicar la instruccion MQL
      const result = await collection.find({estado:(estado)}).toArray();
      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   } 
}

export const getTareasUsu= async (req,res)=>{
   try {
      console.log(req.params);
      const {idusu}=req.params;
      ///acceder base datos
      const database = await conexionBD();
      const collection = database.collection("tarea");
      //indicar la instruccion MQL
      const result = await collection.find({idusu:(idusu)}).toArray();
      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}



export const deleteTarea= async (req,res)=>{
   try {
      const {idtarea}=req.params;
      console.log(req.params);
      //acceder base datos
      const database = await conexionBD();
      const collection = database.collection("tarea");
      // indicar la instruccion MQL
      const result = await collection.deleteOne({_id: new ObjectId(idtarea)});
   if (result.affectedRows==0) {
      return res.status(400).json({
         message:'la tarea no existe'
      })
    }else{
      return res.status(200).json({
         message:'La tarea ha sido eliminada'
      
    })
   }
   } catch (error) {
      console.log(error);
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}

export const addTarea= async (req,res)=>{
   try {
      
    const {titulo, descripcion,fecha,estado,idusu,importancia}=req.body;
    //acceder base datos
   const database = await conexionBD();
   const collection = database.collection("tarea");
   // indicar la instruccion MQL
   const result = await collection.insertOne({titulo, descripcion,fecha,estado,idusu,importancia});
   console.log({result});

   res.status(201).json(result);
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}

export const editTarea = async (req, res) => {
   try {
       const { idtarea } = req.params; // ID de la tarea a editar
       const { titulo, descripcion, fecha, estado, idusu, importancia } = req.body; // Nuevos datos de la tarea

       // aceder a la base de datos
       const database = await conexionBD();
       const collection = database.collection("tarea");

       // indicar la instrucción para actualizar la tarea con el ID correspondiente
       const result = await collection.updateOne(
           { _id: new ObjectId(idtarea) }, // filtrar la tarea por su ID
           { $set: { titulo, descripcion, fecha, estado, idusu, importancia } } // atualizar los campos con los nuevos valores
       );

       if (result.modifiedCount === 1) {
           res.status(200).json({ message: "Tarea actualizada correctamente" });
       } else {
           res.status(404).json({ message: "Tarea no encontrada" });
       }
   } catch (error) {
      console.log(error);
       res.status(500).json({ message: "Error en el servidor" });
   }
};

