const grid = document.getElementById('canvas');
var currentColor = document.getElementById("myColor");
var currentTool = "";

var height = document.getElementById("gridHeight").value;
var width = document.getElementById("gridWidth").value;

///Dezactiveaza click-dreapta
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);


drawGrid();

const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', function(c){

    grid.innerHTML= " ";
    c.preventDefault();
    drawGrid();
});

//Desenam gridul 
function drawGrid(){
    
    height = document.getElementById("gridHeight").value;
    width = document.getElementById("gridWidth").value;

    for(var i=0; i<height; i++)
    {
        const row = grid.insertRow(0);
        for(var j=0; j<width; j++)
            row.insertCell(0);
    }
}

//drawGrid();



/// MODIFICARE CELLURI
grid.addEventListener('mouseover', function(c){
    
    if(c.target.nodeName === 'TD')
        if(c.buttons == 1)
            c.target.style.backgroundColor = currentColor.value;
        else if(c.buttons == 2)
            c.target.style.backgroundColor = "#2b2a2a0a";
});

grid.addEventListener('mousedown', function(c){

    if(c.target.nodeName === 'TD')
        if(c.buttons == 1)
        {
            if(currentTool == "bucket"){//BUCKET TOOL
                fill();   
                    
            }
            else if(currentTool == "pipette"){
                pick();
            }
                
            else
                c.target.style.backgroundColor = currentColor.value;
        }
        else if(c.buttons == 2)
            c.target.style.backgroundColor = "#2b2a2a0a";
    
    
});


function pick(){
   var cells = grid.getElementsByTagName("td");
   for(var i = 0; i < cells.length; i++)
   {
       var cell = cells[i];
       
       cell.onclick = function(){
        var cIndex  = this.cellIndex;  
        var rIndex = this.parentNode.rowIndex; 
        var color;
        //color = grid.rows[rIndex].cells[cIndex].style.backgroundColor;
        color = document.defaultView.getComputedStyle(grid.rows[rIndex].cells[cIndex],null)["backgroundColor"];
        color = color.substring(4, color.length-1).replace(/ /g, '').split(','); // fiecare valoare individuala r, g, b
        currentColor.value = rgbToHex(parseInt(color[0],10),parseInt(color[1],10),parseInt(color[2],10)); // conversia din rgb la hex preluand fiecare componenta
        
       }
   }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

function fill()
{   
   
   var cells = grid.getElementsByTagName("td");
   for(var i = 0; i < cells.length; i++)
   {
       var cell = cells[i];
       
       cell.onclick = function(){
        var cIndex  = this.cellIndex;  
        var rIndex = this.parentNode.rowIndex; 
        var color;
        //color = grid.rows[rIndex].cells[cIndex].style.backgroundColor;
        color = document.defaultView.getComputedStyle(grid.rows[rIndex].cells[cIndex],null)["backgroundColor"];
        console.log(color);
        flood(rIndex,cIndex,color);
       }
   }
    
        
}

function flood(i, j, color)
{
    if(i>=0&&j>=0&&i<height&&j<width)
    if(document.defaultView.getComputedStyle(grid.rows[i].cells[j],null)["backgroundColor"] == color)
    {
        grid.rows[i].cells[j].style.backgroundColor = currentColor.value;

        flood(i+1, j, color);
        flood(i-1, j, color);
        flood(i, j+1, color);
        flood(i, j-1, color);
    }
        

}

/// FUNCTII DE ALES USTENSILE ///

var penBtn = document.getElementById("pencil");
var buckBtn = document.getElementById("bucket");
var pickBtn = document.getElementById("pipette");


function pickColor(){
    currentTool = "pipette";
    penBtn.style.backgroundColor = "#ffb350";
    buckBtn.style.backgroundColor = "#ffb350";
    pickBtn.style.backgroundColor = "#fa9715";
}

function pickPencil(){
    currentTool = "pencil";
    console.log("pencil");
    //console.log(currentColor);
    penBtn.style.backgroundColor = "#fa9715";
    buckBtn.style.backgroundColor = "#ffb350";
    pickBtn.style.backgroundColor = "#ffb350";
}

function pickBucket(){
    currentTool = "bucket";
    console.log("bucket");
    buckBtn.style.backgroundColor = "#fa9715";
    penBtn.style.backgroundColor = "#ffb350";
    pickBtn.style.backgroundColor = "#ffb350";
}




