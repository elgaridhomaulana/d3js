const svg = d3.select('.canvas')
	.append('svg')
	.attr('width', 600)
	.attr('height', 600)

// create margins and dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
// mendefinisikan lebar dari graph
const graphWidth = 600 - margin.left - margin.right;
// mendefinisikan tinggi dari graph
const graphHeight = 600 - margin.top - margin.bottom;

// mendefinisikan graph group
const graph = svg.append('g')
	.attr('width', graphWidth) // graph akan memiliki lebar graphWidth
	.attr('height', graphHeight) // graph akan memiliki tinggi graphHeight
	.attr('transform', `translate(${margin.left}, ${margin.top})`) // translate graph agar terdapat ruang untuk y dan x axis

// axis group 
const xAxisGroup = graph.append('g')
	.attr('transform', `translate(0, ${graphHeight})`); // translate supaya axis ada di bawah dari graph
const yAxisGroup = graph.append('g');

d3.json('menu.json').then(
	data => {

		const min = d3.min(data, d => d.orders); // nilai minimal dari order data
		const max = d3.max(data, d => d.orders); // nilai maksimal dari order data

		// membuat scaler untuk y sehingga tidak melebihi dari graphHeight yang ditentukan
		const y = d3.scaleLinear()
			.domain([0, max])
			.range([graphHeight, 0]); // ini akan diubah sebaliknya, jadi yang paling tinggi akan tidak ada tingginya
		
		// membuat bandscale untuk x axis
		const x = d3.scaleBand()
			.domain(data.map(item => item.name)) // domain berisi list dari item yang akan ada di x axis 
			.range([0, 500]) // dimension dari graph kita
			.paddingInner(0.2) // padding antara bar
			.paddingOuter(0.2);

		// join the data to rects
		const rects = graph.selectAll('rect')
			.data(data)

		rects.attr('width', x.bandwidth) // bandwidth menunjukkan lebar dari masing-masing bar chart yang sudah di x scaled
			.attr('height', d => graphHeight - y(d.orders)) // graphHeight - y(d.orders) ingat y(d.orders) itu sudah diubah sebaliknya
			.attr('fill', d => d.color)
			.attr('x', d => x(d.name))
			.attr('y', d => y(d.orders)) // turunkan sebanyak y(d.orders)
			.attr('stroke', 'white')
			.attr('stroke-width', '2');

		rects.enter()
			.append('rect')
			.attr('width', x.bandwidth)
			.attr('height', d => graphHeight - y(d.orders))
			.attr('fill', d => d.color)
			.attr('x', d => x(d.name))
			.attr('y', d => y(d.orders))
			.attr('stroke', 'white')
			.attr('stroke-width', '2');


		// create and call the axes
		const xAxis = d3.axisBottom(x);
		const yAxis = d3.axisLeft(y).ticks(5)
			.tickFormat(d => d + ' orders');

		// memanggil group dan menambahkan axis kepada group tersebut
		xAxisGroup.call(xAxis)
		yAxisGroup.call(yAxis)

		// formating text dari ticks
		xAxisGroup.selectAll('text')
			.attr('transform', 'rotate(-40)')
			.attr('text-anchor', 'end')
			.attr('fill', 'black')

		yAxisGroup.selectAll('text')
			.attr('fill', 'black')
	}
)