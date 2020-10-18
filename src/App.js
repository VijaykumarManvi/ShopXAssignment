import React, { Fragment } from 'react';
import "./App.css";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      todoList:[],
      activeList:[],
      completedList:[],
      filter: 'all',
      remainingTasks: 0,
      inputText: '',
      removeDisplay: false,
      selectedId: ''
    }
  }
 
  // add a todoList
  addToDO = ()=> {
    if(this.state.inputText === ''){
      alert("Please enter task to be added")
    }
    else{
      let listValue ;       
      const newItem = {
        id : Math.floor(Math.random() * 100 ),
        value : this.state.inputText,
        isDone : false
      }      
      listValue = this.state.todoList;
      listValue.push(newItem)
      this.setState({
        todoList: listValue,
        inputText: ''
      })
    }
  }
  
  // Remove a todoList
  removeToDO = (id)=> {
    console.log('Deleted todolist id is ' + id)
    let listValue ; 
    if(this.state.todoList.length != 0){
      listValue = this.state.todoList;
      const updatedList = listValue.filter(item => item.id !== id)
      this.setState({
        todoList: updatedList,
        inputText: ''
      })
    }
  }

  // To get the active todos on click of active filter
  getActiveTasks =()=>{
    let list = this.state.todoList.filter((item, index)=>{
      return item.isDone === false;
    })
    this.setState({
      activeList : list,
      filter: 'active'
    })
  }

  // To get the completed todos on click of complete filter
  getCompletedTasks =()=>{
    let list = this.state.todoList.filter((item, index)=>{
      return item.isDone === true;
    })
    this.setState({
      completedList : list,
      filter: 'completed'
    })
  }

  // To get all the todos on click of all filter
  getAllTasks =()=>{
    this.setState({
      filter: 'all'
    })
  }

  // To clear the completed todos on click of Clear completed
  clearCompletedTasks=()=>{
    let list = this.state.todoList.filter((item, index)=>{
      return item.isDone === false;
    })
    this.setState({
      todoList : list,
      filter: 'clearall'
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.todoList != this.state.todoList){
      // Auto update of todos when user is in the active filter(if user deletes or adds or check or uncheck the todo)
      if(this.state.filter === 'active'){
        this.getActiveTasks();
      }
      // Auto update of todos when user is in the completed filter(if user deletes or adds or check or uncheck the todo)
      if(this.state.filter === 'completed'){
        this.getCompletedTasks();
      }
    }
  }

  // In order to display remaining tasks in the header section
  getRemainingaTasks=()=>{
    if(this.state.todoList.length != 0){
    let list = this.state.todoList.filter((item, index)=>{
      return item.isDone === false;
    })
    return list.length;}
    else {
      return 0;
    }
  }
  
  // when user checks or unchecks a todo
  checkedorUnchecked=(list)=>{
    const elementsIndex = this.state.todoList.findIndex(element => element.id == list.id )
    console.log('value is ' + elementsIndex)  
    let newArray = [...this.state.todoList]
    newArray[elementsIndex] = {...newArray[elementsIndex], isDone: !newArray[elementsIndex].isDone}
    this.setState({todoList: newArray,
    });
    
  }

  handlemouseEnter=(value)=>{
   this.setState({
     removeDisplay : true,
     selectedId : value,
   })
  }

  handlemouseLeave=()=>{
   this.setState({
     removeDisplay : false
   })
  }

  render(){
    let list = this.state.todoList;
    if(this.state.filter === 'all'){
      list = this.state.todoList;
    }else if(this.state.filter === 'active'){
      list = this.state.activeList;
    } else if(this.state.filter === 'completed'){
      list = this.state.completedList;
    }
    return(
      <Fragment>
        <p className='heading'>my list</p>
        <div className='header'>
          <span className='remaining'>{this.getRemainingaTasks()} items remaning</span>
          <span onClick={this.getAllTasks} className = {(this.state.filter === 'all' ? 'selected ' : '') + 'filter-buttons'}>ALL</span>
          <span onClick={this.getActiveTasks} className = {(this.state.filter === 'active' ? 'selected ' : '') + 'filter-buttons'}>ACTIVE</span>
          <span onClick={this.getCompletedTasks} className = {(this.state.filter === 'completed' ? 'selected ' : '') + 'filter-buttons'}>COMPLETED</span>
          <span onClick={this.clearCompletedTasks} style={{float: "right"}}>CLEAR COMPLETED</span>
        </div>
        <div className='content'>
          <div>
            <button 
            className='addToDO'
            onClick={this.addToDO}>  
             ADD
            </button>
            <span>
              <input
                id='input-text'
                type='text' 
                value={this.state.inputText}
                placeholder='What needs to be done?'
                onChange={(event) => this.setState({
                  inputText : event.target.value
                })}
            ></input>
            </span>
            
          </div> 
          <ul>            
            {list.map((item, index)=>{
              return (
                  <li key={Math.random()}
                  onMouseEnter={()=>this.handlemouseEnter(item.id)}
                    onMouseLeave={this.handlemouseLeave}>
                    <input className='check-box ' type='checkbox' checked = {item.isDone} onChange={()=>this.checkedorUnchecked(item)}></input>
                    <label style={{position:'relative'}}className={item.isDone ? 'over' : ''}                     
                    >{item.value} 
                    {this.state.removeDisplay && this.state.selectedId === item.id ? <span className='remove' onClick={()=>this.removeToDO(item.id)}>X</span> : '' }
                    </label>
                  </li>
              )
            })}
          </ul>
        </div>
      </Fragment>
      
    )
  }
}
export default App;
