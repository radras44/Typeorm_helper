export interface DefaultMsgs {
    "400" : string,
    "500" : string,
    "200" : {
        get :string,
        create : string,
        update : string,
        delete : string,
        getAll : string
    }
}

export const defaultSpanishMsgs : DefaultMsgs = {
    "400" : "Informacion insuficiente para realizar la consulta",
    "500" : "Error del servidor",
    "200" : {
        get : "Registro obtenido con exito",
        create : "Registro insertado con exito",
        update : "Registro actualizado con exito",
        delete: "Registro eliminado con exito",
        getAll : "Registros obtenidos con exito"
    }
}