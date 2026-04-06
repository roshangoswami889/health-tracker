// ===== LOAD DATA =====
let count = Number(localStorage.getItem("waterCount")) || 0;

let goal = Number(localStorage.getItem("goal"));
if (!goal || goal <= 0) goal = 8;

// ===== ELEMENTS =====
const circle = document.getElementById("circle");
const countText = document.getElementById("count");

// ===== UPDATE UI =====
function updateUI() {

    let percent = goal > 0 ? count / goal : 0;
    if (percent > 1) percent = 1;

    // Circle
    let offset = 314 - (314 * percent);
    circle.style.strokeDashoffset = offset;

    // Count
    countText.innerText = count;

    // Progress bar
    document.getElementById("progressBar").style.width = (percent * 100) + "%";

    // Percent text
    let percentDisplay = goal > 0 ? Math.round((count / goal) * 100) : 0;
    if (percentDisplay > 100) percentDisplay = 100;

    document.getElementById("percentText").innerText = percentDisplay + "%";
    document.getElementById("goalText").innerText = goal;

    // ===== AI TIP =====
    let tip = "";
    if (percentDisplay === 0) {
        tip = "💡 Start drinking water!";
    } else if (percentDisplay < 50) {
        tip = "💡 You're behind, drink more!";
    } else if (percentDisplay < 100) {
        tip = "💡 Good job, keep going!";
    } else {
        tip = "🎉 Perfect! Goal achieved!";
    }

    document.getElementById("aiTip").innerText = tip;

    // ===== STREAK =====
    checkStreak();
    updateScore();
}

// ===== ADD WATER =====
function addWater() {
    count++;
    localStorage.setItem("waterCount", count);

    // Save history
    let history = JSON.parse(localStorage.getItem("history")) || {};
    let today = new Date().toDateString();
    history[today] = count;

    localStorage.setItem("history", JSON.stringify(history));

    updateUI();
    showWeeklyStats();
    showChart();
}

// ===== SET GOAL =====
function setGoal() {
    let val = Number(document.getElementById("goalInput").value);

    if (val > 0) {
        goal = val;
        localStorage.setItem("goal", goal);
        updateUI();
    } else {
        alert("Enter valid goal!");
    }
}

// ===== RESET =====
function resetData() {
    count = 0;
    localStorage.setItem("waterCount", count);
    updateUI();
}

// ===== STEPS =====
function addSteps() {
    let steps = Number(localStorage.getItem("steps")) || 0;
    let input = Number(document.getElementById("stepsInput").value);

    steps += input;
    localStorage.setItem("steps", steps);

    document.getElementById("stepsText").innerText = "Steps: " + steps;
}

// ===== SLEEP =====
function addSleep() {
    let sleep = document.getElementById("sleepInput").value;

    localStorage.setItem("sleep", sleep);
    document.getElementById("sleepText").innerText = "Sleep: " + sleep + " hrs";
}

// ===== WEEKLY STATS =====
function showWeeklyStats() {
    let history = JSON.parse(localStorage.getItem("history")) || {};
    let div = document.getElementById("weeklyStats");

    div.innerHTML = "<h4>Last 7 Days</h4>";

    let days = Object.keys(history);

    if (days.length === 0) {
        div.innerHTML += "<p>No data yet</p>";
        return;
    }

    days.slice(-7).forEach(day => {
        div.innerHTML += `<p>${day}: ${history[day]}</p>`;
    });
}

// ===== CHART =====
let chartInstance;

function showChart() {
    let history = JSON.parse(localStorage.getItem("history")) || {};

    let labels = Object.keys(history).slice(-7);
    let data = Object.values(history).slice(-7);

    const ctx = document.getElementById("myChart");

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Water Intake",
                data: data
            }]
        }
    });
}

// ===== STREAK =====
let streak = Number(localStorage.getItem("streak")) || 0;
let lastCompleted = localStorage.getItem("lastCompleted");

function checkStreak() {
    let today = new Date().toDateString();

    if (count >= goal && lastCompleted !== today) {
        streak++;
        localStorage.setItem("streak", streak);
        localStorage.setItem("lastCompleted", today);
    }

    document.getElementById("streakText").innerText = "🔥 Streak: " + streak;
}

// ===== DAILY CHALLENGE =====
function getChallenge() {
    let challenges = [
        "Drink 8 glasses 💧",
        "Drink 10 glasses 💪",
        "Drink water every 2 hours ⏰",
        "No sugary drinks today 🚫"
    ];

    let saved = localStorage.getItem("challenge");

    if (!saved) {
        let random = challenges[Math.floor(Math.random() * challenges.length)];
        localStorage.setItem("challenge", random);
        saved = random;
    }

    document.getElementById("challengeText").innerText = "🎯 " + saved;
}

// ===== THEMES =====
function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
}

// Load theme
let savedTheme = localStorage.getItem("theme") || "light";
document.body.className = savedTheme;

// ===== INIT =====
updateUI();
showWeeklyStats();
showChart();
getChallenge();
function checkBadges() {
    let badge = "No badges yet";

    if (count >= 5) badge = "🥉 Beginner Hydrator";
    if (count >= 10) badge = "🥈 Water Master";
    if (count >= 15) badge = "🥇 Hydration King";

    document.getElementById("badgeText").innerText = badge;
}
checkBadges();
function smartReminder() {
    setInterval(() => {
        let percent = (count / goal) * 100;

        if (percent < 50) {
            alert("💧 You are behind! Drink water now!");
        }
    }, 60000); // every 1 min (test)
}
smartReminder();
function updateScore() {
    let score = Math.round((count / goal) * 100);

    if (score > 100) score = 100;

    document.getElementById("scoreText").innerText = "⭐ Score: " + score;
    if (count === goal) {
    alert("🎉 Goal Completed!");
}
    
}
setInterval(() => {
    alert("💧 Time to drink water!");
}, 3600000); // every 1 hour
let history = JSON.parse(localStorage.getItem("history")) || [];

function saveDay() {
    history.push({
        date: new Date().toLocaleDateString(),
        water,
        steps,
        sleep
    });
    localStorage.setItem("history", JSON.stringify(history));
}
score = (water/goal)*40 + (steps/10000)*30 + (sleep/8)*30;
let challenges = [
  "Drink 8 glasses today 💧",
  "Walk 5000 steps 🚶",
  "Sleep 7+ hours 😴"
];

document.getElementById("challengeText").innerText =
    challenges[Math.floor(Math.random() * challenges.length)];
function playSound() {
    let audio = new Audio("click.mp3");
    audio.play();
    addWater() {
    playSound();
}
    let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
});

function installApp() {
    deferredPrompt.prompt();
}
}
