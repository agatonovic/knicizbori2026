import numpy as np, wave
SR=48000; O=0.30; TAG=121.65; DUR=128.60
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
for k in range(3): thud(0.1+k*0.9,0.35)
whoosh(2.85,0.5,0.2)
# S2
swipe(5.3)
for k in range(4): pop(6.5+k*0.3,700+k*90,0.12)
# S3
swipe(8.85); ticks(12.0,2.6,rate=10,g=.12)
for k in range(0,36,3): pop(15.0+k*0.04,980,0.05)
# S4
swipe(17.6); pop(19.0,700); pop(20.5,820); thud(22.1,0.3)
# S5
swipe(25.0); whoosh(27.3,0.8,0.18); pop(29.4,880)
whoosh(32.7,0.7,0.16); pop(35.0,620)
for k in range(5): whoosh(37.6+k*0.35,0.35,0.14)
whoosh(40.6,0.7,0.18); pop(43.1,880)
# S6
swipe(47.2)
for k in range(3): pop(47.3+k*0.35,700+k*100,0.1)
thud(50.85,0.6)
# S7
swipe(52.6); whoosh(55.5,0.5,0.18); pop(60.1,700); thud(61.2,0.4)
# S8
swipe(63.2); ticks(63.5,1.0,g=.13); pop(68.9,600,0.14)
# S9
swipe(72.5); thud(72.7,0.35); whoosh(76.8,1.0,0.2); pop(77.7,880); whoosh(84.0,0.8,0.2); pop(84.8,980); pop(86.8,700); thud(91.2,0.35)
# S10
swipe(95.6); pop(97.1,1320,0.14); pop(97.22,1760,0.12); thud(98.6,0.4)
# S11
swipe(100.3); thud(101.65,0.35); thud(105.65,0.35); thud(107.55,0.45)
# S12
swipe(110.9); thud(111.0,0.5)
# S13
swipe(112.5); whoosh(112.55,0.5,0.2)
# S14
swipe(115.8); whoosh(115.85,0.45,0.18); thud(117.05,0.55); whoosh(117.85,0.45,0.22); whoosh(119.3,0.45,0.22); hit(120.15,0.35)
# OUT
whoosh(121.35,0.6,0.25); shimmer(TAG+0.2,1.3); shimmer(TAG+1.95,1.8); hit(TAG+3.75,0.55)
out=out/max(1e-9,np.max(np.abs(out)))*0.7
w=wave.open('sfx.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((out*32767).astype(np.int16).tobytes()); w.close(); print('ok',len(out)/SR)
