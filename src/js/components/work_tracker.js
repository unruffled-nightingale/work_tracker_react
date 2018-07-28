import d3 from 'd3'
import React, {Component} from 'react'

export default class Main extends Component {
   constructor() {
     super();

     this.api_url = 'http://localhost:5000'
     this.user = {'user_name': 'robert manteghi', 'user_id': 1};
     this.addTask = this.addTask.bind(this);
     this.deleteTask = this.deleteTask.bind(this);
     this.changeTaskInput = this.changeTaskInput.bind(this);
     this.changeTask = this.changeTask.bind(this);

     // for testing
     this.task_count = 1

     this.state = {
         tasks: [{"task_id": 0, "task": "break"}],
         inputTask: "",
         currentTask: "break",
         user_id: 0
     }

   }

   postTask (task) {
       var task_id = ""
       console.log('posting to /post_task: ' + task);
       this.task_count++
       task_id = this.task_count
       return task_id
   }

   postUser (user) {
       var user_id = ""
       console.log('posting to /add_user: ' + task);
       user_id = 1
       return user_id
   }

   logTask (task_id, user_id) {
       console.log('posting to /log_task: ' + task_id + ' ' + user_id)
   }

   addTask () {
     if (!this.state.tasks.map(e => e.task).includes(this.state.inputTask) && this.state.inputTask!=="") {
         var task_id =  this.postTask(this.state.inputTask)
         var task = ({'task_id': task_id, 'task': this.state.inputTask})
         this.setState(prevState => ({ tasks: [...prevState.tasks, task]}));
     }
   }

   deleteTask(task_id, task) {
      console.log(e.target.task_id)
      console.log(task)
      // find position
      var array = [...this.state.tasks]
      var index = array.indexOf({'task_id': task_id, 'task': task})
      array.splice(index, 1)
      this.setState({tasks: array})
   }

   changeTask = (e) => {
       this.setState({currentTask: e.target.value})
       this.logTask(e.target.id, this.state.user_id)
   }

   changeTaskInput(e){
      this.setState({inputTask : e.target.value})
   }

   renderRadioButton = (id, value) => {
      return (
          <div className="radio">
              <label>
                  <input type="radio" value={value} id={id} checked={this.state.currentTask === value}
                      onChange={this.changeTask} />
                  {value}
              </label>
              <button type='button' onClick={this.deleteTask}><i class="material-icons">DELETE</i></button>
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
                { this.state.tasks.map(e => this.renderRadioButton(e.task_id, e.task) )}
              </form>
          </div>
      )
   }
};