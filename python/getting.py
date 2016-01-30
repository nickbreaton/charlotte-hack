fromlines = '''MORT_30_AMI
MORT_30_HF
MORT_30_PN
PSI_90_SAFETY
IMM_2
PN_6
SCIP_Card_2
SCIP_Inf_2
SCIP_Inf_3
SCIP_Inf_9
SCIP_VTE_2
AMI_7a
HAI1
HAI2
HAI3
HAI4
H_CLEAN_HSP_A_P
H_COMP_1_A_P
H_COMP_2_A_P
H_COMP_3_A_P
H_COMP_4_A_P
H_COMP_5_A_P
H_COMP_7_A
H_COMP_7_SA
H_HSP_RATING_9_10
H_QUIET_HSP_A_P
MSPB_1'''

totabs = '''H_QUIET_HSP_A_P	HAI1	H_CLEAN_HSP_A_P	H_COMP_1_A_P	H_COMP_3_A_P	H_COMP_7_SA	MORT_30_AMI	MORT_30_PN	PN_6	HAI4	H_COMP_5_A_P	MORT_30_HF	SCIP_INF_2	H_CLEAN_QUIET	MSPB_1	SCIP_VTE_2	AMI_7A	H_COMP_2_A_P	H_COMP_4_A_P	PSI_90_SAFETY	HAI2	HAI3	H_COMP_7_A	SCIP_INF_3	H_COMP_7	IMM_2	SCIP_CARD_2	SCIP_INF_9'''

froml = fromlines.split("\n")
tol = totabs.split('\t')

print(froml)
print(tol)
print(len(froml), len(tol))

maplist = [-1 for i in range(len(froml))]

for i in range(len(froml)):
    for j in range(len(froml)):
        if tol[j].upper() == froml[i].upper():
            maplist[i] = j # index i maps to j

print(maplist)
print(sorted(maplist))
print(tol[13], tol[24])
for i in range(len(maplist)):
    if maplist[i] == -1:
        print(froml[i])
