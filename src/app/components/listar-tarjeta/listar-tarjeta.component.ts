import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.sass']
})
export class ListarTarjetaComponent implements OnInit {
  listTarjetas: TarjetaCredito[] = [];


  constructor(private _tarjetaService: TarjetaService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.obtenerTarjetas().subscribe(doc => {
      this.listTarjetas = [];
      doc.forEach((element: any) => {
        this.listTarjetas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

      });
    })
  }

  eliminarTarjeta(id: any){
    this._tarjetaService.eliminarTarjeta(id).then(()=>{
      this.toastr.error('La tarjeta fue eliminda con exito','Registro eliminado')
    }, error=>{
      this.toastr.error('Opp! algo salio mal','Error')
      console.log(error)
    })
  }

  editarTarjeta(tarjeta: TarjetaCredito){
    this._tarjetaService.addTarjetaEdit(tarjeta);

  }

}
