
const app = document.getElementById('app');

function setNewSongID(urlwithgetdata){
	
	const newsongid_ = (new URL(urlwithgetdata)).searchParams.get('songid')
	document.getElementById('PlayButton').disabled = false;
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

	function buildTabs(event){

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
						dataToSend.push( [ indexTime+initial_time, indexString, toFret(Strings_array[indexString][indexTime] )   ]  ) ;

					}
				}

			}

			initial_time = initial_time + es;
		}

		dataToSend = dataToSend.sort( (a,b) => {return a[0] - b[0]} );
		sendTabData(dataToSend);


	}
	return (
		<div className={'buildriff dashcontrol'}>
		<button  className={'button is-secondary is-large'} onClick={buildTabs} >BUILD </button>
		</div>
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
		<div className={'playriff dashcontrol'}>
		<button  className={'button is-danger is-large'} id={'PlayButton'} onClick={loadAndPlayAudio} >PLAY</button>
		<button className={'button is-info is-large'} id={'PauseButton'} onClick={PauseAudio} >PAUSE< /button>
		<audio id={'audio'} controls={'controls'} >
		<source id={'audioSource'} src=""></source>
		</audio>
		</div>
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

		<>
		<BuildRiff baseID={baseID} numberOfBoards={2} />
		<PlayRiff baseID={baseID} />
		<GTextAutoBoards baseID={baseID} numberOfBoards={2} />
		</>

	)
}

ReactDOM.render(<> <GBoardv3 />  </>, app)
