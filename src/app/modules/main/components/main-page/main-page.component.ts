import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/core/models';
import { TasksService } from 'src/app/modules/tasks/services/tasks.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public tasks: Task[] = [];

  constructor(private tasksService: TasksService) {}

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

}
