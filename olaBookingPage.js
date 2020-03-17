import { LightningElement,wire, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import getOlaRec from '@salesforce/apex/OlaRec.olaRecords';
import olaObject from '@salesforce/schema/OlaBooking__c';
import carType from '@salesforce/schema/OlaBooking__c.Cab_Type__c';
import CustName from '@salesforce/schema/OlaBooking__c.Customer_Name__c';
import dropLocation from '@salesforce/schema/OlaBooking__c.Drop_Location__c';
import Phone from '@salesforce/schema/OlaBooking__c.Phone__c';
import pickLocation from '@salesforce/schema/OlaBooking__c.PickUp_location__c';

export default class OlaBookingPage extends LightningElement {
    bid;
    // @track columns=col;
    // OLAOBJ = olaObject;
    // cartype =carType;
    // customer=CustName;
    // droplocation=dropLocation;
    // phone=Phone;
    // picklocation=pickLocation;
    OLAOBJ = olaObject;
    cartype;
    customer;
    droplocation;
    phone;
    picklocation;
    // bookModel = false;
    // @track employees;
    // @track error;

    
    // @wire(getOlaRec)
    //     wiredRecords({error,data})
    //     {
    //         console.log('groot');
    //         if(data){
    //             this.employees=data;
    //             this.error=undefined;
    //         }
    //         if(error){
    //             this.employees=undefined;
    //             this.error=error;
    //         } 
    //     }

    handleNewCartype(event){
        this.bid = undefined;
        this.cartype = event.target.value;
    }
    handleNewcustomer(event){
        this.customer = event.target.value;
    }
    handleNewdropLocation(event){
        this.droplocation = event.target.value;
    }
    handleNewpickupLocation(event){
        this.picklocation = event.target.value;
    }
    
    handleNewphone(event){
        this.phone = event.target.value;
    }
    // showModel(){
    //     this.bookModel = true;
    // }
    // closeModal(){
    //     this.bookModel=false;
    // }

    // connectedCallback(){
    //     this.refreshList();
    // }
    // refreshList(){
    //     olaRecords().then(results =>{})
    // }
    createEntry(){
        const fields={};
        
        //Jab success hoga tb chalega

        fields[carType.fieldApiName] = this.cartype;
        fields[CustName.fieldApiName] = this.customer;
        fields[dropLocation.fieldApiName] = this.droplocation;
        fields[pickLocation.fieldApiName] = this.picklocation;
        fields[Phone.fieldApiName] = this.phone;
        const recordInput = { apiName :  olaObject.objectApiName, fields};
        createRecord(recordInput).then(olabooking => {
            this.bid = olabooking.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account created',
                    variant: 'success',
                }),
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });


        console.log(fields);

        

    }

}