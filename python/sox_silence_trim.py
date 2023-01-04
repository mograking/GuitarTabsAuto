import subprocess,sys

gstrings = ["Estring","Astring","Dstring","Gstring","bstring","estring"]

frets = [ x for x in range(0,14)]
print(gstrings)
print(frets)


for gstr in gstrings:
    for frt in frets:
        bashCommand = "sox ../assets/raw/"+str(gstr)+"_"+str(frt)+".wav ../assets/trimmed/"+str(gstr)+"_"+str(frt)+".wav" +" silence 1 0.1 1% 1 0.1 1%"
        process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
        output, error = process.communicate()
