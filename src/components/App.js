import React, { Component } from 'react';
import './App.css';
import Input from './components/input.js'
import Task from './components/task.js'



let todos = [
  // {
  //   title: 'Sit occaecat sunt nisi aliqua occaecat.',
  //   description: 'Non non consectetur enim pariatur dolore enim.Amet consequat aliqua ullamco in.',
  //   responsible: 'Max',
  //   priority: 'high',
  //   done: false
  // },
  // {
  //   title: 'Aliqua enim cupidatat dolor amet irure qui.',
  //   description: 'Non Culpa excepteur officia consectetur enim proident cillum aliqua anim. enim.Amet consequat aliqua ullamco in.',
  //   responsible: 'Nadya',
  //   priority: 'high',
  //   done: true
  // },
  // {
  //   title: 'Dolor aute incididunt occaecat et amet.',
  //   description: 'Esse ullamco cillum aute laborum ipsum in anim amet laborum. anim. enim.Amet consequat aliqua ullamco in.',
  //   responsible: 'Drew',
  //   priority: 'low',
  //   done: false
  // }
]


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos,
      todosFiltred: todos,
      isTodosFiltered: false,
      isTodosFiltredByPriority: false,
      isInputClosed: true,
      
    }
  }
  
  componentDidMount() {
    if(localStorage.getItem("todos")!=undefined){
      let oldTodos = JSON.parse(localStorage.getItem('todos'))
      this.setState({
        todos: oldTodos,
        todosFiltred: oldTodos
      })
    };
  }

  addNewTodo(newTask) {
    let prevTodo = this.state.todos;
    prevTodo.push(newTask);
    this.setState({
      // todos: [...this.state.todos, newTask],
      todos: prevTodo,
      isInputClosed: true,
    })
    localStorage.setItem('todos', JSON.stringify(this.state.todos));    
    
  }

  removeTodo(x) {
    let prevTodo = this.state.todos;
    
    if(this.state.isTodosFiltered) {
      // let prevTodo = this.state.todos;
      for(let i=0; i<this.state.todos.length; i++) {
        if(this.state.todos[i].description == this.state.todosFiltred[x].description) {
          prevTodo.splice(i, 1);
        }
      }
      this.setState({
        todosFiltred: prevTodo.filter((el)=>{return el.done}),
      })
    } else {
      prevTodo.splice(x, 1);
      
      this.setState({
        todosFiltred: prevTodo,
      })
    }
    localStorage.setItem('todos', JSON.stringify(this.state.todos));    
    
  }

  changeDesc (newTask, index) {
    let prevTodo = this.state.todos;    
    prevTodo[index].title = newTask.newTitle
    prevTodo[index].description = newTask.newDesc;
    prevTodo[index].responsible = newTask.newResponsible;
    prevTodo[index].priority = newTask.newPriority;
    this.setState({
      todos: prevTodo
    })
    localStorage.setItem('todos', JSON.stringify(this.state.todos));        
  }

  closeInput () {
    this.setState({
      isInputClosed: !this.state.isInputClosed
    });
  }

  changeDone (index) {
    let prevTodo = this.state.todos;
    let prevTodoDone = this.state.todos[index].done;    
    prevTodo[index].done = !prevTodoDone
    this.setState({
      todos: prevTodo
    })
    localStorage.setItem('todos', JSON.stringify(this.state.todos));    
     
  }

  showDoneTasks () {
    if (!this.state.isTodosFiltered) {
      this.setState({
        todosFiltred: this.state.todos.filter((el)=>{return el.done}),
        isTodosFiltered: true
      })
    } else {
      this.setState({
        todosFiltred: this.state.todos,
        isTodosFiltered: false
      })
    }
  }

  showPriority (priority) {
    let prevDone = this.state.todos;
    
    if (!this.state.isTodosFiltredByPriority) {
      this.setState({
        todosFiltred: this.state.todos.filter((el)=>{return el.priority == priority}),
        isTodosFiltredByPriority: true
      })
    } else {
      this.setState({
        todosFiltred: prevDone,
        isTodosFiltredByPriority: false
      })
    }
    // console.log(p)
  }

  renderFooter() {
    if(this.state.todos.length == 0) {
      return (
        <p>Nothing</p>
      )
    } else {
      return (
        <footer>
          <div>
            <button onClick={this.showDoneTasks.bind(this)}>Show done</button>
          </div>
          <h3>Total tasks: {this.state.todos.length}</h3>
          <h3>Done tasks: {this.state.todosFiltred.filter((item) => { return item.done }).length}</h3>
        </footer>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <div 
          className={this.state.isInputClosed? 'zero-height': 'zero-height2'  }>
          <Input 
          addNewTodo={this.addNewTodo.bind(this)}
          />
        </div>

        <button
        // className='open-btn'
        onClick={this.closeInput.bind(this)}
        className={this.state.isInputClosed? 'open-btn': 'open-btn open-btn2 '  }
        >
        {/* click */}
       
        <img src='https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-down-01-20.png' alt=""/>

        
        </button>
        
        <div className='tasks-div'>
          <ul>
            {this.state.todosFiltred.length==0?<p>Empty</p>:
              this.state.todosFiltred.map((item, index)=> { 
                return (
                  <Task key={index} 
                  index={index} 
                  description={item.description}
                  title={item.title}
                  responsible={item.responsible}
                  priority={item.priority}
                  done={item.done}
                  changeDone={this.changeDone.bind(this)}
                  removeTodo={this.removeTodo.bind(this)}
                  changeDesc={this.changeDesc.bind(this)}
                  isTodosFiltered={this.state.isTodosFiltered}
                  />
                )
              })
            }
          </ul>
          {this.renderFooter()}
          <button onClick={this.showPriority.bind(this, 'High')}>High</button>
          <button onClick={this.showPriority.bind(this, 'Lowest')}>Lowest</button>
        </div>
      </div>
    );
  }
}

export default App;
