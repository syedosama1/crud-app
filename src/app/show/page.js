// pages/show.js
import Note from "../../../model/Note";
import Link from "next/link";
import { redirect } from "next/navigation";
import dbConnect from "../dbConnect";

export default async function show() {
  dbConnect();
  const notes = await Note.find();

  async function deleteNote(data) {
    "use server";
    let id = JSON.parse(data.get("id")?.valueOf());

    await Note.deleteOne({ _id: id });
    redirect("/show");
  }

  return (
    <main className="m-10 space-y-5">
      <h1 className="text-xl font-bold">Notes</h1>
      <div>
        <ul className="flex font-bold">
          <li className="flex-1">Email</li>
          <li className="flex-1">Password</li>
          <li className="flex-1">Number</li>
          <li className="flex-1">Date</li>
          <li className="flex-1">Options</li>
        </ul>
        <hr />
        {notes.map((element) => (
          <ul key={element._id} className="flex">
            <li className="flex-1">{element.email}</li>
            <li className="flex-1">{element.password}</li>
            <li className="flex-1">{element.number}</li>
            <li className="flex-1">{element.date.toString()}</li>
            <li className="flex-1">
              <div className="flex">
                <form action={deleteNote}>
                  <input
                    type="hidden"
                    value={JSON.stringify(element._id)}
                    name="id"
                  />
                  <button
                    type="submit"
                    className="p-2 m-2 bg-red-600 text-white hover:cursor-pointer"
                  >
                    Delete
                  </button>
                </form>
                <Link href={"/Edit/" + element._id}>
                  <button className="p-2 m-2 bg-blue-600 text-white hover:cursor-pointer">
                    Edit
                  </button>
                </Link>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </main>
  );
}
