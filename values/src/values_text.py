# Story text for the Gallup shared-values story, used by build_values.py.
SLUG = "americans-say-honesty-is-the-value-the-country-needs-most-yet-only-13-think-most-americans-share-it"
TITLE = "Americans Say Honesty Is The Value The Country Needs Most, Yet Only 13% Think Most Americans Share It"
DEK = ("Gallup asked 3,199 adults which of 12 values most Americans share and which the country needs most, "
       "and the values at the top of one list sit near the bottom of the other.")
EXCERPT = ("Honesty was the most common pick for the value America needs most, chosen by 34% of adults, "
           "while 13% said most Americans share it, the widest gap of the 12 values in a new Gallup survey.")
ALT = ("Dot plot of 12 values. Honesty: 34% say the country needs it most, 13% say most Americans share it. "
       "Freedom, patriotism and service run the other way, seen as shared more than needed.")

INTRO = [
    "I wanted to know whether the values Americans say the country is missing are the same ones they think it "
    "already has. A Gallup survey released Oct. 25 asked both questions of the same 3,199 people, and the "
    "answers barely line up.",
    "Honesty was the most common answer when Gallup asked which three values the country needs most today, chosen "
    "by 34% of adults. When the same people were asked which values most Americans share, 13% picked honesty, "
    "tied with courage and integrity for second-to-last and ahead of only humility at 10%. In a room of 100 adults, "
    "34 would name honesty as something the country needs and 13 would say most of their fellow citizens already "
    "live by it.",
    "[Samuel: one sentence on why this caught your eye, e.g. something from coaching or teaching about honesty.]",
]

# (heading, paragraph) pairs that also drive the scrolly steps, in order.
STEPS = [
    (None, INTRO[1]),
    ("Which values do Americans think they already share?",
     "Freedom led at 38%, followed by patriotism at 32% and service at 30%, so no value reached a majority. Three in four "
     "adults (76%) named at least one of the 12 as shared by most Americans, while 24% said none of them are, about the "
     "same share that picked kindness (24%). Honesty, integrity and courage, at 13% each, were named about a third as "
     "often as freedom."),
    ("Which values does the country need most?",
     "Here each person could pick three. Honesty (34%), responsibility (32%) and integrity (31%) led, followed by "
     "equality (29%) and fairness (26%). Service, third on the shared list at 30%, was picked as a national need by 13%, "
     "last of the 12, less than half as often as it was named as shared."),
    ("Where the gap is widest",
     "Eight of the 12 values were named more often as needed than as shared, led by honesty at 21 percentage points and "
     "responsibility and integrity at 18 each. Four ran the other way, with service named 17 points more often as shared "
     "than as needed, freedom 13 points, patriotism 11 and kindness 4. The three values picked most often as national "
     "needs ranked eighth or lower of the 12 on the shared list."),
    ("Do Republicans and Democrats agree?",
     "On honesty they mostly do. It was picked as a national need by 32% of Democrats, 34% of independents and 38% of "
     "Republicans, a 6-point spread. Other values split sharply, with patriotism picked by 46% of Republicans and 6% of "
     "Democrats and equality by 44% of Democrats and 10% of Republicans. Age mattered more than party for honesty, since "
     "47% of adults 65 and older picked it, compared with 29% of those 18 to 39."),
    ("Most would rather respect differences than share values",
     "Asked which matters more, 79% of adults said people respecting different values, four times the 19% who said "
     "people sharing the same values. That majority held in every party, at 84% of Democrats, 81% of independents and "
     "72% of Republicans."),
]

CANT = [
    "The two questions weren't asked the same way. For the national need, each person picked three values, while for "
    "shared values they could pick as many as they liked or none, so the 24% who said none count as not picking any "
    "value on that list. That makes the shared figures lower across the board than they would be among people who named "
    "at least one, and it means each gap is a comparison of two different questions, best read as a ranking rather than "
    "an exact difference.",
    "The survey's margin of error is plus or minus 2.1 points for all adults and larger for each party, so the smallest "
    "gaps, 4 points for respect and for kindness, are too close to call. This is also a single survey with no earlier "
    "reading, so it can't say whether the honesty gap is growing. Gallup ran it with With Honor, a group that backs "
    "military veterans running for office, and hasn't said whether it will repeat the questions. If it does, honesty's "
    "21-point gap is the first number I'd check.",
]

NOTES = [
    "Gap = percent naming a value as one the country needs most, minus percent naming it as shared by most Americans. "
    "Honesty: 34 minus 13 is 21 points.",
    "Picks per person: the 12 \"needs most\" figures add up to 291%, close to the three picks each person was asked for "
    "(300%). The 12 \"shared\" figures add up to 237%; divided among the 76% who named at least one value, that is "
    "about 3.1 values each.",
    "How well the two lists line up: the Spearman rank correlation between the 12 needed and 12 shared figures is "
    "−0.29, a weak relationship that runs slightly in opposite directions.",
    "Service: 13% needed is 43% of the 30% who called it shared, less than half.",
    "Respect for differences: 79% is about four times the 19% who chose sharing the same values.",
]

METHOD = ("How we counted: Gallup Panel web survey of 3,199 U.S. adults, May 12–22, 2026, conducted by Gallup and "
          "With Honor and published Oct. 25, 2026; margin of error ±2.1 percentage points for all adults. Gallup "
          "published no topline file, so all 24 figures were entered by hand from the tables in the article and "
          "checked against it. \"Shared\" asks which values most Americans share, regardless of politics or "
          "background (any number, or none); \"needs most\" asks for the three values the country needs most today. "
          "Gallup's definitions of each value appear in the data file.")
SOURCE_URL = "https://news.gallup.com/poll/716093/three-quarters-identify-shared-values.aspx"

ROWS = [  # value, needed %, shared %, Gallup's definition
    ("Honesty", 34, 13, "Telling the truth, even when it's hard"),
    ("Responsibility", 32, 14, "Taking ownership of your actions and doing what you are expected to do"),
    ("Integrity", 31, 13, "Acting consistently with your values, even when no one is watching"),
    ("Equality", 29, 15, "Giving all people equal treatment and opportunity"),
    ("Fairness", 26, 15, "Making sure rules and decisions don't unfairly favor some people over others"),
    ("Courage", 21, 13, "Deciding to do what's right in the face of personal cost"),
    ("Humility", 15, 10, "Not acting like you are better or more important than others"),
    ("Respect", 24, 20, "Being polite and considerate toward others"),
    ("Kindness", 20, 24, "Showing care and compassion toward others"),
    ("Patriotism", 21, 32, "Caring about your country and wanting it to live up to its ideals"),
    ("Freedom", 25, 38, "Being able to live, speak, and make choices without unfair limits"),
    ("Service", 13, 30, "Helping others and contributing to your community or country"),
]
PARTY = {  # needs most, by party: Democrats, independents, Republicans
    "Honesty": (32, 34, 38), "Responsibility": (24, 32, 41), "Integrity": (29, 31, 33), "Equality": (44, 30, 10),
    "Fairness": (34, 27, 15), "Courage": (23, 21, 21), "Humility": (15, 16, 12), "Respect": (20, 24, 28),
    "Kindness": (25, 21, 12), "Patriotism": (6, 15, 46), "Freedom": (23, 26, 26), "Service": (16, 14, 9),
}
RESPECT = [("Democrats", 84, 15), ("Independents", 81, 17), ("Republicans", 72, 27), ("U.S. adults", 79, 19)]
