<style>
.tickets {
  background-color: rgb(40, 40, 40);
  margin: 20px 10px 20px 10px;
  padding: 10px;
  border-radius: 10px;
}

.tickets h2 {
  margin: 5px 5px 20px 5px;
}
</style>

<template>
  <v-layout>
    <v-flex>


    <h1 class="display-2 font-weight-light">Tickets Fermés : {{ ticketsClose.length }}</h1>

    <div class="card">
    <div class="card-body">
      <h2 class="card-title">Tickets fermés</h2>
    </div>

    <div class="card-img-bottom">
      <chartjs-doughnut
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option"
      />
    </div>
  </div>

  <h3>Temps de résolution moyen d'un ticket : {{ calcMoyenTicket() }} jours</h3>

      <div v-for="tc in ticketsClose" :key="tc.id_ticket" class="tickets" >
        <div class="d-flex">
          <h2 class="font-weight-light">{{ tc.titre }}</h2>
          <v-btn v-if="tc.urgence == 1" depressed small style="margin: 10px; pointer-events: none;" color="success" >Pas urgent</v-btn>
          <v-btn v-else-if="tc.urgence == 2 || tc.urgence == 3" depressed small style="margin: 10px; pointer-events: none;" color="warning" >Urgent</v-btn>
          <v-btn v-else depressed small style="margin: 10px; pointer-events: none;" color="error" >Très Urgent</v-btn>
        </div>
        <div>
          <p>{{ tc.description }}</p>
        </div>

        <div>
          <h3>Temps de résolution du ticket : {{ calcDate(tc.date_creation,tc.date_cloture) }} jours</h3>
        </div>

        <div>
          <img src="v.png" />
        </div>
      </div>

    </v-flex>



  </v-layout>



</template>


<script>

import ChartDoughnut from "@/components/chart-doughnut";

export default {

components: {
    ChartDoughnut
  },

  middleware: ['auth','responsable'],

  data: () => ({
    ticketsClose: [],

    datasets: [
        {
          data: [],
          backgroundColor: ["#76FF03", "#FFEB3B", "#FF9800", "#FF5722", "#DD2C00"],
          hoverBackgroundColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]
        }
      ],
      labels: ["Urgence 1", "Urgence 2", "Urgence 3", "Urgence 4", "Urgence 5"],
      option: {}

  }),

  methods: {

    async getTicketsClose() {
      try {
         await this.$store.dispatch('getTicketsCloseAll').then(response => {
           this.ticketsClose = this.$store.state.ticketsCloseAll;
           this.linkData();
        })
      } catch (e) {
        this.formError = e.message
      }

    },

    linkData() {

        this.datasets[0].data = [0,0,0,0,0];

        for(let ticket of this.ticketsClose) {
            this.datasets[0].data[(ticket.urgence)-1]++;
        }
    },

    calcDate(dOuv,dFin) {
        let date1 = new Date(dOuv.substr(3, 2)+"/"+dOuv.substr(0, 2)+"/"+dOuv.substr(6, 4));
        let date2 = new Date(dFin.substr(3, 2)+"/"+dFin.substr(0, 2)+"/"+dFin.substr(6, 4));

        let diffTime = Math.abs(date2 - date1);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        return diffDays; 
    },

    calcMoyenTicket(){

        var joursTotal = 0;
        var counter = 0;

        for(let ticket of this.ticketsClose) {
            joursTotal += this.calcDate(ticket.date_creation,ticket.date_cloture)
            counter ++;
        }

        return (joursTotal /= counter).toFixed(2);

    }

  },
  created() {
    this.getTicketsClose().then((res) => {
        this.linkData();
    })

  },
  computed: {

    FilteredTicketsClose: function() {
      return this.ticketsClose.filter(ticket => {
        return ticket.titre.toLowerCase().match(this.searchtxt.toLowerCase())
      })
    }

    
  }
}
</script>
