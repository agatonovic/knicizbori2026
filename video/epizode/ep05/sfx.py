import numpy as np, wave
SR=48000; O=0.30; TAG=191.70; DUR=198.57
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
S=[1, 2, 5, 6, 7, 8, 10, 11, 13, 14, 15, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 31, 33, 35, 36]

REV=[(58.23, 1), (58.87, 2), (59.98, 5), (60.65, 6), (61.74, 7), (62.36, 8), (63.45, 10), (64.14, 11), (65.26, 13), (66.01, 14), (67.18, 15), (68.0, 17), (69.32, 18), (70.08, 20), (71.35, 21), (72.07, 22), (73.25, 23), (74.23, 24), (75.68, 25), (76.38, 26), (77.52, 27), (78.18, 28), (79.31, 31), (79.94, 33), (80.99, 35), (81.73, 36), (85.69, 3), (86.26, 4), (87.24, 9), (88.02, 12), (89.24, 16), (89.86, 19), (90.88, 29), (91.49, 30), (92.56, 32), (93.31, 34)]
whoosh(2.4,0.5,0.22); thud(2.6,0.3)
for k in range(0,36,3): pop(5.6+k*0.08,980,0.05)
swipe(9.3); ticks(9.5,2.2); thud(14.5,0.45)
for i in range(11): pop(16.9+i*0.22+(0.6 if i==10 else 0),600+i*40,0.08 if i<10 else 0.16)
swipe(20.95); whoosh(21.1,0.45,0.18); ticks(22.4,1.9); pop(25.5,880); whoosh(27.8,0.45,0.18); ticks(29.6,1.8); pop(32.1,780); pop(32.6,700,0.08); thud(34.05,0.5)
swipe(37.3); whoosh(37.9,0.6,0.16); whoosh(44.0,0.6,0.16); pop(45.4,700); whoosh(48.4,0.6,0.18); thud(49.7,0.4)
swipe(52.75); thud(53.3,0.5)
for t,k in REV: pop(t,880 if k in S else 620,0.12)
swipe(83.0); thud(83.4,0.45)
swipe(94.55)
for t in (96.32,98.74,102.55,103.25,103.95,104.65): pop(t,900,0.12)
swipe(105.75); ticks(108.3,1.0); thud(111.1,0.6); pop(113.4,700); pop(116.35,700); whoosh(117.8,0.45,0.16)
swipe(119.85)
for i in range(0,36,3): pop(120.3+i*0.15,800+i*8,0.06)
thud(126.6,0.55); pop(128.3,980,0.14)
swipe(133.2); pop(133.6,700); pop(133.65,760); whoosh(139.9,0.6,0.2); ticks(139.9,1.4)
swipe(142.65)
for t in (144.39,148.0,148.85,149.75): pop(t,880,0.12)
swipe(152.3)
for i in range(0,28,4): pop(152.7+i*0.04,980,0.05)
pop(153.6,700,0.14); ticks(154.3,1.3); ticks(157.7,1.3,g=0.14)
swipe(160.3); ticks(160.7,2.0,rate=14,g=0.1); pop(165.0,880); pop(169.1,880); pop(173.6,620); thud(178.4,0.45)
swipe(183.4); whoosh(183.8,0.6,0.2); whoosh(186.5,0.5,0.16); hit(189.15,0.35)
whoosh(TAG-0.3,0.6,0.25); shimmer(TAG+0.2,1.3); shimmer(TAG+1.95,1.8); hit(TAG+3.75,0.55)
out=out/max(1e-9,np.max(np.abs(out)))*0.7
w=wave.open('sfx.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((out*32767).astype(np.int16).tobytes()); w.close(); print('ok',len(out)/SR)
