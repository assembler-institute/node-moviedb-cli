module.exports = {
  host: "api.themoviedb.org",
  protocol: "https:",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};
