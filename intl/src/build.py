import csv
r=list(csv.DictReader(open('../data/nfl-international-games.csv')))
N={'ARI':'Cardinals','ATL':'Falcons','BAL':'Ravens','BUF':'Bills','CAR':'Panthers','CHI':'Bears','CIN':'Bengals','CLE':'Browns','DAL':'Cowboys','DEN':'Broncos','DET':'Lions','GB':'Packers','HOU':'Texans','IND':'Colts','JAX':'Jaguars','KC':'Chiefs','LA':'Rams','LAC':'Chargers','LV':'Raiders','MIA':'Dolphins','MIN':'Vikings','NE':'Patriots','NO':'Saints','NYG':'Giants','NYJ':'Jets','PHI':'Eagles','PIT':'Steelers','SEA':'Seahawks','SF':'49ers','TB':'Buccaneers','TEN':'Titans','WAS':'Commanders'}
s='~'.join('|'.join([x['season'],x['date'],x['city'],x['country'],x['home_abbr'],x['away_abbr'],x['home_score'],x['away_score'],N[x['home_abbr']],N[x['away_abbr']]]) for x in r)
t=open('src/embed.tpl.js').read();open('embed.js','w').write(t.replace('__DATA__',s.replace("'","\\'")))
