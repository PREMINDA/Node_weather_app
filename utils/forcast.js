const request = require('request')

const forcast =async (lon,lat,callback)=>{

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lon+'&lon='+lat+'&appid=3b89259eef9673ba294c3c40a2a16fd2&units=imperial'
    await request({url : url,json:true}, (error,{body})=>{
        
        if(error){
            callback('Error with connection',undefined)
        }
        else if(body.cod == 400){
            callback(body,undefined)
        }
        else if(body.cod == 200){
            callback(undefined,body)
        }
        else if(body.cod == 401){
            callback(body,undefined)
        }
        
})
}

module.exports=forcast
    
