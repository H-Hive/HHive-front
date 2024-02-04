<template>
  <div>
    <div id="map"><button id="btn" class="btn btn-warning" @click="userPosition">내 위치 불러오기</button></div>
    <div id="clickLatlng"></div>
  </div>
</template>

<style scoped>
#map {
  width: 95%;
  height: 900px;
}
#btn{
  font-weight: bold;
  position: absolute; 
  bottom:10px; 
  right: 10px; 
  z-index: 1000; 
  width:90px; 
  height: 90px;
}
</style>

<script>  
import hiveService from '@/services/hive.service';
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
      lon: null,
      hiveDatas: null,
      selectedMarker: null,
      customOverlay: null,
    };
  },
  mounted() {
    hiveService
      .getAllHives()
      .then((response) => {
        this.hiveDatas = response.data["payload"];
        if (window.kakao && window.kakao.maps) {
          this.loadMap();
        } else {
          this.loadScript();
        }
      })
      .catch((error) => {
        console.log(error);
      });

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
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      this.map = new window.kakao.maps.Map(container, options);
      window.kakao.maps.event.addListener(this.map, 'click', this.handleMapClick);

      this.hiveDatas.forEach((hiveData) => {
        const address = hiveData.roadAddress;
        if (address !== "주소 미정") {
          console.log(hiveData.roadAddress);
          this.geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              this.loadMarker(coords, hiveData);
            }
          });
        }

      });
    },
    userPosition() {
      this.geocoder = new window.kakao.maps.services.Geocoder();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;

            const coords = new window.kakao.maps.LatLng(this.lat, this.lon);
            console.log(this.lat, this.lon);
            this.map.setCenter(coords);
          },
          () => {//사용자가 위치정보 동의를 거절했을경우 디폴트로 보여줄거.
          }
        );
      } else {
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
          position: new window.kakao.maps.LatLng(lat, lng)
        });
        this.marker.setMap(this.map);
      } else {
        this.marker.setPosition(new window.kakao.maps.LatLng(lat, lng));
      }
    },
    loadMarker(coords, content) {
      const markerOptions = {
        position: coords,
        clickable: true
      };
      console.log(content); content

      const marker = new window.kakao.maps.Marker(markerOptions);
      marker.setMap(this.map);

      var content2 = '<div style="position:relative;bottom:60px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left; box-shadow:0px 1px 2px #888;">' +
        '  <a href="/hive/' + content.id + '" style="display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;">' +
        '    <span style="display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;">' + content.title + '</span>' +
        '  </a>' +
        '</div>';
      window.kakao.maps.event.addListener(marker, 'click', () => {
        if (this.customOverlay) {
          this.customOverlay.setMap(null);
        }
        this.customOverlay = new window.kakao.maps.CustomOverlay({
          position: coords,
          content: content2,
          yAnchor: 1,
          clickable: true
        });
        this.customOverlay.setMap(this.map);
      });

      this.map.setCenter(coords);

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
