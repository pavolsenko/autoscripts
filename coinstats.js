// ==UserScript==
// @name         Coinstats Reloader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://coinstats.app/*
// @icon         https://www.google.com/s2/favicons?domain=coinstats.app
// @grant        none
// ==/UserScript==

/* global $ */

(function() {
    'use strict';

    setTimeout(() => {window.location.href = 'https://coinstats.app/'}, 1000 * 60 * 60 * 24);
})();
