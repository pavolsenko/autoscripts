// ==UserScript==
// @name         StormGain miner click
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.stormgain.com/crypto-miner/
// @icon         https://www.google.com/s2/favicons?domain=stormgain.com
// @grant        none
// ==/UserScript==

/* global $ */

(function() {
    'use strict';

    setInterval(() => {
        const buttons = $('button');

        if (buttons.length === 3) {
            $('button').get(1).click();
            console.log('clicking');
        } else {
            console.log('waiting...');
        }

    }, 1000 * 60);

    setInterval(() => {
        const rand = Math.random();

        if (rand < 0.5) {
            document.body.scrollTop;
        } else {
            document.body.click();
        }
    }, 3000);
    
    setTimeout(() => window.location.reload(), 1000 * 60 * 15);
})();
