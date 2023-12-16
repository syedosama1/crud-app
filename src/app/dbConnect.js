import mongoose from 'mongoose';

export default async function dbConnect() {
  await mongoose.connect("mongodb+srv://osamasyed61:7CaOmngBhrsjzwcZ@cluster0.bgljnad.mongodb.net/test", {
    // Remove the useNewUrlParser and useUnifiedTopology options
  });
}
