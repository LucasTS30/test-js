
type WinningCombinationsResult = [number, number[]][];

function call(lines: number[]): WinningCombinationsResult {
  let lastValue: number = 0;
  let positionsArray: number[] = [];
  let winningArray: WinningCombinationsResult = [];

  for(let i = 0; i < lines.length; i++) {
    if(i===0 && lines[i] < 10){ //when is the first position
      lastValue = lines[i];
      positionsArray.push(i);
    }
    else if(lines[i] === lastValue && lines[i] === 0){ //when the previous position is equal to the current position and the value is zero
      if(lastValue === 0 && lines[i] === 0){
        positionsArray.push(i);
      }
    }
    else if(lines[i] === lastValue && lines[i] !== 0 && lines[i] < 10) { //when the previous position is equal to the current position and the value is non-zero
      lastValue = lines[i];
      positionsArray.push(i);
    }
    else if(lines[i] !== lastValue && lines[i] === 0){ //when the previous position is different to the current position and the current position value is zero 
      positionsArray.push(i);
    }

    if(lines[i] !== lastValue && lines[i] !== 0 && lastValue === 0 && lines[i] < 10) { //when the previous position is different to the current position, the current position value is non-zero, but the previous position value is zero
      lastValue = lines[i];
      positionsArray.push(i);
    }
    else if(lines[i] !== lastValue && lines[i] !== 0 && lastValue !== 0 && lines[i] < 10) { //when the previous position is different to the current position, the current position value is non-zero and the previous position value is non-zero
      
      if(positionsArray.length >= 3){ //before turns the positionsArray empty, is verified if exists a winning combination length
        winningArray.push([lastValue, positionsArray]);
      }
      positionsArray = [];
      lastValue = lines[i];

      if(lines[i-1] == 0){ //thinking in the cases where the next combination with different number starts, but existing shared zeros
        positionsArray.push(i-1);
      }
      if(lines[i-1] == 0 && lines[i-2] == 0){
        positionsArray.push(i-2);
      }
      if(lines[i-1] == 0 && lines[i-2] == 0 && lines[i-3] == 0){
        positionsArray.push(i-3);
      }
      if(lines[i-1] == 0 && lines[i-2] == 0 && lines[i-3] == 0 && lines[i-4] == 0){
        positionsArray.push(i-4);
      }
      positionsArray.sort(); //sorting the zero's order
      positionsArray.push(i);
    }

    if(i === lines.length - 1){ //verifying if is the last position of array and if exists a winning combination
      if(positionsArray.length >= 3){
        winningArray.push([lastValue, positionsArray]);
      }
    }
  }
  return winningArray;
}
export const WinningCombinations = { call };