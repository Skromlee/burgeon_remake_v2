const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const { Router } = require("express");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/parcels", require("./routes/parcelRoutes"));
app.use("/api/branch", require("./routes/branchRoutes"));
app.use("/api/thailand", require("./routes/thailandRoutes"));
app.use("/api/groups", require("./routes/groupRoutes"));
Router.use("/api/cutomers", require("./routes/customerRoutes"));
Router.use("/api/employee", require("./routes/employeeRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
