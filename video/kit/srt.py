# srt.py  —  node-free: izvuci SUBS iz main.js (format [start,end,'tekst'], vreme bez offseta O) i napiši SRT sa +O
import re,sys
src=open(sys.argv[1]).read(); TAG=float(sys.argv[2]); O=0.30; out=sys.argv[3]
body=src[src.index('const SUBS=['):]; body=body[:body.index('];')]
rows=re.findall(r"\[\s*([^,\[\]]+?)\s*,\s*([^,\[\]]+?)\s*,\s*'([^']*)'\s*\]",body)
def ev(x): return eval(x,{'TAG':TAG})
def ts(s): s=max(0,s); h=int(s//3600); m=int(s%3600//60); return f"{h:02d}:{m:02d}:{int(s%60):02d},{int(round((s%1)*1000))%1000:03d}"
with open(out,'w') as f:
  for i,(a,b,t) in enumerate(rows,1): f.write(f"{i}\n{ts(ev(a)+O)} --> {ts(ev(b)+O+0.2)}\n{t}\n\n")
print(len(rows),'subs')
