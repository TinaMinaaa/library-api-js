import {
  books,
  findBookById,
  searchByTitle,
  addBook,
  updateBook,
  removeBook,
} from "../data/books.js";

// GET /books  (мөн GET /books?q=node хайлт)
export function list(req, res) {
  const { q } = req.query;

  if (q) {
    return res.json(searchByTitle(q));
  }

  res.json({
    count: books.length,
    data: books,
  });
}

// GET /books/search?q=node
export function search(req, res) {
  res.json(searchByTitle(req.query.q));
}

// GET /books/:id
export function getOne(req, res) {
  // URL дахь бүх зүйл текст тул Number() хийнэ
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "id must be a number" });
  }

  const book = findBookById(id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
}

// POST /books
export function create(req, res) {
  const { title, price } = req.body ?? {};

  if (!title) {
    // return байхгүй бол доорх код үргэлжилж хоёр хариу илгээнэ
    return res.status(400).json({ message: "title is required" });
  }

  const book = addBook({ title, price });
  res.status(201).json(book);
}

// PATCH /books/:id
export function update(req, res) {
  const id = Number(req.params.id);
  const updated = updateBook(id, req.body ?? {});

  if (!updated) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(updated);
}

// DELETE /books/:id
export function remove(req, res) {
  const id = Number(req.params.id);
  const ok = removeBook(id);

  if (!ok) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(204).send();
}
const books = await prisma.book.findMany({
  include: { author: true }
});