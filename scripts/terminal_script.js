/*
Home Page JS File
Written by Tyler Paplham
*/

var home = ["Documents", "Links", "Skills.txt", "Education.txt", "About_This_Site.txt", "HireMe.run"];
var documents = ["About_Me.txt", "Resume.pdf", "World_Domination_Plans.txt"];
var links = ["Linkedin.html", "GitHub.html"];

var currentDirectory = "Home";

//start listening for when the user presses a key
document.addEventListener("keydown", function (event){
	//store the key pressed
   	var code = event.key;
   	//put a space in the terminal line if its pressed
    if (code == " "){
        document.getElementById("userInput").innerHTML += " ";
        event.preventDefault();
    }
    //prevent the user from using tab
    else if (code == "Tab"){
    	event.preventDefault();
    }
    //enter is pressed and commands are executed
    else if (code == "Enter"){
    	document.getElementById("inputDisplay").innerHTML += "<br>" + document.getElementById("userInput").innerHTML + "<br>";
    	checkForCommands(document.getElementById("userInput").innerText);
    	document.getElementById("userInput").innerHTML = "> ";
    	scrollUpdate();
    }
    //Backspace is pressed and the last character the user entered is removed
    else if (code == "Backspace"){
    	console.log("Backspace was pressed!");
    	event.preventDefault();
    	if (document.getElementById("userInput").innerText.length > 2){
    		document.getElementById("userInput").innerText = document.getElementById("userInput").innerText.substr(0, document.getElementById("userInput").innerText.length - 1);
    	}
    }
    else if(code.length > 1){
    	//do nothing
    }
    //if no special cases are met then put the character the user entered on the terminal line
    else{
    	document.getElementById("userInput").innerHTML += code;
    }
    
});

//scroll the inputDisplay div down when the browser is resized
window.onresize = function(){
	scrollUpdate();
};

//display the welcome messsage when the window loads
window.onload = function(){
	welcomeMessage();
};

//checks userInput for a valid terminal command or file
function checkForCommands(userText){
	var text = userText.substr(2, userText.length).toLowerCase();
	console.log(text);
	switch (text){
		case "help":
			console.log("Running help on check for commands");
			helpCommand();
			break;
		case "clear":
			console.log("Running clear on check for commands");
			clearCommand();
			break;
		case "ls":
			ls();
			break;
		case "skills.txt":
			if (currentDirectory == "Home"){
				skills();
			}
			break;
		case "education.txt":
			if (currentDirectory == "Home"){
				education();
			}
			break;
		case "about_me.txt":
			if (currentDirectory == "Documents"){
				//open a modal or another page?
			}
			break;
		case "resume.pdf":
			if (currentDirectory == "Documents"){
				window.open("./resume.txt");
			}
      		break;
		case "world_domination_plans.txt":
			if (currentDirectory == "Documents"){
				//do a thing
			}
			break;
		case "linkedin.html":
			console.log("work");
			if (currentDirectory == "Links"){
				window.open("https://www.linkedin.com/in/tylerpaplham");
			}
			break;
		case "github.html":
			if (currentDirectory == "Links"){
				window.open("https://github.com/woot903");
			}
			break;
		default:
			console.log("Hit default on check for commands");
			if (text.toLowerCase().substr(0, 2) == "cd"){
				console.log("Running CD");
				cd(text.substr(3, text.length));
			}
			else if (text.toLowerCase().substr(0, 5) == "mkdir" || text.toLowerCase().substr(0, 5) == "rmdir"){
				console.log("System Denying Permision.");
				document.getElementById("inputDisplay").innerHTML += "Error: Permission denied.<br>";
			}
			else if (text.toLowerCase().substr(0, 4) == "sudo" || text.toLowerCase().substr(0, 4) == "root"){
				document.getElementById("inputDisplay").innerHTML += "Invalid password for root.<br>";
			}
			else{
				error(text);
			}
			break;
	}
}

function ls(){
	var arr = getArray();
	for (i = 0; i < arr.length; i++){
		document.getElementById("inputDisplay").innerHTML += arr[i] + "<br>";
	}
}

function cd(dir){
	console.log("dir:" + dir);
	dir = dir.toLowerCase();
	if (currentDirectory == "Home"){
		if (dir == "documents"){
			currentDirectory = "Documents";
			displayDirecotry();
		}
		else if (dir == "links"){
			currentDirectory = "Links";
			displayDirecotry();
		}
		else if (dir === "" || dir === ".."){
			document.getElementById("inputDisplay").innerHTML += "Error: no higher directory</br>";
		}
		else{
			error("cd " + dir);
		}
	}
	else {
		if (dir === "" || dir === ".."){
			currentDirectory = "Home";
			displayDirecotry();
		}
		else if (dir === "."){
			document.getElementById("inputDisplay").innerHTML += ("Directory is currently at " + currentDirectory + ".<br>");
		}
		else{
			error("cd" + dir);
		}
	}
}

function displayDirecotry(){
	document.getElementById("inputDisplay").innerHTML += ("Directory changed to " + currentDirectory + ".<br>");
}

function getArray(){
	switch(currentDirectory){
		case "Home":
			return home;
		case "Documents":
			return documents;
		case "Links":
			return links;
	}
}

function helpCommand(){
	document.getElementById("inputDisplay").innerHTML +=
	"<span class='tab'>--Help--<br></span>"+
	"-------------------------<br>"+
	"Commands:<br>"+
	"cd - Use to change directories 'cd [directory name]'<br>"+
	"ls - list files/folder in the current directory<br>"+
	"mkdir - create a new directory<br>"+
	"rmdir - remove a directory<br />"+
	"clear - clears the console output<br>"+
	"exit - log out<br>"+
	"-------------------------<br>"+
	"Type a file name while in the current directory to access it.<br>"+
	"-------------------------<br>";
}

function clearCommand(){
	document.getElementById("inputDisplay").innerHTML = "";
}

function error(text){
	document.getElementById("inputDisplay").innerHTML += "Error: '" + text + "' is not a valid command. Use the 'help' command for a list of commands.<br>";

}

function scrollUpdate(){
	var outputArea = document.getElementById("inputDisplay");
	console.log("Scrolled.");
	outputArea.scrollTop = outputArea.scrollHeight;
}

function welcomeMessage(){
	console.log("welcomeMessage");
	document.getElementById("inputDisplay").innerHTML += 
	"*********************************<br>"+
	"* Paplham Systems Terminal v1.2 *<br>"+
	"*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='italics'>Now with Javascript!</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*<br>"+
	"*********************************<br><br>"+
	"Welcome to my terminal resume! For a more a traditional experience click <a href='#'>here</a>.<br>"+
	"To view this site's code, visit my <a href='https://github.com/woot903/Personal-Site' target='_blank'>GitHub</a> page.<br>"+
	"Type 'help' for a list of commands or 'clear' to remove this message.<br>";
}

function skills(){
	document.getElementById("inputDisplay").innerHTML +=

	"<br><table><tbody>"+
	"<tr><td colspan='2' class='tdHead'>Languages</td></tr>"+
	"<tr><td>Java:</td><td>++++++++++++++++++++++</td></tr>"+
	"<tr><td>C#:</td><td>++++++++++++++++++++++</td></tr>"+
	"<tr><td>HTML:</td><td>++++++++++++++++++++</td></tr>"+
	"<tr><td>CSS:</td><td>+++++++++++++++++</td></tr>"+
	"<tr><td>SQL:</td><td>++++++</td></tr>"+
	"<tr><td>Python:</td><td>++++++</td></tr>"+
	"<tr><td>Php:</td><td>++++</td></tr>"+
	"<tr><td colspan='2' class='tdHead'>Software</td></tr>"+
	"<tr><td>Adobe CS5:</td><td>++++++++++++++++++++++</td></tr>"+
	"<tr><td>Visio:</td><td>+++++++++++++ </td></tr>"+
	"<tr><td>Project:</td><td>++++++</td></tr>"+
	"<tr><td>Access:</td><td>++++</td></tr>"+
	"</tbody></table>";
}

function education(){
	document.getElementById("inputDisplay").innerHTML +=
	"<br><table class='tableStretch'><tr><td colspan='2' class = 'tdHead'>-Arizona State University (Graduated May 2016)-</td></tr>"+
	"<tr><td colspan='2' class = 'tdHead'>*Honors Student*</td></tr>"+	
	"<tr><td>&nbsp;</td></tr>"+
	"<tr><td>Computer Information Systems B.S.</td><td class='alignRight'>3.8 GPA</td></tr>"+
	"<tr><td>Marketing B.S.</td><td class='alignRight'>Highest Honors</td></tr>"+
	"</table><br><br><br>"+
	"<table class='tableStretch'><tr><td colspan='2' class = 'tdHead'>-Maricopa Community Colleges (Currently Attending)-</td></tr>"+
	"<tr><td>&nbsp;</td></tr>"+
	"<tr><td>Computer Science</td><td class='alignRight'>4.0 GPA</td></tr>"+
	"<tr><td>Non-Degree Seeking</td></tr>"+
	"</table>";

}