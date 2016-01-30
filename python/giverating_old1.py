import sys
import statistics

# input to program

#TODO
#maxradius = sys.argv[29]



'''
zipcodestr = sys.argv[28]
locpref = sysv.argv[0] / 2 * 2
preferences = sys.argv[1:28]
'''


zipcodestr = "28226"
locpref = 3
preferences = [0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,2,2,3,2,1,1,1]

for i in range(len(preferences)):
    preferences[i] /= 2

# first preference is location, next 27 are arguments


''' Get close zip codes ... '''

closezipcodes = dict()

for line in open("../Data/distance25/"+zipcodestr+".csv", 'r'): # simpler than google maps
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



for line in hperf.readlines():
    sline = line.split(',')
    if sline[0] in hospitalkeys:
        # Let's evaluate this hospital.

        rating = 1 # multiplicative identity

        totalexps = 0 # can add 0 to 2 in increments of 0.5, each time.


        rating *= (1 / (5.1 + float(hospitalkeys[sline[0]]))) ** locpref
        #TODO the standard deviation instead of 1 over something added to its distance, or leave this?

        for i in range(len(sline)):

            if relmapl[i] == -1:
                continue # ignore this rating
            
            s_exp = sline[relmapl[i]]
            if s_exp:
                totalexps += preferences[i]

            rating *= float(s_exp) ** preferences[i]

        rating **= (1.0 / totalexps)
                    
        print(sline)

        
        
