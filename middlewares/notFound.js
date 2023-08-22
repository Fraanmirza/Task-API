const notFound = (req, res, next) => {
  res.send("Source not found.");
};

module.exports = notFound;
