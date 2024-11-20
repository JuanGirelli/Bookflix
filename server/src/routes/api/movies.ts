import { Router } from "express";
import fetch from 'node-fetch';

import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.get("/", async (_req, res) =>
{
    const Search = _req.query.q || '';

    const apiKey = process.env.OMDB_API_KEY;
    const apiUrl =`https://www.omdbapi.com/?i=&apikey=${apiKey}&s=${Search}`;

    const response = await fetch(apiUrl);
    const data:any = await response.json();
    const items = data && data.Search ? data.Search : [];
    
    const movies = items.map((movies:any) =>
    {
        return {
            Title: movies?.Title,
            Year: movies?.Year,
            Poster: movies?.Poster,
            imbID: movies?.imbID,
            Plot: movies?.Plot

        };
    });

    res.send({
        Search: Search,
        movies: movies,
        
    });
});

router.post('/like', async (req, res) =>
{
    // req.body.id

    

    console.log(req.body);

    res.send({});
});

export default router;