function createHarmonicCharts() {
    const LABELS = ['Root mean square - 1', 'Root mean square - 2', 'Amplitude'];
    const COLORS = ['rgb(36,137,204)', 'rgb(81,196,129)', 'rgb(137,36,204)'];

    const errorsWithoutPhase = initErrorsValues(0);
    const errorsWithPhase = initErrorsValues(PHASE);

    const harmonicChartWithoutPhase = new Chart(
        document.getElementById('harmonic-chart-without-phase'),
        initConfig('Harmonic signal with without phase', initHarmonicDataset(LABELS, initLabels(), COLORS,
            errorsWithoutPhase.rms1, errorsWithoutPhase.rms2, errorsWithoutPhase.ampl))
    );

    const harmonicChartWithPhase = new Chart(
        document.getElementById('harmonic-chart-with-phase'),
        initConfig('Harmonic signal with with phase', initHarmonicDataset(LABELS, initLabels(), COLORS,
            errorsWithPhase.rms1, errorsWithPhase.rms2, errorsWithPhase.ampl))
    );
}

function initErrorsValues(phase) {
    let errorsValues = {rms1: [], rms2: [], ampl: []};
    for (let m = K; m < 2 * N; m += STEP) {
        let x = createHarmonicSignal(m, phase);
        errorsValues.rms1.push(0.707 - calculateRootMeanSquareVal1(x, m));
        errorsValues.rms2.push(0.707 - calculateRootMeanSquareVal2(x, m));
        errorsValues.ampl.push(1 - calculateAmplitude(x));
    }
    return errorsValues;
}

function initLabels() {
    let labels = [];
    let m = K;
    while (m < 2 * N) {
        labels.push(m);
        m += STEP;
    }
    return labels;
}


function initHarmonicDataset(datasetLabels, labels, colors, rms1, rms2, ampl) {
    return {
        labels: labels,
        datasets: [
            {
                label: datasetLabels[0],
                backgroundColor: colors[0],
                borderColor: colors[0],
                data: rms1,
            },
            {
                label: datasetLabels[1],
                backgroundColor: colors[1],
                borderColor: colors[1],
                data: rms2,
            },
            {
                label: datasetLabels[2],
                backgroundColor: colors[2],
                borderColor: colors[2],
                data: ampl,
            }
        ]
    };
}

function initConfig(title, dataset) {
    return {
        type: 'line',
        data: dataset,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title
                }
            }
        }
    };
}

createHarmonicCharts();