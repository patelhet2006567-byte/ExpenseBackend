import {Router} from "express";
import { createTransaction, deleteTransaction, getTransaction, updateTransaction } from "./transaction.controller.js";
const TransactionRouter = Router()

TransactionRouter.post("/create",createTransaction);
TransactionRouter.put("/update/:id",updateTransaction);
TransactionRouter.delete("/delete/:id",deleteTransaction);
TransactionRouter.get("/get",getTransaction);

export default TransactionRouter;