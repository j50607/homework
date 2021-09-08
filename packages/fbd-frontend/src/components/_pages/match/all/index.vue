<template>
  <div class="all-match mt-5">
    <div class="league-list m-2 p-3  rounded flex justify-between content-center">
      <div class="content-left">
        <div class="match-title mb-2 text-primary">
          俄羅斯乙級聯賽
        </div>
        <div class="game-compet text-xs text-normal">
          <div class="team1 flex mb-1">
            <img
              src="https://placeimg.com/15/15"
              alt=""
              class="mr-1"
            >
            FC奧倫堡
          </div>
          <div class="vs text-center mb-1">
            vs
          </div>
          <div class="team2 flex">
            <img
              src="https://placeimg.com/15/15"
              alt=""
              class="mr-1"
            >
            圖伊瑪濟斯巴達
          </div>
        </div>
      </div>

      <div class="content-right text-xs flex flex-col text-right text-normal">
        <div class="game-time mb-1">
          2021-08-31 18:30(CST)
        </div>
        <div class="bet-time">
          下單截止 06:05:31
        </div>
        <div class="to-bet mt-auto ml-auto cursor-pointer">
          <img
            :src="$requireSafe('icon/icon-market-right.svg')"
            alt=""
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.league-list {
  border: 0.3px solid #fffbf2;
  background-image: url('~@/assets/img/profile/match/league-bg.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  box-shadow: 0 2px 4px #4d57721a;
}

.to-bet {
  width: 12px;
}

</style>
