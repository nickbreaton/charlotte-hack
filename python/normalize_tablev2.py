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


fnegind = open("MEASURE_DESCRIPTIONS.csv")
is_high = [x.split(',')[2]=='higher' for x in fnegind.readlines()[1:]]


relmapl = [6, 11, 7, 19, 25, 8, 26, 12, 23, 27, 15, 16, 1, 20, 21, 9, 2, 3, 17, 4, 18, 10, 22, 5, -1, 0, 14] # relational map list

''' flip the map '''
dualmapl = dict() #[-1 for i in range(max(relmapl))]
for i in range(len(relmapl)):
    if relmapl[i] > 0:
        dualmapl[relmapl[i]] = i #is_high[i]

''' IS THIS PART RIGHT???? '''


fout = open("../python/HOSPITAL_PERFORMANCE_NORMALIZED_SIGNED.csv", 'w')

fout.write(lines[0]) # newline appears without \n

for row in lines[1:]:
    if len(row.split(',')) > 29:
        print(row, len(row.split(',')))


for row in lines[1:]:
    srow = row.split(',')
    buff = srow[0] # title
    
    for i in range(1, len(srow)):
        buff += ','
        if srow[i].strip():
            if i in dualmapl:# or i== 20: # not a segregated component
                dum = srow[i]
                dum2 = means[i-1]
                dum3 = stdevs[i-1]

                dum4 = dualmapl[i]
                du5 = is_high[dualmapl[i]]

                
                signtimes = 1
                if not is_high[dualmapl[i]]:# or i == 20: # why is it not picking up on 20, okay it is
                    #print(i, end=" ")
                    signtimes = -1
                
                buff += str( signtimes * (float(srow[i]) - means[i-1]) / stdevs[i-1] ) # normalizing
                
                '''except:
                print(len(srow))
                raise ZeroDivisionError'''
            
                '''print(i)
                print(len(srow))
                print(srow[i])'''
                # WHy is this printing?

    fout.write(buff+'\n')

fout.close()

#means

