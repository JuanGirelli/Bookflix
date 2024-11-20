import { Router } from "express";

import books from "./books.js";
import user from "./user.js";
import movies from "./movies.js";

const router = Router();

router.use("/books", books);
router.use("/movies", movies);
router.use("/user", user);

export default router;
