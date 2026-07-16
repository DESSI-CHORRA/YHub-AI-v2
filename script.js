/*=========================================
 YHub AI v2
 script.js
 Part 1
=========================================*/


/*=============
 Elements
==============*/
const uploadBtn = document.getElementById("uploadBtn");

const fileInput = document.getElementById("fileInput");

const prompt = document.getElementById("prompt");

const sendBtn = document.getElementById("sendBtn");

const chatArea = document.getElementById("chatArea");

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

const themeBtn = document.getElementById("themeBtn");

const toast = document.getElementById("toast");

const loading = document.getElementById("loading");

const typing = document.getElementById("typing");

const newChat = document.getElementById("newChat");


/*=============
 Config
==============*/

let messages = [];

let sending = false;


/*=============
 Toast
==============*/

function showToast(text){

toast.innerText = text;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2000);

}


/*=============
 Sidebar
==============*/

menuBtn.onclick = ()=>{

sidebar.classList.toggle("active");

};
closeSidebar.onclick = ()=>{

sidebar.classList.remove("active");

};

/*=============
 Theme
==============*/

let dark = true;

themeBtn.onclick = ()=>{

dark = !dark;

document.body.classList.toggle("light");

themeBtn.innerHTML = dark

? '<i class="fa-solid fa-moon"></i>'

: '<i class="fa-solid fa-sun"></i>';

};


/*=============
 New Chat
==============*/

newChat.onclick = ()=>{

if(!confirm("Start New Chat?")) return;

messages = [];

chatArea.innerHTML = `

<div class="welcome">

<i class="fa-solid fa-brain"></i>

<h2>

Welcome to YHub AI

</h2>

<p>

Ask anything...

</p>

</div>

`;

showToast("New Chat Created");

};


/*=============
 Message UI
==============*/

function addMessage(role,text){

const div = document.createElement("div");

div.className =

role==="user"

?

"message user"

:

"message";

div.innerHTML = `

<div class="avatar">

${role==="user"

?

'<i class="fa-solid fa-user"></i>'

:

'<i class="fa-solid fa-brain"></i>'}

</div>

<div class="bubble">

${text}

${role==="user" ? `

<div class="msgMenu">

<button class="menu3Btn" onclick="toggleMenu(this)">

<i class="fa-solid fa-ellipsis-vertical"></i>

</button>

<div class="menuPopup">

<button onclick="editMessage(this)">
<i class="fa-solid fa-pen"></i> Edit
</button>

<button onclick="copyMessage(this)">
<i class="fa-solid fa-copy"></i> Copy
</button>

<button onclick="deleteMessage(this)">
<i class="fa-solid fa-trash"></i> Delete
</button>

</div>

</div>

` : ""}

</div>

`;

chatArea.appendChild(div);

chatArea.scrollTop = chatArea.scrollHeight;

}
async function addTypingMessage(role, text){

const div = document.createElement("div");

div.className = "message " + role;

chatArea.appendChild(div);

let i = 0;
let output = "";

const timer = setInterval(()=>{

output += text[i];

div.innerHTML = renderMarkdown(output);

i++;

chatArea.scrollTop = chatArea.scrollHeight;

if(i >= text.length){

clearInterval(timer);

}

},20);

}

function renderMarkdown(text){

return text

.replace(/```([\s\S]*?)```/g,

function(match, code){

return `
<div class="codeBox">

<button class="copyBtn" onclick="copyCode(this)">
Copy
</button>

<pre><code>${code}</code></pre>

</div>
`;

}

)

.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>")

.replace(/\n/g,"<br>");

}



function copyCode(btn){

const code =
btn.parentElement
.querySelector("code")
.innerText;


navigator.clipboard.writeText(code);


btn.innerText="Copied!";


setTimeout(()=>{

btn.innerText="Copy";

},1500);

}
/*=========================================
 YHub AI v2
 script.js
 Part 2
=========================================*/


/*=============
 Send Message
==============*/

async function sendMessage(){

if(sending) return;

const text = prompt.value.trim();

if(!text){

showToast("Type something...");

return;

}

addMessage("user",text);

messages.push({

role:"user",

content:text

});

prompt.value="";

typing.classList.add("active");

sending=true;

try{

const response = await fetch(

GROQ_API_URL,

{

method:"POST",

headers:{

"Content-Type":"application/json",

"Authorization":`Bearer ${GROQ_API_KEY}`

},

body:JSON.stringify({

model:AI_MODEL,

messages:messages,

temperature:TEMPERATURE,

max_tokens:MAX_TOKENS

})

}

);

if(!response.ok){

throw new Error("API Error");

}

const data = await response.json();

const reply = data.choices[0].message.content;

typing.classList.remove("active");

await addTypingMessage("assistant", reply);

messages.push({

role:"assistant",

content:reply

});

localStorage.setItem(

"yhub_chat",

JSON.stringify(messages)

);

}

catch(error){

console.error(error);

typing.classList.remove("active");

addMessage(
"assistant",
"❌ Error" + String(error)
);
}
/*=========================================
 YHub AI v2
 script.js
 Part 3
=========================================*/

finally{

typing.classList.remove("active");

sending=false;

}

}


/*=============
 Send Button
==============*/

sendBtn.addEventListener(

"click",

sendMessage

);


/*=============
 Enter Key
==============*/

prompt.addEventListener(

"keydown",

(e)=>{

if(

e.key==="Enter"

&&

!e.shiftKey

){

e.preventDefault();

sendMessage();

}

}

);


/*=============
 Auto Resize
==============*/

prompt.addEventListener(

"input",

()=>{

prompt.style.height="auto";

prompt.style.height=

prompt.scrollHeight+"px";

});


/*=============
 Load Chat
==============*/

const saved=

localStorage.getItem(

"yhub_chat"

);

if(saved){

messages=

JSON.parse(saved);

chatArea.innerHTML="";

messages.forEach(msg=>{

addMessage(

msg.role==="assistant"

?

"assistant"

:

"user",

msg.content

);

});

}


/*=============
 Loading
==============*/

window.addEventListener(

"load",

()=>{

loading.classList.remove("active");

document.body.classList.add("loaded");

});


/*=============
 Startup
==============*/

console.log(

"✅ YHub AI v2 Ready"

);

showToast(

"Welcome to YHub AI"

);
function renderMarkdown(text){

return text

.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>")

.replace(/```([\s\S]*?)```/g,

"<pre><code>$1</code></pre>")

.replace(/\n/g,"<br>");

}
/*=========================
  Voice Search
=========================*/

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";

recognition.continuous = false;

recognition.interimResults = false;

voiceBtn.onclick = ()=>{

recognition.start();

voiceBtn.classList.add("listening");

};

recognition.onresult = (event)=>{

prompt.value = event.results[0][0].transcript;

voiceBtn.classList.remove("listening");

};

recognition.onerror = (event)=>{

voiceBtn.classList.remove("listening");

alert("Voice Error: " + event.error);

console.log("Voice Error:", event.error);

};

recognition.onend = ()=>{

voiceBtn.classList.remove("listening");

};

}else{

voiceBtn.style.display="none";

}
/*=========================
  File Upload
=========================*/

uploadBtn.onclick = () => {

fileInput.click();

};

fileInput.onchange = () => {

const file = fileInput.files[0];

if(!file) return;

addMessage(
"user",
`📎 File Attached: ${file.name}`
);

messages.push({
role:"user",
content:`[File] ${file.name}`
});

localStorage.setItem(
"yhub_chat",
JSON.stringify(messages)
);

};
/*=========================
 Edit Message
=========================*/

function editMessage(btn){

const bubble =
btn.closest(".bubble");

const oldText =
bubble.childNodes[0].textContent.trim();

const newText =
prompt("Edit your message:", oldText);

if(newText){

bubble.childNodes[0].textContent = newText;

}

}


/*=========================
 Delete Message
=========================*/

function deleteMessage(btn){

if(!confirm("Delete this message?"))
return;

btn.closest(".message").remove();

}
function toggleMenu(btn){

document.querySelectorAll(".menuPopup").forEach(menu=>{

if(menu!==btn.nextElementSibling){

menu.classList.remove("show");

}

});

btn.nextElementSibling.classList.toggle("show");

}


function copyMessage(btn){

const text = btn.closest(".bubble").childNodes[0].textContent.trim();

navigator.clipboard.writeText(text);

alert("Copied!");

}