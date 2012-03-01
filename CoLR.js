function lastResort(code) {
	var token,
		delim,
		best,
		map = [],
		minLen = 2,
		maxLen = 50;

	function getToken() {
		var chr, tokenIdx = 32;
		do {
			if(tokenIdx > 126) return false;
			chr = String.fromCharCode(tokenIdx);
			tokenIdx += 1;
		} while (code.indexOf(chr) >= 0);
		return chr;
	}


	function calcScore(str) {
		var hits = code.split(str).length - 1,
			comp = str.length + hits + 2,
			orig = str.length * hits;
		return orig - comp;
	}


	function nextBest() {
		var i, j, str, score, best = {str: null, score: 0};
		for(i = 0; i < code.length - minLen; i++) {
			for(j = minLen; j < maxLen; j++) {
				str = code.substr(i, j);
				score = calcScore(str);
				if(score > best.score) {
					best = {
						str: str,
						score: score
					};
				}
			}
		}
		return best.score > 0 ? best.str : false;
	}

	delim = getToken();
	code = delim + code;

	while((token = getToken()) !== false && (best = nextBest())) {
		code = code.split(best).join(token);
		map.push(token+best);
	}

	code = code.substr(1);

	map = JSON.stringify(map.join(delim));
	code = JSON.stringify(code);
	delim = JSON.stringify(delim);
	code = 'eval(function(c,m,i){for(i=m.length;i--;)c=c.split(m[i][0]).join(m[i].substr(1));return c}('+code+','+map+'.split('+delim+')))';

	return code;
}