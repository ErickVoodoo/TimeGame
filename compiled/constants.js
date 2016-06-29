'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  PORT: process.env.port || 3000,
  EMIT: {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    REGISTER_USER: 'registerUser',
    CLIENT_LOGIN: 'clientLogin',
    CLIENT_REGISTRATION: 'clientRegistration',
    CLIENT_LOGOUT: 'clientLogout',
    SERVER_LOGIN: 'serverLogin',
    SERVER_REGISTRATION: 'serverRegistration',
    SERVER_LOGOUT: 'serverLogout'
  }
};