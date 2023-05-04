const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
//Set canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//adding resize event in window
window.addEventListener("resize", function () {
    //set canvas width and heigth after window is reset
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //applying graphic in canvas after window is reset

})

//Particle array
const particleArray = [];
//hue
let hue = 0;
//mouse object to store the coordinate of mouse 
const mouse = {
    x: undefined,
    y: undefined
}
//adding click event to canvas
canvas.addEventListener("click", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 10; i++) {
        particleArray.push(new Particle());
    }
})
//adding mousemove event to canvas
canvas.addEventListener("mousemove", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 4; i++) {
        particleArray.push(new Particle());
    }
})

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x=Math.random()*canvas.width;
        // this.y=Math.random()*canvas.height;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.color = "hsl(" + hue + ",100%,50%)";
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticle() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();

        for (let j = i+1; j < particleArray.length; j++) {
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            if (Math.sqrt(dx*dx+dy*dy) <= 100) {
                ctx.strokeStyle = particleArray[j].color;
                ctx.lineWidth = particleArray[i].size/10;
                ctx.beginPath();
                ctx.moveTo(particleArray[i].x, particleArray[i].y)
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particleArray[i].size <= .3) {
            particleArray.splice(i, 1);
            i--;
        }
    }
}
function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle()
    hue += 2;
    requestAnimationFrame(animation);
}
animation();