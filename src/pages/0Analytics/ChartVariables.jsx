export const chartExample12 = {
  data: {
    labels: [
      "S",
      "M",
      "T",
      "W",
      "T",
      "F",
      "S",
    ],
    datasets: [
      {
        borderColor: "#52469e",
        backgroundColor: "#52469e",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
        data: [322, 330, 326, 333, 345, 338, 354]
      },
      {
        borderColor: "#54a0c6",
        backgroundColor: "#54a0c6",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
        data: [360, 370, 385, 390, 384, 408, 420]
      },
      {
        borderColor: "#f7598b",
        backgroundColor: "#f7598b",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
        data: [409, 425, 445, 460, 450, 478, 484]
      }
    ]
  },
  options: {
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: "#9f9f9f",
            beginAtZero: false,
            maxTicksLimit: 5
          },
          gridLines: {
            drawBorder: false,
            zeroLineColor: "transparent",
            color: "rgba(255,255,255,0.05)"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent",
            display: false
          },
          ticks: {
            padding: 20,
            fontColor: "#9f9f9f"
          }
        }
      ]
    }
  }
};

export const chartExample6 = {
  data: {
    labels: [1, 2],
    datasets: [
      {
        label: "Emails",
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: ["#fcc468", "#f4f3ef"],
        borderWidth: 0,
        data: [69, 31]
      }
    ]
  },
  options: {
    elements: {
      center: {
        text: "69%",
        color: "#66615c", // Default is #000000
        fontStyle: "Arial", // Default is Arial
        sidePadding: 60 // Defualt is 20 (as a percentage)
      }
    },
    cutoutPercentage: 90,
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            display: false
          },
          gridLines: {
            drawBorder: false,
            zeroLineColor: "transparent",
            color: "rgba(255,255,255,0.05)"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            display: false
          }
        }
      ]
    }
  }
};
