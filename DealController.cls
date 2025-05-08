public with sharing class DealController {

    @AuraEnabled(cacheable=true)
    public static List<Deal__c> getDeals() {
        return [SELECT Id, Name, Amount__c, Stage__c, Close_Date__c FROM Deal__c ORDER BY Close_Date__c ASC];
    }

    @AuraEnabled
    public static Deal__c createDeal(String name, Decimal value, String stage) {
        // Debugging log to check the incoming parameters
        System.debug('Creating new deal with name: ' + name + ', value: ' + value + ', stage: ' + stage);
        
        try {
            // Create new Deal record
            Deal__c newDeal = new Deal__c(Name = name, Amount__c = value, Stage__c = stage);
            
            // Insert the new Deal record
            insert newDeal;
            
            // Return the newly created Deal record
            System.debug('Deal created successfully: ' + newDeal);
            return newDeal;
        } catch (DmlException e) {
            // Log the error for debugging purposes
            System.debug('DML Exception while creating the deal: ' + e.getMessage());
            throw new AuraHandledException('Error creating deal: ' + e.getMessage());
        } catch (Exception e) {
            // Catch any other exceptions
            System.debug('General Exception while creating the deal: ' + e.getMessage());
            throw new AuraHandledException('Error creating deal: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static Deal__c updateDeal(Deal__c dealToUpdate) {
        // Debugging log to check the incoming deal object
        System.debug('Updating deal with ID: ' + dealToUpdate.Id);
        
        try {
            // Update the Deal record
            update dealToUpdate;
            
            // Return the updated Deal record
            System.debug('Deal updated successfully: ' + dealToUpdate);
            return dealToUpdate;
        } catch (DmlException e) {
            // Log the error for debugging purposes
            System.debug('DML Exception while updating the deal: ' + e.getMessage());
            throw new AuraHandledException('Error updating deal: ' + e.getMessage());
        } catch (Exception e) {
            // Catch any other exceptions
            System.debug('General Exception while updating the deal: ' + e.getMessage());
            throw new AuraHandledException('Error updating deal: ' + e.getMessage());
        }
    }
}
