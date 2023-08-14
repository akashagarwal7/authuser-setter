
const URLS = [
    'cloud.google.com',
    'console.cloud.google.com',
]

chrome.webNavigation.onBeforeNavigate.addListener(
    function (details) {
        var url = new URL(details.url);
        if (URLS.includes(url.hostname) && !url.search.includes('authuser=')) {
            url.searchParams.append('authuser', '1');
            chrome.tabs.update(details.tabId, { url: url.href });
        }
    },
    { url: [{ hostSuffix: 'cloud.google.com' }] }
);
