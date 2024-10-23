// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js');

// eslint-disable-next-line no-undef
firebase.initializeApp({
	apiKey: 'AIzaSyCTFmz-J0-bVTfpQw3ddtTeRPTg007JmwY',
	authDomain: 'fina-1140f.firebaseapp.com',
	projectId: 'fina-1140f',
	storageBucket: 'fina-1140f.appspot.com',
	messagingSenderId: '106335021489',
	appId: '1:106335021489:web:449b142ad709728398b590',
	measurementId: 'G-S9BCJBB5TD',
});
const channel = new BroadcastChannel('firebase-message');

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('../firebase-messaging-sw.js')
		.then(function (registration) {
			console.log('Registration successful, scope is:', registration.scope);
		}).catch(function (err) {
			console.log('Service worker registration failed, error:', err);
		});
}
// eslint-disable-next-line no-undef
firebase.messaging().onBackgroundMessage(function (payload) {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	// Customize notification here
	const notificationTitle = payload.notification.title || payload.data.title || 'Background Message Title';
	const body = payload.notification.body || payload.data.subtitle || 'Background Message body.';
	const data = payload.data;
	const notificationOptions = {
		body,
		icon: '/firebase-logo.png',
		data: {
			url: data?.url,
		},
	};
	channel.postMessage(payload.notificationData);
	return self.registration.showNotification(notificationTitle,
		notificationOptions);
});


self.addEventListener('notificationclick', function(event) {
	event.notification.close();
	var url = event.notification.data.url;

	event.waitUntil(
		// eslint-disable-next-line no-undef
		clients.matchAll({
			includeUncontrolled: true,
			type: 'window',
		}).then(function(clientList) {
			for (var i = 0; i < clientList.length; i++) {
				var client = clientList[i];
				if (client.url === url && 'focus' in client) return client.focus();
			}
			// eslint-disable-next-line no-undef
			if (clients.openWindow) {
				// eslint-disable-next-line no-undef
				return clients.openWindow(url);
			}
		}),
	);
});
