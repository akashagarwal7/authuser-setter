// In-page cache of the user's options
const options = {};
const optionsForm = document.getElementById("optionsForm");

// Immediately persist options changes
function handleAuthuserChange(event) {
    options.authuser = event.target.value;
    chrome.storage.sync.set({ options });
}

optionsForm.authuser.addEventListener("change", handleAuthuserChange);
optionsForm.authuser.addEventListener("input", handleAuthuserChange);
optionsForm.authuser.addEventListener("focus", handleAuthuserChange);


// Initialize the form with the user's option settings
const data = await chrome.storage.sync.get("options");
Object.assign(options, data.options);
if (options && options.authuser) optionsForm.authuser.value = options.authuser;
