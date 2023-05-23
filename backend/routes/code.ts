import express, { Request, Response } from "express";
const codeRouter = express.Router();
import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

/*  POST req for new codefile to server
    REQUIRES:
    RETURN: row from db
*/
codeRouter.post("/code/create", async (req: any, res: any) => {
  const { code, title, language } = req.body;

  const newCode = await prisma.code.create({
    data: {
      code: code,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      title: title,
      language: language,
      share: randomBytes(32).toString("hex"),
    },
  });
  if (newCode) {
    return res.status(201).json(newCode);
  } else {
    return res.status(404).json("Code could not be added to db!");
  }
});

codeRouter.get("/share_id/:share", async (req: Request, res: Response) => {
  /*  GET req for codefile from frontend
        REQUIRES:
        RETURN: rows share id from db
        */
  const getCode = await prisma.code.findUnique({
    where: { share: req.params.share },
  });
  res.send(getCode);
});

codeRouter
  .route("/code/:id")
  .put(async (req: Request, res: Response) => {
    /*  PUT req for codefile from frontend, use it to update
        REQUIRES:
        RETURN: row from db
        */
    const updateCode = await prisma.code.update({
      where: { id: req.params.id },
      data: {
        code: req.body.code,
        updatedAt: new Date().toISOString(),
        title: req.body.title,
      },
    });
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
