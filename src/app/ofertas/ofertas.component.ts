import { Component, AfterViewInit } from '@angular/core';
import { Ciclos, OfertasBeService } from '../ofertas-be.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.sass'],
})
export class OfertasComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'codigo',
    'familia',
    'codigo_ciclo',
    'nombre_ciclo',
    'tipo',
    'turno',
    'bilingue',
    'dual',
  ];

  constructor(private _ofertasBe: OfertasBeService) {}
  data: Ciclos[] = [];
  isRateLimitReached = false;
  isLoadingResults = false;
  f_familia_ciclo = '';
  f_codigo_ciclo = '';
  f_nombre_ciclo = '';
  ngAfterViewInit() {
    //this._ofertasBe.get_ofertas().subscribe((data) => (this.data = data.items));
    console.log('ngAfterViewInit');
  }

  send_rq() {
    this.data = [];
    if (
      this.f_codigo_ciclo.length >= 3 ||
      this.f_familia_ciclo.length >= 3 ||
      this.f_nombre_ciclo.length >= 3
    ) {
      this._ofertasBe
        .get_ofertas_query(
          this.f_familia_ciclo,
          this.f_codigo_ciclo,
          this.f_nombre_ciclo
        )
        .subscribe((data) => (this.data = data.items));
    }
  }
}
