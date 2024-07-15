import "./style.scss"
import Trash from "../../assets/exclude.svg"
import Confirm from "../../assets/confirm.svg"
import Add from "../../assets/add.svg"
import Search from "../../assets/seach.svg"
import { useState } from "react"

import {IOrcTaskTypes} from "../interfaces"

export default function Main() {

    const data: IOrcTaskTypes[] = [ 
        { id: 1, title: "Fazer almoço", concluded: false }, 
        { id: 2, title: "Estudar", concluded: false }, 
        { id: 3, title: "Lavar louça", concluded: false }
    ]
    const [allTasks, setAllTasks] = useState<IOrcTaskTypes[]>(data)
    const [originalTasks, setOriginalTasks] = useState(allTasks)

    const [newTask, setNewTask] = useState<string>('')

    const generateTaskId = () => {
        let generatedId: number;
        originalTasks.sort((a, b) => a.id - b.id)
        for (let n = 1;; n++) {
            try {
                generatedId = originalTasks[n - 1].id
            } catch {
                generatedId = 999
            }
            if (n == generatedId) {
                continue;
            } else {
                generatedId = n;
                break;
            }
        }
        return generatedId
    }

    const addItem = (e: Event) => {
        e.preventDefault()
        setNewTask('')
        const id = generateTaskId()
        if (newTask) {
            setAllTasks(allTasks.concat({id: id, title: newTask, concluded: false}))
            setOriginalTasks(originalTasks.concat({id: id, title: newTask, concluded: false}))
        }
    }

    const eraseTask = (task: IOrcTaskTypes) => {
        setAllTasks(allTasks.filter(f => f != task ? f : ''))
        setOriginalTasks(allTasks.filter(f => f == task ? '' : f))
    }

    const [search, setSearch] = useState('')
    const searchTasks = (e: Event) => {
        e.preventDefault()
        const filteredTasks = originalTasks.filter(f => f.title.toLowerCase().includes(search.toLowerCase()));
        if (search != '' && filteredTasks.length < 1) {
            alert("Essa pesquisa não deu resultados")
        }
        else if(search != '') {
            setAllTasks(filteredTasks)
        }
        else {
            setAllTasks(originalTasks)
        }
    }
    
    const concludeTask = (task: IOrcTaskTypes) => {
        let taskStyle = document.querySelector(`.tarefaNum${task.id}`)
        taskStyle?.classList.toggle("concluded")
        task.concluded = !task.concluded
    }
    return (
        <main>
            <article>
                <section className="add-item">
                    <h1 title="To-do List">
                        To-do List
                    </h1>
                    <form className="add" onSubmit={(e: any) => addItem(e)}>
                        <input type="text" name="task" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Adcionar" maxLength={25}/>
                        <button type="submit">
                            <img src={Add} alt="Adcionar" />
                        </button>
                    </form>
                </section>
                <div className="tasksArea">
                    {allTasks.map((task: IOrcTaskTypes) => (
                        <section className={`task tarefaNum${task.id}`} key={task.id}>
                            <h2 title={task.title}>
                                {task.title}
                            </h2>
                            <figure>
                                <img src={Trash} alt="Excluir" onClick={() => eraseTask(task)}/>
                                <img src={Confirm} alt="Completar Task" onClick={() => concludeTask(task)}/>
                            </figure>
                        </section>
                    ))}
                </div>
                <form className="search" onSubmit={(e: any) => searchTasks(e)}>
                    <input type="text" name="tarefa" onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar"/>
                    <button type="submit">
                        <img src={Search} alt="Pesquisar" />
                    </button>
                </form>
            </article>
        </main>
    )
}