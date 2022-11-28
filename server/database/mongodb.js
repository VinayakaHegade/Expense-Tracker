import mongoose from "mongoose";

async function connect() {
    await mongoose.connect(
        "mongodb+srv://vinayak:bitfumes123@expense-tracker-mern.msksuws.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("MongoDB connection is successful");
    // .catch((err) => console.error(err));
}

export default connect;


