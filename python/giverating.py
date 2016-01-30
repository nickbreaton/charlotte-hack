import sys

# input to program
zipcodestr = sys.argv[28]
preferences = sys.argv[0:28]


# Get zip codes ...

closezipcodes = dict()

for line in open("./distances/"+zipcodestr+".csv", 'r'): # simpler than google maps
    sline = line.split()
    closezipcodes.add(sline[1], sline[2])


# to get the hospital foreign keys ...

hinfo = open("HospitalGeneralInformation.xlsx")

hospitalkeys = dict()

for line in hinfo.readlines():
    sline = line.split()
    if sline[5] in closezipcodes:
        hospitalkeys.add(sline[0], closezipcodes[sline[5]]) # foreign key and distance


# to get the hospital data.

hperf = open("HOSPITAL_PERFORMANCE.csv")

hdict = dict()

for line in hperf.readlines():
    sline = line.split()
    if sline[0] in hospitalkeys:
        # Let's evaluate this hospital.
        print(sline)

        
        
