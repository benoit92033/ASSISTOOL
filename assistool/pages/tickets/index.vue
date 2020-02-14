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
  <form action="/tickets/add" method="GET">
    <div>
        <p>
            <label for="title">Titre :</label>
            <input type="text" name="title" required>
        </p>
        <p>
            <label for="priority">Priorité :</label>
            <select name="priority" id="">
                <option value="3">Urgent</option>
                <option value="2">Important</option>
                <option value="1">Corrige le batard</option>
                <option value="0">Osef</option>
            </select>
        </p>
        <p>
            <input type="submit" value="Ajouter">
        </p>
    </div>
  </form>
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