// window.onload = async function () {
//     const data = await axios.get("http://api.coindesk.com/v1/bpi/historical/close.json");
//     try {
//         console.log(data)
//     } catch (err) {
//         console.log(err);
//     }
// }

//load and create linechart

window.onload = function () {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
        .then(function (response) {
            const data = Object.values(response.data.bpi);
            const labels = Object.keys(response.data.bpi);
            createChart(data, labels)
        })
        .catch(function (err) {
            console.log(err);
        })

}

//create line chart

function createChart(data, labels) {
    const ctx = document.getElementById('bitcoinChart').getContext('2d');
    const bitcoinChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Bitcoin Price Index",
                data: data,
            }]
        },
    })
}

//filter line chart

function filterChart() {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
        .then(response => {
            createChart(data, labels);
        })
        .catch(err => console.log("error", err));
};

