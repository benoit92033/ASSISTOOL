<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Titre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.title }}</td>
          <td>{{ ticket.priority }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        tickets: [
          {id:"0", title:"prout", priority: "0"},
          {id:"1", title:"Je vote Macron", priority: "1"},
          {id:"2", title:"Il etait une fois ...", priority: "2"}
        ]
      }
    }
  }
</script>