import numpy as np, wave
SR=48000; O=0.30; TAG=88.30; DUR=99.90
out=np.zeros(int(SR*(DUR+1)))
rng=np.random.default_rng(7)
import bisect
KN=[0,24.93,29.76,55.45,55.60,58.75,61.97,1000]; KO=[0,24.93,28.54,54.23,54.40,54.63,57.40,1000-4.57]
def o2n(x):
    if x<0: return x
    for i in range(len(KO)-1):
        if x<=KO[i+1]: return KN[i]+(x-KO[i])/(KO[i+1]-KO[i])*(KN[i+1]-KN[i])
    return x+4.57
def add(sig,t,g=1.0):
    i=int((o2n(t)+O)*SR); n=min(len(sig),len(out)-i)
    if n>0: out[i:i+n]+=sig[:n]*g
def lp(x,a):  # one-pole lowpass, a in (0,1)
    y=np.zeros_like(x); s=0.0
    for i,v in enumerate(x): s+=a*(v-s); y[i]=s
    return y
def env(n,att,dec):
    t=np.arange(n)/SR; return np.minimum(1,t/max(att,1e-4))*np.exp(-t/dec)
def click(f=2400,d=0.012):
    n=int(SR*d); t=np.arange(n)/SR; return np.sin(2*np.pi*f*t)*env(n,0.0005,0.003)
def ticks(t0,dur,rate=22,g=0.18):
    k=int(dur*rate)
    for j in range(k): add(click(2600+rng.uniform(-150,150)),t0+j/rate,g*(0.6+0.4*(1-j/k)))
def whoosh(t,d=0.55,g=0.32,up=True):
    n=int(SR*d); x=rng.standard_normal(n)
    a=np.linspace(0.04,0.25,n) if up else np.linspace(0.25,0.04,n)
    y=np.zeros(n); s=0
    for i in range(n): s+=a[i]*(x[i]-s); y[i]=s
    e=np.sin(np.pi*np.linspace(0,1,n))**2
    add(y*e/np.max(np.abs(y))*g,t)
def thud(t,g=0.55):
    n=int(SR*0.7); tt=np.arange(n)/SR; f=70*np.exp(-tt*3)+42
    ph=2*np.pi*np.cumsum(f)/SR; y=np.sin(ph)*env(n,0.002,0.18)
    nz=lp(rng.standard_normal(n),0.08)*env(n,0.001,0.02)*0.6
    add((y+nz)*g,t)
def pop(t,f=880,g=0.16):
    n=int(SR*0.09); tt=np.arange(n)/SR; y=np.sin(2*np.pi*(f*tt+ 300*tt*tt))*env(n,0.002,0.025); add(y*g,t)
def swipe(t,g=0.12):
    n=int(SR*0.26); x=rng.standard_normal(n); y=x-lp(x,0.3); e=np.sin(np.pi*np.linspace(0,1,n))**3; add(y*e*g,t)
def shimmer(t,d,g=0.10):
    n=int(SR*d); tt=np.arange(n)/SR; y=np.zeros(n)
    for f in (1318.5,1975.5,2637.0): y+=np.sin(2*np.pi*f*tt+rng.uniform(0,6))
    y*= (np.sin(np.pi*np.linspace(0,1,n))**2)*(0.5+0.5*np.sin(2*np.pi*7*tt)); add(y/3*g,t)
def hit(t,g=0.5):
    n=int(SR*2.2); tt=np.arange(n)/SR
    y=sum(np.sin(2*np.pi*f*tt)*a for f,a in ((98,1),(196,.5),(294,.25),(392,.12)))*env(n,0.004,0.7)
    add(y*g/1.9,t)
# S1
whoosh(0.15,0.5,0.2); swipe(3.85); thud(3.95,0.5); ticks(3.9,0.9,g=.14)
# S2
swipe(5.5)
for i in range(6): pop(5.8+i*0.32,620+i*60)
thud(10.0,0.35); thud(18.4,0.45)
# S3
swipe(20.9); whoosh(21.0,1.3,0.28); pop(22.3,880); thud(22.8,0.35); pop(26.0,980)
# S4
swipe(29.0); thud(29.35,0.3); whoosh(34.0); ticks(34.0,0.8,g=.13); whoosh(34.6); ticks(34.6,0.8,g=.13); swipe(37.0,0.1); thud(38.2,0.45)
# S5
swipe(40.4)
for i in range(39): pop(43.9+i*0.014*1.0+0.0,700+i*8,0.05)
# S6
swipe(46.9); whoosh(46.95,0.5,0.2)
for i in range(35): pop(48.8+i*0.1,980,0.07)
thud(54.35,0.45); pop(57.9,600,0.16); pop(60.65,600,0.16)
# S7
swipe(62.85); whoosh(66.9,1.0,0.25); thud(67.9,0.35)
# S8
swipe(72.2); thud(74.45,0.6)
# S9
swipe(77.5); whoosh(77.55,0.5,0.2)
# S10
swipe(82.05); whoosh(82.1,0.45,0.18); thud(83.35,0.55); whoosh(84.45,0.45,0.22); whoosh(85.9,0.45,0.22); hit(86.7,0.35)
# OUT
whoosh(88.0,0.6,0.25); shimmer(TAG+0.2,1.3); shimmer(TAG+1.95,1.8); hit(TAG+3.75,0.55)
out=out/max(1e-9,np.max(np.abs(out)))*0.7
w=wave.open('sfx.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((out*32767).astype(np.int16).tobytes()); w.close(); print('ok',len(out)/SR)
