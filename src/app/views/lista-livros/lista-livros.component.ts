import { VolumeInfo } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: Livro[];
  campoBusca: string = '';
  subscription: Subscription;
  livro: Livro;

  constructor(private service: LivroService) { }

  buscarLivros(){
     this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (items) => {this.listaLivros = this.livrosResultadoParaLivro(items)},
      // A declaração error e complete pode ser omitidas.
      error: erro => console.log(erro),
     })
  }

  livrosResultadoParaLivro(items): Livro[]{
    const livros: Livro[] = []
    items.forEach(item => {
        livros.push(this.livro = {
        title: item.VolumeInfo?.title,
        authors: item.VolumeInfo?.authors,
        publisher: item.VolumeInfo?.publisher,
        publishedDate: item.VolumeInfo?.publishedDate,
        description: item.VolumeInfo?.description,
        previewLink: item.VolumeInfo?.previewLink,
        thumbnail: item.VolumeInfo?.imageLinks?.thumbnail
      })
    })
    return livros
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
