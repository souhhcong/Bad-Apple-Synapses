import os
import subprocess
os.chdir(os.path.abspath(os.getcwd()))
subprocess.call(['ffmpeg', '-i', 'bad_apple.mp4', '-vf', 'scale=48:36:flags=neighbor', 'bad_apple_1.mp4'])

import skvideo.io
import numpy as np
print("New bit representation file? (y/n)")
c = input()
if c == 'y':
    videodata = skvideo.io.vread("bad_apple_1.mp4")  
    a = np.array(videodata) > 122
    a = a.transpose(0, 3, 1, 2).astype(int)

    l = []
    for x in a:
        l.append(x[0])

    with open('bit.txt', 'w') as f:
        for line in l:
            f.write(f"{line.tolist()}\n")
        remove_chars = len(os.linesep)
        f.truncate(f.tell() - remove_chars)
        # f.write('\n'.join(l.tolist()))

os.system("index.html")
# subprocess.call(["ffplay", "-nodisp", "-autoexit", "bad apple.mp3"])