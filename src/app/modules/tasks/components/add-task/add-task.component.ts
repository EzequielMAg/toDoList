import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../../../core/models';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['add-tasl-component.css']
})
export class AddTaskComponent {

  public task: Task = {
    priority: 1,
    description: "",
    done: false,
    id: null
  }

  @Output()
  public onNewTask: EventEmitter<Task> = new EventEmitter();

  public emitTask():void {

    //Validaciones
    if(!this.task.description) return;
    if(this.task.priority! <= 0 || this.task.priority! > 5) return;

    this.onNewTask.emit(this.task);
    this.restartTask();
  }

  public restartTask():void {
    this.task = {
      priority: 1,
      description: "",
      done: false,
      id: null
    }
  }



}
