<template>
  <div class="title">
    <img :src="require('@/assets/img/home/icon-profitList.svg')">
    <div>{{ $t('components_pages_home_profitList_title') }}</div>
  </div>

  <swiper
    v-if="list && list.length > 0"
    class="profit-list swiper-no-swiping"
    :autoplay="{delay:2000, disableOnInteraction: false}"
    :slides-per-view="3"
    :direction="'vertical'"
    :catchtouchmove="true"
    :loop="true"
  >
    <swiper-slide
      class="profit-item"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="combination">
        <span>{{ item.homeTeamName }}</span> v.s. <span>{{ item.awayTeamName }}</span>
      </div>
      <div class="account">
        <span class="accoutn-user">{{ item.account }}</span>
        <span class="account-amount">{{ item.amount }}</span>
      </div>
      <div class="star">
        <img :src="require('@/assets/img/home/star-profit-list.svg')">
      </div>
    </swiper-slide>
  </swiper>

  <!-- 獲利榜無資料 -->
  <swiper
    v-else
    class="profit-list swiper-no-swiping"
  >
    <swiper-slide class="no-item">
      <img :src="require('@/assets/img/home/noitem-profit-list-white.svg')">
      <div>{{ $t('components_pages_home_profitList_noItem') }}</div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import dayjs from 'dayjs';
import SportApi from '@/assets/js/api/sportApi';
import { numWithCommas } from '@/assets/js/utils/utils';

SwiperCore.use([Autoplay]);

export default ({
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const state = reactive({
      list: [],
      historyGameSummaryParams: {
        timeType: 'matchTime',
        startTime: dayjs().subtract(6, 'day').format('YYYY/MM/DD HH:mm:ss'),
        endTime: dayjs().format('YYYY/MM/DD HH:mm:ss'),
        gameStatus: [6],
        pageSize: 5,
      },
    });

    const generateAccount = (length) => {
      let str = '';

      for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * 34);

        if (random <= 9) {
          str += String.fromCharCode(48 + random);
        } else {
          str += String.fromCharCode(97 + (random - 10));
        }
      }

      return str;
    };

    const getGameSummaryRecord = async (params) => {
      const sport = [];
      const { code, data } = await SportApi.getGameSummaryRecord(params);
      if (code === 200) {
        data.content.forEach((el) => {
          sport.push(el);
        });
        for (let i = 0; i < 20; i++) {
          const number = Math.floor(Math.random() * 5);
          const randomAmount = parseFloat((100 + 1800 * Math.random()).toFixed(2));
          state.list.push({
            homeTeamName: sport[number].homeTeamName,
            awayTeamName: sport[number].awayTeamName,
            account: `${generateAccount(3)}***${generateAccount(3)}`,
            amount: numWithCommas(randomAmount),
          });
        }
      }
    };

    onMounted(async () => {
      getGameSummaryRecord(state.historyGameSummaryParams);
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="postcss" scoped>

.profit-list {
  height: 177px;
  color: #4d5772;
  font-size: 12px;
  background-image: url('~@/assets/img/home/left-profit-list.png'), url('~@/assets/img/home/bg-profit-list.png'), url('~@/assets/img/home/right-profit-list.png');
  background-repeat: no-repeat;
  background-position: left, 50%, right;
  background-size: 14%, 40%, 14%;

  .no-item {
    display: flex;
    flex-direction: column;
    height: 100% !important;

    img {
      height: 60px;
      margin: 48px auto 5px;
    }

    > div {
      margin: 0 auto;
      color: #4d5772;
      font-size: 14px;
    }
  }

  /deep/ .swiper-slide-duplicate {
    text-align: center;
  }

  .profit-item {
    text-align: center;

    .combination {
      > span {
        font-weight: bold;
      }
    }

    .account {
      display: flex;
      justify-content: center;

      .accoutn-user {
        width: 60px;
        text-align: right;
      }

      .account-amount {
        width: 60px;
        margin-left: 20px;
        color: #7a5605;
        font-weight: bold;
        text-align: left;
      }
    }

    .star {
      display: inline-block;
    }
  }
}

.title {
  @apply flex items-center font-bold text-sm;

  margin: 12px 0;

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
}
</style>
