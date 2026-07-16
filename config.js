/*====================================
  YHub AI v2.0 Stable
  config.js
  Author: Krishan Kumar Yogi
====================================*/


/*=========================
  APP INFO
=========================*/

const APP_NAME = "YHub AI";

const APP_VERSION = "2.0 Stable";

const APP_AUTHOR = "Krishan Kumar Yogi";

const APP_DESCRIPTION = "Think Less. Ask YHub.";


/*=========================
  GROQ AI
=========================*/

// 👇 अपनी Groq API Key यहाँ डालो
const GROQ_API_KEY="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"
// Groq API Endpoint
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// AI Model
const AI_MODEL = "llama-3.1-8b-instant";

const TEMPERATURE = 0.7;

const MAX_TOKENS = 4096;


/*=========================
  STORAGE
=========================*/
;
const STORAGE_KEY = "yhub_chat";


/*=========================
  FIREBASE
=========================*/

const FIREBASE = {

    ENABLED: false,

    apiKey: "",

    authDomain: "",

    projectId: "",

    storageBucket: "",

    messagingSenderId: "",

    appId: ""

};


/*=========================
  FEATURES
=========================*/

const FEATURES = {

    voice: true,

    firebase: true,

    history: true,

    theme: true,

    upload: true,

    copy: true,

    pwa: true

};


/*=========================
  APP CONFIG
=========================*/

const YHUB_CONFIG = {

    APP_NAME,

    APP_VERSION,

    APP_AUTHOR,

    APP_DESCRIPTION,

    GROQ_API_KEY,

    GROQ_API_URL,

    AI_MODEL,

    TEMPERATURE,

    MAX_TOKENS,

    STORAGE_KEY,

    FIREBASE,

    FEATURES

};

window.YHUB_CONFIG = YHUB_CONFIG;


/*=========================
  CONFIG LOADED
=========================*/

console.log(
    APP_NAME,
    APP_VERSION,
    "Config Loaded Successfully"
);
