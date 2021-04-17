// ==UserScript==
// @name         AIOZ reloader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://aioz.tube/*
// @icon         https://www.google.com/s2/favicons?domain=aioz.tube
// @grant        none
// ==/UserScript==

/* global $ */

(function() {
    'use strict';

    setTimeout(() => {
        document.getElementsByClassName('video-box-img-wrapper')[Math.ceil(Math.random() * 10)].click();
    }, 5000);

    setTimeout(() => {window.location.href = 'https://aioz.tube/'}, 1000 * 60 * 10);
})();
