import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class HomeComponent implements OnInit {
  nomeUsuario = 'Usuário';
  totalClientes = 0;
  totalEmpresas = 0;

  // Relógio
  horaAtual = new Date();
  clockHourX = 50;
  clockHourY = 50;
  clockMinuteX = 50;
  clockMinuteY = 50;
  clockSecondX = 50;
  clockSecondY = 50;

  // Calendário
  mesAtual = new Date();
  nomesDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  diasDoMes: (number | null)[] = [];
  diaHoje = new Date().getDate();

  // Notas (bloco de notas)
  popupAberto = false;
  novaNota = '';
  importanciaNota = '';
  notas: { texto: string, importancia: string }[] = [];

  ngOnInit() {
    this.atualizarResumo();
    this.atualizarRelogio();
    this.gerarCalendario();
    setInterval(() => {
      this.horaAtual = new Date();
      this.atualizarRelogio();
    }, 1000);
    this.carregarNotas();
  }

  atualizarResumo() {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    const empresas = JSON.parse(localStorage.getItem('empresas') || '[]');
    this.totalClientes = clientes.length;
    this.totalEmpresas = empresas.length;
  }

  atualizarRelogio() {
    const now = this.horaAtual;
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hour = now.getHours() % 12;
    const degToRad = (deg: number) => (deg - 90) * Math.PI / 180;
    this.clockHourX = 50 + 20 * Math.cos(degToRad((hour + min / 60) * 30));
    this.clockHourY = 50 + 20 * Math.sin(degToRad((hour + min / 60) * 30));
    this.clockMinuteX = 50 + 28 * Math.cos(degToRad(min * 6));
    this.clockMinuteY = 50 + 28 * Math.sin(degToRad(min * 6));
    this.clockSecondX = 50 + 35 * Math.cos(degToRad(sec * 6));
    this.clockSecondY = 50 + 35 * Math.sin(degToRad(sec * 6));
  }

  gerarCalendario() {
    const ano = this.mesAtual.getFullYear();
    const mes = this.mesAtual.getMonth();
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    this.diasDoMes = [];
    for (let i = 0; i < primeiroDia; i++) {
      this.diasDoMes.push(null);
    }
    for (let d = 1; d <= diasNoMes; d++) {
      this.diasDoMes.push(d);
    }
  }

  // Métodos do pop-up customizado para notas
  abrirPopupNota() {
    this.popupAberto = true;
  }

  fecharPopupNota() {
    this.popupAberto = false;
    this.novaNota = '';
    this.importanciaNota = '';
  }

  adicionarNota() {
    if (this.novaNota && this.importanciaNota) {
      this.notas.unshift({ texto: this.novaNota, importancia: this.importanciaNota });
      localStorage.setItem('notas', JSON.stringify(this.notas));
      this.fecharPopupNota();
    }
  }

  removerNota(nota: { texto: string, importancia: string }) {
    this.notas = this.notas.filter(n => n !== nota);
    localStorage.setItem('notas', JSON.stringify(this.notas));
  }

  carregarNotas() {
    const notasSalvas = localStorage.getItem('notas');
    this.notas = notasSalvas ? JSON.parse(notasSalvas) : [];
  }

  corNota(importancia: string) {
    switch (importancia) {
      case 'urgente': return 'danger';
      case 'intermediaria': return 'warning';
      default: return 'primary';
    }
  }
}