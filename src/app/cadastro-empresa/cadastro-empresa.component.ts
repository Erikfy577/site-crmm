import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

interface Empresa {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  nota: string;
}

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule]
})
export class EmpresasCadastroComponent implements OnInit {
  nome: string = '';
  email: string = '';
  telefone: string = '';
  endereco: string = '';
  nota: string = '';
  editIndex: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');
    if (index !== null) {
      const empresas: Empresa[] = JSON.parse(localStorage.getItem('empresas') || '[]');
      const empresa = empresas[+index];
      if (empresa) {
        this.nome = empresa.nome;
        this.email = empresa.email;
        this.telefone = empresa.telefone;
        this.endereco = empresa.endereco;
        this.nota = empresa.nota;
        this.editIndex = +index;
      }
    }
  }

  salvar() {
    const novaEmpresa: Empresa = {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      endereco: this.endereco,
      nota: this.nota
    };

    const empresas: Empresa[] = JSON.parse(localStorage.getItem('empresas') || '[]');
    if (this.editIndex !== null) {
      empresas[this.editIndex] = novaEmpresa;
      alert('Empresa editada com sucesso!');
    } else {
      empresas.push(novaEmpresa);
      alert('Empresa cadastrada com sucesso!');
    }
    localStorage.setItem('empresas', JSON.stringify(empresas));
    this.router.navigate(['/empresas']);
  }
}