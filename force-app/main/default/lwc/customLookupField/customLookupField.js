import { LightningElement, api } from 'lwc';


export default class CustomLookupField extends LightningElement {
    @api childObjectApiName; //Objeto com campo lookup
    @api targetFieldApiName; //Nome do campo lookup
    @api disabled = false;
    @api value;


    handleChange(event) {
        const selectedEvent = new CustomEvent('valueselected', {
            detail: event.detail.value
        });
        this.dispatchEvent(selectedEvent);
    }
}