import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TasksViewComponent } from './components/tasks-view/tasks-view.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddTaskComponent,
    TasksViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    AddTaskComponent,
    TasksViewComponent,
  ]

})
export class TasksModule { }
