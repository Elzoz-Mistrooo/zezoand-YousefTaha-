
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })

import express from 'express'
import chalk from 'chalk';
import bootstrap from './src/index.router.js'
const app = express();
const port = 4500;


app.use(`/uploads`, express.static("./uploads"))
bootstrap(app, express)
//For getting time for Coupon


app.listen(port, () => console.log(chalk.blue(`Example app listening on port`) + chalk.blackBright(`${port}!`)))