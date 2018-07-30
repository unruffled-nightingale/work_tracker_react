import d3 from 'd3'
import React, {Component} from 'react'
import Request from 'superagent'
import axios from 'axios'


export default class Main extends Component {
   constructor() {
     super();

     this.api_url = 'http://localhost:5000'
     this.user_name = 'robert manteghi'
     this.addTask = this.addTask.bind(this);
     this.changeTaskInput = this.changeTaskInput.bind(this);
     this.changeTask = this.changeTask.bind(this);

     // for testing
     this.task_count = 1

     this.state = {
         tasks: [],
         inputTask: "",
         currentTask: "Break",
         user_id: 0
     }

   }

   componentDidMount(){
       this.postUser(this.user_name).then(
           data => {
               this.setState({user_id: data.user_id})
               this.getCurrentTasks(data.user_id).then(
                   data => {
                       console.log(data)
                       this.setState({tasks: data})
               })
       })

   }

   postTask (task) {
       var promise = axios.post('http://localhost:5000/add_task', {
           task: task,
       }).then(function(response) {
            return response.data;
       })
       return promise
   }

   postUser (user) {
       var promise = axios.post('http://localhost:5000/add_user', {
           user_name: user,
       }).then(function(response) {
            console.log(response.data)
            return response.data;
       })
       return promise
   }

   logTask (task_id, user_id) {
       axios.post('http://localhost:5000/log_task', {
           user_id: user_id,
           task_id: task_id,
        }).then((response) => {console.log(response.data)})
   }

   addTask () {
     this.refs.btn.setAttribute("disabled", "disabled");
     if (!this.state.tasks.map(e => e.task).includes(this.state.inputTask) && this.state.inputTask!=="") {
         this.postTask(this.state.inputTask).then(
             data => {
                 var task = {'task_id': data.task_id, 'task': this.state.inputTask}
                 this.setState(prevState => ({ tasks: [...prevState.tasks, task]}))
                 this.postCurrentTask(this.state.user_id, data.task_id)
         });
     }
     this.refs.btn.removeAttribute("disabled")
   }

   deleteTask(task_id,  task){
      var array = [...this.state.tasks]
      const index = array.map(e => e.task_id).indexOf(task_id);
      array.splice(index, 1)
      this.setState({tasks: array})
      this.deleteCurrentTask(this.state.user_id, task_id)
   }

   getCurrentTasks() {
       console.log(this.state.user_id)
       var promise = axios.post('http://localhost:5000/get_current_tasks', {
           user_id: this.state.user_id,
       }).then(function(response) {
            return response.data;
       })
       return promise
   }

   postCurrentTask (user_id, task_id) {
       axios.post('http://localhost:5000/add_current_task', {
           user_id: user_id,
           task_id: task_id,
        }).then((response) => {console.log(response.data)})
   }

   deleteCurrentTask (user_id, task_id) {
       axios.post('http://localhost:5000/delete_current_task', {
           user_id: user_id,
           task_id: task_id,
        }).then((response) => {console.log(response.data)})
   }


   changeTask(e){
       this.setState({currentTask: e.target.value})
       this.logTask(e.target.id, this.state.user_id)
   }

   changeTaskInput(e){
      this.setState({inputTask : e.target.value})
   }

   renderRadioButton = (id, value) => {
      return (
           <div className="row pt-1 pb-1">
               <div className="form-check col-9">
                   <input className="form-check-input" type="radio" value={value} id={id} checked={this.state.currentTask === value}
                          onChange={this.changeTask}/>
                   <label className="form-check-label d-block text-truncate" for={id}>
                    {value}
                   </label>
               </div>
               <button className="btn btn-outline-secondary btn-minus button-icon d-flex align-items-center mt-1 mb-1 mr-1 ml-1"
                       type='button'  id={id} value={value} onClick={this.deleteTask.bind(this, id, value)}>
                   <i id={id} value={value} className="minus-icons material-icons">remove</i>
               </button>
           </div>
      )
   }

   render() {
      return (
          <div>
          <div className="container-flex pt-3 pl-5">
              <div className="row">
                  <h1 className="title col-12 pt-4 pb-4">WorkTracker</h1>
              </div>
              <div className="input-group pb-5">
                  <input className="col-5 form-control" type="text" onChange={this.changeTaskInput} placeholder="Submit a task"/>
                  <span className="input-group-btn pl-2">
                      <button onClick={this.addTask} ref="btn" className="btn btn-outline-secondary button-icon d-flex align-items-center">
                          <i class="material-icons">add</i>
                      </button>
                  </span>
              </div>
          </div>
          <div class="container-flex pl-5">
              <div class="row">
                  <div class="col-4 pl-5 pr-5 pt-2">
                       <div class="row pt-1 pb-2">
                           <div class="form-check col-9">
                               <input class="form-check-input" type="radio" id="0" value="Break" onChange={this.changeTask} checked={this.state.currentTask === "Break"}/>
                               <label class="form-check-label" for="0">
                                Break
                               </label>
                           </div>
                       </div>
                       { this.state.tasks.map(e => this.renderRadioButton(e.task_id, e.task) )}
                  </div>
              </div>
          </div>
          </div>
      )
   }
};