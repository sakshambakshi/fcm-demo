const firebaseConfig = {
    apiKey: 'api-key',
    authDomain: 'project-id.firebaseapp.com',
    databaseURL: 'https://project-id.firebaseio.com',
    projectId: 'project-id',
    storageBucket: 'project-id.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'app-id',
    measurementId: 'G-measurement-id',
};

firebase.initializeApp(firebaseConfig);
const messanger = firebase.messaging();
const subscribeButton = document.getElementById('subscibeUserBtn');
const tokenIdElem = document.getElementById('tokenIdElem');

const sendNotificationFormElem = document.getElementById(
    'sendNotificationFormElem'
);
async function subscribeUser() {
    // on user auth run this
    // as soon as we get the token
    // /saveFCMToken {token:[""], userId:""}

    // token generate logic
    console.log('working');
    const permission = await Notification.requestPermission();
    if (permission == 'granted') {
        debugger;
        const token = (tokenIdElem.innerText = await messanger.getToken({
            vapidKey: 'Bqjja',
        }));
        debugger;
    }
}
messanger.onMessage((res) => {
    console.log(res);
    //increment the notification
    // sound alert
});

if (sendNotificationFormElem) {
    // Server
    sendNotificationFormElem.addEventListener('submit', async function (evt) {
        evt.preventDefault();

        const sendNotificationFormData = new FormData(evt.target);
        let token = sendNotificationFormData.get('tokenElem');
        let title = sendNotificationFormData.get('titleElem');
        let description = sendNotificationFormData.get('descElem');
        const payload = {
            to: token, //client tokkeId
            notification: {
                title,
                body: description,
            },
        };
        const resp = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: new Headers({
                Authorization: 'key=',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(payload),
        });
        const responseObject = await resp.json();
        debugger;
    });
}
if (subscribeButton) {
    subscribeButton.addEventListener('click', subscribeUser);
}
