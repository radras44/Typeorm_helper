import { DefaultMsgs } from "./types/typeorm-express-helper";

export const defaultSpanishMsgs : DefaultMsgs = {
    "400" : "Informacion insuficiente para realizar la consulta",
    "500" : "Error del servidor",
    "200" : {
        get : "Registro obtenido con exito",
        create : "Registro insertado con exito",
        update : "Registro actualizado con exito",
        delete: "Registro eliminado con exito",
        getMany : "Registros obtenidos con exito"
    }
}