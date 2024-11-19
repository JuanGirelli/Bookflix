import { Router } from "express";
import fetch from 'node-fetch';

import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.get("/", async (_req, res) =>
{
    const q = _req.query.q || '';

    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const apiUrl =`https://www.googleapis.com/books/v1/volumes?q=${q}&key=${apiKey}`;

    const response = await fetch(apiUrl);
    const data:any = await response.json();
    const items = data && data.items ? data.items : [];

    const books = items.map((book:any) =>
    {
        return {
            title: book?.volumeInfo?.title,
            authors: book?.volumeInfo?.authors,
            description: book?.volumeInfo?.description,
            image: book?.volumeInfo?.imageLinks?.thumbnail
        };
    });

    res.send({
        q: q,
        list: books,
    });
});

router.post('/like', async (req, res) =>
{
    // req.body.id

    

    console.log(req.body);

    res.send({});
});

export default router;