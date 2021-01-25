const path = require("path");

// EXPRESS
const express = require("express");
const app = express();
const helmet = require('helmet');

// CONFIG
const config = require("config");
const PORT = config.get("port") ?? 5000;
const MONGO_URI = config.get("mongoUri");

app.use(express.json({ extended: true }));
app.use(helmet());

// ROUTES
const authRouter = require("./routes/auth.routes.js");
const linkRouter = require("./routes/links.routes.js");
const redirectRouter = require("./routes/redirect.routes.js");
app.use("/api/auth", authRouter);
app.use("/api/link", linkRouter);
app.use("/t", redirectRouter);

// if (process.env.NODE_ENV === "production") {
//     app.use("/", express.static(path.join(__dirname, "client", "build")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     })
// }

// MONGOOSE
const mongoose = require("mongoose");
async function start() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

		// LISTEN
		app.listen(PORT, () => {
			console.log(`App started on port ${PORT}`);
		});
    } catch (e) {
        console.error("Server error", e.message);
        process.exit(1);
    }
}
start();
