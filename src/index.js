import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, DropdownButton, Dropdown } from 'react-bootstrap'

//Box component

class Box extends React.Component {
  //selectBox function
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.cols)
  } 
  render(){
    return (
      <div 
        className={this.props.boxClass}
        id = {this.props.id}
        onClick = {this.selectBox}
      />
    )
  }
} //End Box component

//Make the grid component

class Grid extends React.Component {
  render(){
    const width = (this.props.cols * 16) + 1
    var rowsArr = []

    var boxClass = '';
    for (let i=0; i < this.props.rows; i++){
      for(let j = 0; j < this.props.cols; j++){
          let boxId = i + '_' + j; //creates id for each box element

          boxClass = this.props.gridFull[i][j] ? 'box on' : 'box off'; //tells color of box based on css
          //push boxes into rows array
          rowsArr.push(
            <Box 
              boxClass={boxClass} key={boxId} boxId={boxId} row={i} cols={j} selectBox={this.props.selectBox} 
            />
          )
      }
    }
    return(
      // pass props to this component for gridfull
      <div className='grid' style={{width: width}}>
        {rowsArr}
        
      </div>
    )
  }
} // End Grid Component

//Buttons Component
class Buttons extends React.Component {

  //handle select function
  handleSelect = (e) => {
    this.props.gridSize(e)
  }
  render() {
    return (
      <div className = 'center'>
        <ButtonToolbar>
          <button className="btn btn-default" onClick={this.props.playButton}> Play </button>
          <button className="btn btn-default" onClick={this.props.pauseButton}> Pause </button>
          <button className="btn btn-default" onClick={this.props.slow}> Slow </button>
          <button className="btn btn-default" onClick={this.props.fast}> Fast </button>
          <button className="btn btn-default" onClick={this.props.seed}> Seed </button>
          <button className="btn btn-default" onClick={this.props.clear}> Clear </button>
      {/* Work on buttun aesthetic for bootstrap*/}
          <DropdownButton title='Grid Size' id='size-menu' onSelect={this.handleSelect}>
          <Dropdown.Item eventKey='1'>20x10</Dropdown.Item>
          <Dropdown.Item eventKey='2'>50x30</Dropdown.Item>
          <Dropdown.Item eventKey='3'>70x50</Dropdown.Item>
          </DropdownButton>
        </ButtonToolbar>

      </div>
    )
  }
}

//End Buttons Component


//Main Component and Game Buttons

class Main extends React.Component{
  constructor() {
    super();
    //stuff that will be referenced later so not added to state
    this.speed = 100; //how fast the program runs
    this.rows = 30; // hpw many rows
    this.cols = 50; // how many columns 
    this.state = { //setting the states
      generation: 0, //always start at 0 for the genration state
      //create grid depending on rows and cols and each element set to false /turned off / dead
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }
  //selectBox Method -- possibly fix... on doesn't show but off does
  selectBox = (row,col) => {
    console.log('click it')
    let gridCopy = arrayClone(this.state.gridFull); //indirectly update state with a copy using helper function
    gridCopy[row][col] = !gridCopy[row][col]; //set box to opposite of itself
    this.setState({ //updating state
      gridFull: gridCopy 
    })
  }

  //Seed board - random placement generator
seed = () => {
  let gridCopy = arrayClone(this.state.gridFull);
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      if (Math.floor(Math.random() * 4) === 1) {
        gridCopy[i][j] = true;
      }
    }
  }
  this.setState({
    gridFull: gridCopy
  });
}

//play button
//set Interval will call play at the speed set (100ms)
playButton = () => {
  clearInterval(this.intervalId) // start over when clicked
  this.intervalId = setInterval(this.play, this.speed)
}

//Pause button
pauseButton = () => {
  clearInterval(this.intervalId)
}

//Slow button
slow = () => {
  this.speed= 1000;
  this.playButton();
}

//Fast Button
fast = () => {
  this.speed = 100;
  this.playButton();
}
//Clear Button
clear = () => {
  let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
  this.setState({
    gridFull: grid,
    generation: 0
  });
}

//Grid Size in order of event key in drop down

gridSize = (size) => {
  switch (size) {
    case "1":
      this.cols = 20;
      this.rows = 10;
    break
    case "2":
      this.cols = 50;
      this.rows = 30;
    break
    default:
      this.cols = 70;
      this.rows = 50;
  }
  this.clear();
}

//play method and game logic
play = () => {
  let g = this.state.gridFull; //checks state of grid (1st copy)
  let g2 = arrayClone(this.state.gridFull); // (2nd copy) change the squares on the clone
//Rules for Conway's game of life
  for (let i=0; i < this.rows; i++) {
    for (let j=0; j < this.cols; j++) {
      let count = 0; //how many neighbors surrond particular cell
      if (i > 0) if (g[i-1][j]) count++; //if neighbor  + 1
      if (i > 0 && j > 0) if (g[i-1][j-1]) count++;//if neighbor  + 1
      if (i > 0 && j < this.cols-1) if (g[i-1][j+1]) count++;//if neighbor  + 1
      if (j < this.cols-1) if (g[i][j+1]) count++;//if neighbor  + 1
      if (j > 0) if (g[i][j-1]) count++;//if neighbor  + 1
      if (i < this.rows-1) if (g[i+1][j]) count++;//if neighbor  + 1
      if (i < this.rows-1 && j > 0) if (g[i+1][j-1]) count++;//if neighbor  + 1
      if (i < this.rows-1 && this.cols-1) if (g[i+1][j+1]) count++;//if neighbor  + 1
      // cell dies if less than 2 neighbors (underpopulation) or more than 3 (overpopulation)
      //otherwise it stays alive for next generation
      if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false; 
      //cell is brought to life if EXACTLY 3 neighbors (reproduction)
      if (!g[i][j] && count === 3) g2[i][j] = true;
    } 
  }
  this.setState({ //updates state of grid
    gridFull: g2,
    generation: this.state.generation + 1 //go to next generation
  })
}

//lifecycle hook to have grid seeded right away - Works
componentDidMount() {
  this.seed(); //auto seed when mounts
  this.playButton(); //start the game
}


  //render what will show
  render(){
    return (
      <div>
        <h1> The Game of Life</h1>
        {/* Create buttons here */}
        <Buttons
          playButton = {this.playButton}
          pauseButton = {this.pauseButton}
          slow = {this.slow}
          fast = {this.fast}
          clear = {this.clear}
          seed = {this.seed}
          gridSize = {this.gridSize}
        />
        {/* create grid */}
        <Grid 
        gridFull = {this.state.gridFull} //properties of gridFull
        rows = {this.rows} // properties of row
        cols = {this.cols} //properties of cols
        selectBox = {this.selectBox} //toggle boxes
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
} // End Main Component

//helper function
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr)); //deep clone because nested array - clones all arrays inside arrays
}


ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

