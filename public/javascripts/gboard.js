const app = document.getElementById('app');
var globalTotalSlots = 100;
var dataTabs = new Array(6).fill(0).map(() => new Array(globalTotalSlots).fill(-1));
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
		xplayer.load();
		xplayer.loop = true;
		xplayer.play();
	}

	function PauseAudio(){
		var xplayer  = document.getElementById('audio');
		xplayer.pause();
	}

	return (
		<div className={'PlayInterfaceDiv'} >
		<button className={'dashcontrols button is-danger is-large'} id={'PlayButton'} onClick={loadAndPlayAudio} value={'Play'} >PLAY< /button>
		<button className={'dashcontrols button is-danger is-large'} id={'PauseButton'} onClick={PauseAudio} value={'Pause'} >PAUSE< /button>
		<audio id={'audio'} controls={'controls'} >
			<source id={'audioSource'} src=""></source>
		</audio>
		</div>
		
	)
}

function getTabsAll(){
	var tabslist =[];
	for ( let indexTime = 0 ; indexTime < globalTotalSlots; indexTime++ ) {
		for( let indexString = 0; indexString< 6; indexString++ ) {
			if( dataTabs[indexString][indexTime] !=-1 ){
				tabslist.push( [ indexTime, indexString, dataTabs[indexString][indexTime] ] );
			}
		}
		}
	dataToSend = tabslist;
}

function sendTabData(){
	getTabsAll();
	const postbodytabs = JSON.stringify(dataToSend);

	console.log(dataToSend);

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


function ClearTablature(props){

	function clearTablature(){
		var gstrlist = ['E', 'A', 'D', 'G', 'b', 'ee']
		for( var gstrnum=0; gstrnum<6; gstrnum++ )
		{
			for(var gtimeslot = 0; gtimeslot<globalTotalSlots; gtimeslot++){
				var gstrname = gstrlist[gstrnum];
				var singleslotid = 'N1-'+gstrname.toString()+'-'+gtimeslot.toString()+'nu';
				var singleslot = document.getElementById('N1-'+gstrname+'-'+gtimeslot.toString()+'nu');
				singleslot.innerHTML='';
				dataTabs = new Array(6).fill(0).map(() => new Array(globalTotalSlots).fill(-1));

			}
		
		}
	}
	
	return (
		<button className={'dashcontrols button is-info is-large'} onClick={clearTablature} >Clear Tabs</button>
	)
}


function SubmitData(props){
	return (
		<button className={'dashcontrols button is-info is-large'} onClick={sendTabData} >Build</button>
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
			if(fretnumber==-2){

			document.getElementById(fullid+'sel').style.display = 'none';
			document.getElementById(fullid+'nu').style.display = '';
			document.getElementById(fullid+'nu').style.width = '20px';
			return;
			}

			document.getElementById(fullid+'nu').innerHTML= fretnumber!=-1 ? fretnumber : '';
			document.getElementById(fullid+'sel').style.display = 'none';
			document.getElementById(fullid+'nu').style.display = '';
			document.getElementById(fullid+'nu').style.width = '20px';
			dataTabs[ StringToRow[props.gstrid.toString()] ][ props.gskey ] =fretnumber;
		}
	}


	function Fretselector(props){

		return (
			<>
<div className={"fretbtns"}>
<span className={"fretbtnsclose"} onClick={handlefretbtnclick(-2)}>&times;</span>
			<input hidden type="text" id={fullid+'input'} defaultValue={''} />
			<p>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(0)} id={fullid+"fret0"}>0</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(1)} id={fullid+"fret1"}>1</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(2)} id={fullid+"fret2"}>2</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(3)} id={fullid+"fret3"}>3</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(4)} id={fullid+"fret4"}>4</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(5)} id={fullid+"fret5"}>5</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(6)} id={fullid+"fret6"}>6</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(7)} id={fullid+"fret7"}>7</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(8)} id={fullid+"fret8"}>8</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(9)} id={fullid+"fret9"}>9</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(10)} id={fullid+"fret10"}>10</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(11)} id={fullid+"fret11"}>11</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(12)} id={fullid+"fret12"}>12</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(13)} id={fullid+"fret13"}>13</button>
<button className={"button is-primary fretselectbtn"} onClick={handlefretbtnclick(-1)} id={fullid+"clear"}>clear</button>
			</p>
</div>
			</>
		)
	}





	function paramtest(){

		const allfretselectors = document.querySelectorAll('.gsitemfretseldiv');

		allfretselectors.forEach( fsts =>{
			fsts.style.display= 'none';
		})


		document.getElementById(fullid+'nu').style.display = 'none';
		document.getElementById(fullid+'sel').style.display = 'block';

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
		for( let i =0; i<globalTotalSlots; i++ ){
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

ReactDOM.render(<> <SubmitData/> <ClearTablature/> <PlayInterface/> <GSBoardv2 gsbid={1} /> </>, app)
