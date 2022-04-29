import { LightningElement, track } from 'lwc';
import  getContacts  from '@salesforce/apex/ContactController.getContacts'
import getPersonalInfo from '@salesforce/apex/ContactController.getPersonalInfo';
import savePersonalInfo from '@salesforce/apex/ContactController.savePersonalInfo';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Preferences extends LightningElement {
    
    contactId = '';
    personalInfoId = ''
    contacts = [];
    options = [];
    filmesSelected = []
    filmes = [
        {label:"Ação", value:"acao"},{label:"Suspense", value:"suspense"},{label:"Drama", value:"drama"},{label:"Comédia", value:"comedia"}
    ];
    animaisSelected = []
    animais = [
        {label:"Cachorro", value:"cachorro"},{label:"Gato", value:"gato"}
    ]
    cor = ''
    
    /*get options() {
        return this.contacts
    }*/
    connectedCallback(){
        /*setTimeout(()=>{
            //this.contacts.pop()
            //this.contacts = [...this.contacts]
            //You sholdn't modify existing memory location, but create a new one
            this.contacts = [...this.contacts, {label:'quatro', value:"qew"}]
        },3000)
        */
        
        getContacts().then((data)=>{
            //console.log(JSON.stringify(data))
            this.contacts = data
            this.options = this.contacts.map((c)=>{return {label:c.Name, value:c.Id}})
        })
        //console.log(this.options)
    }
    handleContactChange(event) {
        this.contactId = event.detail.value;
        console.log(this.contactId)
        this.filmesSelected = []
        this.cor = ''
        this.animaisSelected = []
        getPersonalInfo({contactId: event.detail.value}).then((data)=>{
            
            this.personalInfoId = data[0].Id
            console.log(JSON.parse(data[0].Genero_filme__c))
            this.filmesSelected = JSON.parse(data[0].Genero_filme__c)
            this.cor = data[0].Cor_favorita__c
            this.animaisSelected = JSON.parse(data[0].Animais__c)
            console.log(JSON.stringify(data))
            
        }).catch((er)=>{
            console.log(JSON.stringify(er));
        })
        
    }


    handleFilmes(e){
        this.filmesSelected = e.detail.value
        console.log(JSON.stringify(this.filmesSelected))
    }
    handleCor(e){
        this.cor = e.detail.value
        console.log(JSON.stringify(this.cor))
    }
    handleAnimais(e){
        this.animaisSelected = e.detail.value
        console.log(JSON.stringify(this.animaisSelected))
    }
    handleSave(){
        console.log('saving...')
        console.log(this.contactId)
        console.log(JSON.stringify(this.filmesSelected))
        console.log(this.cor)
        console.log(JSON.stringify(this.animaisSelected))
        console.log(this.personalInfoId)
        if(this.contactId){
            savePersonalInfo({
                id: this.personalInfoId,
                genero_filme: JSON.stringify(this.filmesSelected),
                cor: this.cor,
                animais: JSON.stringify(this.animaisSelected),
                contactId: this.contactId
            }).then(()=>{
                this.showNotification('Dados salvos!', 'Dados do contato '+this.contactId+' salvos!')
            })
        }
        else{
            this.showNotification('Não foi possivel salvar!', 'Você deve escolher um contato', 'warning')
        }

    }
    showNotification(t, m, v='success') {
        const evt = new ShowToastEvent({
            title: t,
            message: m,
            variant: v,
        });
        this.dispatchEvent(evt);
    }
}