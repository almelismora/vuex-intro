import { createStore } from 'vuex'

export default createStore({
  // data
  state: {
    nombre_asist: '',
    mensaje: '',
    mostrar: false,
    encontrado: false,
    asistentes: ['Kike', 'Lily']
  },
  //
  getters: {
  },
  // methods; siempre pasamos state como parametro
  mutations: {
    modificar( state ){
      state.texto = 'modificacione desde mutations'
    },
    addAsistVuex( state ){
      state.mostrar = false
      if ( state.nombre_asist === '' ){
          state.mostrar = true
          state.mensaje = 'Debes introducir el nombre del asistente que quieres insertar!'
      } else {
          state.asistentes.push(state.nombre_asist)
          state.nombre_asist = '' // !! reseteamos el input 
          localStorage.setItem('Asistentes', JSON.stringify(state.asistentes))
      }
    },
    delAsistVuex( state ){
      if ( state.nombre_asist === '' ){
        state.mostrar = true
        state.mensaje = 'Debes introducir el nombre del asistente que quieres eliminar!'
      } else {
        for ( let i = 0; i < state.asistentes.length; i++ ){
            if ( state.nombre_asist === state.asistentes[i] ){
                state.encontrado = true
                state.mostrar = false

                let inidce = state.asistentes.indexOf(state.nombre_asist)
                state.asistentes.splice(inidce, 1) // 1 => solo lo borra una vez 

                // actualizamos el localstorage 
                localStorage.setItem('Asistentes', JSON.stringify(state.asistentes))
            }
        }

        if ( state.encontrado == true ){
            state.mostrar = false
        } else {
            state.mostrar = true
            state.mensaje = 'El asistente introducido no esta en la lista'
        }
      }
      state.nombre_asist = ''
    }
  },
  // llaman a las mutaciones; tenemos que pasar el parametro context (referencia a store)
  actions: {
    accionModif( context ){
      context.commit('modificar')
    },
    accionAddAsist( context ){
      context.commit('addAsistVuex')
    },
    accionDelAsist( context ){
      context.commit('delAsistVuex')
    }
  },
  //
  modules: {
  }
})
