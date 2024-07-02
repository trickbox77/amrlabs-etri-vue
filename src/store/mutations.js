export default {
  settings: function (state, settings) {
    state.settings = settings;
  },
  mqttUrl: function (state, mqttUrl) {
    state.mqttUrl = mqttUrl;
  },
  setConfig(state, config) {
    state.mqttUrl = config.mqttUrl;
  }
};
