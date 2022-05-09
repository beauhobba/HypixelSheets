function returnLapis() {

  var key = 'PUT YOUR KEY HERE'
  var username = 'nh3'

  // Access the mojang API to convert username to uiid
  // Our unique identifier for our minecraft accounts 
  var mojang = 'https://api.mojang.com/users/profiles/minecraft/'+username; 
  var response = UrlFetchApp.fetch(mojang);

  // Check for errors 
  if(response.getResponseCode() != "200"){
    console.log("API CALLED FAILED")
    return; 
  }
  console.log(response.getContentText());

  // Since the API returns JSON, we need to parse it into a readable format
  var response_parsed = JSON.parse(response.getContentText()); 

  // Finally get out UIID 
  var uiid = response_parsed.id;
  console.log("UIID: "+uiid);

  

  // Access the Hypixel Skyblock API 
  var url = 'https://api.hypixel.net/skyblock/profiles?key='+key+'&uuid='+uiid
  var response = UrlFetchApp.fetch(url);

  // Error check the response 
  if(response.getResponseCode() != "200"){
    console.log("API CALLED FAILED")
    return; 
  }


  var response_parsed = JSON.parse(response.getContentText()); 
  // // Read the collection data 
  try{
    var lapis_collection = response_parsed.profiles[1].members[uiid].collection['INK_SACK:4'];
  }catch{
    console.log("error collecting Ink Sack")
    return; 
  }
  console.log("LAPIS DATA: "+lapis_collection);

  // // Access our spreadsheet and set the value
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Collections');

  var lapis_var = sheet.getRange('B1').setValue(lapis_collection)

  // // Set a trigger on the spreadsheet 
}
