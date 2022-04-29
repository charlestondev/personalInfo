public with sharing class ContactController {
    
    @AuraEnabled
    public static List<Contact> getContacts(){
        List<Contact> contacts = [SELECT Id, Name FROM contact];
        return contacts;
    }
    @AuraEnabled
    public static List<Contact_personal_info__c> getPersonalInfo(string contactId){
        List<Contact_personal_info__c> cpi = [SELECT Id, Animais__c, Cor_favorita__c, Genero_filme__c FROM Contact_personal_info__c WHERE Contact__c=:contactId];
        return cpi;
    }
    @AuraEnabled
    public static void savePersonalInfo(string id, string genero_filme, string cor, string animais, string contactId){
        Contact_personal_info__c cpi;
        if(id == '')
            cpi = new Contact_personal_info__c(Genero_filme__c=genero_filme, Cor_favorita__c=cor, Animais__c=animais, Contact__c=contactId);
        else
            cpi = new Contact_personal_info__c(Id=id,Genero_filme__c=genero_filme, Cor_favorita__c=cor, Animais__c=animais, Contact__c=contactId);
        System.debug(cpi);
        upsert cpi;
    }
}
