
const tree = navObj.querySelectorAll('li')
var lengthOfTree = tree.length

while (lengthOfTree > state.pageLength) {
    tree.removeChild(tree.firstElementChild)
    lengthOfTree = tree.length
}


console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  console.log('Push message received', event);
});
