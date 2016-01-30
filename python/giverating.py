import sys
import statistics

# input to program

#TODO
#maxradius = sys.argv[29]

def titlecase(s):
    s = s.lower()
    ans = ""
    for i in range(len(s)):
        if i == 0 or s[i-1] in '\n ':
            ans += s[i].upper()
        else:
            ans += s[i]

    return ans

'''
zipcodestr = "28226"
locpref = 3
preferences = [0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,2,2,3,2,1,1,1]
'''
# testing


zipcodestr = sys.argv[28]
locpref = sysv.argv[0] / 2 * 2
preferences = sys.argv[1:28]





for i in range(len(preferences)):
    preferences[i] /= 2

# first preference is location, next 27 are arguments


''' Get close zip codes ... '''

closezipcodes = dict()

for line in open("../distance25/"+zipcodestr+".csv", 'r'): # simpler than google maps
    sline = line.split(',')
    for i in range(len(sline)):
        sline[i] = sline[i].strip()

    for i in range(2):
        sline[i] = sline[i][1:-1]
    
    closezipcodes[sline[1]] = sline[2] # zip code -> distance


''' to get the hospital foreign keys ... '''

hinfo = open("HospitalGeneralInformation.csv")

hospitalkeys = dict()

for line in hinfo.readlines():
    sline = line.split(',')
    if sline[5] in closezipcodes:
        hospitalkeys[sline[0]] = closezipcodes[sline[5]] # foreign key and distance


''' to get the hospital data. '''

hperf = open("HOSPITAL_PERFORMANCE_NORMALIZED_SIGNED.csv") # precomputed from normalize_table2.py

hdict = dict()
relmapl = [6, 11, 7, 19, 25, 8, 26, 12, 23, 27, 15, 16, 1, 20, 21, 9, 2, 3, 17, 4, 18, 10, 22, 5, -1, 0, 14] # relational map list
# maps the positions of the preferences in command args to their position in the normalized file.  -1 means drop this column; no match.


recvals = []

for line in hperf.readlines():
    sline = line.split(',')
    hname = sline[0]
    
    if sline[0] in hospitalkeys:
        # Let's evaluate this hospital.
        
        sline = sline[1:] # focus only on categories

        rating = 1 # multiplicative identity

        totalexps = 0 # can add 0 to 2 in increments of 0.5, each time.


        rating *= (1 / (5.0 + float(hospitalkeys[hname]))) ** locpref
        #TODO the standard deviation instead of 1 over something added to its distance, or leave this?

        for i in range(len(relmapl)):

            #print(i, len(relmapl))
            if relmapl[i] == -1:
                continue # ignore this rating
            
            s_exp = sline[relmapl[i]]
            if s_exp.strip():
                totalexps += preferences[i]

                rating *= ((8 + float(s_exp))/2) ** preferences[i]
                # making it positive

        rating **= (1.0 / totalexps)

        recvals.append([hname, rating])

''' Print out the best ones. '''

sortedh = sorted(recvals, key=lambda ls: -ls[1])

sorth = []

# 3 is the max to show
for i in range(min(3, len(sortedh))):
    sorth.append(sortedh[i][0])

hinfo.close()
hinfo = open("HospitalGeneralInformation.csv")
hlines = hinfo.readlines()

for hkey in sorth:
    #print(hkey)
    for line in hlines: # linear search
        sline = line.split(',') # split on comma
        if sline[0].strip() == hkey.strip():
                # This is the right line
                #pout = "<span class='hospitalname'>"+sline[1]+"</span> <br />\n"
                pout = sline[1].strip('"') + "\n"
                pout += sline[2] + "\n" #+ "<br /> \n"
                pout += sline[3] + ', '

                pout = titlecase(pout)
                pout += sline[4] + ', ' + sline[5]
                print(pout)
    
    #print(hkey)



        
        
