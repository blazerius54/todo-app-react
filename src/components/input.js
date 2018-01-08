import React, { Component } from 'react';

export default class Input extends Component {
  constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            responsible: '',
            priority: 'lowest',
            done: false,
            date: '',
            isCorrect: true
        }
    
    }

    handleInputChange(event) {
        this.setState({
          title: this.inputTodoTitle.value,
          responsible: this.inputTodoResponsible.value,
          description: this.inputTodoDescription.value,
          priority: this.selectTodoPriority.value,
          date: this.dateInput.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        for(let k in this.state) {
            if(k === 'priority') {
                break;
            }
            if(this.state[k].length ===0 ) {
                console.log('error '+k);
                this.setState({
                    isCorrect: false
                })
            } else {
                console.log(this.state[k]);
            }
        };
        if(this.state.isCorrect) {
            this.props.addNewTodo(this.state);
            this.setState({
                title: '',
                description: '',
                responsible: '',
                priority: 'lowest',
            })
    
        }
    }

    render() {
        return (
            <div className='input-info'>
                <h3>Add new todo:</h3>
                <form 
                onSubmit={this.handleSubmit.bind(this)}
                action="">
                    <div className='form-section'>
                        <label htmlFor="inputTodoTitle">Title</label>
                        <input 
                        type="text"
                        name='todoTitle'
                        id='inputTodoTitle'
                        // value={this.state.title}
                        onChange={this.handleInputChange.bind(this)}
                        ref={(input) => { this.inputTodoTitle = input; }}
                        />
                    </div>
                    <div className='form-section'>
                        <label htmlFor="inputTodoResponsible">Responsible</label>
                        <input 
                        type="text"
                        name='todoResponsible'
                        id='inputTodoTitle'
                        // value={this.state.responsible}
                        onChange={this.handleInputChange.bind(this)}
                        ref={(input) => { this.inputTodoResponsible = input; }}
                        />
                    </div>
                    <div className='form-section'>
                        <label htmlFor="inputTodoDescription">Description</label>
                        <textarea 
                        type="text"
                        name='todoResponsible'
                        id='inputTodoDescription'
                        // value={this.state.responsible}
                        onChange={this.handleInputChange.bind(this)}
                        ref={(input) => { this.inputTodoDescription = input; }}
                        />
                    </div>
                    <div className='form-section'>
                        <label htmlFor="selectTodoPriority">Priority</label>
                        <select 
                        name='todoPriority'
                        id='selectTodoPriority'
                        // value={this.state.responsible}
                        onChange={this.handleInputChange.bind(this)}
                        ref={(select) => { this.selectTodoPriority = select; }}
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                    <div className='form-section'>
                            <label htmlFor="">Date <span className='necessary'>(if necessary)</span></label>
                            <input
                                id="date"
                                type="datetime-local"
                                ref={(input) => { this.dateInput = input }}
                                onChange={this.handleInputChange.bind(this)}
                            />
                    </div>
                    <div className='add-btn-div'>
                        <button type="submit" className="add-btn">Add Todo</button>
                    </div>
                    {/* <button
                        onClick={(e) => { this.foo() }}
                    >click
                    </button> */}
                    {/* <p>{this.state.date}</p>
                    <div id='redDiv'>Время</div> */}
                </form>
            </div>
        );
  }
}

