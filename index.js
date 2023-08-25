import express from 'express';
import cors from 'cors';
import imagenesRouter from './imagenes.routes.js';
import morgan from 'morgan';
import { connectDB } from './database.js';
import buttonsRouter from './buttons.routes.js';
const app=express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(imagenesRouter);
app.use(buttonsRouter);
const main=async()=>{
    await connectDB();
}

main();


app.listen(5000,()=>{
    console.log("server online")
});