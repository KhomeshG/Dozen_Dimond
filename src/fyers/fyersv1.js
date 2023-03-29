const {http} = require('extra-fyers');
const fyers   = require("fyers-api-v2")

module.exports.main =async (req , res)=> {
  var app_id       ="W999KIIW5Z-100";  // app_id recieved after creating app
  var access_token = req.body.access_token;  // access_token recieved after login
  var auth = {app_id, access_token};


  const reqBody = {
    symbol:['NSE:ONGC-EQ','NSE:IOC-EQ'],
    
    dataType:'symbolUpdate'
    
    }
    
    fyers.fyers_connect(reqBody, async function(data){
        console.log(data)})
//         //write your code here
//           // List equity and commodity fund limits.
//   console.log(await http.getFunds(auth));

//   // List holdings.
//   console.log(await http.getHoldings(auth));

//   // Place CNC market order for SBIN (equity) on NSE for 5 shares
//   var id = await http.placeOrder(auth, {
//     symbol: 'NSE:SBIN-EQ',
//     productType: "CNC",
//     qty: 5,
//     side: 1, // BUY
//     type: 2, // MARKET
//     offlineOrder: "False"
//   });

//   // List postions for today (should list NSE:SBIN-EQ-CNC).
//   console.log(await http.getPositions(auth));
//   res.send({data:auth,})
//     })


}
