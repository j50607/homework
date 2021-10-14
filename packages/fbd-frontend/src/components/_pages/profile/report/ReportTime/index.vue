<template>
  <div class="report-time mt-4">
    <swiper
      ref="vSwiper"
      class="swiper"
      :loop="true"
      :slides-per-view="1"
      :space-between="50"
      :style="{'--change': animationReset, '--delay': `${delay}ms`}"
      @swiper="onSwiper"
      @slideChange="slideChange"
    >
      <swiper-slide
        v-for="(item, index) in state.reportRecordList"
        :key="index"
        v-slot="{isActive}"
      >
        <div class="slide-container">
          <div class="top-container py-1 flex justify-center items-center bg-normal text-white text-xs">
            <img
              :src="$requireSafe('icon/triangle-left-white.svg')"
              alt=""
              class="w-2 mr-3"
            >
            <p>{{ item.time }}</p>
            <p>{{ isActive? '1' : '0' }}</p>
            <img
              :src="$requireSafe('icon/triangle-right-white.svg')"
              alt=""
              class="w-2 ml-3"
            >
          </div>
          <div class="bottom-container py-3 px-4 flex items-center">
            <div class="profit-area w-1/2">
              <p class="text-sm">
                {{ $t('components_pages_profile_report_time_profitAmount') }}
              </p>
              <p :class="item.profit > 0 ? 'positive-number' : item.profit < 0 ? 'negitive-number' : ''">
                {{ item.profit > 0? '+' : item.profit === 0? '' : '-' }}{{ floorToDigitTwo(item.profit) }}
              </p>
            </div>
            <div class="bet-area">
              <p class="text-xs">
                {{ $t('components_pages_profile_report_time_betAmount') }}
              </p>
              <p>{{ item.bet }}</p>
              <p class="text-xs mt-2">
                {{ $t('components_pages_profile_report_time_betOrders') }}
              </p>
              <p>{{ item.betAmount }}</p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="scroll-area mt-4">
      <div class="head text-xs flex fixed  left-0 py-1 w-full px-3">
        <p class="index">
          #
        </p>
        <p class="time">
          {{ $t('components_pages_profile_report_time_time') }}
        </p>
        <p class="flex-1">
          {{ $t('components_pages_profile_report_time_betAmount') }}
        </p>
        <p class="flex-1">
          {{ $t('components_pages_profile_report_time_profitAmount') }}
        </p>
      </div>
      <d-scroll
        ref="scroll"
        :pull-up="true"
        :pull-down="true"
        :scroll-y="true"
        :on-scroll="true"
        @pullingDown="pullingDown()"
        @pullingUp="loadMoreRecord()"
        v-if="state.betRecordList.length"
      >
        <div class="record">
          <div class="head text-xs flex py-1 fixed w-full h-6 left-0 px-3">
            <p class="w-1/2">
              {{ $t('components_pages_components_vip_returnProfit_table_title_time') }}
            </p>
            <p>{{ $t('components_pages_components_vip_returnProfit_table_title_money') }}</p>
          </div>
          <div class="record-container pt-6">
            <div
              class="record-list text-xs flex"
              v-for="(item, index) in state.betRecordList"
              :key="index"
            >
              <p class="time w-1/2">
                {{ dayjs(item.processAt).format('YYYY-MM-DD hh:mm:ss') }}
              </p>
              <p class="amount">
                {{ item.amount }}
              </p>
            </div>
          </div>
        </div>
      </d-scroll>
      <div
        class="no-data text-center"
        v-else
      >
        <img
          :src="$requireSafe('icon/no-data.svg')"
          alt=""
          class="m-auto"
        >
        <p class="text-sm text-normal">
          {{ $t('components_pages_components_vip_envelop_noData') }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onBeforeMount } from 'vue';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import NP from 'number-precision';
import dayjs from 'dayjs';
import { isArray } from '@/assets/js/utils/utils';
import SportApi from '@/assets/js/api/sportApi';

SwiperCore.use([Navigation, Pagination]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    delay: {
      type: Number,
      default: 8000,
    },
    renderingTime: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    let vSwiper = null;

    // ref
    const animationReset = ref('block');

    // reactive
    const state = reactive({
      reportRecordList: [
        {
          time: '2021-09-28 星期一',
          profit: 99.99,
          bet: 123.12,
          betAmount: 12,
        },
      ],
      betReportParams: {
        start: undefined,
        end: undefined,
      },
      betRecordList: [],
    });

    // methods
    const onSwiper = (swiper) => {
      vSwiper = swiper;
    };

    const slideChange = () => {
      animationReset.value = 'none';
      setTimeout(() => {
        animationReset.value = 'block';
      }, 50);
    };

    const getBetOrderPage = async () => {
      const res = await SportApi.getBetOrderPage({
        start: dayjs(),
        end: dayjs(),
      });
      if (res.code === 200) {
        if (isArray(res.data.content)) {
          state.dayBetList = res.data.content;
        }
      }
    };

    const getBetReport = async () => {
      const res = await SportApi.getBetReport({
        start: state.betReportParams.start,
        end: state.betReportParams.end,
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

    // hooks
    onBeforeMount(async () => {
      console.log('props.renderingTime :>> ', props.renderingTime);
      switch (props.renderingTime) {
        case 'day':
          getBetOrderPage();
          break;
        case 'week':
          state.betReportParams.start = dayjs().startOf('week');
          state.betReportParams.end = dayjs().endOf('week');
          getBetReport();
          break;
        case 'month':
          state.betReportParams.start = dayjs().startOf('month');
          state.betReportParams.end = dayjs().endOf('month');
          getBetReport();
          break;
        default:
      }
    });

    return {
      onSwiper,
      slideChange,
      state,
      vSwiper,
      animationReset,
      floorToDigitTwo,
    };
  },
};
</script>
<style lang="postcss" scoped>
.swiper {
  ::v-deep(.swiper-wrapper) {
    .swiper-slide {
      /* margin-right: 0 !important; */
      border-radius: 3px;
      box-shadow: 0 2px 4px #4d57721a;
    }

    .swiper-slide-active {
      width: 90% !important;
      margin-right: 80px !important;
      margin-left: 15px !important;
    }
  }
}

.slide-container {
  .bottom-container {
    background: transparent linear-gradient(245deg, #ecf2f8 0%, #fff 100%);
  }
}

.positive-number {
  color: #38c522;
}

.negitive-number {
  color: #f00;
}

.head {
  background: #ecf2f8;
}

.no-data {
  img {
    width: 60px;
  }
}

.index {
  width: 10%;
}

.time {
  width: 20%;
}
</style>
