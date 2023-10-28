import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = "http://localhost:3000";

  /*//* INYECCION DE DEPENDENCIA PARA OBTENER UNA INSTANCIA DE HttpClient.
        Asi realizar/recibir solicitudes/respuestas HTTP */
  constructor(private http: HttpClient) { }





}
