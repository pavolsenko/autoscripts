// ==UserScript==
// @name         Satoshi Hero
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://satoshihero.com/en/game
// @icon         https://www.google.com/s2/favicons?domain=satoshihero.com
// @grant        none
// ==/UserScript==

/* global $ */

const spinPromise = () => new Promise((resolve, reject) => {
    if ($('.wheel-count').length > 0) {
        console.log('wheel count running. waiting...');
        resolve();
        return;
    }

    $('.vs-dialog-content .wheel button').click();
    console.log('clicking spin button');
    resolve();
});

const clickPromise = () => new Promise((resolve, reject) => {
    if ($('.wheel-count').length > 0) {
        console.log('wheel count running. waiting...');
        resolve();
        return;
    }

    $('.section-win button').click();
    console.log('clicking collect button');
    resolve();
});

const waitPromise = (ms) => new Promise((resolve, reject) => {
    console.log('waiting ' + ms);
    setTimeout(() => resolve(), ms);
});

const run = () => {
    waitPromise(2000)
        .then(spinPromise)
        .then(() => waitPromise(11000))
        .then(clickPromise)
        .then(() => waitPromise(2000))
        .then(spinPromise)
        .then(() => waitPromise(11000))
        .then(clickPromise)
        .then(() => waitPromise(2000))
        .then(spinPromise)
        .then(() => waitPromise(11000))
        .then(clickPromise)
        .then(() => waitPromise(2000));
};

(function() {
    'use strict';

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    document.head.appendChild(script);

    setTimeout(() => {
        console.log('clicking open wheel button');
        $('.wheel_btns button').click();
    }, 5000);

    console.log('starting...');
    run();
    setInterval(run, 1000 * 60 * 31);
})();
