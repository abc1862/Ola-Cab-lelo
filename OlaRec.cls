public with sharing class OlaRec {
	@AuraEnabled(cacheable=true)
    public static List<olaBooking__c> olaRecords() {
    	return [SELECT Customer_Name__c, Cab_Type__c, Phone__c from olaBooking__c];
	}
}