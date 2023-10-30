import { ITask, IUser } from "./interfaces";

export class Task implements ITask {
  id: number | null;
  priority: number | null;
  description: string | null;
  done: boolean | null;

  constructor(task?: any) {
    this.id = task.id != null ? task.id : null;
    this.priority = task.priority != null ? task.priority : null;
    this.description = task.description != null ? task.description : null;
    this.done = task.done != null ? task.done : null;
  }
}

export class User implements IUser {
  id: number | null;
  username: string | null;
  email: string | null;
  password: string | null;

  constructor(user?: any) {
      this.id = user.id != null ? user.id : null;
      this.username = user.username != null ? user.username : null;
      this.email = user.email != null ? user.email : null;
      this.password = user.password != null ? user.password : null;
    }

    /* if (user) {
      this.id = user.id != null ? user.id : null;
      this.username = user.username != null ? user.username : null;
      this.email = user.email != null ? user.email : null;
      this.password = user.password != null ? user.password : null;
    } else {
      // Si 'user' es undefined, inicializa las propiedades a sus valores por defecto.
      this.id = null;
      this.username = null;
      this.email = null;
      this.password = null;
    }
  }*/
}
