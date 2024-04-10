const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true })); // Para acceder al body
app.use(express.json());

// Routes
const coinsRouter = require("./routes/coins");
app.use("/coins", coinsRouter);
app.use(logger);

// URL - Callback
app.get("/", customLogger, (req, res) => {
    res.send("Busca el valor de una moneda. Por ejemplo: /coins/bitcoin");
  });  

// Ruta para cualquier otra URL
app.get("*", (req, res) => {
    res.send("Ruta no encontrada. Prueba: /coins/bitcoin");
  });

// Middleware
function logger(req, res, next) {
  console.log(req.originalUrl + "from logger");
  next();
}

function customLogger(req, res, next) {
  console.log(req.originalUrl + "from custom logger");
  next();
}

app.listen(3000, () => {
    console.log("Server running on port 3000");
});