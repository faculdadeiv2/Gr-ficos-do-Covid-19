var mySelection = document.querySelector('#selec')

//Trazendo todas os países para o nosso select
function loadPlaces() {
    fetch(`https://api.covid19api.com/countries`).then(res => res.json())
        .then(json => {
            for (let i = 0; i < json.length; i++) {
                var option = document.createElement('option')
                option.innerHTML = json[i].Country
                option.value = json[i].Slug

                mySelection.append(option)
            }
        })
}
loadPlaces()

//Criando função que chama o gráfico assim que há uma troca
var ctx = document.getElementById('myChart').getContext('2d')
mySelection.addEventListener('change', function () {
    var ConfirmedCases = []
    var ActiveCases = []
    var deaths = []
    var days = []
    var Recovered = []
    fetch(`https://api.covid19api.com/total/country/${mySelection.value}`).then(res => res.json())
        .then(json => {
            for (let i = 0; i < json.length; i++) {
                ConfirmedCases.push(json[i].Confirmed)
                days.push(json[i].Date)
                deaths.push(json[i].Deaths)
                ActiveCases.push(json[i].Active)
                Recovered.push(json[i].Recovered)
            }
        }).then(() => {

            var ctx = document.getElementById('myChart').getContext('2d');


            if (window.myCharts != undefined)
                window.myCharts.destroy();
            window.myCharts = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: days,
                    datasets: [{
                        label: 'Número de Mortos',
                        data: deaths,
                        backgroundColor: ['red'],
                        borderColor: [
                            'red',
                        ],
                        borderWidth: 2,
                        pointRadius: 0,
                        fill: false
                    }, {
                        label: 'Número de Recuperados',
                        data: Recovered,
                        backgroundColor: ['rgba(0,181,204,1)'],
                        borderColor: [
                            'rgba(0, 181, 204, 1)',
                        ],
                        borderWidth: 2,
                        pointRadius: 0,
                        fill: false
                    }, {
                        label: 'Número de Casos Confirmados',
                        data: ConfirmedCases,
                        backgroundColor: ['rgba(255,255,0,1)'],
                        borderColor: [
                            'rgba(255, 255, 0, 1)',
                        ],
                        borderWidth: 2,
                        pointRadius: 0,
                        fill: false
                    }, {
                        label: 'Número de Casos Ativos',
                        data: ActiveCases,
                        backgroundColor: ['rgba(41,241,195,1)'],
                        borderColor: [
                            'rgba(41, 241, 195, 1)',
                        ],
                        borderWidth: 2,
                        pointRadius: 0,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Números do Covid-19'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Tempo'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Contagem'
                            }
                        }]
                    }
                }
            })
        })
})