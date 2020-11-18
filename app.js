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
const items = document.querySelectorAll(".deadline h4");

let futureDate = new Date(2020, 11, 1);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];
const hours = format(futureDate.getHours());
const minutes = format(futureDate.getMinutes());
const seconds = format(futureDate.getSeconds());
giveaway.textContent = `Lockdown ends on ${weekday} ${date} ${month} ${year} ${hours}:${minutes}:${seconds}.`

