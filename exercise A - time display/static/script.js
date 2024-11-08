const clockButton = document.getElementById('time-button');

clockButton.addEventListener('click', () => {
    console.log('Button clicked');
    showTime();
});

async function showTime() {
    const time = await fetch('/get_time');
    const data = await time.json();
    console.log(data);
    clockButton.innerHTML = data.time;
    }