<template>
  <div>
    <script>
      tickets = [
        {id:"0", title:"prout"},
        {id:"1", title:"erterte"},
        {id:"2", title:"ttre"}
      ]
    
      tickets.forEach(ticket => {
        if (id == $route.params.id)
          let oui = ticket;
      })
    </script>
    <v-forEach
    {{oui}}
  </div>
</template>