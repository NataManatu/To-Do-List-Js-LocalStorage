let blockList = document.getElementById("todo-list")

let todoList = []

let storageList = localStorage.getItem("todoList")
storageList = JSON.parse(storageList)

if (storageList != null) {
    todoList = storageList
    // console.log(todoList)
    for (let index = 0; index < todoList.length; index++) {
        const element = todoList[index];

        let nowElText = element["text"]
        let nowElKey = element["key"]


        htmlBlock = `<div id="` + nowElKey + `" class="todo-task" >
                            <h6>` + nowElText + `</h6>
                            <div class="btn-complate"><img src="select.png" width="22px" height="22px"/></div>
                            <div class="btn-del"><img src="trash.png" width="22px" height="22px"/></div>
                        </div>`

        blockList.innerHTML += htmlBlock


    }

    updateEvents()
}


let input_task = document.getElementById("input_task")
let add_task = document.getElementById("add_task")

add_task.addEventListener("click", function () {
    let textInInput = input_task.value
    input_task.value = " "


    let bodyList = {
        text: "",
        statusComplete: false,
        key: ""
    }

    if (textInInput != "") {
        bodyList["text"] = textInInput
        bodyList["key"] = genKey()

        todoList.push(bodyList)

        let jsonList = JSON.stringify(todoList)
        localStorage.setItem('todoList', jsonList);

        htmlBlock = `<div id="` + bodyList["key"] + `" class="todo-task">
                            <h6>` + textInInput + `</h6>
                            <div class="btn-complate"><img src="select.png" width="22px" height="22px"/></div>
                            <div class="btn-del"><img src="trash.png" width="22px" height="22px"/></div>
                        </div>`

        blockList.innerHTML += htmlBlock

        updateEvents()
    }
})

function updateEvents() {
    let delBtnList = document.getElementsByClassName("btn-del")

    for (let index = 0; index < delBtnList.length; index++) {
        const element = delBtnList[index];
        // console.log(element)
        element.addEventListener('click', function () {
            element.parentNode.remove()
            let nowID = element.parentNode.id

            for (let index = 0; index < storageList.length; index++) {
                const element = storageList[index];
                // console.log(element)
                if (nowID == element.key) {
                    // console.log(element)\
                    // delete storageList[index]
                    storageList.splice(index, 1)
                    console.log(storageList)
                    // element.splice(index, 1)
                }
            }
            console.log(storageList)
            let jsonList = JSON.stringify(todoList)
            localStorage.setItem('todoList', jsonList);

        });
    }

    let complateBtnList = document.getElementsByClassName("btn-complate")
    console.log(complateBtnList)

    for (let index = 0; index < complateBtnList.length; index++) {
        const element = complateBtnList[index];
        element.addEventListener('click', function () {
            let nowTaskText = element.parentNode.childNodes[1]
            nowTaskText.classList.toggle("task-complate")
        });
    }

}

function genKey() {
    let listValid = ["A", "B", "C", "D", "E", "F", "G", "H", "K", "L"]
    let resultStr = ""

    let min = 0
    let max = listValid.length - 1

    for (let index = 0; index < 4; index++) {
        let randIdx = Math.random() * (max - min) + min;
        randIdx = Math.round(randIdx)
        resultStr += listValid[randIdx]
    }

    return resultStr

}