import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/core/models';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styles: [`
    .btn-color { background-color: #ffe69c;}
    .small-icon {padding: 5px 10px;}
    .vertical-center {vertical-align: middle;}
  `
  ]
})
export class TasksViewComponent {

  @Input()
  public tasks: Task[] = [];

  @Output()
  public taskToDelete: EventEmitter<number> = new EventEmitter();

  @Output()
  public taskToUpdate: EventEmitter<Task> = new EventEmitter();

  /* constructor(private dialog: MatDialog) {} */

  public deleteTask(id: number): void {
    this.taskToDelete.emit( id );
    console.log(id);
  }

  public editTask(task: Task): void {
    this.taskToUpdate.emit( task );
  }


}
