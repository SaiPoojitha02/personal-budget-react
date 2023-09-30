import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import Chart from 'chart.js/auto';

function HomePage() {
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    // Fetch data from localhost:4000 using Axios
    axios.get('http://localhost:4000/budget')
      .then(response => {
        const myBudget = response.data.myBudget;
        setBudgetData(myBudget);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (budgetData.length > 0) {
      // Call functions to create both D3.js doughnut and Chart.js pie charts
      createD3DonutChart(budgetData);
      createChartJsPieChart(budgetData);
    }
  }, [budgetData]);

  const createD3DonutChart = (data) => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
  
    // Clear the existing content of the container
    d3.select('#d3DonutChart').html('');
  
    const svg = d3.select('#d3DonutChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
  
    const color = d3.scaleOrdinal().range([
      'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'
    ]);
  
    const arc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);
  
    const pie = d3.pie()
      .value(d => d.budget);
  
    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');
  
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.title));
  
    // Add labels
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text(d => d.data.title);
  };
  

  const createChartJsPieChart = (data) => {
    const ctx = document.getElementById('chartJsPieChart').getContext('2d');

    // Check if a chart already exists on the canvas
    const existingChart = Chart.getChart(ctx);

    // Destroy the existing chart if it exists
    if (existingChart) {
      existingChart.destroy();
    }

    // Create a new Chart.js pie chart
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(item => item.title),
        datasets: [{
          data: data.map(item => item.budget),
          backgroundColor: [
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'
          ],
        }],
      },
    });
  };

  return (
    <main className="center" id="main">
      <div className="page-area">
      <section>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </section>
    
            <section>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </section>
    
            <section>
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </section>
    
            <section>
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </section>
    
            <section>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </section>
    
            <section>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </section>
    
            <section>
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </section>
    
        <section className="text-box">
          <h1>D3 Doughnut Chart</h1>
          <p>
            <div id="d3DonutChart"></div>
          </p>
        </section>

        <section className="text-box">
          <h1>Chart.js Pie Chart</h1>
          <p>
            <canvas id="chartJsPieChart" width="400" height="400"></canvas>
          </p>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
