// display warning

let displayWarning = () =>{

    let warning = document.querySelector('.warning');
    warning.style.display="inline";
    warning.innerHTML="<h4>Invalid Input</h4>";

    setTimeout(()=>{
       let warning = document.querySelector('.warning');
       warning.style.display="none";
    }, 5000)
}


// Reset 

let boxes = document.querySelectorAll('.box');
for(let i=0 ; i< boxes.length ; i++)
{
    if(!boxes[i].value)
    {
        boxes[i].classList.add("empty")
    }
}

let reset = function()
{
    cnt = 0;
    for(let i=0 ; i<9 ; i++)
    {
        for(let j=0 ; j<9 ; j++)
        {
            boxes[cnt].value = null;
            cnt++;
        }
    }
}


// Print Output

let print = function(grid)
{
    let allBoxes = document.querySelectorAll('.box');
    count = 0; 
    for(let i=0 ; i<9 ; i++)
    {
        for(let j=0 ; j<9 ; j++)
        {
            allBoxes[count].value = grid[i][j];
            count++;
        }
    }
}

//  Solving Sudoku

let isValid = function(grid, row, col, num)
{
  for (let i = 0; i < 9; i++)
    {
      if(grid[i][col] == num )
      {
          return false;
      }
	  if(grid[row][i] == num)
      {
          return false;
      }
      if (grid[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] == num)
      {
          return false;
      }
    }
  return true;
}


//Solve Sudoku

let solveSudoku = function(grid)
{

  for(let i = 0; i < 9; i++)
  {
      for(let j = 0; j < 9; j++)
	 {
	   if(grid[i][j] == 0)
	    {
	      for (let k = 1; k <= 9; k++)
	   	  {
		    if(isValid (grid, i, j, k))
		     {
		       grid[i][j] = k;

		       if(solveSudoku (grid))
			   {
			     return true;
			   }
		       else
			   {
			     grid[i][j] = 0;
		  	   }
		    }
		  }
	      return false;
	    }
      }
    }
   return true;   
}



//Validating User Input

let userInputIsValid = function(grid, row, col, num)
{
  for (let i = 0; i < 9; i++)
    {
      // check row
      if(grid[i][col] == num )
      {
        if(i == row ) continue
        else  return false;
      }
      // check col
	  if(grid[row][i] == num)
      {
         if(i == col) continue;
         else return false;
      }
      // check 3*3 box
      if (grid[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] == num)
      {
         if(3 * Math.floor(row / 3) + Math.floor(i / 3) == row && 3 * Math.floor(col / 3) + i % 3 == col) continue;
         else return false;
      }
    }
  return true;
}

// Check whether input is valid or not

function checkIsValid(arr)
{
    for(let i=0 ; i<9 ; i++)
    {
        for(let j=0 ; j<9 ; j++)
        {
            if(arr[i][j] == 0) continue;

            if(arr[i][j] >= 1 && arr[i][j] <= 9)
            {
                if(!userInputIsValid(arr, i, j, arr[i][j]))
                    return false;    
            }
            else return false;
        }  
    }
    return true;
}


//Taking user Input and Solving 

function userInput(){
let arr = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
];   

let allBoxes = document.querySelectorAll('.box');

//putting user input into arr

let count = 0;
for(let i=0 ; i<9 ; i++)
{
    for(let j=0 ; j<9 ; j++)
    {
        if(allBoxes[count].value == "")
            arr[i][j] = 0;
        else 
            arr[i][j] = Number(allBoxes[count].value);
        count++;
    }
}

if(checkIsValid(arr))
{
    solveSudoku(arr, 0, 0);
    print(arr);
}
else
{ 
    displayWarning();
}

}
