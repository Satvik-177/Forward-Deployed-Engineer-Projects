import "dotenv/config";

import express from "express"
import cors from "cors"
import router from "./Routes/movie.routes.js"
import { initializeMovies } from "./service/movie.service.js"

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000

app.use("/api/movies",router)

const startServer = async()=>{

    try{

        await initializeMovies()
        
        app.listen(port,()=>{
            console.log(`Server started on port ${port}`)
        })
    }

    catch(err){

        console.log("Server started failed: ", err)
        process.exit(1)
    }
}

startServer()