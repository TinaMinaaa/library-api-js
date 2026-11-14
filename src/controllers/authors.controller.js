export async function getAuthorBooks(req, res) {
  const authorId = Number(req.params.id);
  const author = await prisma.author.findUnique({
    where: { id: authorId },
    include: { books: true }
  });

  if (!author) {
    return res.status(404).json({ message: "Зохиолч олдсонгүй" });
  }

  res.json(author.books);
}