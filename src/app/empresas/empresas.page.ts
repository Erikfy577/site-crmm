import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class EmpresasPage implements OnInit {
  empresas: any[] = [];

  ngOnInit() {
    this.carregarEmpresas();
  }

  carregarEmpresas() {
    this.empresas = JSON.parse(localStorage.getItem('empresas') || '[]');
  }

  excluirEmpresa(index: number) {
    this.empresas.splice(index, 1);
    localStorage.setItem('empresas', JSON.stringify(this.empresas));
  }
}