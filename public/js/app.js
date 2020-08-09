

console.log("Client Side JS file is loaded!")


const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne= document.querySelector("#message-1")
const messageTwo= document.querySelector("#message-2")
//const messageTwo= document.querySelector(".classname") For Roni
//
//messageOne.textContent = "From JS"

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value


    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    console.log(location)
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        //debugger 
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            }
            else {
                console.log(data)
                console.log(data.temp)
                console.log(data.location)

                messageOne.textContent = data.temp 
                messageTwo.textContent = data.location
            }
        })
    })
})

