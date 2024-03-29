
const URLS = [
    'cloud.google.com',
    'console.cloud.google.com',
]

var authuser;

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.options?.newValue) {
        authuser = changes.options.newValue.authuser;
        console.log('authuser: ', authuser);
        // const debugMode = Boolean(changes.options.newValue.debug);
        // console.log('enable debug mode?', debugMode);
        // setDebugMode(debugMode);
    }
});


chrome.webNavigation.onBeforeNavigate.addListener(
    function (details) {
        var url = new URL(details.url);
        if (URLS.includes(url.hostname) && !url.search.includes('authuser=')) {
            url.searchParams.append('authuser', authuser);
            chrome.tabs.update(details.tabId, { url: url.href });
        }
    },
    { url: [{ hostSuffix: 'cloud.google.com' }] }
);
