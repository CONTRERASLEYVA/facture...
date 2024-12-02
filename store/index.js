// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      // Define tu estado inicial aquí
    
      comprasrealizadas : [],

      productos : [
        {
            imagen : 'https://http2.mlstatic.com/D_Q_NP_2X_861752-MLU73202177120_122023-E.webp',
            precio :  60000,
            titulo : 'Ésika ',
            descripcion : 'Volumen de la unidad: 90 mL',
            id : 1
        },
        {
          imagen : 'https://http2.mlstatic.com/D_NQ_NP_805218-MLU74113017620_012024-O.webp',
          precio : 
          229001,
          titulo : 'Perfume Moschino',
          descripcion : 'Perfume Moschino I Love Love Cheap & Chic 100 ml EDT para mujer',
          id : 2

       },
       {
        imagen : 'https://http2.mlstatic.com/D_NQ_NP_728157-MLA48255169685_112021-O.webp',
        precio : 
        176997,
        titulo : 'Avenue Elizabeth Arden',
        descripcion : 'Perfume 5th Avenue Elizabeth Arden EDP 125 ml para mujer',
        id : 3

     } ,
   
       
      
      ]

    };
  },
  mutations: {
    incrementarCantidad(state, id) {
        const index = state.comprasrealizadas.findIndex(item => item.id === id);
        if (index !== -1) {
            state.comprasrealizadas[index].cantidad += 1;
        }
    },
    decrementarCantidad(state, id) {
        const index = state.comprasrealizadas.findIndex(item => item.id === id);
        if (index !== -1 && state.comprasrealizadas[index].cantidad > 1) {
            state.comprasrealizadas[index].cantidad -= 1;
        }
    },
    agregarcompra(state, producto) {
        state.comprasrealizadas.push(producto);
    }
},
actions: {
    incrementarCantidad({ commit }, id) {
        commit('incrementarCantidad', id);
    },
    decrementarCantidad({ commit }, id) {
        commit('decrementarCantidad', id);
    },
    agregarcompra({ commit }, producto) {
        commit('agregarcompra', producto);
    }
},

  
  getters: {
    totalCompras: (state) => {
      return state.comprasrealizadas.reduce((total, item) => total + item.cantidad * item.precio, 0);
    },
    count: (state) => state.count,
    productos: (state) => state.productos,
    compras: (state) => {
      const cantidad = state.comprasrealizadas.reduce((accumulator, objeto) => {
        return accumulator + objeto.cantidad;
      }, 0); 
      return cantidad
    },
    procomprados: (state) => state.comprasrealizadas,

    getProductoById: (state) => (id) => {
        return state.comprasrealizadas.findIndex(pro => pro.id === id);
    }

  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store)
  return {
    provide: {
      store: store
    }
  }
})

