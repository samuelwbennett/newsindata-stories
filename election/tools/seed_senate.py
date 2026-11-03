"""Seed election/data/senate.json (run once; hourly runs edit the JSON). Source: Wikipedia, 2026 United States Senate elections."""
import json, os
D = os.path.join(os.path.dirname(__file__), "..", "data")
races = [("AL","R"),("AK","R"),("AR","R"),("CO","D"),("DE","D"),("FL","R","special"),("GA","D"),("ID","R"),("IL","D"),
         ("IA","R"),("KS","R"),("KY","R"),("LA","R"),("ME","R"),("MA","D"),("MI","D"),("MN","D"),("MS","R"),("MT","R"),
         ("NE","R"),("NH","D"),("NJ","D"),("NM","D"),("NC","R"),("OH","R","special"),("OK","R"),("OR","D"),("RI","D"),
         ("SC","R"),("SD","R"),("TN","R"),("TX","R"),("VA","D"),("WV","R"),("WY","R")]
assert len(races) == 35 and sum(r[1] == "R" for r in races) == 22
json.dump({"updated": "2026-11-03T13:30:00Z",
           "source": "Seats not up and seats on the ballot: Wikipedia, 2026 United States Senate elections. Calls: AP and network decision desks via NBC News.",
           "not_up": {"D": 32, "I": 2, "R": 31},
           "before": {"R": 53, "D": 45, "I": 2},
           "rule": "Democrats need 51 seats for control; Republicans need 50, with Vice President JD Vance breaking ties. The two independents caucus with Democrats.",
           "races": [{"state": r[0], "held": r[1], "special": len(r) > 2, "winner": None, "winner_party": None, "called_by": None, "note": None} for r in races]},
          open(f"{D}/senate.json", "w"), indent=1)
print("ok")
