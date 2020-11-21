const express = require("express");
const cors = require("cors");
const routerApi = require("./api");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "use api",
    data: "not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fall",
    code: 500,
    message: err.message,
    data: "server error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
