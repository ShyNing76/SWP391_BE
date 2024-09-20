import initWebRoutes from "./routes";
import express from 'express';
import cors from 'cors';

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

initWebRoutes(app);

app.listen(port, host, () => {
    console.log(`Server is running on ${port}`);
    console.log(`Swagger is running on http://${host}:${port}/api-docs`);
})