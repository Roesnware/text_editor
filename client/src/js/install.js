// install button hook
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // store the event
    window.deferredPrompt = event;

    // show install button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // assign event
    const promptEvent = window.deferredPrompt;

    // check if prompt
    if (!promptEvent) {
        return;
    }

    // show prompt
    promptEvent.prompt();

    // reset deferred prompt
    window.deferredPrompt = null;

    // hide install button
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // clear prompt
    window.deferredPrompt = null;
});