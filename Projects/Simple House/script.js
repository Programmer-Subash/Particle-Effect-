const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
//set Canvas width and height
canvas.width = window.innerWidth;
canvas.height=window.innerHeight;
//Wall of house
ctx.fillStyle = "blue";
ctx.fillRect(300,350,500,300);
//door 
ctx.fillStyle = "white";
ctx.fillRect(330,530,80,120);
//windows
//window 01
ctx.fillStyle ="white";
ctx.fillRect(500,500,70,50);
ctx.fillStyle="blue";
ctx.fillRect(534,500,2,50);
ctx.fillRect(500,524,70,2);
//window 02
ctx.fillStyle="white";
ctx.fillRect(650,500,70,50);
ctx.fillStyle="blue";
ctx.fillRect(684,500,2,50);
ctx.fillRect(650,524,70,2);
//roof
ctx.fillStyle="brown";
ctx.beginPath();
ctx.moveTo(300,350);
ctx.lineTo(800,350);
ctx.lineTo(550,300);
ctx.fill();
//tree
ctx.beginPath();
ctx.fillStyle = "brown";
ctx.fillRect(1000,250,25,400);
//leaf
ctx.beginPath();
ctx.fillStyle="green";
ctx.arc(1010,250,100,0,Math.PI*2);
ctx.fill();
