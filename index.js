let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const inputBtn = document.getElementById("input-btn")
const deletebtn = document.getElementById("delete-btn")
// localStorage.setItem("myLeads","www.example.com")
// console.log(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
let leadsFromlocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromlocalStorage);

if(leadsFromlocalStorage){
    myLeads=leadsFromlocalStorage
    renderLeads();
}


inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    renderLeads()
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    console.log( localStorage.getItem("myLeads") )
})
deletebtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads=[]
    renderLeads()

})



tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        
        myLeads.push(tabs[0].url)
        renderLeads()
        
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        
    })
    
})
function renderLeads(){
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        // listItems += "<li><a target ='_blank' href= '" +myLeads[i]+ "'>" + myLeads[i] + "</a></li>"
        listItems+=`
        <li>
            <a target ='_blank' href= '${myLeads[i]}'>${myLeads[i]}</a>
        </li>`
    }
    ulEl.innerHTML = listItems
}