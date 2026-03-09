export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed. Initializing storage...');
    storage.getItem('local:is_authenticated').then((val) => {
      if (val === null) storage.setItem('local:is_authenticated', false);
    });
  });

  storage.watch<string>('local:token', (newToken) => {
    if (newToken) {
      console.log('Token detected. User is authenticated.');
      storage.setItem('local:is_authenticated', true);
    } else {
      console.log('Token removed. User is logged out.');
      storage.setItem('local:is_authenticated', false);
    }
  });
});
