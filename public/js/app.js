
const Formwe = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

messageone.textContent = ''

Formwe.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageone.textContent = data.error
        }else{
            console.log(data)
            messageone.textContent = 'Temperature at '+ data.location+' is '+ data.Temperature
            
        }
    })
})
})