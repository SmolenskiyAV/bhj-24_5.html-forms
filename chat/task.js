// ### Task 5.1 ###

const chatWidget = document.body.querySelector('.chat-widget'); // элемент "закрытая вкладка чата"
const chatWidgetInput = document.getElementById('chat-widget__input');  // элемент "поле <input>"
const chatWidgetMessages = document.getElementById('chat-widget__messages'); // элемент "контейнер сообщений"
const messagesContainer = document.body.querySelector('.chat-widget__messages-container'); // элемент окна чата, в котором появляется прокрутка при переполнении

let lastTransmitMessageTime; // переменная для хранения последнего времени активности в чате

function getBotPhrase() { //функция генерации фраз робота
    const phrasesArray = [ // массив готовых фраз робота
        'Фраза1',
        'Фраза2',
        'Фраза3',
        'Фраза4',
        'Фраза5'
    ];
    let index = Math.floor(Math.random() * phrasesArray.length); // случайная выборка фразы из массива

    return phrasesArray[index]; // возвращение(вывод) выбранной фразы
};

function messageAdd(chatValue) {    // функция ДОБАВЛЕНИЯ СООБЩЕНИЯ в чат
    chatWidgetMessages.insertAdjacentHTML('beforeend', `
        <div class="message">
            <div class="message__time"></div>
            <div class="message__text"></div>
        </div>`); // добавление нового DOM-элемента, являющегося сообщением чата
        
        let messageText = chatWidgetMessages.querySelectorAll('.message__text'); // поиск коллекции текстовых элементов чата, включая только что добавленный
        messageText[messageText.length - 1].innerHTML = chatValue;  // заполнение нового текстового элемента чата данными 

        let messageTime = chatWidgetMessages.querySelectorAll('.message__time');    // поиск коллекции элементов актуальной даты чата, включая только что добавленный
        messageTime[messageTime.length - 1].innerHTML = new Date().toLocaleString(); // заполнение нового элемента актуальной датой события в нужном формате 
        lastTransmitMessageTime = Date.now();   //фиксация времени последнего сообщения
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;  //автопрокрутка скрол-бара окна чата вниз до последнего сообщения
        
        setTimeout(activityCheck, 30000);
        
};


function activityCheck() { // функция проверки активности

    if ((chatWidget.classList.contains('chat-widget_active')) && 
        ((Date.now() - lastTransmitMessageTime) >= 30000)) {    // если окно чата открыто и в нём нет активности более 30 сек
        
           messageAdd("Чем могу Вам помочь?"); // запускаем автовопрос
    };
};



chatWidget.addEventListener('click', () => {  // обработка события клика на элемент "закрытая вкладка чата"
    chatWidget.classList.add('chat-widget_active');

    if(chatWidgetMessages.querySelectorAll('.message').length === 0) { // запуск в чат первоначального приветствия робота (при открытии окна чата)
        messageAdd("Добрый день!");
    };
});  

chatWidgetInput.onchange = () => {  //  обработка ввода сообщений в поле <input> 

    messageAdd(chatWidgetInput.value); // заполнение элемента нового сообщение данными, вводимыми через поле <input>

    chatWidget.querySelectorAll('.message')[
        chatWidget.querySelectorAll('.message').length - 1]
        .classList.add('message_client'); // преобразование нового введённого сообщения к виду "сообщение клиента"
    
    chatWidgetInput.value = ""; // очистка поля <input> после ввода очередного сообщения

    messageAdd(getBotPhrase()); // автоответ робота
};

