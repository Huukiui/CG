class Complex {
    constructor(re, im) {
        this.re = re;
        this.im = im;
    }

    add(other) {
        return new Complex(this.re + other.re, this.im + other.im);
    }

    mul(other) {
        return new Complex(
            this.re * other.re - this.im * other.im,
            this.re * other.im + this.im * other.re
        );
    }

    sin() {
        return new Complex(
            Math.sin(this.re) * Math.cosh(this.im),
            Math.cos(this.re) * Math.sinh(this.im)
        );
    }


    cos() {
        return new Complex(
            Math.cos(this.re) * Math.cosh(this.im),
            -Math.sin(this.re) * Math.sinh(this.im)
        );
    }

    abs() {
        return Math.sqrt(this.re * this.re + this.im * this.im);
    }
    conjugate() {
        return new Complex(this.re, -this.im);
    }
    divide(other) {
        
        const denominator = other.mul(other.conjugate());
        const numerator = this.mul(other.conjugate());
        const realPart = numerator.re / denominator.re;
        const imagPart = numerator.im / denominator.re;

        return new Complex(realPart, imagPart);
    }
    tan(){
        const realPart = Math.sin(2*this.re)/(Math.cos(2*this.re) + Math.cosh(2*this.im));
        const imaginaryPart = Math.sinh(2*this.im)/(Math.cos(2*this.re) + Math.cosh(2*this.im));
        return new Complex(realPart, imaginaryPart);
    }
    sinh(){
        const realPart = Math.sinh(this.re) * Math.cos(this.im);
        const imaginaryPart = Math.cosh(this.re) * Math.sin(this.im);
        return new Complex(realPart, imaginaryPart);
    }
    
    
}




function generateSinFractal(width, height, xMin, xMax, yMin, yMax, colorScheme, maxIterations = 100) {
    const backgroundColor = "rgb(0, 0, 0)";
    const canvas = document.getElementById("fractalCanvas");
    const ctx = canvas.getContext("2d");

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          
            const real = xMin + (x * (xMax - xMin) / (width - 1));
            const imag = yMax - (y * (yMax - yMin) / (height - 1));

            
            let z = new Complex(real, imag);
            let result = z;
            let iteration = 0;

            
            while (iteration < maxIterations && result.abs() < 10) {
                result = result.mul(result.sin());
                iteration++;
            }

            
            let color = backgroundColor;

            if (colorScheme === 0) {
                color = iteration >= maxIterations ? backgroundColor : mapToColorByIteration(iteration);
            } else {
                color = iteration >= maxIterations ? backgroundColor : mapToAllColors(result);
            }

            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function mapToColorByIteration(iteration) {
    const palette = [
        "rgb(255, 0, 0)",      // Red
        "rgb(0, 255, 0)",      // Green
        "rgb(0, 0, 255)",      // Blue
        "rgb(255, 255, 0)",    // Yellow    
    ];

    const colorIndex = iteration % palette.length;
    return palette[colorIndex];
}

function mapToAllColors(result) {
    const r = Math.floor((result.re + 20) * 255 / 50);
    const g = Math.floor((result.im + 20) * 255 / 50);
    const b = Math.floor(Math.abs(result.re * result.im) * 255);
    return `rgb(${r}, ${g}, ${b}`;
}




function generateCosFractal(width, height, xMin, xMax, yMin, yMax, colorScheme, maxIterations = 100) {
    const backgroundColor = "rgb(0, 0, 0)";
    const canvas = document.getElementById("fractalCanvas");
    const ctx = canvas.getContext("2d");

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const real = xMin + (x * (xMax - xMin) / (width - 1));
            const imag = yMax - (y * (yMax - yMin) / (height - 1));

            let z = new Complex(real, imag);
            let result = z;
            let iteration = 0;
            
            while (iteration < maxIterations && result.abs() < 10) {
                result = result.sin().mul(result.cos());  
                iteration++;   
            }
            let color = backgroundColor;

            if (colorScheme === 0) {
                color = iteration >= maxIterations ? backgroundColor : mapToColorByIteration(iteration);
            } else {
                color = iteration >= maxIterations ? backgroundColor : mapToAllColors(result);
            }

            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

const canvas = document.getElementById("fractalCanvas");
const ctx = canvas.getContext("2d");

function draw(x, y, l, u, t) {
    const endX = x + l * Math.cos(u);
    const endY = y - l * Math.sin(u);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    return [endX, endY];
}

function drawFractal(x, y, l, u, t) {
    if (t > 0) {
        l *= 0.5;
        [x, y] = drawFractal(x, y, l, u, t - 1);
        [x, y] = drawFractal(x, y, l * 0.45, u - (2 * Math.PI) / 3, t - 1);
        [x, y] = drawFractal(x, y, l * 0.45, u + (Math.PI) / 3, t - 1);
        [x, y] = drawFractal(x, y, l * 0.45, u - (Math.PI) / 3, t - 1);
        [x, y] = drawFractal(x, y, l * 0.45, u + (2 * Math.PI) / 3, t - 1);
        [x, y] = drawFractal(x, y, l, u, t - 1);
    } else {
        [x, y] = draw(x, y, l, u, t);
    }
    return [x, y];
}

function initialize() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const startX1 = 210;
    const startY1 = 8;
    const startX2 = 10;
    const startY2 = 354;
    const startX3 = 410;
    const startY3 = 354;

    drawFractal(startX1, startY1, 400, -2 * Math.PI / 3, 3);
    drawFractal(startX2, startY2, 400, 0, 3);
    drawFractal(startX3, startY3, 400, 2 * Math.PI / 3, 3);
}


function zoomImage(canvas, zoomFactor, choice) {
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.scale(zoomFactor, zoomFactor);

    if(choice == 1)
        initialize();
    else if(choice == 2)
        generateSinFractal(700, 550, -4, 4, -4, 4, 0, 100);
    else
        generateCosFractal(700, 550, -4, 4, -4, 4, 0, 100);


    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
