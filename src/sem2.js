import {
  books,
  findBookById,
  searchByTitle,
  getBooksFromDb,
  getBookOrThrow,
} from "./data/books.js";

// ---------- Дасгал 01: Object үүсгэж унших ----------
console.log("--- Дасгал 01: object ---");

const book = {
  id: 1,
  title: "Node.js Basics",
  author: "Bat",
  price: 45000,
  isAvailable: true,
};

console.log(book.title); // цэгээр
console.log(book["title"]); // дөрвөлжин хаалтаар
console.log(book.isbn); // undefined, байхгүй field

book.price = 50000; // const нь object-ийн field өөрчлөхийг хориглодоггүй
console.log(book.price);

// ---------- Дасгал 02: Array ба map ----------
console.log("--- Дасгал 02: array, map ---");

const myBooks = [
  { id: 1, title: "Node.js Basics", price: 45000, isAvailable: true },
  { id: 2, title: "Express in Action", price: 52000, isAvailable: true },
  { id: 3, title: "SQL for Kids", price: 30000, isAvailable: false },
  { id: 4, title: "Prisma Guide", price: 61000, isAvailable: true },
];

const titles = myBooks.map((b) => b.title);
const labels = myBooks.map((b) => `${b.title} — ${b.price}`);

console.log(titles);
console.log(labels);
console.log(myBooks.length); // map эх array-г өөрчлөөгүй: 4

// ---------- Дасгал 03: filter ба find ----------
console.log("--- Дасгал 03: filter, find ---");

const cheap = myBooks.filter((b) => b.price < 50000);
const available = myBooks.filter((b) => b.isAvailable);
const book3 = myBooks.find((b) => b.id === 3);
const book99 = myBooks.find((b) => b.id === 99); // undefined

console.log(cheap);
console.log(available);
console.log(book3);
console.log(book99 ?? "not found");

// ---------- Дасгал 04: 5 function өөрөө бичих ----------
console.log("--- Дасгал 04: function ---");

function sum(a, b) {
  return a + b;
}

function isExpensive(b) {
  return b.price > 50000;
}

function getTitles(list) {
  return list.map((b) => b.title);
}

function countAvailable(list) {
  return list.filter((b) => b.isAvailable).length;
}

const formatPrice = (price) => `${price}₮`;

console.log(sum(2, 3)); // 5
console.log(isExpensive(myBooks[1])); // true (52000)
console.log(getTitles(myBooks));
console.log(countAvailable(myBooks)); // 3
console.log(formatPrice(45000)); // 45000₮

// ---------- Дасгал 05: books.js module ----------
console.log("--- Дасгал 05: module ---");

console.log(books.length); // 3
console.log(findBookById(2)); // Express
console.log(searchByTitle("NODE")); // том жижиг үсэг нөлөөлөхгүй

// ---------- Дасгал 06: Promise ба async/await ----------
console.log("--- Дасгал 06: async ---");

// await-гүй дуудвал Promise { <pending> } харагдана
console.log(getBooksFromDb());

// await-тай дуудвал үр дүн нь ирнэ
const dbBooks = await getBooksFromDb();
console.log(dbBooks.length); // 3

// ---------- Дасгал 07: алдаа зориуд гаргаж барих ----------
console.log("--- Дасгал 07: try/catch ---");

try {
  console.log(getBookOrThrow(2).title); // Express
  console.log(getBookOrThrow(99)); // энд throw хийнэ
  console.log("энэ мөр ажиллахгүй"); // throw-оос доош код ажиллахгүй
} catch (error) {
  console.log("Алдаа барилаа:", error.message); // Book not found
}
