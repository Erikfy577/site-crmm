import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ClientesPage implements OnInit {
  clientes: any[] = [];

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
  }
  excluirCliente(index: number) {
   this.clientes.splice(index, 1);
   localStorage.setItem('clientes', JSON.stringify(this.clientes));
}
}