import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Task } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  //* Inyectamos el servicio ApiService para conectarse a traves de este a la API Fake creada con json server.
  constructor(private apiService: ApiService) { }

  // Metodo que obtiene las tareas guardadas en el json, internamente llama a otro metodo del mismo nombre, que esta en el apiService,
  // el cual hace la peticion get.
  //* La promesa que retorna se va a resolver en el component.ts
  public getTasks(): Promise<Task[]> {

    return new Promise<Task[]>((resolve, reject) => {

      this.apiService.getTasks().subscribe({

        next: data => resolve(data),
        error: error => reject(error)
      })
    });
  }


  public addTask(task: Task): Promise<Task> {

    return new Promise<Task>((resolve, reject) => {

      this.apiService.addTask(task).subscribe({

        next: data => resolve(data),
        error: error => reject(error)
      })
    });
  }

  public deleteTask(id: number): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

      this.apiService.deleteTask(id).subscribe({

        next: bool => resolve(bool),
        error: error => reject(error)
      })
    });
  }

  public async updateTask(task: Task): Promise<Task | null> {

    let resp: Task | null = null;

    try {
      const apiResponse = this.apiService.updateTask(task);
      resp = await lastValueFrom(apiResponse);

    } catch (error) {
      throw error;
    }

    return resp;
  }



}
