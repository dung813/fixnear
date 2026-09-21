import { Technician, ServiceRequest, MatchRecommendation } from '../types';

export function calculateMatchScore(req: ServiceRequest, tech: Technician): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // 1. Category relevance (Max 40 points)
  if (tech.categories.includes(req.categoryId)) {
    score += 40;
    reasons.push(`Chuyên sâu dịch vụ ${req.categoryName}`);
  } else {
    score += 10;
  }

  // 2. Location & Distance proximity (Max 25 points)
  if (tech.city === req.city) {
    score += 10;
    if (tech.district.toLowerCase() === req.district.toLowerCase()) {
      score += 15;
      reasons.push(`Cùng khu vực ${tech.district}`);
    } else {
      score += 5;
    }
  }

  // Distance penalty/bonus
  if (tech.distanceKm <= 2.0) {
    score += 5;
    reasons.push(`Rất gần bạn (~${tech.distanceKm} km)`);
  }

  // 3. Rating & Reviews (Max 15 points)
  if (tech.rating >= 4.9) {
    score += 15;
    reasons.push(`Đánh giá xuất sắc (${tech.rating}★)`);
  } else if (tech.rating >= 4.7) {
    score += 10;
  } else {
    score += 5;
  }

  // 4. Response Time & Availability (Max 10 points)
  if (tech.responseTimeMinutes <= 10) {
    score += 10;
    reasons.push(`Phản hồi cực nhanh (~${tech.responseTimeMinutes} phút)`);
  } else if (tech.responseTimeMinutes <= 20) {
    score += 5;
  }

  // 5. Completion Rate & Pro Badge (Max 10 points)
  if (tech.completionRate >= 95) {
    score += 5;
    reasons.push(`Tỷ lệ hoàn tất ${tech.completionRate}%`);
  }
  if (tech.isPro) {
    score += 5;
  }

  // Bound score between 60 and 99
  const finalScore = Math.min(99, Math.max(65, score));

  return {
    score: finalScore,
    reasons: reasons.slice(0, 3), // top 3 reasons
  };
}

export function getRecommendedTechnicians(req: ServiceRequest, allTechs: Technician[], limit: number = 3): MatchRecommendation[] {
  return allTechs
    .map(tech => {
      const { score, reasons } = calculateMatchScore(req, tech);
      return { technician: tech, score, reasons };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

