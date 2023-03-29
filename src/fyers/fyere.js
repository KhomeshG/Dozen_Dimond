const fyers   = require("fyers-api-v2")

module.exports.fyersAuth= async (req,res)=>{
  fyers.setAppId('W999KIIW5Z-100')
fyers.setRedirectUrl('http://localhost:3000/dozendiamonds/')

fyers.generateAuthCode()

}




module.exports.fyersAuth1= async (req,res)=>{
  fyers.setAppId('W999KIIW5Z-100')
fyers.setRedirectUrl('http://localhost:3000/dozendiamonds/')



const reqBody = {
  auth_code:req.query.auth_code,
      
  secret_key:'D3PE4OF777'
  
}

console.log(reqBody)

fyers.generate_access_token(reqBody).then((response)=>{
  console.log(response)
  res.send(response)
})

}



module.exports.fyersUser= async (req,res)=>{

  fyers.setAppId('W999KIIW5Z-100')
  fyers.setRedirectUrl('http://localhost:3000/dozendiamonds/')
fyers.setAccessToken(req.body.access_token)

fyers.get_profile().then((response) => {

    console.log(response)
    res.send(response)

})
}
module.exports.fyersUserFunds= async (req,res)=>{

  fyers.setAppId('W999KIIW5Z-100')
  fyers.setRedirectUrl('http://localhost:3000/dozendiamonds/')
fyers.setAccessToken(req.body.access_token)

fyers.get_funds().then((response) => {
  console.log(response)
  res.send({data:response})
}) 
}
module.exports.stockData= async (req,res)=>{

  fyers.setAppId('W999KIIW5Z-100')
  fyers.setRedirectUrl('http://localhost:3000/dozendiamonds/')
fyers.setAccessToken(req.body.access_token)


  let quotes = new fyers.quotes()
  let result = await quotes
      .setSymbol(req.body.symbol)
      .getQuotes();
  console.log(result)

  res.send({data:result})
  
 
}
module.exports.historyData= async (req,res)=>{

  fyers.setAppId('W999KIIW5Z-100')
  fyers.setRedirectUrl('http://localhost:3000/dozendiamonds/')
fyers.setAccessToken(req.body.access_token)


  let history = new fyers.history()
  let result = await history.setSymbol(req.body.symbol)
      .setResolution(req.query.resolution)
      .setDateFormat(1)
      .setRangeFrom(req.query.from)
      .setRangeTo(req.query.to)
      .getHistory()
  console.log(result)
  res.send({data:result})
 
}


