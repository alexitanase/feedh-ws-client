module.exports = {
  websocket_server: "https://websocket.feedh.net",
  service_endpoint: "https://api-v2.feedh.net/i/_PARTNER_/tracker",
  partner_code: "",
  socket_options: {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 5000,
  }
}