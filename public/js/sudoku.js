const board = document.getElementById("board");

const puzzle = [
5,3,0,0,7,0,0,0,0,
6,0,0,1,9,5,0,0,0,
0,9,8,0,0,0,0,6,0,
8,0,0,0,6,0,0,0,3,
4,0,0,8,0,3,0,0,1,
7,0,0,0,2,0,0,0,6,
0,6,0,0,0,0,2,8,0,
0,0,0,4,1,9,0,0,5,
0,0,0,0,8,0,0,7,9
];

const solution = [
5,3,4,6,7,8,9,1,2,
6,7,2,1,9,5,3,4,8,
1,9,8,3,4,2,5,6,7,
8,5,9,7,6,1,4,2,3,
4,2,6,8,5,3,7,9,1,
7,1,3,9,2,4,8,5,6,
9,6,1,5,3,7,2,8,4,
2,8,7,4,1,9,6,3,5,
3,4,5,2,8,6,1,7,9
];

let selected = null;

for(let i=0;i<81;i++){

    const cell=document.createElement("div");

    cell.className="cell";

    if(puzzle[i]!==0){

        cell.innerText=puzzle[i];

        cell.style.background="#333";

        cell.style.fontWeight="bold";

    }

    cell.dataset.index=i;

    cell.onclick=function(){

        if(puzzle[i]!==0) return;

        document.querySelectorAll(".cell").forEach(c=>c.style.outline="none");

        cell.style.outline="3px solid #6c63ff";

        selected=cell;

    };

    board.appendChild(cell);

}

document.querySelectorAll(".numbers button").forEach(btn=>{

    btn.onclick=function(){

        if(selected){

            selected.innerText=btn.innerText;

        }

    };

});

document.getElementById("check").onclick=function(){

    const cells=document.querySelectorAll(".cell");

    let correct=true;

    for(let i=0;i<81;i++){

        const value=cells[i].innerText==""?0:Number(cells[i].innerText);

        if(value!==solution[i]){

            correct=false;

            break;

        }

    }

    if(correct){

        alert("🎉 Congratulations!\nYou solved Sudoku!");

    }else{

        alert("❌ Some numbers are incorrect.");

    }

};

document.getElementById("newgame").onclick=function(){

    location.reload();

};