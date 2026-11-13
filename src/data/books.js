let books = [
  { id: 1, title: "Learning Node.js" },
  { id: 2, title: "Express in Action" },
];
let nextId = 3;

export function listBooks() {
  return books;
}

export function findBook(id) {
  return books.find((b) => b.id === id);
}

export function searchBooks(q) {
  const query = String(q || "").toLowerCase();
  return books.filter((b) => b.title.toLowerCase().includes(query));
}

export function addBook({ title }) {
  const book = { id: nextId++, title };
  books.push(book);
  return book;
}
