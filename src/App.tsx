import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {


    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });



    function removeTask(id: string, todolistId:string) {
        setTasks({...tasks,[todolistId]:tasks[todolistId].filter(t=>t.id!==id)})
    }

    function addTask(title: string, todolistId:string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistId]:[newTask,...tasks[todolistId]]})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId:string) {
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(m=>m.id === taskId ? {...m,isDone} : m)})

    }




    function changeFilter(value: FilterValuesType, todolistId:string) {
        setTodolists(todolists.map(filtered=> filtered.id===todolistId ? {...filtered, filter:value}:filtered))
    }


    return (
        <div className="App">
            {todolists.map((mapTodolists)=>{
                let tasksForTodolist = tasks[mapTodolists.id];

                if (mapTodolists.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (mapTodolists.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                return (
                    <Todolist key={mapTodolists.id}
                        todolistId={mapTodolists.id}
                        title={mapTodolists.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={mapTodolists.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
