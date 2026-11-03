"""Validate election data files before pushing. Usage: python3 election/tools/check.py"""
import json, sys, os, datetime
D = os.path.join(os.path.dirname(__file__), "..", "data"); bad = []
m = json.load(open(f"{D}/measures.json"))
if len(m["measures"]) < 140: bad.append("measures: fewer than 140 rows")
for x in m["measures"]:
    if x["status"] not in ("pending", "passed", "failed"): bad.append(f"{x['id']}: bad status {x['status']}")
    if x["yes_pct"] is not None and not (0 <= x["yes_pct"] <= 100): bad.append(f"{x['id']}: yes_pct out of range")
    if x["status"] != "pending" and not x.get("called_by"): bad.append(f"{x['id']}: decided without called_by")
c = json.load(open(f"{D}/colorado.json"))
for x in c["measures"]:
    if x["status"] not in ("pending", "passed", "failed"): bad.append(f"CO {x['name']}: bad status")
    for k in ("yes", "no"):
        if x[k] is not None and (not isinstance(x[k], int) or x[k] < 0): bad.append(f"CO {x['name']}: bad {k}")
for x in c.get("local", []):
    if x["status"] not in ("pending", "passed", "failed"): bad.append(f"local {x['name']}: bad status")
    for k in ("yes", "no"):
        if x[k] is not None and (not isinstance(x[k], int) or x[k] < 0): bad.append(f"local {x['name']}: bad {k}")
for r in c["races"]:
    names = [k["name"].replace("*", "") for k in r["candidates"]]
    if r["called"] and r["called"] not in names: bad.append(f"CO {r['race']}: called name not a candidate")
sn = json.load(open(f"{D}/senate.json"))
if len(sn["races"]) != 35: bad.append("senate: race count changed")
if sum(sn["not_up"].values()) != 65: bad.append("senate: not_up must total 65")
for x in sn["races"]:
    if x["winner_party"] not in (None, "D", "R", "I"): bad.append(f"senate {x['state']}: bad winner_party")
    if x["winner_party"] and not x["called_by"]: bad.append(f"senate {x['state']}: called without called_by")
h = json.load(open(f"{D}/house.json")); y = h["y2026"]
if y["projected_change"] is not None and not (-120 < y["projected_change"] < 60): bad.append("house: implausible change")
for f, j in (("measures", m), ("colorado", c), ("house", h), ("senate", sn)):
    datetime.datetime.fromisoformat(j["updated"].replace("Z", "+00:00"))
print("OK" if not bad else "PROBLEMS:\n" + "\n".join(bad)); sys.exit(1 if bad else 0)
