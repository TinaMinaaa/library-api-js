import "dotenv/config";
import express from "express";
import booksRouter from "./routes/books.router.js";
import usersRouter from "./routes/users.router.js";
import authorsRouter from "./routes/authors.router.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/authors", authorsRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});