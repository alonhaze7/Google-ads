/**
 * Google Ads Insights Generation Engine
 *
 * Analyzes Google Ads performance data and generates actionable,
 * intelligent insights across 10 key dimensions.
 */

/**
 * Main insights generator
 * @param {Object} data - Google Ads performance data
 * @param {Array} data.campaigns - Campaign performance metrics
 * @param {Array} data.devicePerformance - Device-level metrics
 * @param {Array} data.geoPerformance - Geographic performance data
 * @param {Array} data.hourlyPerformance - Time-of-day metrics
 * @param {Array} data.keywords - Keyword performance data
 * @param {Array} data.qualityScores - Quality score data by campaign
 * @param {Object} data.budgetPacing - Budget utilization data
 * @param {Object} data.attributionData - Attribution model data
 * @returns {Array} Array of insight objects
 */
function generateInsights(data) {
  const insights = [];

  // 1. Mobile vs Desktop Performance
  const deviceInsight = analyzeMobileVsDesktop(data.devicePerformance);
  if (deviceInsight) insights.push(deviceInsight);

  // 2. Geographic Hotspots
  const geoInsights = analyzeGeographicHotspots(data.geoPerformance);
  insights.push(...geoInsights);

  // 3. Budget Rebalancing
  const budgetInsight = analyzeBudgetRebalancing(data.campaigns);
  if (budgetInsight) insights.push(budgetInsight);

  // 4. Peak Performance Hours
  const timeInsight = analyzePeakHours(data.hourlyPerformance);
  if (timeInsight) insights.push(timeInsight);

  // 5. Quality Score Opportunities
  const qsInsights = analyzeQualityScores(data.qualityScores, data.campaigns);
  insights.push(...qsInsights);

  // 6. Conversion Rate Trends
  const conversionInsight = analyzeConversionTrends(data.campaigns);
  if (conversionInsight) insights.push(conversionInsight);

  // 7. Keyword Performance
  const keywordInsights = analyzeKeywordPerformance(data.keywords);
  insights.push(...keywordInsights);

  // 8. Campaign Efficiency
  const efficiencyInsights = analyzeCampaignEfficiency(data.campaigns);
  insights.push(...efficiencyInsights);

  // 9. Budget Pacing
  const pacingInsight = analyzeBudgetPacing(data.budgetPacing, data.campaigns);
  if (pacingInsight) insights.push(pacingInsight);

  // 10. Attribution Analysis
  const attributionInsight = analyzeAttribution(data.attributionData);
  if (attributionInsight) insights.push(attributionInsight);

  // Sort by severity (critical first, then opportunity, then success)
  const severityOrder = { critical: 0, opportunity: 1, success: 2 };
  return insights.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

/**
 * Analyze mobile vs desktop device performance
 */
function analyzeMobileVsDesktop(devicePerformance) {
  if (!devicePerformance || devicePerformance.length === 0) return null;

  const mobile = devicePerformance.find(d => d.device === 'mobile');
  const desktop = devicePerformance.find(d => d.device === 'desktop');

  if (!mobile || !desktop) return null;

  const mobileROAS = mobile.revenue / mobile.cost;
  const desktopROAS = desktop.revenue / desktop.cost;
  const difference = Math.abs(mobileROAS - desktopROAS);
  const percentDiff = (difference / Math.min(mobileROAS, desktopROAS)) * 100;

  if (percentDiff < 15) return null; // Not significant enough

  const winner = mobileROAS > desktopROAS ? 'mobile' : 'desktop';
  const loser = winner === 'mobile' ? 'desktop' : 'mobile';
  const winnerROAS = winner === 'mobile' ? mobileROAS : desktopROAS;
  const loserROAS = winner === 'mobile' ? desktopROAS : mobileROAS;
  const winnerData = winner === 'mobile' ? mobile : desktop;
  const loserData = winner === 'mobile' ? desktop : mobile;

  const potentialRevenue = (loserData.cost * winnerROAS) - loserData.revenue;

  return {
    severity: potentialRevenue > 10000 ? 'opportunity' : 'success',
    title: `${winner.charAt(0).toUpperCase() + winner.slice(1)} Outperforming ${loser.charAt(0).toUpperCase() + loser.slice(1)} by ${percentDiff.toFixed(0)}%`,
    metric: `${winnerROAS.toFixed(1)}x vs ${loserROAS.toFixed(1)}x ROAS`,
    description: `${winner.charAt(0).toUpperCase() + winner.slice(1)} campaigns are generating ${winnerROAS.toFixed(2)}x ROAS compared to ${loserROAS.toFixed(2)}x on ${loser}. ${winner.charAt(0).toUpperCase() + winner.slice(1)} has ${winnerData.conversions} conversions at $${(winnerData.cost / winnerData.conversions).toFixed(2)} CPA, while ${loser} has ${loserData.conversions} conversions at $${(loserData.cost / loserData.conversions).toFixed(2)} CPA.`,
    impact: `Reallocating $${loserData.cost.toLocaleString()} from ${loser} to ${winner} could generate an additional $${potentialRevenue.toLocaleString()} in revenue based on current performance.`,
    actions: [
      `Increase ${winner} bid adjustments by +${Math.min(50, Math.round(percentDiff))}% across top-performing campaigns`,
      `Reduce ${loser} budget allocation by 25-30% and redirect to ${winner} campaigns`,
      `Analyze ${winner}-specific ad creative and landing pages to identify success factors`
    ],
    expectedOutcome: `Estimated revenue increase of $${potentialRevenue.toLocaleString()} over the next 30 days with improved overall ROAS from ${((mobile.revenue + desktop.revenue) / (mobile.cost + desktop.cost)).toFixed(2)}x to ${(winnerROAS * 0.9).toFixed(2)}x.`
  };
}

/**
 * Analyze geographic performance hotspots
 */
function analyzeGeographicHotspots(geoPerformance) {
  if (!geoPerformance || geoPerformance.length === 0) return [];

  const insights = [];
  const sorted = geoPerformance
    .map(g => ({
      ...g,
      roas: g.revenue / g.cost,
      cpa: g.cost / g.conversions
    }))
    .sort((a, b) => b.roas - a.roas);

  // Top performers
  const topGeos = sorted.slice(0, 3).filter(g => g.roas > 3.0);
  if (topGeos.length > 0) {
    const totalRevenue = topGeos.reduce((sum, g) => sum + g.revenue, 0);
    const totalCost = topGeos.reduce((sum, g) => sum + g.cost, 0);
    const avgROAS = totalRevenue / totalCost;
    const expansionPotential = totalCost * 0.5 * avgROAS;

    insights.push({
      severity: 'opportunity',
      title: `${topGeos.length} High-Performing Regions Ready for Expansion`,
      metric: `${avgROAS.toFixed(1)}x avg ROAS`,
      description: `${topGeos.map(g => g.location).join(', ')} are delivering exceptional performance with ${avgROAS.toFixed(1)}x ROAS. These regions account for $${totalRevenue.toLocaleString()} in revenue from $${totalCost.toLocaleString()} spend. ${topGeos[0].location} leads with ${topGeos[0].roas.toFixed(1)}x ROAS and ${topGeos[0].conversions} conversions.`,
      impact: `These proven markets can absorb 50% more budget while maintaining strong performance, potentially adding $${expansionPotential.toLocaleString()} in revenue.`,
      actions: [
        `Increase location bid adjustments to +40% for ${topGeos.map(g => g.location).join(', ')}`,
        `Allocate additional $${(totalCost * 0.5).toLocaleString()} budget to these regions over next 2 weeks`,
        `Create geo-specific ad variations highlighting local presence or offers`
      ],
      expectedOutcome: `Revenue increase of $${expansionPotential.toLocaleString()} with ROAS maintaining above ${(avgROAS * 0.85).toFixed(1)}x in expansion phase.`
    });
  }

  // Underperformers
  const bottomGeos = sorted.slice(-3).filter(g => g.roas < 1.5 && g.cost > 1000);
  if (bottomGeos.length > 0) {
    const wastedSpend = bottomGeos.reduce((sum, g) => sum + g.cost, 0);
    const avgROAS = bottomGeos.reduce((sum, g) => sum + g.revenue, 0) / wastedSpend;

    insights.push({
      severity: 'critical',
      title: `${bottomGeos.length} Regions Underperforming - Immediate Action Needed`,
      metric: `${avgROAS.toFixed(1)}x ROAS`,
      description: `${bottomGeos.map(g => g.location).join(', ')} are generating only ${avgROAS.toFixed(1)}x ROAS, consuming $${wastedSpend.toLocaleString()} in budget with minimal returns. ${bottomGeos[0].location} has the worst performance at ${bottomGeos[0].roas.toFixed(1)}x ROAS with $${bottomGeos[0].cost.toLocaleString()} spend.`,
      impact: `Pausing or reducing these regions could save $${(wastedSpend * 0.7).toLocaleString()} per month for reallocation to profitable markets.`,
      actions: [
        `Reduce bid adjustments to -50% for ${bottomGeos.map(g => g.location).join(', ')}`,
        `Pause campaigns entirely in ${bottomGeos[0].location} and monitor for 1 week`,
        `Investigate if landing pages or offers are region-appropriate`
      ],
      expectedOutcome: `Cost savings of $${(wastedSpend * 0.7).toLocaleString()} monthly with potential to reallocate to high-performing regions for $${(wastedSpend * 0.7 * 3.5).toLocaleString()} additional revenue.`
    });
  }

  return insights;
}

/**
 * Analyze budget rebalancing opportunities
 */
function analyzeBudgetRebalancing(campaigns) {
  if (!campaigns || campaigns.length === 0) return null;

  const withROAS = campaigns
    .filter(c => c.cost > 500)
    .map(c => ({
      ...c,
      roas: c.revenue / c.cost
    }))
    .sort((a, b) => b.roas - a.roas);

  if (withROAS.length < 3) return null;

  const topQuartile = withROAS.slice(0, Math.ceil(withROAS.length * 0.25));
  const bottomQuartile = withROAS.slice(-Math.ceil(withROAS.length * 0.25));

  const avgTopROAS = topQuartile.reduce((sum, c) => sum + c.roas, 0) / topQuartile.length;
  const avgBottomROAS = bottomQuartile.reduce((sum, c) => sum + c.roas, 0) / bottomQuartile.length;
  const bottomSpend = bottomQuartile.reduce((sum, c) => sum + c.cost, 0);

  if (avgTopROAS / avgBottomROAS < 2) return null; // Not significant

  const reallocationAmount = bottomSpend * 0.4;
  const projectedRevenue = reallocationAmount * avgTopROAS;
  const currentRevenue = reallocationAmount * avgBottomROAS;
  const revenueLift = projectedRevenue - currentRevenue;

  return {
    severity: 'opportunity',
    title: `Budget Rebalancing Could Unlock $${revenueLift.toLocaleString()} Revenue`,
    metric: `${avgTopROAS.toFixed(1)}x vs ${avgBottomROAS.toFixed(1)}x ROAS spread`,
    description: `Top ${topQuartile.length} campaigns (including "${topQuartile[0].name}") average ${avgTopROAS.toFixed(1)}x ROAS, while bottom ${bottomQuartile.length} campaigns average only ${avgBottomROAS.toFixed(1)}x ROAS. Bottom performers are consuming $${bottomSpend.toLocaleString()} in budget that could be better allocated.`,
    impact: `Reallocating $${reallocationAmount.toLocaleString()} (40% of low-performer budget) to top campaigns projects $${revenueLift.toLocaleString()} additional revenue.`,
    actions: [
      `Reduce daily budgets by 40% for: ${bottomQuartile.slice(0, 2).map(c => c.name).join(', ')}`,
      `Increase daily budgets by $${(reallocationAmount / topQuartile.length).toLocaleString()} for top ${topQuartile.length} campaigns`,
      `Set up automated rules to pause campaigns when ROAS drops below ${(avgTopROAS * 0.5).toFixed(1)}x for 3 consecutive days`
    ],
    expectedOutcome: `Portfolio ROAS improvement from ${withROAS.reduce((sum, c) => sum + c.revenue, 0) / withROAS.reduce((sum, c) => sum + c.cost, 0).toFixed(1)}x to ${(avgTopROAS * 0.85).toFixed(1)}x within 2-3 weeks, with $${revenueLift.toLocaleString()} revenue increase.`
  };
}

/**
 * Analyze peak performance hours
 */
function analyzePeakHours(hourlyPerformance) {
  if (!hourlyPerformance || hourlyPerformance.length === 0) return null;

  const hourlyData = hourlyPerformance.map(h => ({
    ...h,
    roas: h.revenue / h.cost,
    conversionRate: h.conversions / h.clicks
  }));

  const avgROAS = hourlyData.reduce((sum, h) => sum + h.roas, 0) / hourlyData.length;
  const peakHours = hourlyData.filter(h => h.roas > avgROAS * 1.3).sort((a, b) => b.roas - a.roas);
  const offHours = hourlyData.filter(h => h.roas < avgROAS * 0.7).sort((a, b) => a.roas - b.roas);

  if (peakHours.length === 0 || offHours.length === 0) return null;

  const peakRevenue = peakHours.reduce((sum, h) => sum + h.revenue, 0);
  const offRevenue = offHours.reduce((sum, h) => sum + h.revenue, 0);
  const peakSpend = peakHours.reduce((sum, h) => sum + h.cost, 0);
  const offSpend = offHours.reduce((sum, h) => sum + h.cost, 0);

  const potentialGain = (offSpend * 0.5) * (peakRevenue / peakSpend) - (offRevenue * 0.5);

  const formatHour = (hour) => {
    const h = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    return `${h}${ampm}`;
  };

  return {
    severity: 'opportunity',
    title: `Peak Hours ${peakHours.length > 2 ? peakHours.slice(0, 3).map(h => formatHour(h.hour)).join(', ') : peakHours.map(h => formatHour(h.hour)).join(', ')} Show ${((peakRevenue / peakSpend) / (offRevenue / offSpend)).toFixed(1)}x Better Performance`,
    metric: `${(peakRevenue / peakSpend).toFixed(1)}x vs ${(offRevenue / offSpend).toFixed(1)}x ROAS`,
    description: `Analysis reveals ${peakHours.length} peak hours (${peakHours.slice(0, 5).map(h => formatHour(h.hour)).join(', ')}) delivering ${(peakRevenue / peakSpend).toFixed(1)}x ROAS, while ${offHours.length} off-peak hours generate only ${(offRevenue / offSpend).toFixed(1)}x ROAS. Peak hour conversion rate is ${(peakHours[0].conversionRate * 100).toFixed(2)}% vs ${(offHours[0].conversionRate * 100).toFixed(2)}% in off-hours.`,
    impact: `Shifting 50% of off-peak budget ($${(offSpend * 0.5).toLocaleString()}) to peak hours could generate $${potentialGain.toLocaleString()} additional revenue.`,
    actions: [
      `Set bid adjustments to +30% for hours: ${peakHours.slice(0, 5).map(h => formatHour(h.hour)).join(', ')}`,
      `Set bid adjustments to -40% for hours: ${offHours.slice(0, 5).map(h => formatHour(h.hour)).join(', ')}`,
      `Enable ad scheduling to concentrate 60% of daily budget during peak performance windows`
    ],
    expectedOutcome: `Revenue lift of $${potentialGain.toLocaleString()} monthly by concentrating spend during high-intent hours, with overall ROAS improving by ${(((peakRevenue / peakSpend) / avgROAS - 1) * 50).toFixed(0)}%.`
  };
}

/**
 * Analyze quality score opportunities
 */
function analyzeQualityScores(qualityScores, campaigns) {
  if (!qualityScores || qualityScores.length === 0 || !campaigns) return [];

  const insights = [];
  const lowQS = qualityScores.filter(q => q.qualityScore < 5);

  if (lowQS.length === 0) return insights;

  // Find campaigns with low QS that have significant spend
  const problematicCampaigns = lowQS
    .map(q => {
      const campaign = campaigns.find(c => c.id === q.campaignId);
      return campaign ? { ...q, ...campaign, avgCPC: campaign.cost / campaign.clicks } : null;
    })
    .filter(c => c && c.cost > 1000)
    .sort((a, b) => b.cost - a.cost);

  if (problematicCampaigns.length === 0) return insights;

  const totalSpend = problematicCampaigns.reduce((sum, c) => sum + c.cost, 0);
  const avgQS = problematicCampaigns.reduce((sum, c) => sum + c.qualityScore, 0) / problematicCampaigns.length;
  const avgCPC = problematicCampaigns.reduce((sum, c) => sum + c.avgCPC, 0) / problematicCampaigns.length;

  // Quality Score improvement typically reduces CPC by 16% per point
  const targetQS = 7;
  const qsImprovement = targetQS - avgQS;
  const cpcReduction = qsImprovement * 0.16;
  const monthlySavings = totalSpend * cpcReduction;

  insights.push({
    severity: qsImprovement > 2 ? 'critical' : 'opportunity',
    title: `Low Quality Scores Costing $${monthlySavings.toLocaleString()}/Month in Wasted Spend`,
    metric: `${avgQS.toFixed(1)} avg QS`,
    description: `${problematicCampaigns.length} campaigns have quality scores below 5 (avg: ${avgQS.toFixed(1)}), spending $${totalSpend.toLocaleString()} at an inflated avg CPC of $${avgCPC.toFixed(2)}. Worst performers: "${problematicCampaigns[0].name}" (QS: ${problematicCampaigns[0].qualityScore}, $${problematicCampaigns[0].cost.toLocaleString()} spend) and "${problematicCampaigns[1]?.name || 'N/A'}" (QS: ${problematicCampaigns[1]?.qualityScore || 'N/A'}).`,
    impact: `Improving quality scores to 7+ would reduce CPC by ${(cpcReduction * 100).toFixed(0)}%, saving $${monthlySavings.toLocaleString()}/month or unlocking ${(monthlySavings / avgCPC).toFixed(0)} additional clicks with same budget.`,
    actions: [
      `Audit ad relevance: ensure headlines contain exact match keywords from each ad group`,
      `Improve landing page experience: reduce load time to <2s, add trust signals, and align content with ad messaging`,
      `Increase expected CTR by testing 3-4 ad variations emphasizing unique value propositions`,
      `Consider pausing "${problematicCampaigns[0].name}" temporarily while fixing QS issues`
    ],
    expectedOutcome: `Quality score improvement to ${targetQS}+ within 2-3 weeks, CPC reduction of ${(cpcReduction * 100).toFixed(0)}%, and monthly savings of $${monthlySavings.toLocaleString()} that can drive ${((monthlySavings / avgCPC) * 0.05).toFixed(0)} additional conversions.`
  });

  return insights;
}

/**
 * Analyze conversion rate trends
 */
function analyzeConversionTrends(campaigns) {
  if (!campaigns || campaigns.length === 0) return null;

  // Assuming campaigns have currentWeek and previousWeek data
  const withTrends = campaigns
    .filter(c => c.clicks > 100 && c.previousWeekClicks > 100)
    .map(c => ({
      ...c,
      currentCVR: c.conversions / c.clicks,
      previousCVR: c.previousWeekConversions / c.previousWeekClicks,
      change: ((c.conversions / c.clicks) - (c.previousWeekConversions / c.previousWeekClicks)) / (c.previousWeekConversions / c.previousWeekClicks)
    }))
    .filter(c => Math.abs(c.change) > 0.15); // At least 15% change

  if (withTrends.length === 0) return null;

  const improving = withTrends.filter(c => c.change > 0).sort((a, b) => b.change - a.change);
  const declining = withTrends.filter(c => c.change < 0).sort((a, b) => a.change - b.change);

  let severity = 'success';
  let title, metric, description, impact, actions, expectedOutcome;

  if (declining.length > improving.length && declining.length >= 2) {
    // More campaigns declining
    severity = 'critical';
    const totalDecline = declining.reduce((sum, c) => sum + Math.abs(c.change), 0) / declining.length;
    const impactedRevenue = declining.reduce((sum, c) => sum + c.revenue, 0);
    const lostRevenue = impactedRevenue * (totalDecline / (1 + totalDecline));

    title = `${declining.length} Campaigns Showing Declining Conversion Rates`;
    metric = `${(totalDecline * 100).toFixed(0)}% avg decline WoW`;
    description = `Week-over-week analysis shows ${declining.length} campaigns with declining conversion rates. "${declining[0].name}" dropped ${(Math.abs(declining[0].change) * 100).toFixed(0)}% (from ${(declining[0].previousCVR * 100).toFixed(2)}% to ${(declining[0].currentCVR * 100).toFixed(2)}%), and "${declining[1].name}" fell ${(Math.abs(declining[1].change) * 100).toFixed(0)}%. Combined, these campaigns generate $${impactedRevenue.toLocaleString()} in revenue.`;
    impact = `If the decline continues, projected revenue loss of $${lostRevenue.toLocaleString()} over next 30 days. Immediate investigation required.`;
    actions = [
      `Review recent changes to landing pages, ad copy, or offers for declining campaigns`,
      `Check for competitor activity or market shifts affecting conversion intent`,
      `A/B test previous ad variations that had higher conversion rates`,
      `Analyze user behavior flow to identify drop-off points in conversion funnel`
    ];
    expectedOutcome = `Identify root cause within 3-5 days and implement fixes to restore CVR to previous levels, preventing $${lostRevenue.toLocaleString()} revenue loss.`;
  } else if (improving.length >= 2) {
    // Campaigns improving
    severity = 'success';
    const totalImprovement = improving.reduce((sum, c) => sum + c.change, 0) / improving.length;
    const impactedSpend = improving.reduce((sum, c) => sum + c.cost, 0);
    const additionalRevenue = impactedSpend * totalImprovement * (improving[0].revenue / improving[0].cost);

    title = `${improving.length} Campaigns Showing Strong Conversion Momentum`;
    metric = `+${(totalImprovement * 100).toFixed(0)}% avg growth WoW`;
    description = `${improving.length} campaigns are showing positive conversion rate trends week-over-week. "${improving[0].name}" improved ${(improving[0].change * 100).toFixed(0)}% (from ${(improving[0].previousCVR * 100).toFixed(2)}% to ${(improving[0].currentCVR * 100).toFixed(2)}%), and "${improving[1].name}" grew ${(improving[1].change * 100).toFixed(0)}%. These winning campaigns are spending $${impactedSpend.toLocaleString()}.`;
    impact = `Positive momentum generating an additional $${additionalRevenue.toLocaleString()} in revenue this week. Opportunity to accelerate with increased budget.`;
    actions = [
      `Increase budgets by 25% for top 2 improving campaigns to capitalize on momentum`,
      `Analyze what's working: identify successful ad copy, offers, or landing page changes`,
      `Apply winning elements to underperforming campaigns in same product category`,
      `Set up alerts to monitor if improvement trend continues or plateaus`
    ];
    expectedOutcome = `Sustain and amplify positive trend for projected $${(additionalRevenue * 4).toLocaleString()} additional monthly revenue with strategic budget increases.`;
  }

  return { severity, title, metric, description, impact, actions, expectedOutcome };
}

/**
 * Analyze keyword performance
 */
function analyzeKeywordPerformance(keywords) {
  if (!keywords || keywords.length === 0) return [];

  const insights = [];
  const withROAS = keywords
    .filter(k => k.cost > 100)
    .map(k => ({
      ...k,
      roas: k.revenue / k.cost,
      cpa: k.cost / k.conversions,
      conversionRate: k.conversions / k.clicks
    }))
    .sort((a, b) => b.roas - a.roas);

  if (withROAS.length < 5) return insights;

  // Top performers
  const topKeywords = withROAS.slice(0, 5);
  const topSpend = topKeywords.reduce((sum, k) => sum + k.cost, 0);
  const topRevenue = topKeywords.reduce((sum, k) => sum + k.revenue, 0);
  const avgTopROAS = topRevenue / topSpend;

  if (avgTopROAS > 4.0) {
    insights.push({
      severity: 'success',
      title: `Top ${topKeywords.length} Keywords Driving ${avgTopROAS.toFixed(1)}x ROAS`,
      metric: `$${topRevenue.toLocaleString()} revenue`,
      description: `Star performers: "${topKeywords[0].keyword}" (${topKeywords[0].roas.toFixed(1)}x ROAS, ${topKeywords[0].conversions} conversions), "${topKeywords[1].keyword}" (${topKeywords[1].roas.toFixed(1)}x), and "${topKeywords[2].keyword}" (${topKeywords[2].roas.toFixed(1)}x). These keywords show avg conversion rate of ${(topKeywords[0].conversionRate * 100).toFixed(2)}% and CPA of $${topKeywords[0].cpa.toFixed(2)}.`,
      impact: `These proven keywords are generating $${topRevenue.toLocaleString()} from $${topSpend.toLocaleString()} spend. Can absorb 50% more budget for $${(topRevenue * 0.5).toLocaleString()} additional revenue.`,
      actions: [
        `Raise bids by 30% for these top keywords to capture additional impression share`,
        `Create dedicated ad groups with highly relevant ad copy for each top keyword`,
        `Mine search term reports for related long-tail variations to expand reach`,
        `Allocate separate budget to ensure these keywords are never limited by shared budgets`
      ],
      expectedOutcome: `Increased impression share from avg ${(topKeywords[0].impressionShare || 65).toFixed(0)}% to 85%+, driving $${(topRevenue * 0.4).toLocaleString()} additional monthly revenue.`
    });
  }

  // Underperformers
  const bottomKeywords = withROAS.slice(-5).filter(k => k.roas < 1.5);
  if (bottomKeywords.length >= 3) {
    const bottomSpend = bottomKeywords.reduce((sum, k) => sum + k.cost, 0);
    const bottomRevenue = bottomKeywords.reduce((sum, k) => sum + k.revenue, 0);
    const avgBottomROAS = bottomRevenue / bottomSpend;
    const wastedSpend = bottomSpend * (1 - avgBottomROAS);

    insights.push({
      severity: 'critical',
      title: `${bottomKeywords.length} Keywords Burning Budget with Sub-1.5x ROAS`,
      metric: `$${wastedSpend.toLocaleString()} wasted`,
      description: `Bottom performers draining resources: "${bottomKeywords[0].keyword}" (${bottomKeywords[0].roas.toFixed(2)}x ROAS, $${bottomKeywords[0].cost.toLocaleString()} spend), "${bottomKeywords[1].keyword}" (${bottomKeywords[1].roas.toFixed(2)}x), and "${bottomKeywords[2].keyword}" (${bottomKeywords[2].roas.toFixed(2)}x). These keywords have poor conversion rates (avg ${(bottomKeywords[0].conversionRate * 100).toFixed(2)}%) and high CPA ($${bottomKeywords[0].cpa.toFixed(2)}).`,
      impact: `These ${bottomKeywords.length} keywords are consuming $${bottomSpend.toLocaleString()} with minimal return. Pausing them saves $${wastedSpend.toLocaleString()}/month for reallocation.`,
      actions: [
        `Pause or reduce bids by 70% for: "${bottomKeywords[0].keyword}", "${bottomKeywords[1].keyword}", "${bottomKeywords[2].keyword}"`,
        `Review match types - consider moving broad match keywords to phrase or exact match`,
        `Add negative keywords to prevent wasted spend on irrelevant searches`,
        `Reallocate saved budget to top performing keywords for maximum return`
      ],
      expectedOutcome: `Save $${wastedSpend.toLocaleString()}/month, reallocate to top performers for net revenue increase of $${(wastedSpend * avgTopROAS).toLocaleString()}.`
    });
  }

  return insights;
}

/**
 * Analyze campaign efficiency and ROAS distribution
 */
function analyzeCampaignEfficiency(campaigns) {
  if (!campaigns || campaigns.length === 0) return [];

  const insights = [];
  const withROAS = campaigns
    .filter(c => c.cost > 500)
    .map(c => ({
      ...c,
      roas: c.revenue / c.cost
    }))
    .sort((a, b) => b.roas - a.roas);

  // Segment into tiers
  const excellent = withROAS.filter(c => c.roas >= 4.0);
  const good = withROAS.filter(c => c.roas >= 2.5 && c.roas < 4.0);
  const marginal = withROAS.filter(c => c.roas >= 1.5 && c.roas < 2.5);
  const poor = withROAS.filter(c => c.roas < 1.5);

  // Excellent campaigns - scale opportunity
  if (excellent.length > 0) {
    const excellentSpend = excellent.reduce((sum, c) => sum + c.cost, 0);
    const excellentRevenue = excellent.reduce((sum, c) => sum + c.revenue, 0);
    const avgROAS = excellentRevenue / excellentSpend;
    const scaleOpportunity = excellentSpend * 0.5 * avgROAS;

    insights.push({
      severity: 'opportunity',
      title: `${excellent.length} High-Efficiency Campaigns Ready to Scale`,
      metric: `${avgROAS.toFixed(1)}x avg ROAS`,
      description: `${excellent.length} campaigns are performing exceptionally well with 4.0x+ ROAS: "${excellent[0].name}" (${excellent[0].roas.toFixed(1)}x, $${excellent[0].revenue.toLocaleString()} revenue), "${excellent[1]?.name || 'N/A'}" (${excellent[1]?.roas.toFixed(1) || 'N/A'}x). Combined spend: $${excellentSpend.toLocaleString()}, revenue: $${excellentRevenue.toLocaleString()}.`,
      impact: `These efficient campaigns can absorb 50% more budget while maintaining strong performance, unlocking $${scaleOpportunity.toLocaleString()} additional revenue.`,
      actions: [
        `Increase daily budgets by 50% for all campaigns with 4.0x+ ROAS`,
        `Monitor for 1 week to ensure ROAS remains above 3.5x after scaling`,
        `Remove any budget caps or shared budget constraints limiting these campaigns`,
        `Expand keyword lists and increase impression share in top campaigns`
      ],
      expectedOutcome: `Revenue increase of $${scaleOpportunity.toLocaleString()} with ROAS stabilizing around ${(avgROAS * 0.85).toFixed(1)}x as budget scales.`
    });
  }

  // Poor campaigns - pause recommendation
  if (poor.length > 0) {
    const poorSpend = poor.reduce((sum, c) => sum + c.cost, 0);
    const poorRevenue = poor.reduce((sum, c) => sum + c.revenue, 0);
    const avgPoorROAS = poorRevenue / poorSpend;
    const wastedAmount = poorSpend - poorRevenue;

    insights.push({
      severity: 'critical',
      title: `${poor.length} Campaigns Losing Money - Pause Recommended`,
      metric: `${avgPoorROAS.toFixed(2)}x avg ROAS`,
      description: `${poor.length} campaigns are generating less than 1.5x ROAS, effectively losing money: "${poor[0].name}" (${poor[0].roas.toFixed(2)}x ROAS, $${poor[0].cost.toLocaleString()} spend with only $${poor[0].revenue.toLocaleString()} revenue), "${poor[1]?.name || 'N/A'}" (${poor[1]?.roas.toFixed(2) || 'N/A'}x). Total spend: $${poorSpend.toLocaleString()}.`,
      impact: `These campaigns are losing $${wastedAmount.toLocaleString()} per period. Pausing them immediately stops losses and frees budget for profitable campaigns.`,
      actions: [
        `Pause "${poor[0].name}" and "${poor[1]?.name || 'N/A'}" immediately`,
        `Conduct full audit of remaining poor performers before re-enabling`,
        `Reallocate the $${poorSpend.toLocaleString()} budget to campaigns with 3.0x+ ROAS`,
        `Set automated rules to pause any campaign dropping below 1.5x ROAS for 5 days`
      ],
      expectedOutcome: `Stop $${wastedAmount.toLocaleString()} in losses, redeploy budget to high performers for net gain of $${(poorSpend * 3.5).toLocaleString()} in revenue.`
    });
  }

  return insights;
}

/**
 * Analyze budget pacing
 */
function analyzeBudgetPacing(budgetPacing, campaigns) {
  if (!budgetPacing || !campaigns) return null;

  const { totalBudget, spentToDate, daysInPeriod, daysElapsed } = budgetPacing;
  const daysRemaining = daysInPeriod - daysElapsed;
  const budgetRemaining = totalBudget - spentToDate;
  const dailySpendRate = spentToDate / daysElapsed;
  const projectedSpend = dailySpendRate * daysInPeriod;
  const pacePercentage = (spentToDate / totalBudget) / (daysElapsed / daysInPeriod);

  let severity, title, metric, description, impact, actions, expectedOutcome;

  if (pacePercentage > 1.15) {
    // Overpacing - will run out of budget
    severity = 'critical';
    const daysUntilEmpty = budgetRemaining / dailySpendRate;
    const shortfall = projectedSpend - totalBudget;

    title = `Budget Overpacing by ${((pacePercentage - 1) * 100).toFixed(0)}% - Will Exhaust ${daysUntilEmpty.toFixed(0)} Days Early`;
    metric = `${((spentToDate / totalBudget) * 100).toFixed(0)}% spent, ${((daysElapsed / daysInPeriod) * 100).toFixed(0)}% elapsed`;
    description = `Current spend rate of $${dailySpendRate.toLocaleString()}/day will exhaust the $${totalBudget.toLocaleString()} budget in ${daysUntilEmpty.toFixed(0)} days, leaving ${(daysRemaining - daysUntilEmpty).toFixed(0)} days with no ads running. Already spent $${spentToDate.toLocaleString()} (${((spentToDate / totalBudget) * 100).toFixed(0)}%) with ${daysRemaining} days remaining (${((daysRemaining / daysInPeriod) * 100).toFixed(0)}% of period).`;
    impact = `Projected to exceed budget by $${shortfall.toLocaleString()}, causing campaigns to pause ${(daysRemaining - daysUntilEmpty).toFixed(0)} days before period ends, losing revenue opportunities.`;
    actions = [
      `Reduce daily budgets by ${((pacePercentage - 1) * 100).toFixed(0)}% across all campaigns to align with remaining budget`,
      `Prioritize top-performing campaigns (ROAS 3.0x+) and pause low performers (ROAS <2.0x)`,
      `Set up daily budget alerts at 80%, 90%, and 95% thresholds`,
      `Request budget increase of $${shortfall.toLocaleString()} if campaign performance justifies it`
    ];
    expectedOutcome = `Stabilize spend rate to $${(budgetRemaining / daysRemaining).toLocaleString()}/day, ensure campaigns run through end of period, maintain consistent market presence.`;
  } else if (pacePercentage < 0.85) {
    // Underpacing - leaving money on the table
    severity = 'opportunity';
    const unusedBudget = totalBudget - projectedSpend;
    const avgROAS = campaigns.reduce((sum, c) => sum + c.revenue, 0) / campaigns.reduce((sum, c) => sum + c.cost, 0);
    const lostRevenue = unusedBudget * avgROAS;

    title = `Budget Underpacing by ${((1 - pacePercentage) * 100).toFixed(0)}% - Leaving $${unusedBudget.toLocaleString()} Unspent`;
    metric = `${((spentToDate / totalBudget) * 100).toFixed(0)}% spent, ${((daysElapsed / daysInPeriod) * 100).toFixed(0)}% elapsed`;
    description = `Current spend rate of $${dailySpendRate.toLocaleString()}/day will only use $${projectedSpend.toLocaleString()} of $${totalBudget.toLocaleString()} budget, leaving $${unusedBudget.toLocaleString()} unspent. Already ${daysElapsed} days into ${daysInPeriod}-day period but only ${((spentToDate / totalBudget) * 100).toFixed(0)}% of budget deployed.`;
    impact: `Underutilized budget of $${unusedBudget.toLocaleString()} represents $${lostRevenue.toLocaleString()} in missed revenue at current ${avgROAS.toFixed(1)}x ROAS.`;
    actions: [
      `Increase daily budgets by ${((1 - pacePercentage) * 100).toFixed(0)}% to utilize full budget allocation`,
      `Expand keyword targeting in top-performing campaigns to capture more traffic`,
      `Test new campaign variations or product categories with excess budget`,
      `Raise bids on high-ROAS campaigns to increase impression share`
    ];
    expectedOutcome = `Accelerate to $${(budgetRemaining / daysRemaining).toLocaleString()}/day spend rate, utilize full budget, capture $${lostRevenue.toLocaleString()} in additional revenue.`;
  } else {
    // On pace - success
    severity = 'success';
    title = `Budget Pacing On Track - ${((spentToDate / totalBudget) * 100).toFixed(0)}% Spent with ${((daysElapsed / daysInPeriod) * 100).toFixed(0)}% Elapsed`;
    metric = `${pacePercentage.toFixed(2)}x pace ratio`;
    description = `Budget pacing is healthy with $${spentToDate.toLocaleString()} spent (${((spentToDate / totalBudget) * 100).toFixed(0)}%) over ${daysElapsed} days (${((daysElapsed / daysInPeriod) * 100).toFixed(0)}% of period). Current spend rate of $${dailySpendRate.toLocaleString()}/day projects to utilize ${((projectedSpend / totalBudget) * 100).toFixed(0)}% of total budget by period end.`;
    impact = `Well-managed budget allocation ensures consistent campaign delivery throughout the entire period with $${budgetRemaining.toLocaleString()} remaining for ${daysRemaining} days.`;
    actions = [
      `Continue monitoring pacing weekly to maintain current trajectory`,
      `Watch for any campaigns hitting daily budget limits that may need increases`,
      `Plan next period's budget based on current performance patterns`
    ];
    expectedOutcome = `Maintain current pace to utilize 95-100% of budget with consistent daily spend of $${(budgetRemaining / daysRemaining).toLocaleString()}/day.`;
  }

  return { severity, title, metric, description, impact, actions, expectedOutcome };
}

/**
 * Analyze attribution patterns
 */
function analyzeAttribution(attributionData) {
  if (!attributionData) return null;

  const { postClickConversions, postViewConversions, postClickRevenue, postViewRevenue, totalConversions, totalRevenue } = attributionData;

  if (!postClickConversions || !postViewConversions) return null;

  const postClickRate = postClickConversions / totalConversions;
  const postViewRate = postViewConversions / totalConversions;
  const postClickROI = postClickRevenue / (totalRevenue * postClickRate);
  const postViewROI = postViewRevenue / (totalRevenue * postViewRate);

  let severity, title, metric, description, impact, actions, expectedOutcome;

  if (postViewRate > 0.4) {
    // High view-through conversions - consider display/video
    severity = 'opportunity';
    const viewThroughValue = postViewRevenue;

    title = `${(postViewRate * 100).toFixed(0)}% Conversions Are View-Through - Display/Video Opportunity`;
    metric = `$${viewThroughValue.toLocaleString()} view-through revenue`;
    description = `Attribution analysis reveals ${postViewConversions} conversions (${(postViewRate * 100).toFixed(0)}%) are view-through, generating $${viewThroughValue.toLocaleString()} in revenue. This indicates strong brand awareness and consideration effects from display impressions. Post-click conversions: ${postClickConversions} (${(postClickRate * 100).toFixed(0)}%), post-view conversions: ${postViewConversions} (${(postViewRate * 100).toFixed(0)}%).`;
    impact = `High view-through rate suggests audience is seeing ads multiple times before converting. Display and video campaigns are contributing significantly to revenue even without direct clicks.`;
    actions = [
      `Increase budget allocation to display and YouTube campaigns by 25% to maximize brand exposure`,
      `Implement sequential messaging strategy: awareness → consideration → conversion creative`,
      `Set up remarketing audiences to recapture view-through users with direct-response messaging`,
      `Test connected TV and video campaigns to further amplify view-through conversions`
    ];
    expectedOutcome = `Boost brand awareness leading to ${((postViewConversions * 0.3).toFixed(0))} additional view-through conversions and $${(viewThroughValue * 0.3).toLocaleString()} incremental revenue.`;
  } else if (postClickRate > 0.85) {
    // Very high direct response - optimize for clicks
    severity = 'success';
    const directValue = postClickRevenue;

    title = `${(postClickRate * 100).toFixed(0)}% Conversions Are Post-Click - Strong Direct Response Performance`;
    metric = `$${directValue.toLocaleString()} post-click revenue`;
    description = `Attribution shows ${postClickConversions} conversions (${(postClickRate * 100).toFixed(0)}%) happen immediately after click, generating $${directValue.toLocaleString()} in revenue. This indicates highly intentional traffic with clear purchase intent. View-through conversions represent only ${(postViewRate * 100).toFixed(0)}% of total.`;
    impact = `Strong direct-response performance validates current keyword targeting and ad messaging. Users are clicking with high intent to convert.`;
    actions = [
      `Double down on search campaigns targeting high-intent keywords (branded, "buy", "price" terms)`,
      `Optimize landing pages for immediate conversion with clear CTAs and minimal friction`,
      `Reduce display/video budget if ROAS is lower than search campaigns`,
      `Test aggressive remarketing to capture users who clicked but didn't convert`
    ];
    expectedOutcome = `Maintain high post-click conversion rate above ${(postClickRate * 100).toFixed(0)}%, focus budget on direct response channels for maximum efficiency.`;
  } else {
    // Balanced attribution
    severity = 'success';
    title = `Balanced Attribution Mix - ${(postClickRate * 100).toFixed(0)}% Post-Click, ${(postViewRate * 100).toFixed(0)}% Post-View`;
    metric = `${totalConversions} total conversions`;
    description = `Healthy attribution mix with ${postClickConversions} post-click conversions ($${postClickRevenue.toLocaleString()}) and ${postViewConversions} view-through conversions ($${postViewRevenue.toLocaleString()}). This balanced approach combines direct response with brand awareness for comprehensive funnel coverage.`;
    impact = `Diversified attribution indicates a well-rounded marketing mix reaching users at multiple touchpoints throughout their customer journey.`;
    actions = [
      `Maintain current channel mix to preserve balanced attribution`,
      `Use data-driven attribution modeling to optimize credit allocation`,
      `Test increasing investment in whichever attribution path shows higher incremental ROAS`,
      `Continue monitoring attribution shifts monthly to identify emerging patterns`
    ];
    expectedOutcome = `Sustain balanced approach for steady growth across both direct response and awareness-driven conversions.`;
  }

  return { severity, title, metric, description, impact, actions, expectedOutcome };
}

// Export the main function
module.exports = { generateInsights };

// Example usage
if (require.main === module) {
  // Sample data for testing
  const sampleData = {
    campaigns: [
      { id: 1, name: 'Brand Search Campaign', cost: 15000, revenue: 75000, clicks: 5000, conversions: 250, previousWeekClicks: 4800, previousWeekConversions: 220 },
      { id: 2, name: 'Product Category - Shoes', cost: 22000, revenue: 110000, clicks: 7500, conversions: 400, previousWeekClicks: 7200, previousWeekConversions: 380 },
      { id: 3, name: 'Generic Keywords Campaign', cost: 18000, revenue: 27000, clicks: 9000, conversions: 150, previousWeekClicks: 8500, previousWeekConversions: 140 },
      { id: 4, name: 'Competitor Campaign', cost: 8000, revenue: 40000, clicks: 2500, conversions: 200, previousWeekClicks: 2400, previousWeekConversions: 180 },
      { id: 5, name: 'Display Awareness', cost: 12000, revenue: 24000, clicks: 15000, conversions: 120, previousWeekClicks: 14500, previousWeekConversions: 130 }
    ],
    devicePerformance: [
      { device: 'mobile', cost: 35000, revenue: 175000, clicks: 18000, conversions: 700 },
      { device: 'desktop', cost: 40000, revenue: 120000, clicks: 12000, conversions: 420 }
    ],
    geoPerformance: [
      { location: 'California', cost: 25000, revenue: 150000, conversions: 500 },
      { location: 'New York', cost: 20000, revenue: 90000, conversions: 350 },
      { location: 'Texas', cost: 15000, revenue: 60000, conversions: 250 },
      { location: 'Florida', cost: 10000, revenue: 12000, conversions: 50 },
      { location: 'Ohio', cost: 5000, revenue: 6000, conversions: 30 }
    ],
    hourlyPerformance: [
      { hour: 9, cost: 4000, revenue: 24000, clicks: 1500, conversions: 100 },
      { hour: 10, cost: 5000, revenue: 30000, clicks: 1800, conversions: 125 },
      { hour: 11, cost: 5500, revenue: 33000, clicks: 2000, conversions: 135 },
      { hour: 14, cost: 6000, revenue: 36000, clicks: 2200, conversions: 145 },
      { hour: 15, cost: 5000, revenue: 27500, clicks: 1900, conversions: 110 },
      { hour: 20, cost: 4500, revenue: 18000, clicks: 2500, conversions: 75 },
      { hour: 2, cost: 3000, revenue: 6000, clicks: 1800, conversions: 30 },
      { hour: 3, cost: 2500, revenue: 4500, clicks: 1500, conversions: 25 }
    ],
    keywords: [
      { keyword: 'buy running shoes online', cost: 5000, revenue: 30000, clicks: 800, conversions: 120, impressionShare: 68 },
      { keyword: 'best running shoes 2026', cost: 4500, revenue: 22500, clicks: 900, conversions: 95 },
      { keyword: 'cheap shoes', cost: 3500, revenue: 3500, clicks: 2500, conversions: 25 },
      { keyword: 'running shoes', cost: 8000, revenue: 40000, clicks: 3000, conversions: 180 },
      { keyword: 'athletic footwear sale', cost: 2500, revenue: 2000, clicks: 1500, conversions: 15 },
      { keyword: 'shoes online', cost: 4000, revenue: 4500, clicks: 2000, conversions: 30 }
    ],
    qualityScores: [
      { campaignId: 3, qualityScore: 4 },
      { campaignId: 5, qualityScore: 3 },
      { campaignId: 1, qualityScore: 8 },
      { campaignId: 2, qualityScore: 7 },
      { campaignId: 4, qualityScore: 9 }
    ],
    budgetPacing: {
      totalBudget: 100000,
      spentToDate: 65000,
      daysInPeriod: 30,
      daysElapsed: 18
    },
    attributionData: {
      postClickConversions: 850,
      postViewConversions: 270,
      postClickRevenue: 255000,
      postViewRevenue: 81000,
      totalConversions: 1120,
      totalRevenue: 336000
    }
  };

  const insights = generateInsights(sampleData);
  console.log(JSON.stringify(insights, null, 2));
}
