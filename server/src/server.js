require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");
const morgan = require("morgan");

const attendanceRoute = require("./routes/attendance");
const userRoute = require("./routes/user");
const authenticationRoute = require("./routes/authentication");
const logRoute = require("./routes/log");
const app = express();

// konfigurasi cors
const corsOptions = {
    origin: ["http://localhost:3000", `http://${process.env.IP_ADDRESS}:3000`],
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static("./public"));

// membuat sebuah morgan token sehingga fullname user yang mengakses url dapat ditulis pada file log
morgan.token("user", (req, res) => {
    if (req.decoded && Object.keys(req.decoded) !== 0) return req.decoded.fullname;
});

// melakukan setting logger morgan agar dapat menangkap log http
const morganMiddleware = morgan(":remote-addr :method :url :status :user", {
    stream: {
        // kemudian teruskan log agar dapat diproses oleh logger winston dan tertulis pada file access.log
        write: (message) => logger.http(message.replace(/\n/g, "").split(" ")),
    },
});

// penggunaan middleware morgan
app.use(morganMiddleware);

// penerapan route
app.use("/api/attendance", attendanceRoute);
app.use("/api/users", userRoute);
app.use("/api/user", authenticationRoute);
app.use("/api", logRoute);

app.listen(process.env.PORT, process.env.IP_ADDRESS, () => {
    console.log(`Server running on PORT: ${process.env.PORT}`);
});
