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
      lat: null,
      lon:null,
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
      this.geocoder = new window.kakao.maps.services.Geocoder();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;

            const options = {
              center: new window.kakao.maps.LatLng(this.lat, this.lon),
              level: 3,
            };

            this.map = new window.kakao.maps.Map(container, options);
            window.kakao.maps.event.addListener(this.map, 'click', this.handleMapClick);
            this.geocoder.addressSearch('경기 용인시 수지구 동천동 107-27', (result, status) => {
              // 정상적으로 검색이 완료됐으면
              if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                this.loadMarker(coords, '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>');
              }
            });
            
            this.loadCLickMarker(this.lat, this.lon);
          },

          () => {//사용자가 위치정보 동의를 거절했을경우 디폴트로 보여줄거.
            this.loadDefaultMap(container);
            this.loadCLickMarker(this.lat, this.lon);
          }
        );
      } else {
        this.loadDefaultMap(container);
        this.loadCLickMarker(this.lat, this.lon);
      }

    },
    handleMapClick(mouseEvent) {

      const latlng = mouseEvent.latLng;
      this.loadCLickMarker(latlng.getLat(), latlng.getLng());
      this.clickedLatLng = { latitude: latlng.getLat(), longitude: latlng.getLng() };
      this.searchAddrFromCoords(latlng);
    },
    loadCLickMarker(lat, lng) {

      if (!this.marker) {
        this.marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
        });
        this.marker.setMap(this.map);
      } else {
        this.marker.setPosition(new window.kakao.maps.LatLng(lat, lng));
      }
    },
    loadMarker(coords, content) {
      // 결과값으로 받은 위치를 마커로 표시합니다
      const marker = new window.kakao.maps.Marker({
        map: this.map,
        position: coords,
      });

      // 인포윈도우로 장소에 대한 설명을 표시합니다
      const infowindow = new window.kakao.maps.InfoWindow({
        content: content,
      });
      infowindow.open(this.map, marker);
    },

    searchAddrFromCoords(coords) {

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(coords.getLng(), coords.getLat(), (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          this.clickedAddress = result[0].address.address_name;
          this.$emit('getAddress-Success', this.clickedAddress);

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
    }
  },
}; </script>
