<template>
  <div class="report-summary mt-4">
    <div class="chart-area mb-4">
      <div class="title flex mb-2">
        <img
          :src="$requireSafe('icon/icon-report-chart.svg')"
          alt=""
        >
        <p class="text-sm font-bold">
          {{ $t('components_pages_profile_report_summary_title') }}
        </p>
      </div>
      <div
        class="bar-chart"
        id="barCharts"
        :style="{ width: '100%', height: '140px' }"
      />
    </div>
    <div class="text-area">
      <div class="title flex items-center mb-2">
        <img
          :src="$requireSafe('icon/icon-report-pig.svg')"
          alt=""
        >
        <p class="text-sm font-bold">
          {{ $t('components_pages_profile_report_summary_title2') }}
        </p>
      </div>
      <div class="content">
        <div
          class="item mb-2 px-4 py-2"
          v-for="(item, index) in state.profitArr"
          :key="index"
        >
          <p class="text-sm">
            {{ item.label }}
          </p>

          <p
            class="text-base font-bold"
            :class="item.profit > 0 ? 'positive-number' : item.profit < 0 ? 'negitive-number' : ''"
          >
            {{ item.profit > 0? '+' : item.profit === 0? '' : '-' }}{{ floorToDigitTwo(item.profit) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import {
  onBeforeMount, onMounted, onUnmounted, reactive, watch, ref, computed,
} from 'vue';
import dayjs from 'dayjs';
import NP from 'number-precision';
import { useI18n } from 'vue-i18n';
import SportApi from '@/assets/js/api/sportApi';
import { isArray } from '@/assets/js/utils/utils';

export default {
  setup() {
    // use
    const echart = echarts;
    const { t } = useI18n();
    // noProxy
    let chart;
    const eventPool = [];

    // ref
    const lineDataArr = ref([]);

    const state = reactive({
      profitArr: [
        {
          label: t('components_pages_profile_report_summary_profitArr_today'),
          profit: 0,
        },
        {
          label: t('components_pages_profile_report_summary_profitArr_week'),
          profit: 0,
        },
        {
          label: t('components_pages_profile_report_summary_profitArr_month'),
          profit: 0,
        },
      ],
      barArr: [],
      yDataArr: [],
    });

    // computed
    const xDataArr = computed(() => {
      const arr = [];
      state.barArr.forEach((item) => {
        arr.push(item.createdAt);
      });
      return arr;
    });
    const yDataArr = computed(() => {
      const arr = [];
      state.barArr.forEach((item) => {
        arr.push(item.winAmtSum);
      });
      return arr;
    });

    // methods
    // 柱狀圖
    const initChart = () => {
      chart = echart.init(document.getElementById('barCharts'));
      chart.setOption({
        xAxis: {
          type: 'category',
          data: xDataArr.value,
          // show: false,
          axisLine: false,
        },
        yAxis: {
          type: 'value',
          // show: false,
          axisLine: false,
        },
        // dataZoom: [
        //   {
        //     type: 'inside',
        //     xAxisIndex: [0],
        //     start: 1,
        //     end: 35,
        //     filterMode: 'filter',
        //   },
        // ],
        series: [
          {
            data: [100, 0, 50, 0, 500],
            type: 'bar',
            smooth: true,
            showSymbol: false,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#ED9D1F', // 0% 处的颜色
                }, {
                  offset: 1, color: '#EDD455', // 100% 处的颜色
                }],
                global: false, // 缺省为 false
              },
            },
          },
        ],
        // grid: {
        //   left: '5%',
        //   bottom: '20%',
        //   top: '10%',
        // },
      });
    };

    const resizeChart = (() => {
      let timer;
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          chart.resize();
        }, 100);
      };
    })();

    const getBetReportThirtyDays = async () => {
      const res = await SportApi.getBetReport({
        start: dayjs().subtract(29, 'day'),
        end: dayjs(),
      });
      if (res.code === 200) {
        res.data.forEach((item) => {
          state.barArr.forEach((e, index, arr) => {
            if (item.createdAt === e.createdAt) {
              arr[index] = item;
            }
          });
        });
        // state.barArr.reverse();
      }
    };
    const getBetReportWeek = async () => {
      const res = await SportApi.getBetReport({
        start: dayjs().subtract(3, 'day'),
        end: dayjs().add(4, 'day'),
      });
      if (res.code === 200) {
        if (isArray(res.data)) {
          let weekTotalProfit = 0;
          res.data.forEach((item) => {
            weekTotalProfit = NP.plus(weekTotalProfit, item.winAmtSum);
          });
          state.profitArr[1].profit = weekTotalProfit;
        }
      }
    };
    const getBetReportMonth = async () => {
      const res = await SportApi.getBetReport({
        start: dayjs().startOf('month'),
        end: dayjs().endOf('month'),
      });
      if (res.code === 200) {
        if (isArray(res.data)) {
          let monthTotalProfit = 0;
          res.data.forEach((item) => {
            monthTotalProfit = NP.plus(monthTotalProfit, item.winAmtSum);
          });
          state.profitArr[2].profit = monthTotalProfit;
        }
      }
    };

    const getBetOrderPage = async () => {
      const res = await SportApi.getBetOrderPage({
        start: dayjs(),
        end: dayjs(),
      });
      if (res.code === 200) {
        if (isArray(res.data.content)) {
          let todayTotalProfit = 0;
          res.data.content.forEach((item) => {
            todayTotalProfit = NP.plus(todayTotalProfit, item.estimateProfit);
          });
          state.profitArr[0].profit = todayTotalProfit;
        }
      }
    };
    const addWebEvent = (action, callback) => {
      window.addEventListener(action, callback);
      eventPool.push([action, callback]);
    };
    const removeWebEvent = () => {
      eventPool.forEach((event) => {
        window.removeEventListener(...event);
      });
    };

    /**
 * 無條件捨去到第 2 位
 * @param {number} num
 */
    const floorToDigitTwo = (num) => {
      const base = 10 ** 2;
      const resultAmount = NP.divide(Math.floor(NP.times(num, base)), base);
      // 遇整數或小數點位數不夠補0
      if (String(resultAmount).indexOf('.') > -1) {
        if (String(resultAmount).split('.')[1].length < 2) {
          return `${String(resultAmount)}0`;
        }
        return resultAmount;
      }
      return `${resultAmount}.00`;
    };

    const generateArray = () => {
      state.barArr = new Array(30).fill({ createdAt: '' }).map((item, index) => {
        const newItem = dayjs().subtract(index, 'day').format('YYYY-MM-DD');
        return {
          createdAt: newItem,
          winAmtSum: 0,
        };
      });
    };

    // watch
    watch(() => lineDataArr.value, () => {
      initChart();
    });

    // hooks

    onBeforeMount(async () => {
      generateArray();
      await getBetOrderPage();
      await getBetReportThirtyDays();
      await getBetReportWeek();
      await getBetReportMonth();
    });
    onMounted(() => {
      initChart();
      addWebEvent('resize', resizeChart);
    });

    onUnmounted(() => {
      chart.dispose();
      removeWebEvent();
    });

    return {
      echart,
      state,
      floorToDigitTwo,
      xDataArr,
      yDataArr,
    };
  },
};
</script>
<style lang="postcss" scoped>
.title {
  img {
    width: 16px;
    margin-right: 8px;
  }
}

.item {
  border-radius: 3px;
  background-image: url('~@/assets/img/profile/report/bg.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  box-shadow: 0 2px 4px #4d57721a;

  .positive-number {
    color: #38c522;
  }

  .negitive-number {
    color: #f00;
  }
}

#barCharts {
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 2px 4px #4d57721a;
}
</style>
