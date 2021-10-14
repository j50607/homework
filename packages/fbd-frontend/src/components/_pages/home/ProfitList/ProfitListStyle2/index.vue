<template>
  <div class="title">
    <div>{{ $t('components_pages_home_profitList_title') }}</div>
  </div>

  <swiper
    class="profit-list swiper-no-swiping"
    :autoplay="{delay:2000, disableOnInteraction: false}"
    :slides-per-view="2.5"
    :direction="'vertical'"
    :catchtouchmove="true"
  >
    <swiper-slide
      class="profit-item"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="combination">
        <span>{{ item.homeTeamName }}</span> V.S. <span>{{ item.awayTeamName }}</span>
      </div>
      <div class="account">
        <span class="accoutn-user">{{ item.account }}</span>
        <span class="account-amount">{{ item.amount }}</span>
      </div>
    </swiper-slide>

    <!-- 獲利榜無資料 -->
    <swiper-slide
      v-show="list.length <= 0"
      class="no-item"
    >
      <img :src="require('@/assets/img/home/noitem-profit-list-blue.svg')">
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
          state.list.push({
            homeTeamName: sport[Math.floor(Math.random() * 5)].homeTeamName,
            awayTeamName: sport[Math.floor(Math.random() * 5)].awayTeamName,
            account: `${generateAccount(3)}***${generateAccount(3)}`,
            amount: ((100 + 1800 * Math.random()).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','),
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
  border-radius: 5px;
  font-size: 12px;
  background-color: #142340;

  .no-item {
    display: flex;
    flex-direction: column;
    height: 100% !important;

    img {
      height: 70px;
      margin: 38px auto 5px;
    }

    > div {
      margin: 0 auto;
      color: #fff;
      font-size: 14px;
    }
  }

  .profit-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
    border-bottom: 1px dashed #4d5772;
    text-align: left;

    .combination {
      color: #fff;
    }

    .account {
      .accoutn-user {
        display: inline-block;
        width: 60px;
        color: #fff4d9;
        text-align: left;
      }

      .account-amount {
        display: inline-block;
        margin-left: 85px;
        color: #4aee91;
        text-align: left;
      }
    }
  }
}

.title {
  @apply flex items-center font-bold text-sm;

  margin: 12px 0;
}
</style>
