export function logger(req, res, next) {
  const start = Date.now();

  // res.on("finish") нь хариу илгээгдэж дууссанд ажиллана:
  // тиймээс status code болон хугацааг мэдэж байна
  res.on("finish", () => {
    const ms = Date.now() - start;
    // req.url нь router-ийн дотор "/books" угтвараа алддаг тул originalUrl ашиглана
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`);
  });

  next(); // next() байхгүй бол хүсэлт гацна
}
