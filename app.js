const express = require('express')
const cors = require('cors')
const requestLogger = require('./utility/requestLogger')
const errorLogger = require('./utility/errorLogger')
const connection = require('./utility/connection')
const cookieParser = require("cookie-parser")
const app = express();
const dotenv = require('dotenv')
const helmet = require('helmet')
const router = require('./routing/routing')

dotenv.config()
connection()

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: false
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