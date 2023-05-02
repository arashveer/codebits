import express, { Request, Response } from "express";
const codeRouter = express.Router();
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*  POST req for new codefile to server
    REQUIRES:
    RETURN: row from db
*/
codeRouter.post("/create", async (req: any, res: any) => {
  const { code } = req.body;

  const newCode = await prisma.code.create({
    data: {
      code: code,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  });
  if (newCode) {
    return res.status(201).json(newCode);
  } else {
    return res.status(404).json("Code could not be added to db!");
  }
});

codeRouter
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    /*  GET req for codefile from frontend
        REQUIRES:
        RETURN: row from db
        */
    const getCode = await prisma.code.findUnique({
      where: { id: req.params.id },
    });
    res.send(getCode?.code);
  })
  .put((req: Request<{ id: number }>, res: Response) => {
    /*  PUT req for codefile from frontend, use it to update
        REQUIRES:
        RETURN: row from db
        */
    res.send(`Update item ID: ${req.params.id}`);
  })
  .delete((req: Request<{ id: number }>, res: Response) => {
    /*  DELETE req for codefile from frontend
        REQUIRES:
        RETURN: boolean (success/fail)
        */
    res.send(`Delete item ID: ${req.params.id}`);
  });

export default codeRouter;
