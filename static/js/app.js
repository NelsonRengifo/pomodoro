const timer = document.getElementById("time");
const startButton = document.getElementById("start");

startButton.addEventListener("click", function()
{
    
    let time =  timer.textContent; // "25:00"
    time = parseInt(time.slice(0,2) + time.slice(3)) 
    console.log(typeof time)
    
    // create loop from minutes to seconds and vs.
    // use timer.textcontent to update actual website time.
});