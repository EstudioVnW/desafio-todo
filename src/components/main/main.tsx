import "./style.scss"
import Trash from "../../assets/exclude.svg"
import Confirm from "../../assets/confirm.svg"
import Add from "../../assets/add.svg"
import { useState } from "react"

export default function Main(): any {

    const data = [ { "id": 1, "title": "Fazer almoço", "concluded": true }, 
        { "id": 2, "title": "Estudar", "concluded": false }, 
        { "id": 3, "title": "Lavar louça", "concluded": false }
    ]
    const [allTasks, setAllTasks] = useState(data)

    const [newTask, setNewTask] = useState('')
    const addItem = () => {
        if (newTask) {
            setAllTasks(allTasks.concat({id: allTasks.length + 1, title: newTask, concluded: false}))
        }
    }

    const handleKeyUp = (key: any) => {
        if (key.key === "Enter") {
            addItem()
        }
    }

    addEventListener("keyup", handleKeyUp)

    const eraseTask = (task: any) => {
        setAllTasks(allTasks.filter((item) => item != task ? item : ''))
    }

    const concludeTask = (task: any) => {
        let taskStyle = document.querySelector(`.tarefaNum${task.id}`)
        taskStyle?.classList.toggle("concluded")
    }
    return (
        <main>
            <article>
                <section className="add-item">
                    <h1>
                        To-do List
                    </h1>
                    <div>
                        <input type="text" name="tarefa" onChange={(e) => setNewTask(e.target.value)} />
                        <button onClick={addItem}>
                            <img src={Add} alt="" />
                        </button>
                    </div>
                </section>
                <div className="tasksArea">
                    {allTasks.map((task) => (
                        <section className={`tarefa tarefaNum${task.id}`} key={task.id}>
                            <h2>
                                {task.title}
                            </h2>
                            <figure>
                                <img src={Trash} alt="" onClick={() => eraseTask(task)}/>
                                <img src={Confirm} alt="" onClick={() => concludeTask(task)}/>
                            </figure>
                        </section>
                    ))}
                </div>
                <div>
                    <input type="text" name="tarefa" onChange={(e) => setNewTask(e.target.value)} />
                    <button onClick={addItem}>
                        <img src={Add} alt="" />
                    </button>
                </div>
            </article>
        </main>
    )
}