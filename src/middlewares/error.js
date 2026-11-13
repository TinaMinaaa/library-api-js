export function notFound(req, res) {
  res.status(404).json({
    message: "Route not found",
    path: req.url,
  });
}

// Express нь 4 параметртэй функцийг error handler гэж танина
export function errorHandler(error, req, res, next) {
  console.error(error);
  // Алдааны мессежийг client-д бүтнээр нь өгөхгүй
  res.status(500).json({
    message: "Internal server error",
  });
}
