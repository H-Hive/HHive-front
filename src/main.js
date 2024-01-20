import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'

// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify = createVuetify({
//   components,
//   directives,
// })

const app = createApp(App);

app
  .use(router)
  // .use(vuetify)
  // .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

  

// window.GLOBAL_API_URL = "https://hhive.shop";
/*
App
  HomePage
    SignupPage
      SignupForm
    LoginPage
      LoginForm
*/