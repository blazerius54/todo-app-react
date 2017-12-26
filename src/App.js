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

// let prevTrg = '';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos,
      todosFiltred: todos,
      isTodosFiltered: false,
      isTodosFiltredByPriority: false,
      isInputClosed: true,
      prevTrg: ''
    }
  }
  
  componentDidMount() {
    if(localStorage.getItem("todos") !== undefined){
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
        if(this.state.todos[i].description === this.state.todosFiltred[x].description) {
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

  changeClass (event) {
    // console.log(prevTrg)
    let eventTrg = event.target;
    if(this.state.prevTrg === eventTrg) {
      
      if(this.state.prevTrg!== '') {
        eventTrg.classList.remove('active-btn');
        // this.state.prevTrg= '';
        this.setState({
          prevTrg: ''
        })
        this.showAllTodos()
      }
    } else {
      if(this.state.prevTrg!== '') {
        this.state.prevTrg.classList.remove('active-btn')
      }
      eventTrg.className='active-btn';
      // this.state.prevTrg = eventTrg;
      this.setState({
        prevTrg: eventTrg
      })
    }
  }

  filterTodos  (event, p) {
    if (arguments.length === 1) {
        this.setState({
          todosFiltred: this.state.todos.filter((el)=>{return el.done}),
          isTodosFiltered: true
        })
    } else if (arguments.length === 2) {
        this.setState({
          todosFiltred: this.state.todos.filter((el)=>{return el.priority === p}),
          isTodosFiltered: true
        })
      }
    this.changeClass(event);
      
  }

  showAllTodos () {
    this.setState({
      todosFiltred: this.state.todos,
      isTodosFiltered: false
    })
  }

  renderFooter() {
    if(this.state.todos.length === 0) {
      return (
        <p>Nothing</p>
      )
    } else {
      return (
        <footer>
          <div className='function-btns'>
            <button onClick={(e)=>{this.filterTodos(e)}}>Show done</button>
            <button onClick={(e)=>{this.filterTodos(e, 'Lowest')}}>Lowest</button>
            <button onClick={(e)=>{this.filterTodos(e, 'High')}}>High</button>
            <button onClick={(e)=>{this.filterTodos(e, 'Highest')}}>Highest</button>
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
        <img src='https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-down-01-20.png' alt=""/>

        </button>
        
        <div className='tasks-div'>
          <ul>
            {this.state.todosFiltred.length === 0?<p>Empty</p>:
              this.state.todosFiltred.map((item, index)=> { 
                return (
                  <Task key={index} 
                  index={index} 
                  description={item.description}
                  title={item.title}
                  responsible={item.responsible}
                  priority={item.priority}
                  done={item.done}
                  date={item.date}
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
        </div>
      </div>
    );
  }
}

export default App;
