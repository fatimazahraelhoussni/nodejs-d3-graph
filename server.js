const express = require('express');
const ejs = require('ejs');
const d3 = require('d3');
const { JSDOM } = require('jsdom');


const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Route to render the graph
app.get('/graph', (req, res) => {
  // Data for the radial chart
  const data = [
    { label: 'A', value: 20, color: '#1f77b4' },
    { label: 'B', value: 30, color: '#ff7f0e' },
    { label: 'C', value: 40, color: '#2ca02c' },
    { label: 'D', value: 50, color: '#d62728' },
    { label: 'E', value: 60, color: '#9467bd' }
  ];

  // Dimensions for the SVG
  const width = 800;
  const height = 800;

  // Create the D3 SVG radial chart
  const radius = Math.min(width, height) / 2;
  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  const pie = d3.pie().value(d => d.value).sort(null);

  // Use jsdom to create a DOM for D3
  const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, { runScripts: "dangerously", resources: "usable" });
  const document = dom.window.document;

  const svg = d3.select(document.body)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', '#f0f8ff');

  const g = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const arcs = g.selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc');

  arcs.append('path')
    .attr('d', arc)
    .attr('fill', d => d.data.color);

  arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .style('fill', 'white')
    .style('font-size', '14px')
    .style('text-anchor', 'middle')
    .text(d => d.data.label);

  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 25)
    .style('font-size', '18px')
    .style('font-weight', 'bold')
    .style('text-anchor', 'middle');

  // Embed the SVG in an HTML page
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Radial Chart</title></head>
      <body>
        <h1>Radial Chart Example</h1>
        ${dom.serialize()}
      </body>
    </html>
  `);
});

// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
