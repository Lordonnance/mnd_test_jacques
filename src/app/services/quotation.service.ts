import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  quotes: Array<any> = [
    {'text': "1 - Qui marche loin vie longtemps !", 'author': "Mathieu Naon"},
    {'text': "2 - Qui marche loin vie longtemps !", 'author': "Mathieu Naon"},
    {'text': "3 - Qui marche loin vie longtemps !", 'author': "Mathieu Naon"},
    {'text': "4 - Qui marche loin vie longtemps !", 'author': "Mathieu Naon"},
    {'text': "Qui marche loin vie longtemps !", 'author': "Mathieu Naon"}
  ]

  constructor() {}
}
