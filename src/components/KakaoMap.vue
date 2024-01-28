// src/component/KakaoMap.vue
<template>
  <div>
    <div id="map"></div>
  </div>
</template>
<style scoped></style>
<script>
export default {
  name: "KakaoMap", // 컴포넌트 이름 지정
  data() {
    return{
      map: null,
    };
  },
  setup () {},
  created () {},
  mounted () {
    //ap1 스크립트 소스 불러오기 및 지도 출력
    if (window.kakao && window.kakao.maps) {
      this. loadMap();
    } else {
      this.loadScript();
    }
  },
  unmounted () {},
  methods: {
    //api 불러오기
    loadScript() {
      const script = document.createElement("script");
      script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?appkey=77148fbd19e2462f24ed8f69c31833c8&autoload=false";
      script.onload = () => window.kakao.maps.load(this.loadMap);
      document.head.appendChild(script);
    },
//맵 출력하기
    loadMap () {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), level: 3
      };
      this.map = new window.kakao.maps.Map(container, options);
      /*this. loadMaker();*/
    },
//지정한 위치에 마커 불러오기
/*    loadMaker() {
      const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667
      );
      const marker = new window. kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap (this.map);
    },*/
  },
};
</script>

<style scoped>
#map{
  width: 95%;
  height: 900px;
}
</style>