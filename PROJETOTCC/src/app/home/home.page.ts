import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ValidarService } from '../api/validar.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
senhausuario : string= "";
nomeusuario : string ="";

  constructor(private mensagemAlerta: AlertController,private loginService :ValidarService, private router: Router) {}

  async validarLogin() {
    this.loginService.validarLogin(this.nomeusuario, this.senhausuario).subscribe(
       async (data) => {
        console.log('200', data);

        const alerta = await this.mensagemAlerta.create({
          header: 'GETTASK- LOGIN',
          subHeader: 'Sucesso',
          message: 'Bem Vindo',
          buttons: ['Fechar'],
        });
        alerta.present();

        this.router.navigate(['/inicio']);
      },
      async (error) => {
        console.error(error);

        const alerta = await this.mensagemAlerta.create({
          header: 'GETTASK - LOGIN',
          subHeader: 'Acesso Inválido',
          message: 'Usuário ou Senha Incorretos',
          buttons: ['Fechar'],
        });
        await alerta.present();
      },
    );
  }

}
