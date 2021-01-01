import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

export interface OfertasAPI {
  info_centros: Centro[];
  items: Ciclos[];
}

export interface Ciclos {
  codigo: string;
  familia: string;
  codigo_ciclo: string;
  nombre_ciclo: string;
  tipo: string;
  turno: string;
  bilingue: string;
  dual: string;
}

export interface Centro {
  codigo: string;
  nombre: string;
  direccion: string;
  telefono: string;
  localidad: string;
  codigo_provincia: string;
}
@Injectable({
  providedIn: 'root',
})
export class OfertasBeService {
  constructor(private _httpClient: HttpClient) {}

  get_ofertas(): Observable<OfertasAPI> {
    const requestUrl = 'http://127.0.0.1:8088/ofertas';

    return this._httpClient.get<OfertasAPI>(requestUrl).pipe(
      catchError(() => {
        console.log('error');
        return Observable;
      })
    );
  }

  get_ofertas_query(
    familia: string,
    codigo_ciclo: string,
    nombre_ciclo: string
  ): Observable<OfertasAPI> {
    const requestUrl = 'http://127.0.0.1:8088/tq';
    familia = familia.trim();
    codigo_ciclo = codigo_ciclo.trim();
    nombre_ciclo = nombre_ciclo.trim();

    let options = {
      params: new HttpParams(),
    };

    familia ? (options.params = options.params.set('familia', familia)) : {};
    codigo_ciclo
      ? (options.params = options.params.set('codigo_ciclo', codigo_ciclo))
      : {};
    nombre_ciclo
      ? (options.params = options.params.set('nombre_ciclo', nombre_ciclo))
      : {};

    return this._httpClient.get<OfertasAPI>(requestUrl, options).pipe(
      catchError(() => {
        console.log('error');
        return Observable;
      })
    );
  }
}
