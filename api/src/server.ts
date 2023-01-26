import { app } from "./app";

const port = process.env.PORT || 8000;

app.listen(Number(port), "0.0.0.0", () =>
  console.log(`[server]: Server is runnig at https://localhost:${port}`)
);
