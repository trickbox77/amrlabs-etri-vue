<template>
  <div class="m-3">
    <b-row style="width: 100vw;"
    >
      <b-col cols="5" style="height: 83vh; overflow-y: auto">
        <b-btn class="p-3 w-100 text-start" variant="outline-primary" @click="doAction(1)">
          <b-icon icon="skip-start-fill" />
          &nbsp;Move In Front Of Lane
        </b-btn>
        <b-btn class="p-3 w-100 text-start" variant="outline-primary" @click="doAction(2)">
          <b-icon icon="chevron-bar-contract" />
          &nbsp;Get On Track
        </b-btn>
        <b-btn class="p-3 w-100 text-start" variant="outline-primary" @click="doAction(3)">
          <b-icon icon="arrow-bar-left" />
          &nbsp;Move To Starting Lane Loc
        </b-btn>
        <b-btn class="p-3 w-100 text-start" variant="outline-primary" @click="doAction(4)">
          <b-icon icon="trash2-fill" />
          &nbsp;Harvest
        </b-btn>
        <b-btn class="p-3 w-100 text-start" variant="outline-primary" @click="doAction(5)">
          <b-icon icon="phone-vibrate-fill" />
          &nbsp;Call Other Robot
        </b-btn>
        <b-btn class="p-3 w-100 text-start" variant="outline-primary" @click="doAction(6)">
          <b-icon icon="backspace-reverse-fill" />
          &nbsp;Go Back And Get Off Track
        </b-btn>
        <b-btn class="p-3 w-100 text-start" variant="outline-primary" @click="doAction(7)">
          <b-icon icon="battery-charging" />
          &nbsp;Go Back To Charger
        </b-btn>
      </b-col>
      <b-col cols="7" style="height: 83vh; overflow-y: auto">
        <div v-for="(lg, i) in this.log" :key="i" class="text-start border border-info border-bottom-0 text-sm-subtitle-2">
          {{ lg }}
        </div>
        <div class="text-start border-info border-top text-sm-subtitle-2"/>
      </b-col>
    </b-row>
    <b-alert
        v-model="showBottom"
        class="position-fixed fixed-bottom m-0 rounded-0"
        style="z-index: 2000;"
        variant="warning"
        dismissible
    >
      {{ message }}
    </b-alert>
  </div>
</template>

<script>

const mqtt = require("mqtt");

export default {
  name: "Home",
  data() {
    return {
      log: [],
      message: '',
      client : {
        connected: false,
      },
      showBottom: true,
    }
  },
  watch: {
    message() {
      if (this.log.length > 500) this.log.splice(0, 1);
      this.log.unshift(this.message);
    }
  },
  mounted() {
    let self = this;
    setTimeout(function(){
      self.fncSubscribeMqtt();
    }, 1000);
  },
  methods: {
    doAction(action) {
      const msg = { header: { version: 0, type: 530 }, body: { action: action } };
      this.client.publish('al.farm', JSON.stringify(msg));
    },
    fncSubscribeMqtt() {

      if (this.client.connected) {
        try {
          this.client.end(false, () => {
            this.message = 'Successfully disconnected!';
          })
        } catch (error) {
          console.log('Disconnect failed', error.toString())
        }
      }

      console.log(this.$store.state.mqttUrl);

      this.client = mqtt.connect(this.$store.state.mqttUrl, {
        username: "amrlabs",
        password: "9827",
        clean: "false",
        keepalive: 1000,
        useSSL: true
      });

      this.client.on("connect", async () => {
        this.message = `${(new Date()).toLocaleTimeString()}▶ ${this.$store.state.mqttUrl} connected: ${this.client.connected}`;
        let self = this;
        this.client.subscribe(`al.farm/#`, function (error, granted) {
          if (error) {
            console.log(error);
          } else {
            self.message = `${(new Date()).toLocaleTimeString()}▶ ${granted[0].topic} was subscribed`;
          }
        });
      });

      this.client.on("error", function (error) {
        this.message = "Connection Error:", error;
      });

      this.client.on("reconnect", function () {
        this.message = (new Date()).toString() + "reconnect";
      });

      this.client.on("message", async (topic, message) => {
        let self = this;
        if (message) {
          try {
            let date = new Date();
            self.message = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds() + '▶ ' + message;
          } catch (e) {
            console.log("parsing error", e);
          }
        }
      });
    }
  }
};
</script>

<style></style>
