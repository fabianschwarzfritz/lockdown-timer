const months = [
    "Januar",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday",
]
function format(item) {
    if(item < 10) {
        return `0${item}`;
    }
    return item;
}

const giveaway = document.querySelector(".lockdown");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2020, 11, 1);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];
const hours = format(futureDate.getHours());
const minutes = format(futureDate.getMinutes());
const seconds = format(futureDate.getSeconds());
giveaway.textContent = `lockdown ends on ${weekday} ${date} ${month} ${year} ${hours}:${minutes}:${seconds}`

const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;
    const oneSecond = 1000;
    const oneMinute = 60 * oneSecond;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;

    const days = Math.floor(t/oneDay);
    const hours = Math.floor((t % oneDay) / oneHour);
    const minutes = Math.floor((t % oneHour) / oneMinute);
    const seconds = Math.floor((t % oneMinute) / oneSecond);


    const values = [days, hours, minutes, seconds];
    items.forEach(function(item, index) {
        item.innerHTML = format(values[index]);
    });

    if(t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">the lockdown is over</h4>`;
    }
}
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
