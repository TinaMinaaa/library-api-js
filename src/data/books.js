// Семинар 2 (books module) + Семинар 3 (addBook, updateBook, removeBook)

export const books = [
  { id: 1, title: "Node", price: 45000, isAvailable: true },
  { id: 2, title: "Express", price: 52000, isAvailable: true },
  { id: 3, title: "Prisma", price: 61000, isAvailable: false },
];

let nextId = 4;

export function findBookById(id) {
  return books.find((book) => book.id === id);
}

export function searchByTitle(keyword) {
  // keyword undefined байвал toLowerCase алдаа өгөхөөс сэргийлнэ
  const q = String(keyword ?? "").toLowerCase();
  return books.filter((book) => book.title.toLowerCase().includes(q));
}

export function countAvailable() {
  return books.filter((b) => b.isAvailable).length;
}

export function addBook(input) {
  const book = {
    id: nextId++,
    isAvailable: true,
    ...input,
  };
  books.push(book);
  return book;
}

export function updateBook(id, changes) {
  const book = findBookById(id);
  if (!book) return null;

  // changes дотор id байвал устгана: id өөрчлөгдөхөөс хамгаална
  const { id: _ignored, ...safeChanges } = changes;
  Object.assign(book, safeChanges);
  return book;
}

export function removeBook(id) {
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) return false;

  books.splice(index, 1);
  return true;
}

// Дасгал 06: database-ийг дүрсэлсэн Promise (500ms хүлээнэ)
export function getBooksFromDb() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 500);
  });
}

// Дасгал 07: алдааг зориуд гаргаж барих
export function getBookOrThrow(id) {
  const book = findBookById(id);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
}
