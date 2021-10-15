<template>
  <div class="record">
    <ul v-if="state.currentRecordList?.length">
      <li
        v-for="(item, idx) in state.currentRecordList"
        :key="`recordListData[${idx}]`"
        class="record-item"
      >
        <div>
          <div>
            <div>{{ $t('components_pages_profile_team_user') }}</div>
            <div>{{ item.users.account }}</div>
          </div>
          <div>
            <div>{{ $t('components_pages_profile_team_status') }}</div>
            <div
              :class="renderStatus(item.type.id,item.status.id).style"
            >
              {{ renderStatus(item.type.id, item.status.id).status }}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>{{ $t('components_pages_profile_team_time') }}</div>
            <div>{{ formatDate(item.logAt) }}</div>
          </div>
          <div>
            <div>{{ $t('components_pages_profile_team_amount') }}</div>
            <div>{{ formatAmount(item.amount) }}</div>
          </div>
        </div>
      </li>
    </ul>
    <div
      v-else
      class="empty"
    >
      <img
        class="empty-icon"
        :src="$requireSafe(`icon/no-data.svg`)"
      >
      <div class="empty-text">
        {{ $t('components_pages_profile_team_emptyMessage') }}
      </div>
    </div>
  </div>
</template>

<script>
import { watch, reactive } from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    recordList: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
    const { t } = useI18n();

    const state = reactive({
      initRecordList: props.recordList,
      currentRecordList: props.recordList,

    });

    watch(() => props.recordList, () => {
      state.initRecordList = props.recordList;
      state.currentRecordList = props.recordList;
    });

    const renderStatus = (type, id) => {
      if (type === 1) {
        switch (id) {
          case 0:
          case 6:
          case 7:
            return { status: t('components_pages_profile_team_withdrawAuditing'), style: '' };
          case 1:
            return { status: t('components_pages_profile_team_withdrawSuccess'), style: 'success' };
          case 2:
            return { status: t('components_pages_profile_team_withdrawCancel'), style: 'cancel' };
          case 3:
            return { status: t('components_pages_profile_team_withdrawFail'), style: 'fail' };
          default:
            return '';
        }
      } else {
        switch (id) {
          case 0:
            return { status: t('components_pages_profile_team_depositAuditing'), style: '' };
          case 1:
            return { status: t('components_pages_profile_team_depositSuccess'), style: 'success' };
          case 3:
            return { status: t('components_pages_profile_team_depositFail'), style: 'fail' };
          default:
            return '';
        }
      }
    };

    const formatAmount = (amount) => {
      const rule = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
      return Math.abs(amount).toString().replace(rule, ',');
    };

    const formatDate = (time) => dayjs(time).format('YYYY-MM-DD HH:mm');

    return {
      state,
      renderStatus,
      formatAmount,
      formatDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.record {
  &-item {
    display: flex;
    justify-content: space-between;
    margin: 15px;
    padding: 15px;
    border-radius: 5px;
    font-size: 12px;
    background-color: #fff;
    box-shadow: 0 2px 4px #4d57721a;

    > div {
      display: flex;
      flex-direction: column;
      width: 270px;

      >div:last-child {
        margin-top: 10px;

        .success {
          color: #38c522;
        }

        .fail {
          color: #f00;
        }

        .cancel {
          color: #bdbdbd;
        }
      }
    }
  }

  .empty {
    margin-top: 60px;

    &-icon {
      width: 60px;
      margin: 10px auto;
    }

    &-text {
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
