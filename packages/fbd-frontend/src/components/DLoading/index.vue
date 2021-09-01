<template>
  <teleport
    :disabled="tpDisabled"
    :to="tpElement"
  >
    <div
      v-if="loading && noDelay"
      class="loading"
      :style="`background: ${overlayColor};`"
    >
      <div
        class="loader"
        :style="`width: ${size}px;height: ${size}px;margin-bottom: ${loaderMarginBottom || size + 'px'};font-size: ${size}px;color: ${color} !important;`"
      >
        Loading...
      </div>
      <div
        v-if="text"
        class="text"
      >
        {{ text }}
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    /**
     * 預設為False，若給True的話，Loading動畫顯示。
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * 預設為36、會影響動畫的大小。
     */
    size: {
      type: Number,
      default: 36,
    },
    /**
     * 預設為空字串，若有賦值，則會在動畫下方出現。
     */
    text: {
      type: String,
      default: '',
    },
    /**
     * 預設為#096fc9，可改變動畫顏色。
     */
    color: {
      type: String,
      default: '#096fc9',
    },
    /**
     * 預設為#ffffff80，可改變overlay顏色。
     */
    overlayColor: {
      type: String,
      default: '#ffffff80',
    },
    /**
     * loader margin bottom，預設為size。
     */
    loaderMarginBottom: {
      type: String,
      default: '',
    },
    /**
     * 預設為200(毫秒)，怕api很快回Response造成動畫閃爍問題，所以可以由此值控制setTimeout的秒數。
     */
    delay: {
      type: Number,
      default: 200,
    },
    /**
     * VUE3語法teleport，看是否要使用傳送。
     */
    tpDisabled: {
      type: Boolean,
      default: false,
    },
    /**
     * VUE3語法teleport，使用querySelector指定要傳送到哪裡。
     */
    tpElement: {
      type: String,
      default: 'body',
    },
  },
  setup(props) {
    // ref
    const noDelay = ref(false);

    let delayTimeout = 0;

    watch(() => props.loading, (val) => {
      if (val) {
        delayTimeout = setTimeout(() => {
          noDelay.value = true;
        }, props.delay);
      } else {
        clearTimeout(delayTimeout);
        noDelay.value = false;
      }
    }, { immediate: true });

    return {
      noDelay,
    };
  },
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #ffffff80;

  .loader {
    border-radius: 50%;
    overflow: hidden;
    text-indent: -9999em;
    -webkit-animation: load6 2s infinite ease, round 2s infinite ease;
    animation: load6 2s infinite ease, round 2s infinite ease;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .text {
    color: #777;
    font-weight: 700;
  }

  @-webkit-keyframes load6 {
    0% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }

    5%,
    95% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }

    10%,
    59% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
    }

    20% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
    }

    38% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
    }

    100% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
  }

  @keyframes load6 {
    0% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }

    5%,
    95% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }

    10%,
    59% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
    }

    20% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
    }

    38% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
    }

    100% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
  }

  @-webkit-keyframes round {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes round {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
