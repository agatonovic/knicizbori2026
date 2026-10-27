import numpy as np, wave
SR=48000; O=0.30; TAG=79.60; DUR=86.50
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
ticks(0.1,0.9); thud(1.0,0.5)
# S2
swipe(5.1); ticks(5.45,0.8,g=.14); whoosh(6.35); ticks(6.6,0.8,g=.14); whoosh(8.95); thud(9.8,0.45)
# S3
swipe(12.0); whoosh(12.0,0.45); whoosh(13.85); ticks(13.9,1.0,g=.14); thud(15.6,0.45)
# S4
swipe(17.5)
for i in range(6): pop(17.85+i*0.32,620+i*60)
whoosh(22.95,0.6,0.22)
# S5
swipe(26.9); whoosh(26.95,0.5,0.2)
for i in range(17): pop(29.3+i*0.12,980,0.09)
thud(36.35,0.42)
for i in range(12): pop(36.4+i*0.13,560,0.12)
# S6
swipe(40.5); whoosh(41.95); ticks(42.0,1.0,g=.13); whoosh(46.45); ticks(46.5,0.9,g=.13)
for i in range(3): pop(47.7+i*0.22,760,0.1)
# S7
swipe(49.0); whoosh(49.3); ticks(49.35,0.8,g=.12); whoosh(50.0); ticks(50.05,0.8,g=.12)
for i in range(10): pop(51.75+i*0.3,700+i*25,0.11)
# S8
swipe(59.4); whoosh(59.45,0.5,0.18); pop(65.5,1320,0.14); pop(65.62,1760,0.12); thud(66.1,0.4)
# S9
swipe(69.5); whoosh(69.55,0.5,0.2)
# S10 student list
swipe(73.75); whoosh(73.8,0.45,0.18); thud(74.95,0.55); whoosh(75.9,0.45,0.22); whoosh(77.3,0.45,0.22); hit(78.05,0.35)
# OUT
whoosh(79.3,0.6,0.25); shimmer(TAG+0.2,1.3); shimmer(TAG+1.95,1.8); hit(TAG+3.75,0.55)
out=out/max(1e-9,np.max(np.abs(out)))*0.7
w=wave.open('sfx.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((out*32767).astype(np.int16).tobytes()); w.close(); print('ok',len(out)/SR)
