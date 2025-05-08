import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createDeal from '@salesforce/apex/DealController.createDeal';

export default class NewDealModal extends LightningElement {
    isModalOpen = false;
    dealName = '';
    dealValue = 0;
    dealStage = '';  // Changed from dealStatus to dealStage
    
    // Updated status options to reflect Stage field picklist values
    stageOptions = [
        { label: 'Prospecting', value: 'Prospecting' },
        { label: 'Negotiation', value: 'Negotiation' },
        { label: 'Closed Won', value: 'Closed Won' },
        { label: 'Closed Lost', value: 'Closed Lost' }
    ];

    // Handle opening the modal
    openModal() {
        this.isModalOpen = true;
    }

    // Handle closing the modal
    closeModal() {
        this.isModalOpen = false;
    }

    // Handle the input changes
    handleDealNameChange(event) {
        this.dealName = event.target.value;
    }

    handleDealValueChange(event) {
        this.dealValue = event.target.value;
    }

    handleDealStageChange(event) {  // Changed from handleDealStatusChange to handleDealStageChange
        this.dealStage = event.target.value;
    }

    // Handle saving the deal
    handleSave() {
        createDeal({ name: this.dealName, value: this.dealValue, stage: this.dealStage })  // Changed status to stage
            .then(result => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Deal created successfully',
                    variant: 'success',
                }));
                this.closeModal();
            })
            .catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error',
                }));
            });
    }
}
