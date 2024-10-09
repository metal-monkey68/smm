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
    document.getElementsByName("dbc-consolidation-table-checkbox")[0].click();
    //let checkboxArray = document.getElementsByName("ui-order-table-cell-row-checkbox")
    for(let i = 0; i < document.getElementsByName("order-code-input").length; i++){
        clickInput(i)
    }

function clickInput(index){
    let orderCodeInput = document.getElementsByName("order-code-input");

    orderCodeInput[index].focus();
    orderCodeInput[index].value = randomStr();
    orderCodeInput[index].dispatchEvent(new Event('input', { bubbles: true }));
    
    }

function randomStr(){
    let orderRandomStr = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
        for (let y = 0; y < 9; y++) {
            orderRandomStr += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
    return orderRandomStr
    }

}


