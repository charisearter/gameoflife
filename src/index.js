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
  //render what will show
  render(){
    return (
      <div>
        <h1> The Game of LIfe</h1>
        {/* //create grid */}
        <Grid 
        gridFull = {this.state.gridFull} //properties of gridFull
        rows = {this.rows} // properties of row
        cols = {this.cols} //properties of cols
        selectBox = {this.selectBox} //toggle boxes
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    )
  }
}




ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

