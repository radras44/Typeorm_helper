import { DataSource } from "typeorm";
import { EntityTarget } from "typeorm/common/EntityTarget";
import { Response, Request } from "express";

export interface TypeormHelperConfigs {
    relations?: any | null;
    statusMensajes?: any | null;
}

export interface DefaultMsgs {
    "400" : string,
    "500" : string,
    "200" : {
        get :string,
        create : string,
        update : string,
        delete : string,
        getMany : string
    }
}

export declare const defaultSpanishMsgs : DefaultMsgs

export declare class TypeormHelper {
    constructor(
        dataSource: DataSource,
        entityLabel: string,
        entity: EntityTarget<any>,
        defaultMsgs: DefaultMsgs
    );

    getAll(
        req: Request,
        res: Response,
        typeormHelperConfigs: TypeormHelperConfigs
    ): Promise<any>;

    getOne(
        req: Request,
        res: Response,
        typeormHelperConfigs: TypeormHelperConfigs
    ): Promise<any>;

    create(
        req:Request,
        res:Response
    ): Promise<any>

    update(
        req:Request,
        res:Response
    ): Promise<any>
    
    delete(
        req:Request,
        res:Response
    ): Promise<any>

    getRelations(
        relationObj: any,
        fatherKey: string | null,
        keys?: string[]
    ): string[];

    addRelations(queryBuilder: any, relations: string[]): void;
}