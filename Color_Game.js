/* ------------------------------- */ 
/* Declaration of HTML DOM objects
/* ------------------------------- */
var squares         = document.querySelectorAll(".square");
var color_display   = document.getElementById("color_display");
var message_display = document.getElementById("message");
var reset_btn       = document.querySelector("#reset");
var h1              = document.querySelector("h1");
var easy_btn        = document.querySelector("#easy_btn");
var hard_btn        = document.querySelector("#hard_btn");

/* ---------------------------------- */
/* Initializations
/* ---------------------------------- */
var num_of_squares  = 6;
var colors          = generate_colors_list(num_of_squares);
var picked_color    = pick_color(); 

color_display.textContent = picked_color;

/* ------------------------------------------------- */
/* Type : addEventListener                           */
/* Description : Explanation for rgb on double click */ 
/* ------------------------------------------------- */
color_display.addEventListener("dblclick", function() {
	var open_par = picked_color.indexOf("(");
	var close_par = picked_color.indexOf(")");
	var first_comma = picked_color.indexOf(",");
	var second_comma = picked_color.indexOf(",", first_comma + 1);

	var r = picked_color.slice(open_par + 1, first_comma);
	var g = picked_color.slice(first_comma + 1,second_comma);
	var b = picked_color.slice(second_comma + 1, close_par);
	alert("Red: " + r + "/255 | Green: " + g + "/255 | Blue: " + b + "/255");
});

/* --------------------------------------------------------------------------------------------------- */
/* Type : addEventListener                                                                             */
/* Description : Redefine DOM objects and other important details in case of EASY game level selection */ 
/* --------------------------------------------------------------------------------------------------- */
easy_btn.addEventListener("click", function() {
	easy_btn.classList.add("selected");
	hard_btn.classList.remove("selected");
	num_of_squares = 3;
	colors = generate_colors_list(num_of_squares);
	picked_color = pick_color();
	color_display.textContent = picked_color;
	for (var i = 0; i < squares.length; i++)
	{
		if (colors[i])
		{
			squares[i].style.backgroundColor = colors[i];
		}
		else
		{
			squares[i].style.display = "none";
		}
	}
});

/* --------------------------------------------------------------------------------------------------- */
/* Type : addEventListener                                                                             */
/* Description : Redefine DOM objects and other important details in case of HARD game level selection */ 
/* --------------------------------------------------------------------------------------------------- */
hard_btn.addEventListener("click", function() {
	easy_btn.classList.remove("selected");
	hard_btn.classList.add("selected");
	num_of_squares = 6;
	colors = generate_colors_list(num_of_squares);
	picked_color = pick_color();
	color_display.textContent = picked_color;
	for (var i = 0; i < squares.length; i++)
	{
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
	}
});

/* ------------------------------------------------------------------------- */
/* Type : addEventListener                                                   */
/* Description : Reset the game according to the last configuration selected */ 
/* ------------------------------------------------------------------------- */
reset_btn.addEventListener("click", function() {
	colors = generate_colors_list(num_of_squares);
	picked_color = pick_color();
	color_display.textContent = picked_color;
	this.textContent = "New Colors";
	for(var i = 0; i < squares.length;i++)
		squares[i].style.backgroundColor = colors[i];
	h1.style.backgroundColor = "steelblue";
	message_display.textContent = "";
});

/* The game in action, including other GUI features */
for (var i = 0; i < squares.length; i++)
{
	//initialize constant colors to the squares
	squares[i].style.backgroundColor = colors[i];

	//add click listeners to squares
	squares[i].addEventListener("click", function() {
		var clicked_color = this.style.backgroundColor;

		//compare the clicked square color to the picked color
		if (clicked_color === picked_color)
		{
			message_display.textContent = "Correct!";
			change_colors(clicked_color);
			reset_btn.textContent = "Play Again?"; 
			h1.style.backgroundColor = clicked_color;
		}
		else
		{
			this.style.backgroundColor = "#232323";
			message_display.textContent = "Try Again!";
			//reset_btn.textContent = "New Colors"; 
		}
	});
}

/* --------------------------------------------------------- */
/* Type : function
/* Description : change all squares color to the given color
/* --------------------------------------------------------- */
function change_colors(color) {
	for(var i = 0; i < squares.length; i++)
	{
		squares[i].style.backgroundColor = color;
	}
}

/* ---------------------------------------------------------- */
/* Type : function
/* Description : picks a random color out of the colors array
/* ---------------------------------------------------------- */
function pick_color()
{
	var rnd = Math.floor(Math.random() * colors.length);
	return colors[rnd];
}

/* ----------------------------------------------- */
/* Type : function
/* Description : generate a num-sized colors array 
/* ----------------------------------------------- */
function generate_colors_list(num)
{
	var colors_list = [];
	for(var i = 0; i < num; i++)
	{
		colors_list.push(random_color());
	}
	return colors_list;
}

/* ------------------------------------------------------------ */
/* Type : function
/* Description : Returns a string describing a single RGB color
/* ------------------------------------------------------------ */
function random_color()
{
	//pick numbers between 0-255
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b +")";
}
