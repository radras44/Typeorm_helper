import { DataSource } from "typeorm";
import { EntityTarget } from "typeorm/common/EntityTarget";
import { Response, Request } from "express";
import {DefaultMsgs} from "../src/defaultMsg"
export interface TypeormHelperConfigs {
    relations: any | null;
    statusMensajes: any | null;
}

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