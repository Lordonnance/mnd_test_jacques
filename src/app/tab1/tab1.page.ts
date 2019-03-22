import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { QuotationService } from '../services/quotation.service';
import { QuotationPage } from '../quotation/quotation.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  constructor (
    private router: Router,
    private navCtrl: NavController,
    public quotationService: QuotationService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {}

  async newQuote() {
    const modal = await this.modalController.create({
      component: QuotationPage,
      componentProps: {
        'isNew': true,
        'quoteIndex': null}
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });
    return await modal.present();
  }

  async editQuote(quoteIndex: number) {
    const modal = await this.modalController.create({
      component: QuotationPage,
      componentProps: {
        'isNew': false,
        'quoteIndex': quoteIndex,
        'text': this.quotationService.quotes[quoteIndex].text,
        'author': this.quotationService.quotes[quoteIndex].author
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
      });
    return await modal.present();
  }

  async deleteQuoteAlert(quoteIndex: number) {
    console.log ("--- deleteQuoteAlert ---")
    console.log ("quoteIndex", quoteIndex)

    // 1- Alert
    const alert = await this.alertController.create({
        header: 'Suppression!',
        message: 'Etes-vous sûr de vouloir supprimer cette citation ?',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'tertiary',
            handler: (blah) => {
              console.log('Alert Annuler');
            }
          }, {
            text: 'Supprimer',
            handler: () => {
              console.log('Alert Supprimer');
              this.deleteQuote(quoteIndex)
            }
          }
        ]
      });
  
      await alert.present();
  }

  async deleteQuote(quoteIndex: number) {
    console.log ("--- deleteQuote ---")
    console.log ("quoteIndex", quoteIndex)

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
  
    // 2 - Loading
    const loading = await this.loadingController.create({});
    await loading.present();

    await sleep(1000)

    // 3 - Delete the quote
    await loading.dismiss();
    this.quotationService.quotes.splice(quoteIndex, 1)
    
    // 4 - Toast
    const toast = await this.toastController.create({
      message: 'La citation a été suprimée',
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'FERMER'
    });
    toast.present();
  }
}
