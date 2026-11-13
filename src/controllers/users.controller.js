import {
  users,
  findUserById,
  findByEmail,
  addUser,
  updateUser,
  removeUser,
} from "../data/users.js";

// Хариунаас password-ыг rest operator-оор хасна
function toPublic(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

// GET /users
export function list(req, res) {
  res.json({
    count: users.length,
    data: users.map(toPublic),
  });
}

// GET /users/:id
export function getOne(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "id must be a number" });
  }

  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(toPublic(user));
}

// POST /users
export function create(req, res) {
  const { name, email, role, password } = req.body ?? {};

  if (!name || !email) {
    return res.status(400).json({ message: "name and email are required" });
  }

  if (findByEmail(email)) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const user = addUser({ name, email, role, password });
  res.status(201).json(toPublic(user));
}

// PATCH /users/:id
export function update(req, res) {
  const id = Number(req.params.id);
  const body = req.body ?? {};

  if (!findUserById(id)) {
    return res.status(404).json({ message: "User not found" });
  }

  // Email өөр хэрэглэгчтэй давхцаж байвал 409
  if (body.email) {
    const existing = findByEmail(body.email);
    if (existing && existing.id !== id) {
      return res.status(409).json({ message: "Email already exists" });
    }
  }

  const updated = updateUser(id, body);
  res.json(toPublic(updated));
}

// DELETE /users/:id
export function remove(req, res) {
  const id = Number(req.params.id);
  const ok = removeUser(id);

  if (!ok) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(204).send();
}
