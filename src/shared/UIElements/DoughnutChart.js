import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    DoughnutController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import "./Doughnut.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    DoughnutController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DoughnutChart = (props) => {
    ChartJS.defaults.color = "#FFFFFF";
    const date = new Date();
    const monthName = date.toLocaleString("en-US", { month: "long" });
    const macrosForGraph = [props.items2];
    console.log(macrosForGraph);
    const macroGraphInfo = {
        labels: [
            "Carbs" + " " + macrosForGraph.map((macros) => macros.carbs),
            "Protein" + " " + macrosForGraph.map((macros) => macros.protein),
            "Fat" + " " + macrosForGraph.map((macros) => macros.fats),
        ],
        datasets: [
            {
                data: [
                    macrosForGraph.map((macros) => macros.carbs),
                    macrosForGraph.map((macros) => macros.protein),
                    macrosForGraph.map((macros) => macros.fats),
                ],
                backgroundColor: ["#257ff5", "#F06B2D", "#f8df00"],
                borderColor: ["#257ff5", "#F06B2D", "#f8df00"],
            },
        ],
    };
    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text:
                    macrosForGraph.map((macros) => macros.month) +
                    " " +
                    macrosForGraph.map((macros) => macros.day),
                color: "#FFFFFF",
                font: {
                    size: 20,
                },
            },
        },
    };

    return (
        <div className="doughnut">
            <Doughnut data={macroGraphInfo} options={chartOptions} />
        </div>
    );
};

export default DoughnutChart;
