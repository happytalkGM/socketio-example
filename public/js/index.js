const socket = io(
    {transports: ['websocket'],}
);

const form = document.getElementById('form-send');
const input = document.getElementById('input-message');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
        socket.emit('chat-message', input.value);
        input.value = '';
    }
});

socket.on('connect', (socket) => {
    const item = document.createElement('li');
    item.innerText = '[SYSTEM] connected';
    messages.appendChild(item);
});

socket.on('disconnect', (socket) => {
    const item = document.createElement('li');
    item.innerText = '[SYSTEM] disconnected';
    messages.appendChild(item);
});

socket.on('chat-message', (socketMessage) => {
    const item = document.createElement('li');
    const author = (socketMessage?.author ?? '').replace('<', '&lt;');
    const message = (socketMessage?.message ?? '').replace('>', '&gt;');

    item.innerHTML = `
        <span class="author">${author}</span>
        <p class="message">${message}</p>
    `;

    messages.appendChild(item);
});