import d3 from 'd3'
import React, {Component} from 'react'

export default class Main extends Component {
   constructor() {
     super();

     this.api_url = 'http://localhost:5000'
     this.user = {'user_name': 'robert manteghi', 'user_id': 1};
     this.addTask = this.addTask.bind(this);
     this.changeTaskInput = this.changeTaskInput.bind(this);

     this.state = {
       tasks: ["option2", "break", "option1", 'hello'],
       inputTask: "",
       currentTask: "hello"
     }

   }

   getUserId(user_name){
      var user_id = ""
      console.log('posting '+this.state.inputTask+' to /get_user');
      return user_id
   }

   postTask( task ) {
       var task_id = ""
       console.log('posting '+this.state.inputTask+' to /addTask');
       return task_id
   }

   logTask ( user_id, task_id, task ) {
        console.log('posting to /logTask');
   }

   changeTaskInput(e){
      /* Changes the state of inputTask based on the status of the input form */
      this.setState({inputTask : e.target.value})
   }

   addTask () {
     /* Adds a task to the list of tasks and posts the task to the api */
     if (!this.state.tasks.includes(this.state.inputTask) && this.state.inputTask!=="") {
         var task_id = ""
         task_id = postTask(this.state.inputTask)
         this.state.tasks.push(this.state.inputTask)
     }
   }

   handleOptionChange = (e) => {

    this.setState({
      currentTask: e.target.value
    });
    if (this.state.currentTask === e.target.value){
        console.log('same')
    }
   }

   renderRadioButton = (value) => {
       return (
           <div className="radio">
              <label>
                  <input type="radio" value={value} checked={this.isChecked} onChange={this.handleOptionChange} />
                  {value}
            </label>
           </div>
       )
   }


   render() {
      return (
         <div>
             <h1>WorkTracker</h1>
             <input type="text" onChange={this.changeTaskInput}/>
             <button onClick={this.addTask}><i class="material-icons">ADD</i></button>
             <form>
              {this.renderRadioButton('hello2')}
              <div className="radio">
                <label>
                  <input type="radio" value="hello" checked={this.state.currentTask === 'hello'} onChange={this.handleOptionChange} />
                  hello
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="option2" checked={this.state.currentTask === 'option2'} onChange={this.handleOptionChange}/>
                  Option 2
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="option3" checked={this.state.currentTask === 'option3'} onChange={this.handleOptionChange}/>
                  Option 3
                </label>
              </div>
            </form>
         </div>

      )
    }
};