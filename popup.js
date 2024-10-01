/**
ОБЯЗАТЕЛЬНО ДОПИСАТЬ!!!
const form = document.getElementById("form");
form.addEventListener('submit', function(event) {
    var order = form.elements.order.value;
    // Получить активную вкладку браузера
    chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        // и если она есть, то выполнить на ней скрипт
        if (order.length > 0) {
            //alert(order)
            execScript(tab);
        } else {
            alert("ВВЕДИТЕ НОМЕР ЗАКАЗА")
        }
    })

});
*/


const grabBtn = document.getElementById("grabBtn");
grabBtn.addEventListener("click",() => {
    // Получить активную вкладку браузера
    chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        // и если она есть, то выполнить на ней скрипт
        if (tab) {
            execScript(tab);
        } else {
            alert("There are no active tabs")
        }
    })
})

function execScript(tab) {
    // Выполнить функцию на странице указанной вкладки
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:grabInput
        })
}
function grabInput(order){
    let orderCodeInput = document.getElementsByName("order-code-input");
    for(let i = 0; i < orderCodeInput.length; i++){
        let orderRandomStr = '';
        let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let y = 0; y < 9; y++) {
            orderRandomStr += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        orderCodeInput[i].focus()
        orderCodeInput[i].value = orderRandomStr;
        orderCodeInput[i].blur();
    }
}


