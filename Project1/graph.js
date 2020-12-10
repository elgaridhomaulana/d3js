// dimensi dan center dari graph yang akan dibuat
const dims = { height: 300, width: 300, radius: 150 };
const cent = { x: (dims.width / 2 + 5), y: (dims.height / 2 + 5) };

// membuat svg di dalam kelas canvas
const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', dims.width + 150) // width ditambah dengan 150 agar terdapat ruang lebih
    .attr('height', dims.height + 150); // height ditambah dengan 150 agar terdapat ruang lebih

// membuat group di dalam svg
const graph = svg.append('g')
    .attr('transform', `translate(${cent.x}, ${cent.y})`); // translate menuju tengah dari dimensi svg yang sudah dibuat

// membuat pie berdasakan cost mengembalikan sebuah function
const pie = d3.pie()
    .sort(null)
    .value(d => d.cost); // nilai yang dievaluasi untuk membuat pie angle

// arc akan mengubah pie data menjadi sebuah path
const arcPath = d3.arc()
    .outerRadius(dims.radius)
    .innerRadius(dims.radius / 2);

const color = d3.scaleOrdinal(d3['schemeSet3']) // output range menggunakan scheme set d3


// update function
const update = (data) => {

    // update warna
    color.domain(data.map(item => item.name))

    // join enhanced (pie) data to path elements
    const paths = graph.selectAll('path')
        .data(pie(data));
    
    // exit selection
    paths.exit().remove();

    // update current shapes in dom
    paths.attr('d', arcPath)
        .attr('fill', d=> color(d.data.name) );
    
    // enter selection
    paths.enter()
        .append('path')
        .attr('class', 'arc')
        .attr('d', arcPath) // ingat bahwa path membutuhkan attribut d untuk bisa menggambarkan path tersebut
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)
        .attr('fill', d => color(d.data.name) );
}

// data array kosong untuk menyimpan data
var data = [];

// koneksi ke database secara realtime
db.collection('expenses').onSnapshot(res => {
    
    // setiap perubahan terdapat di dalam docChanges
    res.docChanges().forEach(change => {
        
        // menyimpan doc yang berisi data dan id
        const doc = {...change.doc.data(), id: change.doc.id};

        // switch untuk change type
        switch (change.type) {
			case 'added':
				data.push(doc);
				break;
			case 'modified':
				const index = data.findIndex(item => item.id == doc.id);
				data[index] = doc;
				break;
			case 'removed':
				data = data.filter(item => item.id !== doc.id);
				break;
			default:
				break;
        }
        
    })

    // update data ketika variable data berubah
    update(data)
})

