const canvas = d3.select('.canvas');

const svg = canvas.append('svg')
	.attr('height', 600)
	.attr('width', 600);

const groups = svg.append('g')
	.attr('transform', 'translate(0, 100)');

// append shapes to svg container
groups.append('rect')
	.attr('width', 200)
	.attr('height', 100)
	.attr('fill', 'blue')
	.attr('x', 20)
	.attr('y', 20);

groups.append('circle')
	.attr('r', 50)
	.attr('cx', 300)
	.attr('cy', 70)
	.attr('fill', 'pink');

groups.append('line')
	.attr('x1', 370)
	.attr('x2', 400)
	.attr('y1', 20)
	.attr('y2', 120)
	.attr('stroke', 'red');

svg.append('text')
	.attr('x', 20)
	.attr('y', 200)
	.attr('fill', 'grey')
	.text('hello, maulana!')
	.style('font-family', 'arial');

