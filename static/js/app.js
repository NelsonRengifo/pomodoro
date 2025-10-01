const timer = document.getElementById("time");
const button = document.getElementById("start");
const resetButton = document.getElementById("reset");

let MY_INTERVAL;

function startTimer()
{
    if(timer.textContent == "00:00")
    {
        clearInterval(MY_INTERVAL);
        button.textContent = "Start";
        return;
    }

    let currentTime =  timer.textContent;
    let colon = currentTime.indexOf(":");
    let minutes = parseInt(currentTime.slice(0,colon));
    let seconds = parseInt(currentTime.slice(colon + 1));
    let totalSeconds = (minutes * 60) + seconds;

    totalSeconds--;

    let newTime = totalSeconds;
    minutes = String(Math.floor(newTime / 60)); 
    seconds = String(totalSeconds % 60);

    minutes = minutes.padStart(2, "0");
    seconds = seconds.padStart(2, "0");
    newTime = minutes + ":" + seconds;

    timer.textContent = newTime;
};

button.addEventListener("click", function()
{
    if(button.textContent == "Start")
    {
        button.textContent = "Pause";
        MY_INTERVAL = setInterval(startTimer, 1000);
    }

    else
    {
        clearInterval(MY_INTERVAL);
        button.textContent = "Start";
    }
});


resetButton.addEventListener("click", function()
{
    clearInterval(MY_INTERVAL);
    button.textContent = "Start";
    timer.textContent = "25:00";
});