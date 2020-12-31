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

  get_ofertas_query(term: string): Observable<OfertasAPI> {
    const requestUrl = 'http://127.0.0.1:8088/tq';
    term = term.trim();

    const options = term
      ? { params: new HttpParams().set('familia', term) }
      : {};

    return this._httpClient.get<OfertasAPI>(requestUrl, options).pipe(
      catchError(() => {
        console.log('error');
        return Observable;
      })
    );
  }
}
