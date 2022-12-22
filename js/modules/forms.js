import {openModal, closeModal} from "./modal";
import {postData} from "../services/services";

function forms(formSelector, modalTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector);//document.querySelectorAll('form');

    // Сообщения с обработкой различных сценариев
    const message = {
        loading: 'img/form/spinner-double-ring2.svg', // чтобы использовать изображения из вашего проекта необходимо лишь использлвать пути к этим картинкам и файлам
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // в AJAX-запросах эта команда должна быть первой во избежание различных ошибок

            
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            /* const request = new XMLHttpRequest();
            request.open("POST", "server.php"); - если формировать запросы по старинке, через XMLHttpRequest() */

            
            //request.setRequestHeader('Content-type', 'multipart/form-data'); - когда мы используем связку XMLHttpRequest-объекта + FormData нам не нужно устанавливать заголовок через метод setRequestHeader он устанавливается автоматически, в противном случае будут ошибки при работе с сервером


            /* если нужно отправить в формате JSON:
            request.setRequestHeader('Content-type', 'application/json'); */
             
            const formData = new FormData(form); // нам нужно этот объект превратить в JSON, но formData - это довольно специфический объект, мы не можем прогнать его просто так в другой формат, для этого воспользуемся следующим приемом:

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
           
            

            /*  const object = {};
            formData.forEach(function(value, key){
                object[key] = value; 
            }); */ // формируем объект object на основании данных из formData путем использования перебора forEach()

            // теперь, когда мы получили обычный объект из данных formData, мы можем преобразовать его в JSON:

            //request.send(json); // помещаем JSON в body;

            postData('http://localhost:3000/requests', json)
            //.then(data => data.text())
            .then(data =>{
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() =>{
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });

            /* request.addEventListener('load', () => {
                if(request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    // Очищаем форму после отправки данных (альтернативный вариант - взять все инпуты, перебрать их и очистить их value)
                } else {
                    showThanksModal(message.failure);
                }
                statusMessage.remove();
                form.reset();
            }); */

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

}

export default forms;