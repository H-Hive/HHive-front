class CommonService {

  extractJSONFromProxy(proxyObject) {

    return JSON.parse(JSON.stringify(proxyObject));
  }
}

export default new CommonService();