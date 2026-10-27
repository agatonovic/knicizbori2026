import numpy as np, wave
SR=48000; O=0.30; TAG=110.45; DUR=117.40
out=np.zeros(int(SR*(DUR+1)))
rng=np.random.default_rng(7)
def add(sig,t,g=1.0):
    i=int((t+O)*SR); n=min(len(sig),len(out)-i)
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
whoosh(0.2,0.6,0.2); whoosh(5.4,1.0,0.22); thud(6.35,0.4)
# S2
swipe(9.9); whoosh(11.6,0.5,0.2); thud(13.65,0.4)
# S3
swipe(17.1); whoosh(20.55); whoosh(21.55,0.45,0.2); whoosh(22.35,0.45,0.18); ticks(24.8,0.9,g=.13)
whoosh(29.35); ticks(31.5,0.9,g=.13); thud(34.25,0.45)
# S4
swipe(37.9); whoosh(39.85,1.2,0.28); ticks(39.9,1.3,g=.12)
# S5
swipe(45.4)
for i in range(0,615,15): pop(45.7+(i/615)*4.8,700+i,0.05)
ticks(51.25,1.1,g=.12); thud(52.4,0.35); swipe(55.5,0.1)
for k in range(8): pop(59.9+k/3,880,0.06)
thud(63.9,0.55)
# S6
swipe(65.55); thud(65.65,0.5); whoosh(69.35,0.8,0.22); pop(70.25,620,0.12)
# S7
swipe(73.3); whoosh(76.6,1.0,0.28); pop(77.6,700); pop(77.8,900)
for i in range(8): pop(80.0+i*0.12,600+i*40,0.09)
# S8
swipe(85.0); thud(87.75,0.5); whoosh(90.3,0.5,0.2); thud(92.75,0.4)
# S9
swipe(95.7); pop(97.8,1320,0.14); pop(97.92,1760,0.12)
# S10
swipe(100.2); whoosh(100.25,0.5,0.2)
# S11
swipe(104.45); whoosh(104.5,0.45,0.18); thud(105.75,0.55); whoosh(106.75,0.45,0.22); whoosh(108.15,0.45,0.22); hit(108.95,0.35)
# OUT
whoosh(110.15,0.6,0.25); shimmer(TAG+0.2,1.3); shimmer(TAG+1.95,1.8); hit(TAG+3.75,0.55)
out=out/max(1e-9,np.max(np.abs(out)))*0.7
w=wave.open('sfx.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((out*32767).astype(np.int16).tobytes()); w.close(); print('ok',len(out)/SR)
