'use strict';
const https = require('http');
const axios = require('axios');
module.exports.createOrder = async (event) => {
try{
   var locasData = {};
   var lineItems = [];
   var skills = [];
   var pickupSlots = [];

   const eventreq =JSON.parse(event.body);
   var customProperties = {}
   eventreq.data.custom_fields_listing.forEach(res => {
      customProperties[res.name] = res.value;
   });


   eventreq['data'].order_items.forEach(res => {
      var price = {};
      price.amount = res.price,
      price.currency = eventreq['data'].currency;
      price.symbol = eventreq['data'].currency;
      
   
      var parts = []
      lineItems.push({
         note: res.note,
         name: res.name,
         id: res.sku,
         lineItemId: res.item_id,
         quantity: res.quantity_ordered,
         quantityUnit: "PC",
         price: price,
         parts: parts

      });
   });
   var pickupLatLng = {};
   pickupLatLng.lat = "31.454965763793762";
   pickupLatLng.lng = "-86.96645381587079";
   var pickupSlot = {};
   pickupSlot.start = "2021-04-28T05:21:48.278Z";
   pickupSlot.end = "2021-04-28T05:21:48.336Z";

   var pickupLocationAddress = {};
   var shipres = eventreq['data'].shipping_address;
   var pickupContactPoint = {};
   pickupContactPoint.name = shipres.name;
   pickupContactPoint.number = shipres.contact_number;
   pickupLocationAddress.id = null,
      pickupLocationAddress.placeName = shipres.company,
      pickupLocationAddress.localityName = shipres.address2,
      pickupLocationAddress.formattedAddress = shipres.address1,
      pickupLocationAddress.subLocalityName = null,
      pickupLocationAddress.pincode = shipres.zipcode,
      pickupLocationAddress.city = shipres.country,
      pickupLocationAddress.state = shipres.state,
      pickupLocationAddress.countryCode =shipres.country_code
   pickupLocationAddress.locationType = null,
      pickupLocationAddress.placeHash = null




   var dropLocationAddress = {};
   var billres = eventreq['data'].billing_address;
   dropLocationAddress.id = null;
   dropLocationAddress.placeName = billres.company;
   dropLocationAddress.localityName = billres.address2;
   dropLocationAddress.formattedAddress = billres.address1;
   dropLocationAddress.subLocalityName = null;
   dropLocationAddress.pincode = billres.zipcode
   dropLocationAddress.city = billres.country;
   dropLocationAddress.state = billres.state;
   dropLocationAddress.countryCode = null;
   dropLocationAddress.countryCode= billres.country_code,
   dropLocationAddress.locationType=null,
   dropLocationAddress.placeHash= null


   

   locasData.clientId = "arki-devo";
   locasData.id = eventreq['data'].channel_order_id;
   locasData.name = null;
   locasData.code = null;
   locasData.status = eventreq['data'].order_status;
   locasData.version = 1;
   locasData.customProperties = customProperties;
   locasData.auditMetadata = null;
   locasData.teamId = (eventreq['data'].custom_fields_listing[0].value)?eventreq['data'].custom_fields_listing[0].value:null;
   locasData.lineItems = lineItems;
   locasData.skills = skills;
   locasData.temperatureThreshold = null;
   locasData.customFields = null;
   locasData.shiftId = null;
   locasData.scanId = null;
   locasData.pickupContactPoint = pickupContactPoint;
   locasData.pickupLocationAddress = pickupLocationAddress;
  

   locasData.pickupLatLng = pickupLatLng;
   locasData.pickupDate = null;
   

  
   locasData.pickupSlot = pickupSlot;
   locasData.pickupSlots = pickupSlots;
   locasData.pickupTransactionDuration = null;
   locasData.pickupAmount = null;
   locasData.pickupAppFields = null;
   locasData.pickupCustomerId = null;
   locasData.pickupAddressId = null;
   locasData.pickupVisitName=eventreq['data'].warehouse_id;
   locasData.pickupLocationId=eventreq['data'].warehouse_id;
 
    
   
 
   



   //Drop Address
   locasData.dropVisitName = null;
   locasData.dropLocationId = null;
   var dropContactPoint = {};
   dropContactPoint.name = billres.name;
   dropContactPoint.number = "";
   locasData.dropContactPoint = dropContactPoint;
   locasData.dropLocationAddress = dropLocationAddress;

   var dropLatLng = {};


   dropLatLng.lat = "31.42844340165106";
   dropLatLng.lng = "-86.97214543887401";
   locasData.dropLatLng = dropLatLng;
   locasData.dropDate = null;


   var dropSlot = {};
   var dropSlots = [];
   dropSlot.start = "2021-04-28T05:21:48.338Z";
   dropSlot.end = "2021-04-28T05:21:48.338Z";
   locasData.dropSlot = dropSlot;
   locasData.dropSlots = dropSlots;
   locasData.dropTransactionDuration = null;
   
   var amount = {};

   amount.amount =eventreq.data.total;
   amount.currency=eventreq.data.currency;
   amount.symbol=eventreq.data.currency;
   var dropAmount = {
      amount: amount,
      exchangeType:"NONE"
   };
  
   locasData.dropAmount=dropAmount;
   locasData.dropAppFields = null;
   locasData.dropCustomerId = null;
   locasData.dropAddressId = null;
   var volume = {};

   volume.value = "0";
   volume.unit = "CM";
   locasData.volume = volume;
   var weight= {};

     weight.value=eventreq.data.weight,
     weight.unit= "KG"
     locasData.weight = weight;
   locasData.orderedOn = null;
   locasData.createdOn=null;
   locasData.sourceOrderId=0;
    locasData.taksType= null;
   
   locasData.batchType = null;
   locasData.batchId = null;
   locasData.planId = null;
   locasData.tourId = null;
   locasData.sequence = null;
   locasData.userId = null;
   locasData.homebaseId = eventreq.data.warehouse_id;
   locasData.orderStatus="QUOTE_REQUESTED";
   locasData.effectiveStatus = "PLANNING";
   locasData.usecase = null;
  // console.log(locasData)

  
const response =await doRequest(locasData);
 return  response;
}
catch(error){
   return  ({ statusCode: 400,body:"Its converting json error"});

}
//callback(null, response); 
}

function doRequest(locasData) {
   try{
   var data=locasData;
   
   const clientId=data.clientId;
  
   const id=data.id;
   const username = 'arki-devo'
   const password = '167eb8d0-aab4-44e0-99c4-0469945d2bae'
   
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

   
   const url = 'https://oms.locus-api.com/v1/client/'+clientId+'/order/'+id+'?overwrite=true'

   
   const response =new  Promise((resolve, reject) => {
     axios.put(url, locasData, {
        
     headers: {
        'Content-Type': 'application/json',
       'Authorization': `Basic ${token}`
     }
   }).then((res) => {
      resolve({
         statusCode: 200,
         body: JSON.stringify(res.data)
     });
    })
    .catch((error) => {
     
      reject({
         statusCode: 500,
         body: JSON.stringify(error)
     });
    //  reject(error.errorMessage);
        
      
     
    });
  })
  return response;
}
catch(error) {
   console.error(error);
   
 }
    
}



  
  
 