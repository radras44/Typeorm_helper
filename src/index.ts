import { DataSource, SelectQueryBuilder } from "typeorm";
import { EntityTarget } from "typeorm/common/EntityTarget";
import { DefaultMsgs, defaultSpanishMsgs } from "./defaultMsg";
import { Response, Request } from "express";
export interface TypeormHelperConfigs {
    relations?: any | null
    statusMensajes?: any | null
}

export class TypeormHelper {
    dataSource: DataSource
    entity: EntityTarget<any>
    entityLabel: string
    defaultMsgs: DefaultMsgs

    constructor(dataSource: DataSource, entityLabel: string, entity: EntityTarget<any>) {
        this.dataSource = dataSource
        this.entityLabel = entityLabel
        this.entity = entity
        this.defaultMsgs = defaultSpanishMsgs
    }

    getRelations(relationObj: any, fatherKey: string | null = null, keys: string[] = []): string[] {
        for (const key in relationObj) {
            if (fatherKey) {
                keys.push(`${fatherKey}.${key}`)
            }
            if (typeof (relationObj[key]) === "object") {
                this.getRelations(relationObj[key], key, keys)
            }
        }
        return keys
    }

    addRelations(queryBuilder: SelectQueryBuilder<any>, relations: string[]) {
        for (const relation of relations) {
            let referenceName = relation.split(".")[1]
            queryBuilder.leftJoinAndSelect(relation, referenceName)
        }
    }

    async getAll(req: Request, res: Response, typeormHelperConfigs: TypeormHelperConfigs = {}) {
        try {
            const queryBuilder = this.dataSource.getRepository(this.entity).createQueryBuilder(this.entityLabel)
            //agregar relaciones
            if (typeormHelperConfigs.relations) {
                this.addRelations(queryBuilder, this.getRelations(typeormHelperConfigs.relations))
            }
            //ejecutar consulta
            const queryRes = await queryBuilder.getMany()

            return res.status(200).json({
                result : queryRes,
                message : this.defaultMsgs[200].getAll
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: this.defaultMsgs[500]
            })
        }
    }

    async getOne(req:Request,res:Response,typeormHelperConfigs:TypeormHelperConfigs){
        const {id} = req.params
        if(!id){
            return res.status(400).json({error : this.defaultMsgs[400]})
        }
        try {
            const queryBuilder = this.dataSource.getRepository(this.entity).createQueryBuilder(this.entityLabel)
            //agregar relaciones
            if (typeormHelperConfigs.relations) {
                this.addRelations(queryBuilder, this.getRelations(typeormHelperConfigs.relations))
            }
            queryBuilder.where(`${this.entityLabel}.id`,{id : id})
            //ejecutar consulta
            const queryRes = await queryBuilder.getMany()

            return res.status(200).json({
                result : queryRes,
                message : this.defaultMsgs[200].get
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: this.defaultMsgs[500]
            })
        }
    }

    async create (req:Request,res:Response){
        const {data} = req.body
        if(!data){
            return res.status(400).json({
                error : this.defaultMsgs[400]
            })
        }

        try {
            const queryBuilder = this.dataSource.createQueryBuilder()
            queryBuilder.insert().into(this.entity)
            .values(data)

            await queryBuilder.execute()

        } catch (error) {
            console.log(error)
            return res.status(500).json({error : this.defaultMsgs[500]})
        }
    }

    async update (req:Request,res:Response){
        const {data,id} = req.body
        if(!data || !id){
            return res.status(400).json({
                error : this.defaultMsgs[400]
            })
        }
        
        try {
            const queryBuilder = this.dataSource.createQueryBuilder()
            queryBuilder.update(this.entity).set(data)
            .where("id = :id",{id : id})

            await queryBuilder.execute()

        } catch (error) {
            console.log(error)
            return res.status(500).json({error : this.defaultMsgs[500]})
        }
    }

    async delete (req:Request,res:Response){
        const {id} = req.body
        if(!id){
            return res.status(400).json({error : this.defaultMsgs[500]})
        }

        try {
            const queryBuilder = this.dataSource.createQueryBuilder()
            .delete()
            .from(this.entity)
            .where(`id = :id`,{id : id})

            await queryBuilder.execute()

        } catch (error) {
            
        }
    }
}