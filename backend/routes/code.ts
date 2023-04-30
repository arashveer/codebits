import express, {Request, Response} from 'express';
const codeRouter = express.Router();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/*  POST req for new codefile to server
    REQUIRES:
    RETURN: row from db
*/
codeRouter.post('/create', async (req: any, res: any) => {
    const { code } = req.body;
    const newCode = await prisma.code.create({
        data: {
            code: code,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        },
    });
    res.status(201).json(newCode);
});

codeRouter
    .route('/:id')
    .get((req: Request<{ id: number }>, res: Response) => {
        /*  GET req for codefile from frontend
        REQUIRES:
        RETURN: row from db
        */
        res.send(`Item ID: ${req.params.id}`);
    })
    .put((req: Request<{ id: number}>, res: Response) => {
        /*  PUT req for codefile from frontend
        REQUIRES:
        RETURN: row from db
        */
        res.send(`Update item ID: ${req.params.id}`);
    })
    .delete((req: Request<{ id: number}>, res: Response) => {
        /*  DELETE req for codefile from frontend
        REQUIRES:
        RETURN: boolean (success/fail)
        */
        res.send(`Delete item ID: ${req.params.id}`);
    });

    // middleware : runs before request sent to server 
codeRouter.param('id', (req, res, next, id) => {
        // do something with id here
        // run route (next)
    })

export default codeRouter;