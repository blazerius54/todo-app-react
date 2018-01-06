import React, { Component } from 'react';


export default class Task extends Component {
    constructor(props) {
        super(props);
        this.timeout = null;
        this.state = {
            isEditing: false,
            isLate: false,
            newTask: {
                newDesc: this.props.description,
                newResponsible: this.props.responsible,
                newPriority: this.props.priority,
                newTitle: this.props.title
            }
        }
    }

    handleRemoveTodo() {
        this.props.removeTodo(this.props.index);
    }

    toggleIsEditing() {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    setNewDesc(event) {
        this.setState({
            newTask: {
                newDesc: this.textArea.value,
                newTitle: this.inputTitle.value,
                newResponsible: this.inputResp.value,
                newPriority: this.selectPriority.value
            }      
        })
    }

    setDone () {
        this.props.changeDone(this.props.index)
    }

    sendNewDesc() {
        this.props.changeDesc(this.state.newTask, this.props.index);
        this.setState({
            isEditing: false
        })
    }

    renderBtn () {
        if(!this.props.isTodosFiltered && !this.state.isLate) {
            return (<button onClick={this.setDone.bind(this)}>done</button>)
        }  
    }

    renderClockImg () {
        if(this.props.date) {
            return <img src="https://cdn3.iconfinder.com/data/icons/other-icons/48/time_clock-48.png" alt=""/>
        }
    }

    renderHeader () {
        return (
            <header className='task-header'>
            <h3 className={this.props.done? 'done-task': 'x'}>{this.props.title}</h3>
            <div className='header-div'>
                {this.renderClockImg()}
                {this.renderBtn()}
            </div>
            </header>
        )
    }

    checkIsLate () {
        let newDate = new Date();
        if (new Date(this.props.date) < newDate) {
            this.setState({
                isLate: true
            })
        } else {
            this.setState({
                isLate: false
            })
        }
    }

    componentDidMount () {
        // setInterval(()=>{
        //     let newDate = new Date();
        //     if(new Date(this.props.date) < newDate) {
        //         this.setState({
        //             isLate: true
        //         })
        //     }
        // }, 1000)
        this.timeout = setInterval(()=>{
            this.checkIsLate()
        }, 1000)
    }

    componentWillUnmount() {
        clearTimeout(this.timeout); 
     }

    renderInput() {
        if (this.state.isEditing) {
            return (
                <form action="" className='col-form'>
                    <div className="form-section">
                        <label htmlFor="">Title:</label>
                        <input type="text"
                            ref={(input) => { this.inputTitle = input; }}
                            defaultValue={this.props.title}
                            onChange={this.setNewDesc.bind(this)}
                        />
                    </div>
                    <div className='form-section'>

                        <label htmlFor="">Responsible:</label>
                        <input
                            type="text"
                            ref={(input) => { this.inputResp = input; }}
                            defaultValue={this.props.responsible}
                            onChange={this.setNewDesc.bind(this)}

                        />
                    </div>

                        <div className="form-section">
                            <label htmlFor="">Description:</label>
                            <textarea
                                type="text"
                                onChange={this.setNewDesc.bind(this)}
                                defaultValue={this.props.description}
                                ref={(textArea) => { this.textArea = textArea; }}
                            />
                        </div>

                        <div className="form-section">
                            <label htmlFor="">Priority:</label>
                            <select
                                name='todoPriority'
                                onChange={this.setNewDesc.bind(this)}
                                ref={(select) => { this.selectPriority = select; }}
                            >
                                <option>Lowest</option>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Highest</option>
                            </select>

                        </div>
                        <footer>
                            <button className='save-btn' onClick={this.sendNewDesc.bind(this)}>Save</button>
                        </footer>

                </form>
            )
        } else {
            return (
                <div className={this.state.isLate? 'late' : 'x'}>
                    {this.renderHeader()}
                    {/* <header className='task-header'> */}
                        {/* <h3 className={this.props.done? 'done-task': 'x'}>{this.props.title}</h3>  */}
                        {/* {this.renderClockImg()} */}
                        {/* {!this.props.isTodosFiltered? <button onClick={this.setDone.bind(this)}>done</button> : <p>asdasd</p>} */}
                        {/* {this.renderBtn()} */}
                    {/* </header> */}
                    <div className="container">
                        <div className='task-content'>
                            <p>Priority: {this.props.priority}</p>
                            <p>Responsible: {this.props.responsible}</p>
                            <p>{this.props.description}</p>
                            <p>{this.props.date}</p>
                        </div>
                        <footer>
                            <button className='edit-btn' onClick={this.toggleIsEditing.bind(this)}>
                                <span>Edit</span>
                            </button>
                            <button className='delete-btn' onClick={this.handleRemoveTodo.bind(this)}>
                                <span>Delete</span>
                            </button>
                        </footer>
                    </div>
                    
                </div>
            )
        }
    }

    render() {
        return (
            <li>
                {this.renderInput()}
            </li>
        );
    }
}


