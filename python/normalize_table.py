from statistics import *


hperf = open("HOSPITAL_PERFORMANCE.csv")


arr = []
lines = hperf.readlines()
for line in lines[1:]:
    arr.append(line.split(','))

stdevs = [stdev([float(row[i]) for row in arr if row[i].strip() != '']) for i in range(1, len(arr[0]))]
means = [mean([float(row[i]) for row in arr if row[i].strip() != '']) for i in range(1, len(arr[0]))]
# ignore first column (foreign key)

print(stdevs, len(stdevs))
print(means, len(means))


fnegind = open("", 'w')



fout = open("HOSPITAL_PERFORMANCE_NORMALIZED.csv", 'w')

fout.write(lines[0]+'\n')

for row in lines[1:]:
    if len(row.split(',')) > 29:
        print(row, len(row.split(',')))


for row in lines[1:]:
    srow = row.split(',')
    buff = srow[0] # title
    
    for i in range(1, len(srow)):
        if srow[i].strip():
            #try:
                dum = srow[i]
                dum2 = means[i-1]
                dum3 = stdevs[i-1]
                buff += ","+str( (float(srow[i]) - means[i-1]) / stdevs[i-1] ) # normalizing
            '''except:
                print(len(srow))
                raise ZeroDivisionError'''
            
                '''print(i)
                print(len(srow))
                print(srow[i])'''
                # WHy is this printing?
        else:
                buff += ','

    fout.write(buff+'\n')

fout.close()

#means

