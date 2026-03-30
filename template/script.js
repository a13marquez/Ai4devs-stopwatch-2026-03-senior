

let swInterval, timerInterval;
let swTime = 0; // en milisegundos
let timerSeconds = 0;
let isSwRunning = false;
let isTimerRunning = false;

// Gestión de Pantallas
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${screenId}`).classList.add('active');
}

// --- LÓGICA CRONÓMETRO ---
function startStopwatch() {
    const btn = document.getElementById('sw-start');
    if (!isSwRunning) {
        isSwRunning = true;
        btn.textContent = 'Pausa';
        btn.className = 'main btn-stop';
        let startTime = Date.now() - swTime;
        swInterval = setInterval(() => {
            swTime = Date.now() - startTime;
            document.getElementById('sw-display').textContent = formatTime(swTime, true);
        }, 10);
    } else {
        isSwRunning = false;
        btn.textContent = 'Continuar';
        btn.className = 'main btn-start';
        clearInterval(swInterval);
    }
}

function resetStopwatch() {
    clearInterval(swInterval);
    isSwRunning = false;
    swTime = 0;
    document.getElementById('sw-display').textContent = '00:00:00';
    document.getElementById('sw-start').textContent = 'Iniciar';
    document.getElementById('sw-start').className = 'main btn-start';
}

// --- LÓGICA CUENTA ATRÁS ---
function initTimer() {
    const h = parseInt(document.getElementById('t-h').value) || 0;
    const m = parseInt(document.getElementById('t-m').value) || 0;
    const s = parseInt(document.getElementById('t-s').value) || 0;
    timerSeconds = (h * 3600) + (m * 60) + s;

    if (timerSeconds <= 0) return alert("Pon un tiempo válido");

    updateTimerDisplay();
    showScreen('timer-run');
}

function startTimer() {
    const btn = document.getElementById('timer-start');
    if (!isTimerRunning) {
        isTimerRunning = true;
        btn.textContent = 'Pausa';
        btn.className = 'main btn-stop';
        timerInterval = setInterval(() => {
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                alert("¡Tiempo cumplido!");
                resetTimer();
            } else {
                timerSeconds--;
                updateTimerDisplay();
            }
        }, 1000);
    } else {
        isTimerRunning = false;
        btn.textContent = 'Continuar';
        btn.className = 'main btn-start';
        clearInterval(timerInterval);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    document.getElementById('timer-start').textContent = 'Iniciar';
    document.getElementById('timer-start').className = 'main btn-start';
    initTimer();
}

// --- UTILIDADES ---
function formatTime(ms, showMs = false) {
    let s = Math.floor(ms / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    s %= 60; m %= 60;

    let timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return timeStr;
}

function updateTimerDisplay() {
    let h = Math.floor(timerSeconds / 3600);
    let m = Math.floor((timerSeconds % 3600) / 60);
    let s = timerSeconds % 60;
    document.getElementById('timer-display').textContent =
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function resetAll() {
    resetStopwatch();
    clearInterval(timerInterval);
    isTimerRunning = false;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
}
