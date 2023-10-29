import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Task, User } from '../models';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //! IMPORTANTE: Este servicio ApiService se va a encargar de NADA MAS de devolver el Observable.
  //  Osea si, se conecta con la API FAKE json server, para realizar las diferentes consultas:
  //  GET, POST, PUT, PATCH, DELETE, pero NO se va a subscribir al observable. Lo va a retornar.
  //! Y el subscribe se va a realizar en otra capa, es decir en otro servicio.

  private baseURL = "http://localhost:3000";

  /*//* INYECCION DE DEPENDENCIA PARA OBTENER UNA INSTANCIA DE HttpClient.
        Asi realizar/recibir solicitudes/respuestas HTTP */
  constructor(private http: HttpClient) { }


  //! --------------------------------  TASKS  --------------------------------
  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseURL}/tasks?_sort=priority&_order=asc`);
  }
  /* NOTAS obtenidas por ChatGPT:

    El enfoque de retornar el Observable permite tener más control sobre cómo se manejan las solicitudes y cómo se procesan
    los datos antes de mostrarlos en la vista. También facilita el manejo de errores, ya que puedes encadenar operadores para
    gestionarlos de manera más elegante.
  */

  //#region //* DISTINTAS FORMAS DE TRABAJAR con el Observable, subscribiendose o no:

  // 2° FORMA. Sin retonar el Observable y subscribiendonos de una..
  public tasksArray: Task[] = [];

  public getTasks2(): void {
    this.http.get<Task[]>(`${this.baseURL}/tasks?_sort=priority&_order=asc`)
      .subscribe(

        data => this.tasksArray = data
      );
  }
  /* NOTAS obtenidas por ChatGPT:

    Al no retornar el Observable, no puedes aprovechar completamente el flujo de control y las características que ofrece Angular
    para manejar las solicitudes asincrónicas, como la capacidad de cancelar solicitudes o realizar transformaciones en los datos
    antes de asignarlos a las propiedades del componente.
  */

  /* NOTAS obtenidas por ChatGPT:

    En el segundo enfoque, debes tener en cuenta que this.tasksArray se actualizará directamente cuando llegue la respuesta de la
    solicitud HTTP. //* Esto puede funcionar bien para casos simples, pero si necesitas manejar varios flujos de datos o realizar
  * operaciones complejas en los datos antes de mostrarlos en la vista, el enfoque de retornar el Observable suele ser más adecuado.
  */

  //*  En resumen, ambos enfoques son válidos, pero la elección entre ellos dependerá de la complejidad de tu aplicación y de tus
  //*  necesidades de control sobre las solicitudes y los datos obtenidos.

  // FORMA DEPRECATED. (IGUAL que la anterior, pero sin el error :v ) Osea que no se hace mas de esta forma...
  public tasksArray2: Task[] = []; //Tambien se puede meter esta variable dentro de la funcion, para que el metodo la retorne
                                   //De esta forma obtener el valor donde se llame al metodo.
  public getTasksDeprecated(): void {
    this.http.get<Task[]>(`${this.baseURL}/tasks?_sort=priority&_order=asc`)
      .subscribe(

        data => this.tasksArray2 = data,
        error => { throw Error("Error al obtener las tareas de la base de datos") }
      );
  }

  // 3º FORMA. Reemplaza a la anterior forma, en la que al SUBSCRIBE no se le pasa mas dos callback, sino un OBJETO.
            // Un objeto que tiene dos atributos (next y error, donde cada una tine como valor una fn flecha.
  public tasksArray3: Task[] = []; //Tambien se puede meter esta variable dentro de la funcion, para que el metodo la retorne

  public getTasks3(): void {
    this.http.get<Task[]>(`${this.baseURL}/tasks?_sort=priority&_order=asc`)
      .subscribe({
        next: (data) => this.tasksArray3 = data,
        error: (error) => { throw Error("Error al obtener las tareas de la base de datos") }
      });
  }

  // Osea, con la variable 'tasksArray3' adentro del metodo seria:
  public getTasks4(): Task[] {

    let tasksArray: Task[] = [];

    this.http.get<Task[]>(`${this.baseURL}/tasks?_sort=priority&_order=asc`)
      .subscribe({
        next: (data) => this.tasksArray = data,
        error: (error) => { throw Error("Error al obtener las tareas de la base de datos") }
      });

      return tasksArray;
  }

  /* NOTAS de lo que dijo el profe:
    * Lo malo de la forma anterior, de subscribirse de una al Observable, podemos tener problemas, como que se retorne algo nulo,
    * ya que el Observable es asincronico. Ya que tambien NO tenemos un away que espere la response...
  */

  //#endregion


  public addTasks(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseURL}/tasks/${task.id}`, task);
  }

  public updateTask(task: Task): Observable<Task> {

    if (!task.id) throw Error("Task id is required");

    return this.http.patch<Task>(`${this.baseURL}/tasks/${task.id}`, task);
  }

  public deleteTask(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseURL}/tasks/${id}`).pipe(
      map(resp => true),    // Si sale bien retorna true. Recibir un response significa que salio bien.
      catchError(error => of(false))  // Si hay algun error en la solicitud me regresa falso
    );
  }

  // ! --------------------------------  USER  --------------------------------
  // 1° FORMA de hacer un get, propuesta por el profe Agus.. Aun no entiendo por que retorna el observable...
  public getToAuth(email: string, password: string): Observable<User[]> {
    console.log(email, password);
    return this.http.get<User[]>(`${this.baseURL}/users?email=${email}&password=${password}`);
  }

  // Ejemplo de como transformar la respuesta de la API
  public getUserNameById(id: number): Observable<string | null> {

    return this.http.get<User>(`${this.baseURL}/users/${id}`).pipe(
      map(user => user.username),
      catchError(error => of(null))
    );
  }

}
