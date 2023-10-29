// ==UserScript==
// @name         BTCspinner autoroll
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://btcspinner.io/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

/* global $ */

const WHEEl_IN_PROGRESS = 'aa4fa778cd94c323ac9a0de09f6a4a5b';
const WAIT_REFILL = 'aa938ba8199015c9ac718748fd553b9f';

const waitPromise = () => new Promise((resolve) => {
    setTimeout(() => resolve(), 7000);
});

const wheel = () => {
    if (localStorage.getItem(WHEEl_IN_PROGRESS) === '1') {
        return;
    }

    const spinPromise = () => new Promise((resolve) => {
        localStorage.setItem(WHEEl_IN_PROGRESS, '1');
        $("button:contains('Spin')").first().click();
        resolve();
    });

    const actionPromise = () => new Promise((resolve) => {
        if ($("h2:contains('You won')").length > 0) {
            $('.swal2-confirm').click();
            resolve();
        } else if ($("h2:contains('One chest contains:')").length > 0) {
            const buttonDark = $('.btn-dark');
            buttonDark.get(Math.floor(Math.random() * buttonDark.length)).click();
            setTimeout(() => {
                $('.swal2-confirm').click();
                resolve();
            }, 1000);
        } else if($("h2:contains('Scratch and Win')").length > 0) {
            $("button:contains('Scratch All')").first().click();
            setTimeout(() => {
                resolve();
            }, 2000);
        } else {
            resolve();
        }
    });

    const finishPromise = () => new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem(WHEEl_IN_PROGRESS, '0');
            resolve();
        }, 1000);
    });

    spinPromise().then(waitPromise).then(actionPromise).then(finishPromise);
}

const refill = () => {
    if (localStorage.getItem(WAIT_REFILL) === '1') {
        return;
    }

    localStorage.setItem(WAIT_REFILL, '1');

    setInterval(() => {
        const faucet = $('#faucet');
        if (faucet.length === 0) {
            console.log('no refill button present. waiting...');
            return;
        }

        if (parseInt($('h4').first().text(), 10) > 0) {
            window.location.href = 'https://btcspinner.io/wheel';
            return;
        }

        console.log('refilling...');
        localStorage.setItem(WAIT_REFILL, '0');
        setTimeout(() => faucet.first().click(), 1000);
    }, 1000 * 60);

    const randomReloadTime = 1000 * 60 * Math.ceil(Math.random() * 10);
    console.log('awaiting refill... next random reload in ' + randomReloadTime / 1000 + 's');

    setTimeout(() => {
        localStorage.setItem(WAIT_REFILL, '0');
        setTimeout(() => window.location.reload(), 1000);
    }, randomReloadTime);
}

const start = () => {
    const spinsRemaining = parseInt($('h4').first().text(), 10);

    if (spinsRemaining < 1 && window.location.href !== 'https://btcspinner.io/store') {
        window.location.href = 'https://btcspinner.io/store';
        return;
    }

    if (spinsRemaining > 0 && window.location.href !== 'https://btcspinner.io/wheel') {
        window.location.href = 'https://btcspinner.io/wheel';
        return;
    }

    if (window.location.href === 'https://btcspinner.io/wheel') {
        wheel();
        return;
    }

    if (window.location.href === 'https://btcspinner.io/store') {
        refill();
    }
}

(function() {
    'use strict';

    localStorage.setItem(WHEEl_IN_PROGRESS, '0');
    localStorage.setItem(WAIT_REFILL, '0');

    setInterval(start, 2000);

    const randomReload = 1000 * 60 * (Math.ceil(Math.random() * 20) + 10);
    setTimeout(() => window.location.reload(), randomReload);
    console.log('starting... random reload in ' + Math.floor(randomReload / 1000 / 60) + 'm ' + randomReload % 60 + 's');
})();
