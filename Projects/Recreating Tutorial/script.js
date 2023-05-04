const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 1;
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined
}
class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.color="hsl("+hue+",100%,50%)";
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
};

canvas.addEventListener("mousemove", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 4; i++) {
        particleArray.push(new Particle());
    }
})
function handelParticles() {
    for (i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
        for(let j=i+1;j<particleArray.length;j++){
            const dx = particleArray[i].x-particleArray[j].x;
            const dy = particleArray[i].y-particleArray[j].y;
            const distance = Math.sqrt(dx*dx+dy*dy);
            if(distance <=100){
                ctx.strokeStyle=particleArray[j].color;
                ctx.beginPath();
                ctx.moveTo(particleArray[i].x,particleArray[i].y);
                ctx.lineTo(particleArray[j].x,particleArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particleArray[i].size <= 0.3) {
            particleArray.splice(i, 1);
            i--;
        }
    }

}
function animation() {
    // ctx.fillStyle= "rgba(0,0,0,0.1)";
    // ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handelParticles();
    hue+=2;
    requestAnimationFrame(animation);
}
animation();
