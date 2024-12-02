<template>
    <div>
      <v-app-bar 
        image="https://img.lovepik.com/bg/20231221/Perfumes-and-Perfume-Bottles-Showcase-on-a-Stylish-Black-Background_2662153_wh860.jpg!/fw/860"
        dark
        height="150"
      >
        <v-app-bar-nav-icon class="menu"></v-app-bar-nav-icon>
  
        <v-toolbar-title  
        ><h1>Elixir Perfumé</h1></v-toolbar-title> 
  
        <v-spacer></v-spacer>
  
        <carrito class="mr-5"
         :productos="productos"
        >

        </carrito>
      </v-app-bar>
      
    </div>
  </template>
  <script>
  export default {
    props:{
      productos : Array,
    }
  }
  </script>
  <style scoped>
  h1 {
    color: #fff
  }
   .menu{
    color: #fff;
   }
   .mr-5 {
    color: #fff;
   }
  </style>