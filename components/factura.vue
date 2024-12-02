<template>
    <v-dialog v-model="mostrar" width="auto" persistent>
      <v-card max-width="900" prepend-icon="mdi-update" class="factura-card">
        <div class="factura-header">
          <h2 class="factura-titulo">Factura de Compra</h2>
          <div class="factura-info">
            <p>Fecha: {{ fechaActual }}</p>
            <p>No. Factura: #{{ numeroFactura }}</p>
          </div>
        </div>

        <v-card-text class="pa-4">
          <v-data-table
            :headers="titulos"
            :items="productos"
            density="comfortable"
            class="factura-tabla"
          >
            <!-- Slot para la columna de cantidad -->
            <template v-slot:item.cantidad="{ item }">
              <div class="cantidad-control">
                <controlcalidad :id="item.id" :operacion="1" @cambiarCantidad="cambiarCantidad" />
                <span class="cantidad-valor">{{ item.cantidad }}</span>
                <controlcalidad :id="item.id" :operacion="-1" @cambiarCantidad="cambiarCantidad">
                  <template v-slot:simbolo>-</template>
                </controlcalidad>
              </div>
            </template>
  
            <!-- Slot para la columna de precio -->
            <template v-slot:item.precio="{ item }">
              <div class="precio-celda">{{ calcularPrecio(item) | currency }}</div>
            </template>
  
            <!-- Slot para la columna de imagen -->
            <template v-slot:item.imagen="{ item }">
              <v-img
                :src="item.imagen"
                max-height="80"
                max-width="80"
                alt="Imagen del producto"
                class="producto-imagen"
              ></v-img>
            </template>
  
            <!-- Slot para el pie de tabla -->
            <template v-slot:body.append>
              <tr class="factura-totales">
                <td colspan="4" class="text-end subtotal-row">
                  <div class="totales-desglose">
                    <div class="desglose-item">
                      <span>Subtotal:</span>
                      <span>{{ subtotal | currency }}</span>
                    </div>
                    <div class="desglose-item">
                      <span>IVA (16%):</span>
                      <span>{{ iva | currency }}</span>
                    </div>
                    <div class="desglose-item total">
                      <span><strong>Total:</strong></span>
                      <span><strong>{{ total | currency }}</strong></span>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>

        <v-divider></v-divider>

        <div class="factura-footer">
          <div class="terminos">
            <p>Términos y condiciones:</p>
            <small>Esta factura es un comprobante de compra válido.</small>
          </div>
          <v-btn 
            class="cerrar-btn" 
            color="primary" 
            @click="cerrar()"
            elevation="2"
          >
            Cerrar
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import controlcalidad from './controlcantidad.vue';
  
  export default {
    components: { controlcalidad },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        mostrar: false,
        numeroFactura: Math.floor(Math.random() * 100000),
        titulos: [
          { 
            title: 'Producto',
            align: 'start',
            key: 'titulo',
            width: '25%'
          },
          { 
            title: 'Descripción',
            align: 'start',
            key: 'descripcion',
            width: '30%'
          },
          { 
            title: 'Cantidad',
            align: 'center',
            key: 'cantidad',
            width: '15%'
          },
          { 
            title: 'Precio',
            align: 'end',
            key: 'precio',
            width: '15%'
          },
          { 
            title: 'Imagen',
            align: 'center',
            key: 'imagen',
            width: '15%'
          },
        ],
      };
    },
    computed: {
      fechaActual() {
        return new Date().toLocaleDateString();
      },
      productos() {
        return this.$store.getters.procomprados;
      },
      subtotal() {
        return this.productos.reduce((acc, item) => acc + this.calcularPrecio(item), 0);
      },
      iva() {
        return this.subtotal * 0.16;
      },
      total() {
        return this.subtotal + this.iva;
      },
    },
    methods: {
      cerrar() {
        this.$emit('cerrar');
      },
      cambiarCantidad({ id, cambio }) {
        if (cambio === 1) {
          this.$store.dispatch('incrementarCantidad', id);
        } else {
          this.$store.dispatch('decrementarCantidad', id);
        }
      },
      calcularPrecio(item) {
        return item.cantidad * item.precio;
      },
    },
    watch: {
      show(val) {
        this.mostrar = val;
      },
    },
    filters: {
      currency(value) {
        return `$${value.toFixed(2)}`;
      },
    },
  };
  </script>
  
  <style scoped>
/* Perfume Store Invoice Styling */
.factura-card {
  background-color: #f9f5f0; /* Soft cream background */
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 2px solid #d4c4a8; /* Elegant border */
  overflow: hidden;
  font-family: 'Didot', 'Bodoni MT', serif; /* Luxurious, elegant typeface */
}

.factura-header {
  background: linear-gradient(135deg, #8b4513, #5d3a1a); /* Rich, deep brown gradient */
  color: #f5e6d3; /* Soft cream text */
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 4px solid #d4c4a8; /* Golden accent border */
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.factura-titulo {
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0;
  color: #f5e6d3; /* Soft cream color */
}

.factura-info p {
  margin: 0;
  color: rgba(245, 230, 211, 0.8);
  font-size: 0.9rem;
}

.factura-tabla :deep(th) {
  background-color: #5d3a1a !important; /* Deep brown */
  color: #f5e6d3 !important;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 15px !important;
}

.factura-tabla :deep(td) {
  background-color: #ffffff;
  color: #4a4a4a;
  font-size: 0.95rem;
  padding: 12px !important;
  border-bottom: 1px solid #e0d6c6;
}

.cantidad-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: #f5f0e6;
  border-radius: 20px;
  padding: 5px 10px;
}

.cantidad-valor {
  font-size: 1.1rem;
  font-weight: 700;
  color: #5d3a1a;
}

.precio-celda {
  font-weight: bold;
  color: #8b4513;
  font-size: 1.05rem;
}

.producto-imagen {
  border: 3px solid #d4c4a8; /* Golden border */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.producto-imagen:hover {
  transform: scale(1.05);
}

.factura-totales {
  background-color: #f0e6d2;
  color: #5d3a1a;
  font-weight: bold;
}

.totales-desglose .desglose-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #d4c4a8;
}

.totales-desglose .desglose-item:last-child {
  border-bottom: none;
}

.totales-desglose .total {
  border-top: 2px solid #8b4513;
  padding-top: 12px;
  font-size: 1.3rem;
  color: #5d3a1a;
}

.factura-footer {
  background: linear-gradient(135deg, #8b4513, #5d3a1a);
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f5e6d3;
}

.terminos {
  font-size: 0.9rem;
  color: rgba(245, 230, 211, 0.8);
}

.terminos p {
  margin-bottom: 5px;
}

.cerrar-btn {
  background-color: #d4c4a8 !important; /* Golden color */
  color: #5d3a1a !important;
  font-weight: bold;
  border-radius: 8px;
  padding: 10px 20px !important;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cerrar-btn:hover {
  background-color: #f5e6d3 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* Add some subtle perfume-inspired decorative elements */
.factura-card::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  height: 10px;
  background: repeating-linear-gradient(
    45deg,
    #d4c4a8,
    #d4c4a8 10px,
    #8b4513 10px,
    #8b4513 20px
  );
  opacity: 0.5;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .factura-header {
    flex-direction: column;
    text-align: center;
  }
  
  .factura-titulo {
    margin-bottom: 10px;
  }
}
</style>

  
  
  
 
  