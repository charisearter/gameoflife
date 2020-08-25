import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
}

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
              boxClass={boxClass} key={boxId} boxId={boxId} row={i} col={j} selectBox={this.props.selectBox} 
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
}




//Making main component to hold game and buttons

class Main extends React.Component{
  constructor() {
    super();
    //stuff that will be referenced later so not added to state
    this.speed = 100 //how fast the program runs
    this.rows = 30 // hpw many rows
    this.cols = 50 // how many columns 
    this.state = { //setting the states
      generation: 0, //always start at 0 for the genration state
      //create grid depending on rows and cols and each element set to false /turned off / dead
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }
  //selectBox Method -- possibly fix... on doesn't show but off does
  selectBox = (row,col) => {
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

//lifecycle hook to have grid seeded right away

componentDidMount() {
  this.seed();
}

  //render what will show
  render(){
    return (
      <div>
        <h1> The Game of Life</h1>
        {/* //create grid */}
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
}

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

