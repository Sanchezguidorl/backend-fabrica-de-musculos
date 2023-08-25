import { Router } from "express";
import { createButton, deleteButton, getButtons } from "./controllers/buttons.controller.js";

const router=Router();

router.get('/buttons',getButtons);

router.post('/buttons/add',createButton);

router.delete('/buttons/delete/:id',deleteButton);

export default router;