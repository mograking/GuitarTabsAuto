
const app = document.getElementById('app');

function setNewSongID(urlwithgetdata){
	
	const newsongid_ = (new URL(urlwithgetdata)).searchParams.get('songid')
	document.getElementById('audioSource').src = 'wav/tab_'+newsongid_+'.wav';

}

function BuildRiff(props){


	function toFret(x){
		if( x=='a' || x=='A') return 10;
		if( x=='b' || x=='B') return 11;
		if( x=='c' || x=='C') return 12;
		if( x=='d' || x=='D') return 13;
		return parseInt(x)
	}
	
	function sendTabData(dataToSend){
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

	function disablePlayPause(){
		var playbuttonx = document.getElementById('PlayButton');
		var pausebuttonx =document.getElementById('PauseButton');

		pausebuttonx.disabled= true;
		playbuttonx.disabled= true;

		playbuttonx.innerHTML = "WAIT";
		pausebuttonx.innerHTML = "WAIT";


	}

	function enablePlayPause(){
		var playbuttonx = document.getElementById('PlayButton');
		var pausebuttonx =document.getElementById('PauseButton');

		pausebuttonx.disabled= false;
		playbuttonx.disabled= false;

		playbuttonx.innerHTML = "PLAY";
		pausebuttonx.innerHTML = "PAUSE";

	}

	function buildTabs(event){
		var cols = 60
		var rows = 7

		var defaultText = '-'.repeat(cols) +'\n';
		defaultText= defaultText.repeat(6);

		disablePlayPause();
		if ( document.getElementById('TablatureInput1').value != defaultText) 
		setTimeout(enablePlayPause, 8000);
		else setTimeout(enablePlayPause, 4000);

		var dataToSend = [];
		var initial_time = 0;


		for ( var indexTab = 0; indexTab < props.numberOfBoards; indexTab++ ) {
			var Rawtext = document.getElementById('TablatureInput'+indexTab).value;
			var Strings_array = Rawtext.split('\n');
			var es  = 0 ;
			
			for ( var indexString = 0; indexString < 6; indexString++ ) {

				var stringLength = Strings_array[indexString].length;
				if ( es < stringLength ) es = stringLength;
				for ( var indexTime = 0; indexTime < stringLength; indexTime++ ) {
					if( Strings_array[indexString][indexTime] != '-') {
						dataToSend.push( [ indexTime+initial_time, 5-indexString, toFret(Strings_array[indexString][indexTime] )   ]  ) ;

					}
				}

			}

			initial_time = initial_time + es;
		}

		dataToSend = dataToSend.sort( (a,b) => {return a[0] - b[0]} );
		sendTabData(dataToSend);


	}
	return (
		<button  className={'button dashbutton is-secondary is-large is-rounded '} onClick={buildTabs} >BUILD</button>
	)
}

function PlayRiff(props){
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
		<>
		<button  className={'button dashbutton is-primary is-large is-rounded '} id={'PlayButton'} onClick={loadAndPlayAudio} >PLAY</button>
		<button className={'button dashbutton is-info is-large is-rounded '} id={'PauseButton'} onClick={PauseAudio} >PAUSE< /button>
		<audio id={'audio'} controls={'controls'} >
		<source id={'audioSource'} src=""></source>
		</audio>
		</>
	)
}

function ClearTablature(props){

	function clearTablature(){
	var cols = 60
	var rows = 7

	var defaultText = '-'.repeat(cols) +'\n';
	defaultText= defaultText.repeat(6);
		for ( var indexTab = 0; indexTab < props.numberOfBoards; indexTab++ ) {

			var board_ = document.getElementById('TablatureInput'+indexTab);
			board_.value = defaultText;
		}
	}



	return (
		<button  className={'button dashbutton is-warning is-rounded is-large'} onClick={clearTablature} >CLEAR</button>
	)
}

function ShowExample(props){


	var godfathertheme1 = 
		"---0-3-2-0-3-0-2-0-------------0-3-2-0-3-0-2-0--------------\n-0-----------------1-3--0----0-----------------0---------1-4\n-------------------------------------------------3-2---2----\n------------------------------------------------------------\n------------------------------------------------------------\n------------------------------------------------------------\n";

	var godfathertheme2 = 
		"-2----------0-----------------------------------------------\n--------1-4------------3-1-0-3-1-1-0-0----------------------\n------2--------------0--------------------------------------\n-------------------2--------------------1--2----------------\n------------------------------------------------------------\n------------------------------------------------------------\n";




	function showExample(){
		var board1 = document.getElementById('TablatureInput0');
		var board2 = document.getElementById('TablatureInput1');
		board1.value = godfathertheme1;
		board2.value = godfathertheme2;
	}

	return (
		<button  className={'button dashbutton is-info is-rounded is-large'} onClick={showExample} >Example</button>
	)
}


function TextBoard(props){
	var cols = 60
	var rows = 7

	var defaultText = '-'.repeat(cols) +'\n';
	defaultText= defaultText.repeat(6);

	return (
		<form>
		<textarea className={'TablatureInput'}  id={'TablatureInput'+props.tabindex} name={'TablatureInput'+props.tabindex} rows={rows} cols={cols} defaultValue={defaultText} >
		</textarea>
		</form>
	)

}

function GTextAutoBoards(props){

	const textboardsarray = [];

	for( var i= 0; i<props.numberOfBoards;i++){
		textboardsarray.push( <TextBoard baseID={props.baseID} key={i} tabindex={i} /> );
	}


	return (
		<>
		{textboardsarray}
		</>
	)

}



function GBoardv3(props){

	var baseID = 'GTA';

	return (

		<div className={'GTAapp'}>
		<div className={'dashcontrol'}>
		<BuildRiff baseID={baseID} numberOfBoards={2} />
		<PlayRiff baseID={baseID} />
		<ClearTablature baseID={baseID} numberOfBoards={2} />
		<ShowExample baseID={baseID} numberOfBoards={2} />
		</div>
		<GTextAutoBoards baseID={baseID} numberOfBoards={2} />
		</div>

	)
}

ReactDOM.render(<> <GBoardv3 />  </>, app)
