export function logger(req, res, next) {
  console.log(req.method, req.url);
  next(); // next() байхгүй бол хүсэлт гацна
}
