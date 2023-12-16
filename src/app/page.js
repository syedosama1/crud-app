import Note from "../../model/Note";
import { redirect } from "next/navigation";
import dbConnect from "./dbConnect";

export default function Home() {
  async function newNote(data) {
    "use server";
    let email = data.get("email")?.valueOf();
    let password = data.get("password")?.valueOf();
    let number = data.get("number")?.valueOf();
    let date = data.get("date")?.valueOf();

    try {
      dbConnect();
      let newNote = new Note({ email, password, number, date });
      await newNote.save();
      console.log(newNote);
    } catch (error) {
      console.log(error);
    }
    redirect("/show");
  }

  return (
    <main className="m-10 space-y-5">
      <h1 className="text-xl font-bold">Create Note</h1>
      <form action={newNote} className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-lg">Email</label>
          <br />
          <input
            type="email"
            name="email"
            className="w-full bg-slate-200 h-10 p-3"
            required
          />
        </div>
        <div>
          <label className="text-lg">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            className="w-full bg-slate-200 h-10 p-3"
            required
          />
        </div>
        <div>
          <label className="text-lg">Number</label>
          <br />
          <input
            type="number"
            name="number"
            className="w-full bg-slate-200 h-10 p-3"
            required
          />
        </div>
        <div>
          <label className="text-lg">Date</label>
          <br />
          <input
            type="date"
            name="date"
            className="w-full bg-slate-200 h-10 p-3"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-bold hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
