import { LightningElement,wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import getOlaRec from '@salesforce/apex/OlaRec.olaRecords';
const col=[
    {label:'Cab Type',fieldName:'Cab_Type__c'},
    {label:'Name',fieldName:'Customer_Name__c'},
    {label:'Phone Number',fieldName:'Phone__c'}
]

export default class RecordPage extends  NavigationMixin(LightningElement) {
    @track columns=col;
    @track employees;
    @track error;


    editRecord(){
        this.record=this.template.querySelector('lightning-datatable').getSelectedRows()[0].Id;
        console.log(this.record);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',   
            attributes: {
                recordId: this.record,
                objectApiName: "OlaBooking__c",
                actionName: "edit"  
            },
        });
        
    }


    deleteRecord(){
        console.log('start deleting ');
        var recId=(this.template.querySelector('lightning-datatable').getSelectedRows()[0].Id);
        console.log('i am here in delete ' + recId);
        deleteRecord(recId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
            })
           
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
        
    }

    
    @wire(getOlaRec)
        wiredRecords({error,data})
        {
            // console.log('groot');
            if(data){
                this.employees=data;
                this.error=undefined;
            }
            if(error){
                this.employees=undefined;
                this.error=error;
            } 
        }
}