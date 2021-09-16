<template>
  <div
    class="avatar is-btn"
    @click="changeAvatar"
  >
    <img
      class="avatar-img"
      :src="$requireSafe(`avatar/${avatarInfo && avatarInfo.system ? avatarInfo.system : 0 }.png`)"
    >
    <div class="vip">
      <img
        class="level-img"
        :src="$requireSafe(`profile/v${vipLevel}.svg`)"
      >
    </div>
  </div>
  <d-popup
    v-model:value="showPopup"
    :round="true"
    position="bottom"
    :title="$t('views_profile_selectAvatar')"
  >
    <div class="avatar-container">
      <div
        class="photo is-btn"
        v-for="(item, index) in 24"
        :key="`photo${index}`"
        @click="updateAvatar(index)"
      >
        <img
          class="photo-img"
          :src="$requireSafe(`avatar/${index}.png`)"
        >
        <img
          v-if="selectedImg === index"
          class="tick"
          :src="$requireSafe(`avatar/tick.svg`)"
        >
      </div>
    </div>
  </d-popup>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import MemberApi from '@/assets/js/api/memberApi';

export default {
  emits: ['click'],
  props: {
    avatarInfo: {
      type: Object,
      default: () => {},
    },
    vipLevel: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    // use
    const store = useStore();
    // ref
    const showPopup = ref(false);
    const selectedImg = ref(0);

    // computed
    const account = computed(() => store.state.user.account);

    // watch
    watch(showPopup, (val) => {
      if (val) selectedImg.value = props?.avatarInfo?.system ? props?.avatarInfo?.system : 0;
    });

    // methods
    const changeAvatar = () => {
      showPopup.value = true;
    };

    const getUserPartialInfo = async () => {
      const params = {
        requestInfo: [
          'avatar',
        ],
      };
      const { code, data } = await MemberApi.getUserPartialInfo(params);

      if (code === 200) {
        store.commit('SET_USER_INFO', {
          avatar: data.avatar,
        });
      }
    };

    /**
     * 更新使用者头像
     */
    const updateAvatar = async (num) => {
      const { code } = await MemberApi.updateAvatar({ account: account.value, system: num });
      if (code === 200) {
        getUserPartialInfo();
        selectedImg.value = num;
        showPopup.value = false;
      }
    };

    return {
      showPopup,
      selectedImg,
      changeAvatar,
      updateAvatar,
    };
  },
};
</script>

<style lang="postcss" scoped>
.avatar {
  @apply flex items-center justify-center relative mr-2;

  &-img {
    width: 55px;
    height: 55px;
    transform: translateZ(0);
  }
}

.vip {
  bottom: -3px;
  width: 42px;
  height: 14px;
  border-radius: 6px;

  @apply absolute;

  .level-img {
    width: 42px;
    height: 14px;
    transform: translateZ(0);

    @apply h-full;
  }
}

.avatar-container {
  max-height: 200px;

  @apply flex flex-wrap items-center overflow-auto mb-2;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #00000010;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d6d6d6;
  }

  .photo {
    flex: 0 0 20%;

    @apply p-2 relative flex justify-center;

    &-img {
      @apply w-10 h-10 m-auto;
    }

    .tick {
      bottom: 0;
      width: 16px;
      height: 16px;

      @apply absolute z-10;
    }
  }
}
</style>
