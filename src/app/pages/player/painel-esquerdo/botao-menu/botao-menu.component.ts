import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  templateUrl: './botao-menu.component.html',
  styleUrls: ['./botao-menu.component.scss']
})
export class BotaoMenuComponent implements OnInit {

  @Input() descricao:string;
  @Input() selecionado = false;
  @Output() clickBotao = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    console.log(this.descricao)
    this.clickBotao.emit(this.descricao);
  }

}
