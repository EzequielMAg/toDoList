import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/core/models';
import { TasksService } from 'src/app/modules/tasks/services/tasks.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {


  @ViewChild('editTaskDialog', { static: false})
  public editTaskDialog!: TemplateRef<any>;

  public tasks: Task[] = [];
  public editTask: Task= {id: 0, done:false, priority: 0, description: '' };
  public isPopupVisible = false;

  constructor(private tasksService: TasksService, private dialog: MatDialog) {}

  ngOnInit(): void {

    this.searchTasks();
  }

  // Este metodo es el que finalmente trae las tareas de la API fake.
  // Llama al metodo getTasks() del servicio TaskService, que a su vez llama a getTasks() :v del otro servicio ApiService,
  // que este ultimo es quien hace la peticion get y retorna el observable.
  // Despues en TaskService, se subscribe al observable, y se retorna una promesa, la cual es resuelta aqui, con este metodo.
  public searchTasks() {
    this.tasksService.getTasks().then(data => this.tasks = data);
  }

  public deleteTask(id: number) {
    this.tasksService.deleteTask(id).then(bool => console.log("Se elimino la tarea: ", bool));
    this.searchTasks();
  }

  public addTask(task: Task) {
    this.tasksService.addTask(task).then(data => console.log("Se agrego la trarea: ", data));
    this.searchTasks();
  }

  public updateTask() {
    console.log(this.editTask);

    this.tasksService.updateTask(this.editTask).then(bool => console.log("Se updateo la tarea: ", bool));

    this.closeDialog();
    this.searchTasks();
  }

  public openEditTaskDialog(task: Task): void {
    this.editTask = structuredClone(task);

    const dialogRef = this.dialog.open(this.editTaskDialog, {
      height: '300px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: Task | undefined) => {
      if (result) {
        // Por ahora no pasa nada
      }
    });

  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }

}
