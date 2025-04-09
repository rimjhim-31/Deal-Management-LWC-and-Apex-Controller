public with sharing class DealManagement {
    
    @AuraEnabled(cacheable=true)
    public static List<Deal__c> getDeals() {
        return [SELECT Id, Name, Amount__c, Stage__c, Close_Date__c FROM Deal__c ORDER BY Close_Date__c ASC];
    }

    @AuraEnabled
    public static Deal__c createDeal(Deal__c newDeal) {
        insert newDeal;
        return newDeal;
    }

    @AuraEnabled
    public static Deal__c updateDeal(Deal__c dealToUpdate) {
        update dealToUpdate;
        return dealToUpdate;
    }
}
