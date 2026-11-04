import express from "express";

const app = express();
const PORT = 3000;

// 1. Үндсэн route (GET /)
app.get("/", (req, res) => {
  res.json({
    message: "Library API",
    version: "1.0.0"
  });
});

// 2. Сервер ажиллаж байгаа эсэхийг шалгах стандарт route (GET /health)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime()
  });
});

// 3. Хэрэглэгчийн мэдээлэл авах route (GET /profile)
// АНХААРАХ: Response-д хэзээ ч нууц үг (password) оруулахгүй!
app.get("/profile", (req, res) => {
  res.json({
    name: "Bat",
    role: "USER",
    email: "bat@example.com"
  });
});

// 4. Params ашигласан динамик route (GET /books/:id)
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id); // params нь үргэлж string байдаг тул тоо руу хөрвүүлнэ
  res.json({
    id: id,
    title: "Node.js Basics"
  });
});

// Бүх route-ууд app.listen()-ээс ДЭЭР бичигдсэн байх ёстой!
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});