# Election 2026 hourly update runbook

The page at thenewsindata.com/election (and stories.thenewsindata.com/election/) reads four JSON files in `election/data/`. Each hourly run updates those files from public results pages and pushes to `main`. Never change `embed.js` during a run.

## Rules
- Use only published results. Mark a measure or race decided (`passed`, `failed`, `called`) only when the source says it was called/projected (AP, a network decision desk, or the state's certified result). Record who called it in `called_by` (e.g. "AP via NBC News").
- Vote shares and counts are unofficial; copy them exactly as the source shows them. If two sources disagree, keep the existing value and note it in the run summary.
- Never infer a result from a lead. A measure leading 52–48 with votes outstanding stays `pending` (but do update `yes_pct`).
- Set each file's `updated` to the current UTC time (ISO 8601, `Z`) only when something in that file changed.
- Run `python3 election/tools/check.py` before committing. If it fails, fix the data or revert that file; never push failing data.
- Commit message: `Election data update <HH:MM> MT`. Push to `main` (fetch and rebase first).

## Sources, in order
1. **measures.json** (145 statewide measures; `status`, `yes_pct`, `called_by`):
   - Wikipedia "2026 United States ballot measures" (results columns fill in fast): https://en.wikipedia.org/wiki/2026_United_States_ballot_measures (read with offset 100000 for the end).
   - Ballotpedia "2026 ballot measures": https://ballotpedia.org/2026_ballot_measures and state pages `https://ballotpedia.org/<State>_2026_ballot_measures` (marks Approved/Defeated with yes %).
   - NBC News state pages `https://www.nbcnews.com/politics/2026-elections/<state>-ballot-measures` (AP data) to confirm calls.
   Match rows by state + measure name/number. Do at most ~20 page reads per run, prioritizing states whose polls have closed and that still have pending measures.
2. **colorado.json** (14 measures with `yes`/`no` vote counts and status; 13 races with candidate `votes` and `called`):
   - Ballotpedia Colorado page https://ballotpedia.org/Colorado_2026_ballot_measures (yes/no tallies).
   - NBC News Colorado results https://www.nbcnews.com/politics/2026-elections/colorado-results and Colorado Sun results https://coloradosun.com/colorado-election-results-2026/ (both AP / Secretary of State data).
   `local` holds Eagle County School District Ballot Issue 5B (mill levy override, needs a majority): yes/no counts from the Eagle County Clerk's unofficial results, as reported by the Vail Daily (https://www.vaildaily.com/news/live-colorado-election-results-eagle-county/) or the county's results page. Mark it passed/failed only when the county's count is complete or a news outlet reports the outcome; never edit its `disclosure` line.
   Amendments need 55% yes; propositions need a majority. `called` must exactly match a candidate name without the asterisk.
3. **house.json** (`y2026`): from NBC News or AP House results pages. `seats_before` = 220 (Republican seats won in 2024). Set `projected_change` = Republican seats won or projected minus 220 only when a network publishes a House projection or all but a handful of races are called; fill `called`, `uncalled`, `as_of` (e.g. "Nov. 4, 1 a.m. MT") and a one-line `note`.
4. **turnout.json** (`y2026.estimate_pct`, `as_of`): University of Florida Election Lab 2026 turnout estimate (https://election.lab.ufl.edu/). Before an estimate exists, update `early_votes_m` and `early_as_of` from https://election.lab.ufl.edu/early-vote/2026-early-voting/ (quote the national total only).

## After the run
Reply with a 3–5 line summary: measures newly decided, Colorado changes, House and turnout status, and anything unresolved.
