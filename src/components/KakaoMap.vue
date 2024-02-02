<template>
  <div>
    <div id="map"></div>
    <div id="clickLatlng"></div>
  </div>
</template>

<style scoped>
#map {
  width: 95%;
  height: 900px;
}
</style>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      marker: null,
      geocoder: null,
      clickedAddress: "",
      clickedLatLng: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=77148fbd19e2462f24ed8f69c31833c8&autoload=false&libraries=services";
      script.onload = () => window.kakao.maps.load(this.loadMap);
      document.head.appendChild(script);
    },
    loadMap() {//사용자의 위치정보를 받아와서 맵에서 나오게하는 방식(사용자가 HTML5와 HTTPS사용시에만 가능(?)아마도. 오차좀 있음.
      const container = document.getElementById("map");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const options = {
              center: new window.kakao.maps.LatLng(lat, lon),
              level: 3,
            };
            this.map = new window.kakao.maps.Map(container, options);

            window.kakao.maps.event.addListener(this.map, 'click', this.handleMapClick);

            this.loadMarker(lat, lon);
          },
          () => {//사용자가 위치정보 동의를 거절했을경우 디폴트로 보여줄거.
            this.loadDefaultMap(container);
          }
        );
      } else {
        this.loadDefaultMap(container);
      }
    },
    handleMapClick(mouseEvent) {

      const latlng = mouseEvent.latLng;
      this.geocoder = new window.kakao.maps.services.Geocoder();
      this.loadMarker(latlng.getLat(), latlng.getLng());
      this.clickedLatLng = { latitude: latlng.getLat(), longitude: latlng.getLng() };
      this.searchAddrFromCoords(latlng);
    },
    loadMarker(lat, lng) {

      if (!this.marker) {
        this.marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
        });
        this.marker.setMap(this.map);
      } else {
        this.marker.setPosition(new window.kakao.maps.LatLng(lat, lng));
      }
    },

    searchAddrFromCoords(coords) {

      const geocoder = new window.kakao.maps.services.Geocoder();
      
      geocoder.coord2Address(coords.getLng(), coords.getLat(), (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          this.clickedAddress = result[0].address.address_name;
          this.$emit('getAddress-Success',this.clickedAddress);
          
        }
      }
      );
    },
    loadDefaultMap(container) {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      this.map = new window.kakao.maps.Map(container, options);

      window.kakao.maps.event.addListener(this.map, 'click', this.handleMapClick);

      this.loadMarker(33.450701, 126.570667);
    }
  },
}; </script>
