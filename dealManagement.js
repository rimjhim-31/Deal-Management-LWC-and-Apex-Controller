import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DealManagement extends LightningElement {
    @track showModal = false;

    handleNew() {
        this.showModal = true;
    }

    handleCancel() {
        this.showModal = false;
    }

    handleSuccess(event) {
        this.showModal = false;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'New Deal created with ID: ' + event.detail.id,
                variant: 'success'
            })
        );

        // Refresh data if needed
        // You can dispatch a custom event or use refreshApex here if you're using wired methods
    }
}
