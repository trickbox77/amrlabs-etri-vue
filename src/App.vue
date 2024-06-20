<template>
  <v-app id="app">
    <Navbar />
    <div class="background">
      <v-row style="width: 100vw; height: calc(100vh)">
        <v-col>
          <div v-if="true">
            <router-view />
          </div>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: { Navbar },
  data: () => ({
    showAlert: false,
    ready: false,
  }),
  beforeMount: async function () {
    await this.axios
        .get("./config.json")
        .then((resp) => {
          if (typeof resp.data != "object") {
            throw new Error("Cannot parse as JSON!");
          }
          this.$store.commit("mqttUrl", resp.data.mqttUrl);
          this.ready = true;
        })
        .catch((e) => {
          console.error(e);
          this.showAlert = true;
        });
  },
};
</script>

<style lang="scss">
.background{
  overflow: hidden;
  margin:0;
  background-image: url("./assets/tomato.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: right;
}
.spinner-text {
  width: 17px !important;
  height: 17px !important;
  margin-right: 8px;
}
.spinner-big {
  width: 200px !important;
  height: 200px !important;
}
.spinner-medium {
  width: 100px !important;
  height: 100px !important;
}
.icon-big {
  font-size: 100px;
}
.icon-text {
  font-size: 17px;
}
html, body{
  overflow-y: hidden;
}
</style>
