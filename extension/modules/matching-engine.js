/**
 * matching-engine.js
 * Similo-inspired similarity scoring for finding matches between pinned and live messages.
 */

window.Pinit = window.Pinit || {};

Pinit.MatchingEngine = (() => {
  
  const THRESHOLD = 0.40;

  function calculateScore(pin, candidate) {
    // 0.50 * textSimilarity
    // 0.20 * contextSimilarity
    // 0.20 * structureSimilarity
    // 0.10 * positionSimilarity

    const textScore = getTextSimilarity(pin.text, candidate.text);
    const contextScore = getContextSimilarity(pin, candidate);
    const structureScore = getStructureSimilarity(pin.structure, candidate.structure);
    const positionScore = getPositionSimilarity(pin.position, candidate.position);

    const totalScore = (0.50 * textScore) + 
                       (0.20 * contextScore) + 
                       (0.20 * structureScore) + 
                       (0.10 * positionScore);

    return totalScore;
  }

  function getTextSimilarity(text1, text2) {
    if (text1 === text2) return 1.0;
    if (text1.includes(text2) || text2.includes(text1)) return 0.8;
    
    // Levenshtein-like basic word overlap for partial matches
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    let intersection = 0;
    for (const w of words1) {
      if (words2.has(w)) intersection++;
    }
    
    const union = words1.size + words2.size - intersection;
    return intersection / (union || 1);
  }

  function getContextSimilarity(pin, candidate) {
    const beforeScore = getTextSimilarity(pin.contextBefore, candidate.contextBefore || "");
    const afterScore = getTextSimilarity(pin.contextAfter, candidate.contextAfter || "");
    return (beforeScore + afterScore) / 2;
  }

  function getStructureSimilarity(s1, s2) {
    if (!s2) return 0;
    let score = 0;
    
    // Tag match
    if (s1.tag === s2.tag) score += 0.4;
    
    // Class overlap
    if (s1.classList && s2.classList) {
      const c1 = new Set(s1.classList);
      const c2 = new Set(s2.classList);
      let overlap = 0;
      for (const c of c1) {
        if (c2.has(c)) overlap++;
      }
      score += (overlap / Math.max(c1.size, 1)) * 0.4;
    }
    
    // Role match
    if (s1.role === s2.role) score += 0.2;
    
    return score;
  }

  function getPositionSimilarity(p1, p2) {
    if (!p2) return 0.5; // Neutral if no position info
    const diff = Math.abs(p1.scrollPercent - p2.scrollPercent);
    return Math.max(0, 1.0 - diff);
  }

  function findBestMatch(pin, candidates) {
    let bestMatch = null;
    let highestScore = -1;

    for (const candidate of candidates) {
      const score = calculateScore(pin, candidate);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = { ...candidate, score: score };
      }
    }

    return (highestScore >= THRESHOLD) ? bestMatch : null;
  }

  return {
    findBestMatch,
    calculateScore,
    THRESHOLD
  };
})();
