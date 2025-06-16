import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

interface Cliente {
  nome: string;
  email: string;
  numero: string;
  empresa: string;
  nota: string;
}

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule] // <-- Adicione RouterModule aqui
})
export class CadastroClienteComponent implements OnInit {
  nome: string = '';
  email: string = '';
  numero: string = '';
  empresa: string = '';
  nota: string = '';
  editIndex: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');
    if (index !== null) {
      const clientes: Cliente[] = JSON.parse(localStorage.getItem('clientes') || '[]');
      const cliente = clientes[+index];
      if (cliente) {
        this.nome = cliente.nome;
        this.email = cliente.email;
        this.numero = cliente.numero;
        this.empresa = cliente.empresa;
        this.nota = cliente.nota;
        this.editIndex = +index;
      }
    }
  }

  salvar() {
    const novoCliente: Cliente = {
      nome: this.nome,
      email: this.email,
      numero: this.numero,
      empresa: this.empresa,
      nota: this.nota
    };

    const clientes: Cliente[] = JSON.parse(localStorage.getItem('clientes') || '[]');
    if (this.editIndex !== null) {
      clientes[this.editIndex] = novoCliente;
      alert('Cliente editado com sucesso!');
    } else {
      clientes.push(novoCliente);
      alert('Cliente cadastrado com sucesso!');
    }
    localStorage.setItem('clientes', JSON.stringify(clientes));
    this.router.navigate(['/clientes']);
  }
}