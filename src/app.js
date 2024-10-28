const express = require('express')
const cors = require('cors')
const requestLogger = require('../src/utility/requestLogger')
const errorLogger = require('../src/utility/errorLogger')
const connection = require('../src/utility/connection')
const cookieParser = require("cookie-parser")
const app = express();
const dotenv = require('dotenv')
const helmet = require('helmet')
const router = require('../src/routing/routing')

dotenv.config()
connection()

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(requestLogger)

app.use("/api/protected-route", router)

app.use(errorLogger)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});