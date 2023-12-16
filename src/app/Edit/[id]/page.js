import Note from "../../../../model/Note"
import { redirect } from "next/navigation"
import dbConnect from "@/app/dbConnect"

export default async function Edit({params}){
    dbConnect()
    const notes = await Note.findOne({_id: params.id})

    async function updateNote(data){
        "use server";
        let email = data.get("email")?.valueOf();
        let password = data.get("password")?.valueOf();
        let number = data.get("number")?.valueOf();
        let date = data.get("date")?.valueOf();
        let updatedNote = await Note.findByIdAndUpdate({_id: params.id },{ email, password,number,date });
        console.log(updatedNote);
        redirect('/show')
    }
    return(
        <main className="m-10 space-y-5">
        <h1 className="text-xl font-bold">Edit Note</h1>
        <form action={updateNote}>
        <div>
          <label className="text-lg">Email</label>
          <br />
          <input
            type="email"
            name="email"
            className="w-[100%] md:w-[50%] bg-slate-200 h-10 p-3"
            required
          />
        </div>
        <div>
          <label className="text-lg">Password</label>
          <br />
          <input
            type="password"
            name="password"
            className="w-[100%] md:w-[50%] bg-slate-200 h-10 p-3"
            required
          />
        </div>
        <div>
          <label className="text-lg">Number</label>
          <br />
          <input
            type="number"
            name="number"
            className="w-[100%] md:w-[50%] bg-slate-200 h-10 p-3"
            required
          />
        </div>
        <div>
          <label className="text-lg">Date</label>
          <br />
          <input
            type="date"
            name="date"
            className="w-[100%] md:w-[50%] bg-slate-200 h-10 p-3"
            required
          />
        </div>
        <button
          type="submit"
          className="p-3 bg-yellow-400 font-bold hover:bg-orange-500 hover:text-white"
        >
          Submit
        </button>
        </form>
      </main>
    )
}