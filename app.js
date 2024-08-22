let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Event listener for keypress to start the game
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game has started");
        started = true;
        levelUp();
    }
});

// Function to flash a button
function btnFlash(btn) {
    try {
        btn.classList.add("flash");
        setTimeout(function () {
            btn.classList.remove("flash");
        }, 500);
    } catch (error) {
        console.error("Error flashing button:", error);
    }
}

// Function to move to the next level
function levelUp() {
    try {
        userSeq = [];
        level++;
        h2.innerText = `Level ${level}`;

        let randIdx = Math.floor(Math.random() * btns.length);
        let randColor = btns[randIdx];
        let btn = document.querySelector(`.${randColor}`);

        gameSeq.push(randColor);
        btnFlash(btn);
    } catch (error) {
        console.error("Error leveling up:", error);
        reset();
    }
}

// Function to check the user's answer
function checkAns(idx) {
    try {
        if (userSeq[idx] === gameSeq[idx]) {
            if (userSeq.length === gameSeq.length) {
                setTimeout(levelUp, 1000);
            }
        } else {
            h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br /> Press any key to start.`;
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout(function () {
                document.querySelector("body").style.backgroundColor = "white";
            }, 150);
            reset();
        }
    } catch (error) {
        console.error("Error checking answer:", error);
        reset();
    }
}

// Function to handle button press
function btnPress() {
    try {
        if (!started) {
            console.warn("Game has not started yet. Please press a key to start.");
            return;
        }

        let btn = this;
        let userColor = btn.getAttribute("id");

        if (!btns.includes(userColor)) {
            console.warn("Invalid button pressed:", userColor);
            return;
        }

        btnFlash(btn);
        userSeq.push(userColor);
        checkAns(userSeq.length - 1);
    } catch (error) {
        console.error("Error handling button press:", error);
    }
}

// Add event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Function to reset the game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
