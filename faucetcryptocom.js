// ==UserScript==
// @name         FaucetCrypto
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Pavol Senko
// @match        https://faucetcrypto.com/*
// @icon         https://www.google.com/s2/favicons?domain=faucetcrypto.com
// @grant        none
// ==/UserScript==

/* global $ */

const init = () => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://code.jquery.com/jquery-3.6.0.min.js";

    document.head.appendChild(script);

    setTimeout(() => {
        localStorage.setItem('isInitialized', 1);
        resolve();
    }, 2000);
});

const finishAction = () => new Promise((resolve, reject) => {
    localStorage.setItem('isActionInProgress', 0);
    resolve();
});

const faucetClaim = () => {
    localStorage.setItem('isActionInProgress', 1);

    setTimeout(() => {
        localStorage.setItem('isActionInProgress', 0);
        $('button:contains("Get Reward")').click();
    }, 14000);
};

const ptcAds = () => {
    // localStorage.setItem('isActionInProgress', 1);

    console.log('available ads');
}

const performAction = () => {
    if (!localStorage.getItem('isInitialized')) {
        return;
    }

    if (localStorage.getItem('isActionInProgress')) {
        return;
    }

    if (window.location.href === 'https://faucetcrypto.com/task/faucet-claim') {
        faucetClaim();
        return;
    }


     if (window.location.href === 'https://faucetcrypto.com/ptc/list') {
        ptcAds();
        return;
    }

    if ($('button:contains("Ready To Claim!")').length > 0) {
        window.location.href = 'https://faucetcrypto.com/task/faucet-claim';
        return;
    }

    const availableAds = parseInt($('a[href$="/ptc/list"]').first().children().last().text(), 10);
    if (availableAds) {
        window.location.href = 'https://faucetcrypto.com/task/faucet-claim';
        return;
    }
};

(function() {
    localStorage.setItem('isInitialized', 0);
    localStorage.setItem('isActionInProgess', 0);
    init().then(() => setInterval(performAction, 5000));
})();
