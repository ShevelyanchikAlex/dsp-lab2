const N = 512;
const K = 3 * N / 4;
const PHASE = Math.PI / 4;
const STEP = 1;

function createHarmonicSignal(M, phase) {
    let result = [];
    for (let i = 0; i <= M; i++) {
        result.push(Math.sin((2 * Math.PI * i) / N + phase));
    }
    return result;
}

function calculateRootMeanSquare(x, M) {
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += Math.pow(x[i], 2);
    }
    return (sum / (M + 1));
}

function calculateRootMeanSquareVal1(x, M) {
    return Math.sqrt(calculateRootMeanSquare(x, M));
}

function calculateRootMeanSquareVal2(x, M) {
    let sum = x.reduce((a, b) => a + b, 0);
    return Math.sqrt(calculateRootMeanSquare(x, M) - Math.pow(sum / (M + 1), 2));
}

function calculateAmplitude(x) {
    const N = x.length;
    let cosSum = 0;
    let sinSum = 0;
    let angle = 1;
    for (let t = 0; t < N; t++) {
        angle = 2 * Math.PI * t / N;
        cosSum += x[t] * Math.cos(angle);
        sinSum += x[t] * Math.sin(angle);
    }
    cosSum *= 2 / N;
    sinSum *= 2 / N;
    return Math.sqrt(Math.pow(cosSum, 2) + Math.pow(sinSum, 2));
}