<template>
  <section>
    <div id="asistente">
        <h1>Asistentes a la sesion en directo</h1>
        <ul>
            <li v-for="asistente in $store.state.asistentes.slice().reverse()" :key="asistente">{{ asistente }}</li>
        </ul>
    </div>
    <div id="caja-form">
        <div id="add">
            <input type="text" placeholder="Nombre del asistente" v-model="$store.state.nombre_asist">
            <button @click="addAsist()">Añadir asistente</button>
            <button @click="delAsist()">Eliminar asistente</button>
            <button @click="prueba()">sweet alert </button>
        </div>
    </div>
    <cite v-if="$store.state.mostrar==true">{{ $store.state.mensaje }}</cite>
    <!-- <h1>{{ $store.state.texto }}</h1>
     -->

  </section>
</template>

<script>
export default {
    name: 'AsistentesDirecto',
    methods: {
        prueba(){
            this.$swal('Any fool can use a computer')
        },
        addAsist(){
            this.$store.dispatch('accionAddAsist')
        },
        delAsist(){
            this.$store.dispatch('accionDelAsist')
        }
    },
    mounted(){
        let data = localStorage.getItem('Asistentes')
        if ( data != null ){
            this.asistentes = JSON.parse(data)
        }
        // llamo la accion de store y para ejecutarla => dispatch
        this.$store.dispatch('accionModif')
    }
}
</script>

<style lang="sass" scoped>
    @mixin flex
        display: flex
        justify-content: center
        align-items: center
    
    @mixin input_botones
        border-radius: 10px
        border: none
        font-style: italic
        font-weight: bold
        padding: .5rem 1rem
        color: gray

    // estilos al scroll
    ul::-webkit-scrollbar
        width: 7px

    ul::-webkit-scrollbar-thumb
        background: #1b1b1b
        border-radius: 10px
    
    section
        @include flex
        padding: 1rem
        flex-direction: column
        height: 100vh
        background: rgba(45, 31, 61, 1 )
        #asistente
            width: 50%
            padding: 1rem
            border-radius: 10px
            background: white
            box-shadow: 1px 1px 3px black
            h1
                color: #2a1542
            ul
                list-style: none
                overflow: scroll
                overflow-x: hidden
                height: 100px
                li
                    margin: 10px 0
                    font-size: 18px
                    color: #7e6d91
                    font-weight: bold
                    border-bottom: 1px solid
                    width: 97%
        #caja-form
            width: 50%
            #add
                width: 100%
                display: flex
                justify-content: space-between
                margin: 10px 0
                input
                    @include input_botones
                    width: 50%
                    outline: none
                button
                    @include input_botones 
                    cursor: pointer
                    transition: .4s
                    &:hover
                        background: #c2bc4e
                        color: #1b1b1b
        cite
            color: #e0d265
            margin-top: 1rem

</style>