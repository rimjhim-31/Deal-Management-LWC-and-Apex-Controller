import { LightningElement, wire, track } from 'lwc';
import getDeals from '@salesforce/apex/DealController.getDeals';
import updateDeal from '@salesforce/apex/DealController.updateDeal';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Amount', fieldName: 'Amount__c', type: 'currency', editable: true },
    { label: 'Stage', fieldName: 'Stage__c', type: 'text', editable: true },
    { label: 'Close Date', fieldName: 'Close_Date__c', type: 'date', editable: true },
];

export default class DealManagement extends LightningElement {
    @track deals;
    @track error;
    @track draftValues = [];

    columns = COLUMNS;

    @wire(getDeals)
    wiredDeals({ error, data }) {
        if (data) {
            this.deals = data;
        } else if (error) {
            this.error = error.body.message;
        }
    }

    handleSave(event) {
        const updatedFields = event.detail.draftValues[0];

        updateDeal({ dealToUpdate: updatedFields })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Deal updated successfully!',
                        variant: 'success'
                    })
                );
                this.draftValues = [];
                return refreshApex(this.deals);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    handleNewDeal() {
        // You can add modal logic to create a new deal
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'New Deal Creation',
                message: 'Feature coming soon!',
                variant: 'info'
            })
        );
    }
}
