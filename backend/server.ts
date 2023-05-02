import express, { Express, Request, Response } from 'express';
import codeRouter from './routes/code';
import cors from 'cors';

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from server!")
})

//MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", codeRouter);
// start server at port 3000
app.listen(3000);