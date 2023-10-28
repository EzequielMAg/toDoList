import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TasksViewComponent } from './components/tasks-view/tasks-view.component';
import { TasksComponent } from './services/tasks/tasks.component';



@NgModule({
  declarations: [
    AddTaskComponent,
    TasksViewComponent,
    TasksComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TasksModule { }
