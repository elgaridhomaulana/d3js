const data = [
	{ width: 200, height: 100, fill: 'purple' },
	{ width: 100, height: 60, fill: 'pink' },
	{ width: 50, height: 30, fill: 'red' }
]


const svg = d3.select('svg')

// join dengan data
const rect = svg.selectAll('rect')
	.data(data)

// menambahkan attribut kepada rect yang sudah terdapat di dalam DOM
rect.attr('width', d => d.width)
	.attr('height', d => d.height)
	.attr('fill', d => d.fill);

// enter selection
// apabila element data lebih banyak dibandingkan dengan data element yang terdapat di DOM
// maka d3 akan mendeteksi hal tersebut dan akan memasukan ke dalam virtual element
// untuk memasukan virtual element ke dalam DOM kita dapat mengunakan enter selection
// perhatikan dalam enter selection terdapat append yang mendefinisikan element apa yang ingin ditambahkan ke dom dengan data yang ada
rect.enter()
	.append('rect')
	.attr('width', d => d.width)
	.attr('height', d => d.height)
	.attr('fill', d => d.fill);