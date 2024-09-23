require("express-async-errors");
require("dotenv/config");

const migrationsRun = require("./database/sqlite/migrations");
migrationsRun();

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const AppError = require("./utils/AppError");

const routes = require("./routes");
app.use(routes);

const uploadConfig = require("./configs/upload");
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));