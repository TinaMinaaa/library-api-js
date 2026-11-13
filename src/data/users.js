// Семинар 2 гэрийн даалгавар (users.js module) + Семинар 3 (CRUD функцүүд)

export const users = [
  { id: 1, name: "Бат", email: "bat@mail.mn", role: "admin", password: "bat123" },
  { id: 2, name: "Сараа", email: "saraa@mail.mn", role: "user", password: "saraa123" },
  { id: 3, name: "Болд", email: "bold@mail.mn", role: "user", password: "bold123" },
  { id: 4, name: "Дулмаа", email: "dulmaa@mail.mn", role: "admin", password: "dulmaa123" },
];

let nextId = 5;

export function findUserById(id) {
  return users.find((user) => user.id === id);
}

export function findByEmail(email) {
  const target = String(email ?? "").toLowerCase();
  return users.find((user) => user.email.toLowerCase() === target);
}

export function countAdmins() {
  return users.filter((user) => user.role === "admin").length;
}

export function addUser(input) {
  const user = {
    id: nextId++,
    role: "user",
    ...input,
  };
  users.push(user);
  return user;
}

export function updateUser(id, changes) {
  const user = findUserById(id);
  if (!user) return null;

  // id өөрчлөгдөхөөс хамгаална
  const { id: _ignored, ...safeChanges } = changes;
  Object.assign(user, safeChanges);
  return user;
}

export function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) return false;

  users.splice(index, 1);
  return true;
}
