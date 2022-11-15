const { createApp } = Vue

const app = createApp( {
    data(){
        return {
            eventos : [],
            currentDate : [],
            categoriasFiltradas: [],
            categoriasFiltradasComing: [],
            eventosComing : [],
            categoriasFiltradasPast: [],
            eventosPast : [],
            eventosFiltrados : [],
            eventosFiltradosComing: [],
            eventosFiltradosPast: [],
            checked : [],
            inputBusqueda : ''
        }
    },
    created(){
        fetch('https://amazing-events.herokuapp.com/api/events')
            .then( response => response.json())
            .then( data => {
                this.eventos = data.events
                this.currentDate = data.currentDate
                this.eventosComing = data.events.filter( element => element.date > this.currentDate)
                this.eventosPast = data.events.filter( element => element.date < this.currentDate)
                this.eventosFiltrados = data.events
                this.eventosFiltradosComing = this.eventosComing
                this.eventosFiltradosPast = this.eventosPast
                this.filtrarCategoria()
                this.filtrarCategoriaComing()
                this.filtrarCategoriaPast()
                console.log([this.categoriasFiltradasComing])
            })
            .catch( err => console.log(err))
    },
    methods: {
        filtrarCategoria(){
            let fn = events => events.category
            this.categoriasFiltradas = [... new Set( this.eventos.filter( fn ).map( fn ) ) ]
        },
        buscar(){
          this.eventosFiltrados = this.eventos.filter( evento => evento.name.toLowerCase().trim().includes( this.inputBusqueda.toLowerCase().trim() ) )
        },
        filtrarCategoriaComing(){
            let fn = events => events.category
            this.categoriasFiltradasComing = [... new Set( this.eventosComing.filter( fn ).map( fn ) ) ]
        },
        filtrarCategoriaPast(){
            let fn = events => events.category
            this.categoriasFiltradasPast = [... new Set( this.eventosPast.filter( fn ).map( fn ) ) ]
        }
        
    },
    computed:{
        filtrar(){
            const filtroPorChecked = this.eventos.filter( evento => this.checked.includes( evento.category ) || this.checked.length === 0)
            this.eventosFiltrados = filtroPorChecked.filter( evento => evento.name.toLowerCase().trim().includes( this.inputBusqueda.toLowerCase().trim() ) )
        },
        filtrarComing(){
            const filtroPorCheckedComing = this.eventos.filter( evento => this.checked.includes( evento.category ) || this.checked.length === 0)
            this.eventosFiltradosComing = filtroPorCheckedComing.filter( evento => evento.name.toLowerCase().trim().includes( this.inputBusqueda.toLowerCase().trim() ) )
        },
        filtrarPast(){
            const filtroPorCheckedPast = this.eventosPast.filter( evento => this.checked.includes( evento.category ) || this.checked.length === 0)
            this.eventosFiltradosPast = filtroPorCheckedPast.filter( evento => evento.name.toLowerCase().trim().includes( this.inputBusqueda.toLowerCase().trim() ) )
        }
        
    }

} )

app.mount('#app')