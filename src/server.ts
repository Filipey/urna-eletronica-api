import { app } from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`[server]: Server is runnig at https://localhost:${port}`));
