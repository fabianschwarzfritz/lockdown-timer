
/**
 * Timer is an HTML Element that displays the
 * count days, hours, minutes, seconds until a predefined date.
 * The date is set via calculateTime(date).
 */
class Timer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.createDeadline();
        this.create("days");
        this.create("hours");
        this.create("minutes");
        this.create("seconds");
        this.style();
    }
    style() {
        const style = document.createElement('style');
        // TODO here we need to improve the referencing
        // and make it customizable 
        style.innerHTML = `
            @import url("style.css");
        `
        this.shadowRoot.appendChild(style)
    }
    createDeadline() {
        const classname = "deadline";
        this.deadline = document.createElement('div');
        this.deadline.setAttribute("class", classname);
        this.shadowRoot.appendChild(this.deadline);
        return this.deadline;
    }
    create(classname) {
        const heading = document.createElement('h4');
        heading.setAttribute("class", classname);

        const span = document.createElement('span');
        span.innerHTML = classname;

        const parent = document.createElement('div');
        parent.appendChild(heading);
        parent.appendChild(span);
        this.deadline.appendChild(parent);
    }
    renderTime(type, value) {
        function format(item) {
            if(item < 10) {
                return `0${item}`;
            }
            return item;
        }
        const item = this.shadowRoot.querySelector(`.deadline .${type}`)
        item.innerHTML = format(value);
    }
    calculateTime(futureTime) {
        const today = new Date().getTime();
        const t = futureTime - today;

        if(t < 0) {
            clearInterval(this.interval);
            this.deadline.innerHTML = `<h4 class="">it's over!</h4>`;
        }

        const oneSecond = 1000;
        const oneMinute = 60 * oneSecond;
        const oneHour = 60 * oneMinute;
        const oneDay = 24 * oneHour;

        const days = Math.floor(t/oneDay);
        const hours = Math.floor((t % oneDay) / oneHour);
        const minutes = Math.floor((t % oneHour) / oneMinute);
        const seconds = Math.floor((t % oneMinute) / oneSecond);

        this.renderTime("days", days);
        this.renderTime("hours", hours);
        this.renderTime("minutes", minutes);
        this.renderTime("seconds", seconds);
    }

    readDeadline() {
        const configuredDate = this.getAttribute("deadline");
        if(configuredDate) {
            return new Date(configuredDate);
        }
        return new Date();
    }

    connectedCallback() {
        // TODO make the future date configurable
        const futureDate = this.readDeadline();
        const that = this;
        this.interval = setInterval(() => {
            that.calculateTime(futureDate.getTime());
        }, 1000);
        that.calculateTime(futureDate.getTime());
    }
}

window.customElements.define('corona-timer', Timer);
