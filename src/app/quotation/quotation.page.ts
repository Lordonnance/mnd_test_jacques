import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { QuotationService } from '../services/quotation.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.page.html',
  styleUrls: ['./quotation.page.scss'],
})
export class QuotationPage {
  text: string = ""
  author: string = ""

  constructor(
    private modalCtrl: ModalController,
    public quotationService: QuotationService,
    public navParams: NavParams
  ) {
    if (!navParams.get("isNew")) {
      this.text = navParams.get("text")
      this.author = navParams.get("author")
    }

    console.log ("navParams isNew", navParams.get("isNew"))
    console.log ("quoteIndex", navParams.get("quoteIndex"))
    console.log ("text", this.text)
    console.log ("author", this.author)
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  async addNewQuote() {
    console.log("--- addNewQuote ---")
    
    this.quotationService.quotes.push({'text': this.text, 'author': this.author})
    await this.modalCtrl.dismiss();
  }

  async editQuote() {
    console.log("--- editQuote ---")

    if (this.quotationService.quotes.length > this.navParams.get("quoteIndex"))
      this.quotationService.quotes[this.navParams.get("quoteIndex")] = {'text': this.text, 'author': this.author}
    else
      console.error("QuoteIndex exceed quotes array length !!", this.navParams.get("quoteIndex"))

    await this.modalCtrl.dismiss();
  }
}
