import { getSimilarMovies, searchMovies } from "../service/movie.service.js";
import { searchMoviePoster } from "../service/tmdb.service.js";

const searchMovieController = async(req,res)=>{

    try{

        const {query} = req.body

        if(!query){
            
            return res.status(400).json({message:"Search query is required"})
        }

        const results = await searchMovies(query)

        return res.status(200).json({
            success:true,
            data:results,
        })
    }

    catch(err){

        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

const getSimilarMovieController = async(req,res)=>{

    try{

        const {title} = req.params

        if(!title){
            res.status(400).json({message:"Title is required"})
        }

        const results = await getSimilarMovies(title)

        return res.status(200).json({
            success:true,
            data:results
        })
    }

    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


const getMoviePostersController = async (req, res) => {
    try {
        const { titles } = req.body;

        if (!Array.isArray(titles)) {
            return res.status(400).json({
                success: false,
                message: "Movie titles are required"
            });
        }

        const posters = await Promise.all(
            titles.map(async (title) => ({
                title,
                poster: await searchMoviePoster(title)
            }))
        );

        return res.status(200).json({
            success: true,
            data: posters
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export { searchMovieController, getSimilarMovieController, getMoviePostersController }