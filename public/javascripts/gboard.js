const app = document.getElementById('app');
var dataTabs = new Array(6).fill(0).map(() => new Array(40).fill(-1));
var dataToSend;

const StringToRow = {
	'E' : 0,
	'A' : 1,
	'D' : 2,
	'G' : 3,
	'b' : 4,
	'ee' : 5,
}


function setNewSongID(urlwithgetdata){
	
	const newsongid_ = (new URL(urlwithgetdata)).searchParams.get('songid')
	document.getElementById('PlayButton').disabled = false;
	document.getElementById('audioSource').src = 'wav/tab_'+newsongid_+'.wav';

}


function PlayInterface(props){

	function loadAndPlayAudio(){
		
		var xplayer  = document.getElementById('audio');
		console.log(xplayer);
		xplayer.load();
		xplayer.play();
	}

	return (
		<div className={'PlayInterfaceDiv'} >
		<button className={'button is-danger is-large'} id={'PlayButton'} onClick={loadAndPlayAudio} value={'Play'} >PLAY< /button>
		<audio id={'audio'} controls={'controls'} >
			<source id={'audioSource'} src=""></source>
		</audio>
		</div>
		
	)
}

function getTabsAll(){
	var tabslist =[];
	for ( let indexTime = 0 ; indexTime < 40; indexTime++ ) {
		for( let indexString = 0; indexString< 6; indexString++ ) {
			if( dataTabs[indexString][indexTime] !=-1 ){
				tabslist.push( [ indexTime, indexString, dataTabs[indexString][indexTime] ] );
			}
		}
		}
	console.log(tabslist);
	dataToSend = tabslist;
}

function sendTabData(){
	getTabsAll();
	const postbodytabs = JSON.stringify(dataToSend);

  	fetch('/upload_data', {
    		method: 'post',
    		body: postbodytabs,
		headers :{
			"Content-Type" : "application/json"
		}
  	})
    	.then((res) => {  
		console.log(res.url)
		setNewSongID(res.url)

	} )

	
    	.catch((err) => ('Error occurred', err))
}



function setFretValue(gsfullid){
	console.log(gsfullid+'clicked');
	modal.style.display = "block";
}

function CollectData(props){
	return (
		<button className={'button is-warning is-large'} onClick={gettabsall} >get data from all</button>
	)
}

function CollectData(props){
	return (
		<button className={'button is-warning is-large'} onClick={gettabsall} >get data from all</button>
	)
}

function SubmitData(props){
	return (
		<button className={'button is-info is-large'} onClick={sendTabData} >Send data to server</button>
	)
}

function GSBoardv2(props){

	return ( 
			<div className={'gsboardv2c'} >
			< GSasATable gsbid={props.gsbid} gstrid={'E'} />
		<hr className={'visualstringtest'} />
			< GSasATable gsbid={props.gsbid} gstrid={'A'} />
		<hr className={'visualstringtest'} />
			< GSasATable gsbid={props.gsbid} gstrid={'D'} />
		<hr className={'visualstringtest'} />
			< GSasATable gsbid={props.gsbid} gstrid={'G'} />
		<hr className={'visualstringtest'} />
			< GSasATable gsbid={props.gsbid} gstrid={'b'} />
		<hr className={'visualstringtest'} />
			< GSasATable gsbid={props.gsbid} gstrid={'ee'} />
		<hr className={'visualstringtest'} />
			</div>
	       )

}


function GSItem(props){

	let fullid = 'N'+props.gsbid.toString()+'-'+props.gstrid.toString()+'-'+props.gskey.toString();


	function handlefretbtnclick(fretnumber) {
		return (eventobj) =>{
			console.log(fretnumber);
			
			document.getElementById(fullid+'nu').innerHTML= fretnumber!=-1 ? fretnumber : '';
			document.getElementById(fullid+'sel').style.display = 'none';
			document.getElementById(fullid+'nu').style.display = '';
			document.getElementById(fullid+'nu').style.width = '20px';
			dataTabs[ StringToRow[props.gstrid.toString()] ][ props.gskey ] =fretnumber;
			console.log(dataTabs[ StringToRow[props.gstrid.toString()] ]);
		}
	}


	function Fretselector(props){

		return (
			<>
<div className={"fretbtns"}>
<span className={"fretbtnsclose"}>&times;</span>
			<input hidden type="text" id={fullid+'input'} defaultValue={''} />
			<p>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(0)} id={"fret0"}>0</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(1)} id={"fret1"}>1</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(2)} id={"fret2"}>2</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(3)} id={"fret3"}>3</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(4)} id={"fret4"}>4</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(5)} id={"fret5"}>5</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(6)} id={"fret6"}>6</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(7)} id={"fret7"}>7</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(8)} id={"fret8"}>8</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(9)} id={"fret9"}>9</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(10)} id={"fret10"}>10</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(11)} id={"fret11"}>11</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(12)} id={"fret12"}>12</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(13)} id={"fret13"}>13</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(-1)} id={"clear"}>clear</button>
			</p>
</div>
			</>
		)
	}


	function paramtest(){

		document.getElementById(fullid+'nu').style.display = 'none';
		document.getElementById(fullid+'sel').style.display = 'block';

	}

	function handleFretChange(){
		console.log(document.getElementById(fullid+'sel').firstChild.value);
		document.getElementById(fullid+'sel').style.display = 'none';

	}

	return ( 
		<>
			<td className={'gstableitemc'} onClick={paramtest} id={fullid+'nu'}> 
		</td>
		<td id={fullid+'sel'} className={'gsitemfretseldiv'}>
		<Fretselector fullid={fullid} />
		</td>
		</>
	       )

}


function GSasATable(props){

	const rows = [] 
		for( let i =0; i<40; i++ ){
			rows.push(<GSItem key={i} gskey={i} gsbid={props.gsbid} gstrid={props.gstrid} />)
		}

	return ( <table className={'gstablec'} >
			<tbody>
			<tr className={'gstablerowc'} >
			{rows}
			</tr>
			</tbody>
			</table>
	       );
}


function GBoard(props){

	return (
			<div className={'gboardc'}>
			<GString id={'Emajor'} />
			<GString id={'A'} />
			<GString id={'D'} />
			<GString id={'G'} />
			<GString id={'b'} />
			<GString id={'eminor'} />
			</div>
	       )
}

function GString(props) {

	function testmouse(){
		console.log('mouse here');
	}

	function clickOnString(e){
		var x = e.clientX;
		var y = e.clientY;
		console.log(x);
		console.log(y);
		console.log(e.currentTarget.id);
		var selfobj = document.getElementById(e.currentTarget.id).getBoundingClientRect();
		console.log(selfobj.left);
		console.log(x-selfobj.left);
	}

	return (
			<div id={props.id} onClick={clickOnString} className={'gstringc'}></div>
	       )
}

ReactDOM.render(<> <CollectData/> <SubmitData/> <PlayInterface/> <GSBoardv2 gsbid={1} /> </>, app)
