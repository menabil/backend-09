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
      <section className="text-center mt-10 max-w-xl mx-auto p-10 rounded-2xl bg-[#1A1A1A] ">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-white">Todo</h1>

        {/* Input and Button Container */}
        <div className="flex gap-2 justify-center">
          {info.message && (
            info.success ?
              <p>
                {/* {info.message} */}
              </p>
              :
              <p className="text-red-700 bg-red-50 border border-red-200 p-3.5 rounded-xl mb-6 text-center font-medium shadow-sm">
                {info.message}
              </p>
          )}
          <input value={task}
            type="text" onChange={handelTask}
            placeholder="Write here..."
            className="border-2 border-blue-500 rounded-lg px-3 py-1.5 w-65 focus:outline-none focus:border-blue-500 placeholder:text-[#565656]"
          />
          <select value={priority} onChange={handelPriority} className="bg-[#565656]/30 rounded-2xl p-3 text-white">
            <option value="" disabled >Select</option>
            <option value="Low">Low</option>
            <option value="Mid">Mid</option>
            <option value="High">High</option>
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-1.5 rounded-lg transition-colors"
            onClick={handelClick} >
            Add Task
          </button>
        </div>
        <ul className="bg-[#565656]/30 p-10 my-5 rounded-2xl text-white">
          {data.map((item) => (
            <div key={item.id}>
              <li className="flex justify-around">
                <p>{item.task}</p>
                <p>{item.priority}</p></li>
            </div>
          ))}
        </ul>
      </section >
    </>
  )
}

export default App
