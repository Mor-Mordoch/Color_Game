/* --------------------- */ 
/* Variables Declaration */
/* --------------------- */
var squares         = document.querySelectorAll(".square");
var color_display   = document.getElementById("color_display");
var message_display = document.getElementById("message");
var reset_btn       = document.querySelector("#reset");
var h1              = document.querySelector("h1");
var mode_btns       = document.querySelectorAll(".mode_btn");
var num_of_squares  = 6;
var colors          = [];
var picked_color; 

init();

/* ---------------------------------------------------------------- */ 
/* Type : function                                                  */ 
/* Descripton: Algorithm to run in the beginning of every page load */ 
/* Sub-functions: setup_mode_buttons(), setup_squares(), reset()    */ 
/* ---------------------------------------------------------------- */ 
function init()
{
	setup_mode_buttons();
	setup_squares();
	reset();
}

/* ------------------------------------------------- */
/* Type : function                                   */
/* Description : mode buttons event listeners        */ 
/* Sub-functions: reset()                            */
/* ------------------------------------------------- */
function setup_mode_buttons() {
	for(var i = 0; i < mode_btns.length; i++)
	{
		mode_btns[i].addEventListener("click", function() {
			for(var j = 0; j < mode_btns.length; j++)
				mode_btns[j].classList.remove("selected");
			this.classList.add("selected");
			num_of_squares = (this.textContent === "Easy") ? 3 : 6;
			reset();
		});
	}
}

/* --------------------------------------------- */
/* Type : function                               */
/* Description : squares buttons event listeners */ 
/* Sub-functions: change_colors(clicked_color)   */
/* --------------------------------------------- */
function setup_squares() {
	for (var i = 0; i < squares.length; i++)
	{
		//add click listeners to squares
		squares[i].addEventListener("click", function() {
			var clicked_color = this.style.backgroundColor;	
			if (clicked_color === picked_color) //compare the clicked square color to the picked color
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
			}
		});
	}
}

/* ------------------------------------------------- */
/* Type : addEventListener                           */
/* Description : Explanation for rgb on double click */ 
/* Sub-functions: None                               */
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

/* -------------------------------------------------------------------------------------------------- */
/* Type : function                                                                                    */
/* Description: generating new colors list, determine a color to pick and represent required squares. */
/* Sub-functions: generate_colors_list(num_of_squares), pick_color()                                  */
/* -------------------------------------------------------------------------------------------------- */ 
function reset() 
{
	colors = generate_colors_list(num_of_squares);
	picked_color = pick_color();
	color_display.textContent = picked_color;
	reset_btn.textContent = "New Colors";
	for(var i = 0; i < squares.length;i++)
	{
		if(colors[i])
		{
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else
			squares[i].style.display = "none";
	}
	h1.style.backgroundColor = "steelblue";
	message_display.textContent = "";
}

/* ------------------------------------------------------------------------- */
/* Type : addEventListener                                                   */
/* Description : Reset the game when the user press the Reset button         */
/* Sub-functions: None                                                       */ 
/* ------------------------------------------------------------------------- */
reset_btn.addEventListener("click", function() {
	reset();
});

/* --------------------------------------------------------- */
/* Type : function                                           */
/* Description : change all squares color to the given color */
/* Sub-functions: None                                       */ 
/* --------------------------------------------------------- */
function change_colors(color) {
	for(var i = 0; i < squares.length; i++)
	{
		squares[i].style.backgroundColor = color;
	}
}

/* ---------------------------------------------------------- */
/* Type : function                                            */
/* Description : picks a random color out of the colors array */
/* Sub-functions: None                                        */ 
/* ---------------------------------------------------------- */
function pick_color()
{
	var rnd = Math.floor(Math.random() * colors.length);
	return colors[rnd];
}

/* ----------------------------------------------- */
/* Type : function                                 */
/* Description : generate a num-sized colors array */
/* Sub-functions: None                             */ 
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
/* Type : function                                              */
/* Description : Returns a string describing a single RGB color */
/* Sub-functions: None                                          */ 
/* ------------------------------------------------------------ */
function random_color()
{
	//pick numbers between 0-255
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b +")";
}
