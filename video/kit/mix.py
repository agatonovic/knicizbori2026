# mix.py  —  python3 mix.py VO TAG_SEC DUR OUT.mp4   (run in episode folder: video_noaudio.mp4, sfx.wav, audio/tag.mp3, audio/music2.mp3)
import subprocess,sys
vo=sys.argv[1]; TAG=float(sys.argv[2]); DUR=float(sys.argv[3]); out=sys.argv[4]
O=0.30; T=TAG+O
# muzika: 0.14 ispod glasa, pred outro raste na 0.28, na outro-u 0.5, fade-out zadnje 1.5 s
TE=T+3.97  # kraj tag glasa
mvol=f"if(lt(t,{T-1.2}),0.14,if(lt(t,{T}),0.14+0.14*(t-{T-1.2})/1.2,if(lt(t,{TE}),0.28,if(lt(t,{TE+0.5}),0.28+0.12*(t-{TE})/0.5,0.4))))"
fc=(f"[0:a]adelay={int(O*1000)}|{int(O*1000)},volume=1.0[v];"
    f"[1:a]adelay={int(T*1000)}|{int(T*1000)},volume=1.4[g];"
    f"[2:a]atrim=0:{DUR},afade=t=in:st=0:d=2,volume='{mvol}':eval=frame,afade=t=out:st={DUR-1.5}:d=1.5[m];"
    f"[3:a]volume=1.0[s];"
    f"[v][g][m][s]amix=inputs=4:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]")
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',vo,'-i','audio/tag.mp3','-i','audio/music2.mp3','-i','sfx.wav',
 '-filter_complex',fc,'-map','[a]','-ac','2','mix.wav'],check=True)
subprocess.run(['ffmpeg','-y','-loglevel','error','-i','video_noaudio.mp4','-i','mix.wav','-map','0:v','-map','1:a',
 '-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',out],check=True)
print('ok',out)
