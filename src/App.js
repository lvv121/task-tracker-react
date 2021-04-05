import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { DateTime } from './components/DateTime'
import RefreshTasks from './components/RefreshTasks'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [dateTime, ] = useState(new Date());

  useEffect(()=>{
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

 const timeComp = (first, second) =>
  {
      first=first.toLocaleTimeString();
      var splitFirst=first.split(":");
      var splitSecond=second.split(":");
      if(splitFirst[0] > splitSecond[0])
          return second;
      else if(splitFirst[0] === splitSecond[0] && splitFirst[1] > splitSecond[1])
          return second;
      else
          return first;
  } 

const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  return data
}

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data
}

const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks',
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })
  const data = await res.json()
  setTasks([...tasks, data])
}

const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id))
}

const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })
    const data = await res.json()
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
}

const deletePassedTasks = async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.day !== timeComp(dateTime,task.day)))
}

  return (
    
    <div className='container'>
      <Header 
      onAdd={()=>setShowAddTask
        (!showAddTask)}
      showAdd={showAddTask}
      />
      <RefreshTasks task={tasks.filter((task) => task.id >= 1)} deletes={deletePassedTasks}/>
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'no tasks for you'}
      <Footer />
      <div className='clock'>
        <DateTime tasks={tasks}/>
      </div>
    </div>
  )  
}

export default App