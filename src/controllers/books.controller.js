import {
  listBooks,
  findBook,
  searchBooks,
  addBook,
} from "../data/books.js";

export function getAll(req, res) {
  res.json(listBooks());
}

export function search(req, res) {
  res.json(searchBooks(req.query.q));
}

export function getOne(req, res) {
  // URL дахь бүх зүйл текст тул Number() ашиглан тоо болгоно
  const id = Number(req.params.id);
  const book = findBook(id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
}

export function create(req, res) {
  const { title } = req.body;

  if (!title) {
    // return байхгүй бол доорх код үргэлжилж, хоёр удаа хариу илгээнэ
    return res.status(400).json({ message: "title is required" });
  }

  const book = addBook({ title });
  res.status(201).json(book);
}
