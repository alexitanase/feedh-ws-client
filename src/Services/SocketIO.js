const io = require("socket.io-client");
const config = require("../config");

module.exports = class SocketIO {

  connection = null;
  timerUpdateEvents = null;
  eventsList = [];

  constructor() {

    this.connection = io(config.websocket_server, config.socket_options);

    // Native socket events
    this.connection.on("connect", this.onConnected.bind(this));
    this.connection.on('disconnect', this.onDisconnect.bind(this));
    this.connection.on('reconnect_attempt', this.onReconnectAttempt.bind(this));
    this.connection.on('reconnect_error', this.onReconnectError.bind(this));
    this.connection.on('reconnect_failed', this.onReconnectFailed.bind(this));

    // Custom socket events
    this.connection.on('verified', this.onVerifiedReceived.bind(this));
    this.connection.on('constructor', this.onConstructorReceived.bind(this));
    this.connection.on('events_list', this.onEventsListReceived.bind(this));
    this.connection.on('event_details', this.onEventDetailsReceived.bind(this))
    this.connection.on('update_event', this.onUpdateEventReceived.bind(this));
    this.connection.on('error_msg', this.onErrorMsgReceived.bind(this));

  }

  onConnected(){
    console.debug("Connection starting.");
    this.connection.emit("verify_client", { Partner: config.partner_code });

  }

  onDisconnect(){

  }

  onReconnectAttempt(attempt){

  }

  onReconnectError(error){

  }

  onReconnectFailed(error){

  }

  onVerifiedReceived(data){
    if(typeof data.message !== "undefined"){
      if(data.message === "ok"){
        this.updateEventsList();
        clearInterval(this.timerUpdateEvents);
        // Update live events list every 15s
        this.timerUpdateEvents = setInterval(this.updateEventsList.bind(this), 15000);
      }
    }
  }

  onConstructorReceived(data){
    console.debug(data);

  }

  onEventsListReceived(data){
    if(typeof data.message !== "undefined" && data.message.length > 0){
      this.eventsList = [];
      for(let event of data.message){
        this.eventsList.push(event.id);
      }
      console.debug("Starting service with event list received.", this.eventsList);
      this.connection.emit("client_ready", {EventId: this.eventsList.join(',')});
    }
  }

  onEventDetailsReceived(data){
    console.debug(data);

  }

  onUpdateEventReceived(data){
    console.debug(data);

  }

  onErrorMsgReceived(data){
    console.debug(data);

  }

  updateEventsList(){
    this.connection.emit("get_events_list", {});
  }

}