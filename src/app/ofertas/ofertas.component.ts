import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

export interface OfertasAPI {
  info_centros: Centro[];
  items: Ciclos[];
}

export interface Ciclos {
  codigo : string;
  familia : string;
  codigo_ciclo : string;
  nombre_ciclo : string;
  tipo : string;
  turno : string;
  bilingue : string;
  dual : string;
}

export interface Centro {
  codigo: string;
  nombre: string;
  direccion: string;
  telefono: string;
  localidad: string;
  codigo_provincia: string;
  familia: string;
  codigo_ciclo: string;
  nombre_ciclo: string;
  tipo: string;
  turno: string;
  bilingue: string;
  dual: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(): Observable<OfertasAPI> {
    const requestUrl = 'http://127.0.0.1:8088/ofertas';

    return this._httpClient.get<OfertasAPI>(requestUrl);
  }
}


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.sass']
})

export class OfertasComponent implements AfterViewInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'direccion', 'telefono', 'localidad', 'codigo_provincia', 'familia', 
  'codigo_ciclo', 'nombre_ciclo', 'tipo', 'turno', 'bilingue', 'dual'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: Ciclos[] = [];

  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

}
 
