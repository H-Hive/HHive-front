<template>
  <div>
    <footer class="footer">
      <div class="container">
        <div class="content">
          <p style="color: orange; font-size: 30px; font-weight: 700;">H-HIVE 🍯</p>
          <p class="member">
            <span style="font-weight: bold;">GitHub:</span>
            <a href="https://github.com/wkdehdgk159" target="_blank">장동하</a>
            <a href="https://github.com/EUNCHAEv1006" target="_blank">김은채</a>
            <a href="https://github.com/mixedtape" target="_blank">박시원</a>
            <a href="https://github.com/de123456sdf" target="_blank">창다은</a>
            <a href="https://github.com/" target="_blank">김대영</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer {
  height: 120px;
  color: white;
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid #E2E2D4;
}

.container {
  max-width: 1000px;
  margin: auto;
}

.content {
  display: flex;
}

.member {
  margin-top: 14px;
  margin-left: 20px;
}

.member span {
  color: black;
}

.member a {
  color: black;
  padding: 10px;
  margin-left: 10px;
  text-decoration: none;
}

.member a:hover {
  text-decoration: underline;
}
</style>
