import subprocess,sys

notes_directory = "../assets/allthenotes/"

"""
guitarNote

gstring is E A D G b e
fret is an int from 0 to 13 inclusive

"""
class guitarNote:
    def __init__(self, gstring, fret):
        self.gstring = gstring
        self.fret = fret



"""
get_note_file_name

gstring is a single character string that indicates guitar string. Can be E A D G b e
fret is a int that indicates fret from 0 to 13

returns file name of the note

"""
def get_note_file_name(gstring, fret):
    return str(gstring)+"string_"+str(fret)+".wav"

"""
get_note_file

notes_directory is a string indicating path to note collection
note is a note object

return the full path to note as a string
"""
def get_note_file(notes_directory, note):
    return notes_directory+get_note_file_name(note.gstring, note.fret)

def get_note(gstring, fret):
    return notes_directory+get_note_file_name(gstring, fret)


"""
sox_mix_at

song is the base song
note is the note to be added
time is the time in the song at which note will be added

"""
def sox_mix_at(song, note, time):

    # create temp song of note with padding -> temp_note
    execute_string = f"""sox {note} temp_note.wav pad {time}"""
    execute_command(execute_string)

    # mix temp note with base song
    execute_string = f"""sox -m {song} temp_note.wav  temp_song.wav"""
    execute_command(execute_string)

    # move temp_song to song
    execute_string = f"""mv temp_song.wav {song}"""
    execute_command(execute_string)


def sox_mix_at_v2(song, note, time):

    temporary = "temp_sox_mix_at_v2.wav"
    first_half = "temp_first_half.wav"
    second_half = "temp_second_half.wav"
    new_second_half = "temp_new_second_half.wav"


    execute_string = f"""sox {song} {first_half} trim 0 {time}"""
    execute_command(execute_string)

    execute_string = f"""sox {song} {second_half} trim {time}"""
    execute_command(execute_string)

    execute_string = f"""sox -m {second_half} {note} {new_second_half}"""
    execute_command(execute_string)

    execute_string = f"""sox {first_half} {new_second_half} {temporary} splice 1"""
    execute_command(execute_string)

    replace_original(song, temporary)
    

"""
sox_pad
Given a 'song' pads silence of 'startpad' seconds to start and 'endpad' seconds to end of the song
"""
def sox_pad(song, startpad, endpad):
    temporary = "temp_pad.wav"
    execute_string = f"""sox {song} {temporary} pad {startpad} {endpad}"""
    execute_command(execute_string)
    replace_original(song, temporary)

def execute_command(command_to_execute):
    bashCommand = command_to_execute
    print("Trying " + bashCommand)
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()

def mplay(song):
    execute_command("mplayer "+song)

def copy_over_from_assets(oldfile, newfile):
    execute_string="""cp """+oldfile+""" ./"""+newfile
    execute_command(execute_string)

def sox_create_empty_length(length, newsong):
    base_empty = notes_directory+"empty.wav"
    copy_over_from_assets(base_empty, newsong)
    sox_pad(newsong, 0, length-0.5)

def read_tablist_from_file(file):
    f = open(file,'r')
    lines = f.read().splitlines()
    tablist =[]
    for line in lines:
        line = line.split()
        tablist += [ [line[0], int(line[1]), float(line[2])] ]
    return tablist


def create_new_song_from_tablist(newsong, length, tablist):
    sox_create_empty_length(length, newsong)
    for tab_item in tablist:
        item_gstring = tab_item[0]
        item_fret = tab_item[1]
        item_time = tab_item[2]
        sox_mix_at_v2(newsong, get_note(item_gstring, item_fret) , item_time)
    
def test_sox_mix_at():
    testfile = "test_sox_mix_at_song.wav"
    sox_create_empty_length(5, testfile)
    sox_mix_at_v2(testfile, get_note("E",3), 1)

def replace_original(song, temporary):
    execute_string = f"""mv {temporary} {song}"""
    execute_command(execute_string)

def sox_append(song, note):
    temporary = "temp_append.wav"

    execute_string = f"""sox {song} {note} splice {temporary}"""
    execute_command(execute_string)

    replace_original(song, temporary)

sampletabs = read_tablist_from_file("sample_001.tabs")
create_new_song_from_tablist("svn.wav", 8, sampletabs)
    

