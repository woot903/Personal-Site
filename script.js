/*
Home Page JS File
Written by Tyler Paplham
*/

var home = ["Documents", "Links", "About_This_Site.txt", "HireMe.run"];
var documents = ["About_Me.txt", "Resume.txt", "World_Domination_Plans.txt"];
var links = ["Linkedin.html", "GitHub.html"];

var currentDirectory = "Home";

//start listening for when the user presses a key
document.addEventListener("keypress", function (event){
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
    	if (document.getElementById("userInput").innerText.length > 2){
    		document.getElementById("userInput").innerText = document.getElementById("userInput").innerText.substr(0, document.getElementById("userInput").innerText.length - 1);
    	}
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
		case "about_me.txt":
			if (currentDirectory == "Documents"){
				//open a modal or another page?
			}
			break;
		case "resume.txt":
			if (currentDirectory == "Documents"){
				//do a thing
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
	scrollUpdate();
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
		else if (dir === ""){
			document.getElementById("inputDisplay").innerHTML += "Error: no higher directory</br>";
		}
		else{
			error("cd " + dir);
		}
	}
	else {
		if (dir === ""){
			currentDirectory = "Home";
			displayDirecotry();
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
	"Type a file name while in the current directory to access it (case sensitive).<br>"+
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
	"This terminal will provide you access to the system mainframe and it's resources.<br>"+
	"Type 'help' for a list of commands or 'clear' to remove this message.<br>";
}