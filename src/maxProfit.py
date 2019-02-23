class Solution(object):
    def maxProfitAssignment(self, difficulty, profit, worker):
        """
        :type difficulty: List[int]
        :type profit: List[int]
        :type worker: List[int]
        :rtype: int
        """

        tupArr = []
        for i in range(len(difficulty)):
        	tupArr.append((difficulty[i], profit[i]))

        tupArr.sort(key=lambda tup: tup[0])

        maxCap = -1
        for i in range(len(worker)):
        	if maxCap < worker[i]:
        		maxCap = worker[i]

        maxCap += 1
        best = [-1] * maxCap
        print(len(best))
        print(maxCap)
        for i in range(maxCap):
        	for j in range(len(tupArr)):
        		if tupArr[j][0] <= i:
        			if best[i] == -1:
        				best[i] = max(best[i-1], tupArr[j][1])
        			else:
        				best[i] = max(best[i], tupArr[j][1])

        profit = 0
        for i in range(len(worker)):
        	if best[worker[i]] == -1:
        		profit += 0
        	else:
        		profit += best[worker[i]] 
        return profit


[66,1,28,73,53,35,45,60,100,44,59,94,27,88,7,18,83,18,72,63]
[66,20,84,81,56,40,37,82,53,45,43,96,67,27,12,54,98,19,47,77]
[61,33,68,38,63,45,1,10,53,23,66,70,14,51,94,18,28,78,100,16]
worker 0 assigned 84
worker 1 assigned 84
worker 2 assigned 84
worker 3 assigned 84
worker 4 assigned 84
worker 5 assigned 84
worker 6 assigned 20
worker 7 assigned 20
worker 8 assigned 84
worker 9 assigned 20
worker 10 assigned 84
worker 11 assigned 84
worker 12 assigned 20
worker 13 assigned 84
worker 14 assigned 98
worker 15 assigned 20
worker 16 assigned 84
worker 17 assigned 84
worker 18 assigned 98
worker 19 assigned 20