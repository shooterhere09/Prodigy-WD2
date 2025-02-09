document.addEventListener('DOMContentLoaded', () => {
    let [millisec, sec, min, hours] = [0, 0, 0, 0];
    let lapCounter = 0;
    let timeref = document.getElementById("timer-display");
    let lapsContainer = document.getElementById("laps");
    let int = null;

    document.getElementById("start-timer").addEventListener("click", () => {
        if (int !== null) {
            clearInterval(int);
        }
        int = setInterval(displayTimer, 10);
    });

    document.getElementById("pause-timer").addEventListener("click", () => {
        clearInterval(int);
    });

    document.getElementById("reset-timer").addEventListener("click", () => {
        clearInterval(int);
        [millisec, sec, min, hours] = [0, 0, 0, 0];
        timeref.innerHTML = "00 : 00 : 00 : 000";
        lapsContainer.innerHTML = ""; // Clear lap times
        if(lapsContainer){
            lapsContainer.innerHTML = "";
        }
    });

    document.getElementById("lap-timer").addEventListener("click", () => {
        recordLap();
    });

    function displayTimer() {
        millisec += 10;
        if (millisec == 1000) {
            millisec = 0;
            sec++;
            if (sec == 60) {
                sec = 0;
                min++;
                if (min == 60) {
                    min = 0;
                    hours++;
                }
            }
        }

        let h = hours < 10 ? "0" + hours : hours;
        let m = min < 10 ? "0" + min : min;
        let s = sec < 10 ? "0" + sec : sec;
        let ms = millisec < 10 ? "00" + millisec : millisec < 100 ? "0" + millisec : millisec;

        timeref.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
    }

    function recordLap() {
        let lapTime = timeref.innerHTML;

        // Increment lap counter
        lapCounter++;

        // Check if lapsContainer exists before appending
        if (lapsContainer) {
            let lapElement = document.createElement('div');
            lapElement.innerText = `Lap ${lapCounter}: ${lapTime}`;
            lapsContainer.appendChild(lapElement);
        } else {
            console.error("lapsContainer not found!");
        }
    }
});
