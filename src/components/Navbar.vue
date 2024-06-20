<template>
  <b-navbar type="dark" variant="success" class="justify-content-between">
    <span>
      <svg
        id="battery"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 219.5 80"
        width="90"
      >
        <path
          d="M4.6 5h198.9v70H4.6z"
          id="fill"
          :class="[`is-${battery}`, { 'is-charging': ischarging }]"
        ></path>
        <path
          d="M219.5 17.2H208V0H0v80h208V62.8h11.5V17.2zM198.9 75H9.2V5h189.7v70z"
          id="outline"
          fill="#FFFFFF"
        ></path>
        <text
          x="110"
          y="55"
          text-anchor="middle"
          font-size="40"
          fill="white"
          font-weight="bold"
        >
          {{ battery }}%
        </text>
      </svg>
      <v-btn class="warning ml-2">Ready</v-btn>
    </span>
    <span class="d-flex justify-center">
      <b-navbar-brand class="font-weight-bold" style="font-size: 1.2rem">
        <img src="../assets/amrlabs.png" height="25" />
        ETRI FARM
      </b-navbar-brand>
    </span>
    <span class="d-flex justify-end">
      <v-switch
        color="white"
        v-model="$vuetify.theme.isDark"
        inset
        label="Theme"
        style="margin: 0; height: 1.5rem"
      >
        <template v-slot:label>
          {{ $vuetify.theme.isDark ? "🌙" : "☀️" }}
        </template>
      </v-switch>
    </span>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    battery() {
      return 100;
    },
    ischarging() {
      return true;
    },
  },

  watch: {
    settings: {
      handler(val) {
        this.$vuetify.theme.global.name = val.dark ? "dark" : "light";
      },
      deep: true,
    },
  },
};
</script>

<style>
#fill {
  transform: scaleX(0);
}

#fill.is-10 {
  transform: scaleX(0.1);
  fill: red;
}

#fill.is-20 {
  transform: scaleX(0.2);
  fill: orangered;
}

#fill.is-30 {
  transform: scaleX(0.3);
  fill: orange;
}

#fill.is-40 {
  transform: scaleX(0.4);
  fill: yellow;
}

#fill.is-50 {
  transform: scaleX(0.5);
  fill: yellowgreen;
}

#fill.is-60 {
  transform: scaleX(0.6);
  fill: yellowgreen;
}

#fill.is-70 {
  transform: scaleX(0.7);
  fill: yellowgreen;
}

#fill.is-80 {
  transform: scaleX(0.8);
  fill: yellowgreen;
}

#fill.is-90 {
  transform: scaleX(0.8);
  fill: yellowgreen;
}

#fill.is-100 {
  transform: scaleX(1);
  fill: green;
}

#fill.is-charging {
  animation: fill 4s infinite;
}

@keyframes fill {
  0% {
    transform: scaleX(0);
    fill: red;
  }

  50% {
    fill: yellow;
  }

  100% {
    transform: scaleX(1);
    fill: #72cc58;
  }
}
</style>
