(this.webpackJsonpgameoflife=this.webpackJsonpgameoflife||[]).push([[0],{26:function(e,t,a){},39:function(e,t,a){e.exports=a(47)},47:function(e,t,a){"use strict";a.r(t);var n=a(8),l=a(9),r=a(11),s=a(10),o=a(0),i=a.n(o),c=a(15),u=a.n(c),p=(a(26),a(27)),m=a(52),h=a(36),f=a(24),d=function(e){Object(r.a)(a,e);var t=Object(s.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"rules"},i.a.createElement("h2",null,"Rules:"),i.a.createElement("ul",null,i.a.createElement("li",null,"Live cells with 2 or 3 neighbors, lives and moves on to next generation."),i.a.createElement("li",null,"Live cells with less than 2 neighbors, dies (simulates underpopulation)."),i.a.createElement("li",null,"Live cells with more than 3 neighbors dies (simulates overpopulation)."),i.a.createElement("li",null,"Dead cells with ",i.a.createElement("strong",null,"exactly")," 3 neighbors, will come to life (simulates reproduction).")))}}]),a}(i.a.Component),g=function(e){Object(r.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,r=new Array(l),s=0;s<l;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).selectBox=function(){e.props.selectBox(e.props.row,e.props.cols)},e}return Object(l.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:this.props.boxClass,id:this.props.id,onClick:this.selectBox})}}]),a}(i.a.Component),v=function(e){Object(r.a)(a,e);var t=Object(s.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){for(var e=16*this.props.cols+1,t=[],a="",n=0;n<this.props.rows;n++)for(var l=0;l<this.props.cols;l++){var r=n+"_"+l;a=this.props.gridFull[n][l]?"box on":"box off",t.push(i.a.createElement(g,{boxClass:a,key:r,boxId:r,row:n,cols:l,selectBox:this.props.selectBox}))}return i.a.createElement("div",{className:"grid",style:{width:e}},t)}}]),a}(i.a.Component),b=function(e){Object(r.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,r=new Array(l),s=0;s<l;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).handleSelect=function(t){e.props.gridSize(t)},e}return Object(l.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"center"},i.a.createElement(f.a,null,i.a.createElement(p.a,{className:"btn",onClick:this.props.playButton}," Play ")," ",i.a.createElement(p.a,{className:"btn btn-default",onClick:this.props.pauseButton}," Pause ")," ",i.a.createElement(p.a,{className:"btn btn-default",onClick:this.props.slow}," Slow ")," ",i.a.createElement(p.a,{className:"btn btn-default",onClick:this.props.fast}," Fast ")," ",i.a.createElement(p.a,{className:"btn btn-default",onClick:this.props.seed}," Seed ")," ",i.a.createElement(p.a,{className:"btn btn-default",onClick:this.props.clear}," Clear ")," ",i.a.createElement(m.a,{className:"center",as:f.a,title:"Grid Size",id:"size-menu",onSelect:this.handleSelect},i.a.createElement(h.a.Item,{eventKey:"1"},"25 x 25 - Small")," | ",i.a.createElement(h.a.Item,{eventKey:"2"},"50 x 50 - Medium")," | ",i.a.createElement(h.a.Item,{eventKey:"3"},"100 x 100 - Large"))))}}]),a}(i.a.Component),y=function(e){Object(r.a)(a,e);var t=Object(s.a)(a);function a(){var e;return Object(n.a)(this,a),(e=t.call(this)).selectBox=function(t,a){if(!0!==e.state.isPlaying){var n=E(e.state.gridFull);n[t][a]=!n[t][a],e.setState({gridFull:n}),!0===e.play&&(e.selectBox=!1)}},e.seed=function(){if(!0!==e.state.isPlaying){for(var t=E(e.state.gridFull),a=0;a<e.rows;a++)for(var n=0;n<e.cols;n++)1===Math.floor(4*Math.random())&&(t[a][n]=!0);e.setState({gridFull:t})}},e.playButton=function(){!1!==e.setState.isPlaying&&(clearInterval(e.intervalId),e.intervalId=setInterval(e.play,e.speed),e.setState({isPlaying:!0}))},e.pauseButton=function(){!1!==e.setState.isPlaying&&clearInterval(e.intervalId)},e.slow=function(){!1!==e.setState.isPlaying&&(e.speed=1e3,e.playButton())},e.fast=function(){!1!==e.setState.isPlaying&&(e.speed=100,e.playButton())},e.clear=function(){var t=Array(e.rows).fill().map((function(){return Array(e.cols).fill(!1)}));e.setState({gridFull:t,generation:0,isPlaying:!1})},e.gridSize=function(t){switch(t){case"1":e.cols=25,e.rows=25;break;case"2":e.cols=50,e.rows=50;break;default:e.cols=100,e.rows=100}e.clear()},e.play=function(){for(var t=e.state.gridFull,a=E(e.state.gridFull),n=0;n<e.rows;n++)for(var l=0;l<e.cols;l++){var r=0;n>0&&t[n-1][l]&&r++,n>0&&l>0&&t[n-1][l-1]&&r++,n>0&&l<e.cols-1&&t[n-1][l+1]&&r++,l<e.cols-1&&t[n][l+1]&&r++,l>0&&t[n][l-1]&&r++,n<e.rows-1&&t[n+1][l]&&r++,n<e.rows-1&&l>0&&t[n+1][l-1]&&r++,n<e.rows-1&&e.cols-1&&t[n+1][l+1]&&r++,t[n][l]&&(r<2||r>3)&&(a[n][l]=!1),t[n][l]||3!==r||(a[n][l]=!0)}e.setState({gridFull:a,generation:e.state.generation+1})},e.speed=100,e.rows=30,e.cols=50,e.state={generation:0,gridFull:Array(e.rows).fill().map((function(){return Array(e.cols).fill(!1)})),isPlaying:!1},e}return Object(l.a)(a,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("h1",null," Conway's Game of Life"),i.a.createElement("h2",null,"Click on cells to make them live (green) or click SEED, then press PLAY."),i.a.createElement("h3",null,"For a new game, press PAUSE, then CLEAR. SEED it again or make your own, then press PLAY."),i.a.createElement(b,{playButton:this.playButton,pauseButton:this.pauseButton,slow:this.slow,fast:this.fast,clear:this.clear,seed:this.seed,gridSize:this.gridSize}),i.a.createElement("h2",null,"Generations: ",this.state.generation),i.a.createElement(v,{gridFull:this.state.gridFull,rows:this.rows,cols:this.cols,selectBox:this.selectBox}))}}]),a}(i.a.Component);function E(e){return JSON.parse(JSON.stringify(e))}u.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(y,null),i.a.createElement(d,null)),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.4f566a69.chunk.js.map