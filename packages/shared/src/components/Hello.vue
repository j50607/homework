<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>

      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
      <!-- <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>. -->
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis distinctio repellat accusantium nobis unde quia ut alias esse numquam dicta.
    </p>
    <p>456789123</p>
    
  </div>
</template>

<script>
import  { defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  }
}) 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
