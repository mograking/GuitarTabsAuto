import sys

samplefilename = sys.argv[1]

samplefile = open(samplefilename,'r')

gtabdata = samplefile.read().splitlines()

print(gtabdata)

for line in gtabdata:
    if len(line)>0 :
        ll = line.split()
        if ll[0] == '0':
            print('silence for ' + ll[1])  
        else:
            n = len(ll) - 1
            for i in range(1,n+1,2):
                print("play string " + ll[i] + " fret "+ll[i+1] )
                

samplefile.close()
