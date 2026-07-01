import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  let [task, setTask] = useState("")
  let [priority, setPriority] = useState("")
  let [info, setInfo] = useState({})
  let [data, setData] = useState([])

  let handelClick = async () => {
    let response = await axios.post("http://localhost:5000/todo", {
      "task": task,
      "priority": priority
    })

    setInfo(response.data);

    let todoData = await axios.get("http://localhost:5000/allTodo")
    setData(todoData.data.data)
    setTask("")
    setPriority("")

  }
  useEffect(() => {
    async function todos() {
      let todosData = await axios.get("http://localhost:5000/allTodo")
      console.log(todosData);
      setData(todosData.data.data)
    }
    todos()
  }, [])

  let handelTask = (e) => {
    setTask(e.target.value);
  }

  let handelPriority = (e) => {
    setPriority(e.target.value);
  }

  return (
    <>
      <section className="text-center mt-10 max-w-xl mx-auto p-8 rounded-2xl bg-[#1A1A1A] shadow-xl border border-zinc-800">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-6 text-white tracking-tight">Todo</h1>

        {/* Error Message - Placed above the input row to prevent layout breaking */}
        {info.message && !info.success && (
          <p className="text-red-400 bg-red-950/40 border border-red-900/50 p-3 rounded-xl mb-4 text-sm font-medium">
            {info.message}
          </p>
        )}

        {/* Input Control Group */}
        <div className="flex gap-2 items-stretch justify-center">
          <input
            value={task}
            type="text"
            onChange={handelTask}
            placeholder="Write a task..."
            className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 w-full max-w-[240px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-zinc-500 transition-all text-sm"
          />

          <select
            value={priority}
            onChange={handelPriority}
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
          >
            <option value="" disabled>Priority</option>
            <option value="Low">Low</option>
            <option value="Mid">Mid</option>
            <option value="High">High</option>
          </select>

          <button
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-3 rounded-xl transition-colors text-sm shadow-md active:scale-98"
            onClick={handelClick}
          >
            Add Task
          </button>
        </div>

        {/* Task List Container */}
        {data.length > 0 && (
          <ul className="bg-zinc-900/50 border border-zinc-850 p-6 mt-6 rounded-2xl text-white divide-y divide-zinc-800 text-left">
            {data.map((item) => (
              <li key={item.id} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                <span className="font-medium text-zinc-200">{item.task}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${item.priority === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                  item.priority === 'Mid' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                  {item.priority}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default App
