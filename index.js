
import cors from 'cors';
import imagenesRouter from './imagenes.routes.js';
import morgan from 'morgan';
import { connectDB } from './database.js';
import buttonsRouter from './buttons.routes.js';
import express from 'express';
const app=express();
const PORT= process.env.PORT || 4000
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


app.listen(PORT,()=>{
    console.log("server online")
});