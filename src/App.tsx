import { Editor } from "./components/Editor";
import { Header } from "./components/Header";

export function App() {
  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <div className="bg-white">
        <main className="p-4">
        <section className=" flex flex-col mt-1 max-w-[720px] m-auto leading-7">
            <h1 className="text-[39px] font-bold border-b-[1px] border-gray-300 pb-8 my-4">Front-end developer test project</h1>
            <p>Your goal is to make a page that looks exactly like this one, and the ability to create H1 text simply by typing / then 1, then typing text, and hitting enter. </p>
        </section>
          <Editor />
        </main>
      </div>
    </div>
  )
}

