/**
 * Google Ads Mock Data Generator
 * Based on actual Google Ads API field structure
 * Generates 30 days of realistic performance data
 */

function generateGoogleAdsData() {
    const data = {
        campaigns: [],
        adGroups: [],
        ads: [],
        keywords: [],
        dailyMetrics: [],
        conversionTypes: ['PURCHASE', 'LEAD', 'ADD_TO_CART', 'SIGNUP', 'DOWNLOAD'],
        devices: ['MOBILE', 'DESKTOP', 'TABLET'],
        locations: ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania'],
        networks: ['SEARCH', 'SEARCH_PARTNERS', 'DISPLAY'],
        aggregated: {
            byDevice: {},
            byLocation: {},
            byHour: Array(24).fill(null).map(() => ({ impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0 })),
            byNetwork: {},
            byConversionType: {}
        }
    };

    // Campaign definitions
    const campaignTemplates = [
        { name: 'Brand Search - High Intent', type: 'SEARCH', budget: 50000, dailyBudget: 1800, status: 'ENABLED' },
        { name: 'Product Launch - Display', type: 'DISPLAY', budget: 35000, dailyBudget: 1200, status: 'ENABLED' },
        { name: 'Retargeting - Shopping', type: 'SHOPPING', budget: 42000, dailyBudget: 1400, status: 'ENABLED' },
        { name: 'Video Awareness Campaign', type: 'VIDEO', budget: 30000, dailyBudget: 1000, status: 'ENABLED' },
        { name: 'Competitor Keywords', type: 'SEARCH', budget: 28000, dailyBudget: 950, status: 'ENABLED' },
        { name: 'Lead Generation - B2B', type: 'SEARCH', budget: 38000, dailyBudget: 1300, status: 'ENABLED' },
        { name: 'Black Friday Promo', type: 'SHOPPING', budget: 60000, dailyBudget: 2000, status: 'PAUSED' },
        { name: 'Mobile App Install', type: 'APP', budget: 22000, dailyBudget: 750, status: 'PAUSED' }
    ];

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 30);

    // Generate campaigns
    campaignTemplates.forEach((template, cIdx) => {
        const campaign = {
            campaign_id: `campaign-${1000 + cIdx}`,
            campaign_name: template.name,
            campaign_status: template.status,
            campaign_type: template.type,
            campaign_start_date: new Date(startDate.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
            campaign_end_date: template.status === 'PAUSED' ? new Date(today.getTime() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString() : null,
            campaign_advertiser_id: 'ADV-123456',
            campaign_advertiser: 'Acme Corporation',
            currency: 'USD',
            budget: template.budget,
            daily_budget: template.dailyBudget,
            campaign_billing_code: 'BILL-' + (1000 + cIdx),
            campaign_category: template.type,

            // Aggregated metrics (will be calculated)
            total_impressions: 0,
            total_clicks: 0,
            total_spend: 0,
            total_conversions: 0,
            total_revenue: 0,
            engagements: 0,
            interactions: 0
        };

        data.campaigns.push(campaign);

        // Generate ad groups for this campaign (3-5 per campaign)
        const numAdGroups = Math.floor(Math.random() * 3) + 3;
        for (let agIdx = 0; agIdx < numAdGroups; agIdx++) {
            const adGroup = {
                campaign_id: campaign.campaign_id,
                ad_group_id: `${campaign.campaign_id}-ag-${agIdx + 1}`,
                ad_group_name: getAdGroupName(template.type, agIdx),
                ad_network_type: template.type === 'DISPLAY' ? 'DISPLAY' : 'SEARCH',
                label: `AG-${template.type}-${agIdx + 1}`,

                // Metrics
                impressions: 0,
                clicks: 0,
                spend: 0,
                conversions: 0,
                revenue: 0
            };

            data.adGroups.push(adGroup);

            // Generate ads for this ad group (2-4 per ad group)
            const numAds = Math.floor(Math.random() * 3) + 2;
            for (let adIdx = 0; adIdx < numAds; adIdx++) {
                const ad = {
                    campaign_id: campaign.campaign_id,
                    ad_group_id: adGroup.ad_group_id,
                    ad_id: `${adGroup.ad_group_id}-ad-${adIdx + 1}`,
                    ad_name: `Ad Variation ${adIdx + 1}`,
                    type: getAdFormat(template.type),
                    headline_part_1: generateHeadline(template.name, 1),
                    headline_part_2: generateHeadline(template.name, 2),
                    description: generateDescription(template.name),
                    description_2: generateDescription(template.name, 2),
                    creative_title_name: `${template.name} - Creative ${adIdx + 1}`,
                    display_url: 'www.example.com',
                    final_urls: `https://www.example.com/${template.type.toLowerCase()}/${adIdx + 1}`,
                    path1: template.type.toLowerCase(),
                    path2: `offer${adIdx + 1}`,

                    // Metrics
                    impressions: 0,
                    clicks: 0,
                    spend: 0,
                    conversions: 0,
                    revenue: 0
                };

                data.ads.push(ad);
            }

            // Generate keywords for search campaigns
            if (template.type === 'SEARCH') {
                const numKeywords = Math.floor(Math.random() * 6) + 5;
                for (let kwIdx = 0; kwIdx < numKeywords; kwIdx++) {
                    const keyword = {
                        campaign_id: campaign.campaign_id,
                        ad_group_id: adGroup.ad_group_id,
                        criterion_id: `${adGroup.ad_group_id}-kw-${kwIdx + 1}`,
                        keyword_text: generateKeyword(template.name, kwIdx),
                        match_type: ['BROAD', 'PHRASE', 'EXACT'][kwIdx % 3],
                        keyword_status: Math.random() > 0.1 ? 'ENABLED' : 'PAUSED',
                        final_urls: `https://www.example.com/search?q=${kwIdx}`,
                        quality_score: Math.floor(Math.random() * 4) + 6, // 6-10
                        creative_quality_score: Math.floor(Math.random() * 3) + 6,
                        post_click_quality_score: Math.floor(Math.random() * 3) + 6,

                        // Metrics
                        impressions: 0,
                        clicks: 0,
                        spend: 0,
                        conversions: 0,
                        engagements: 0,
                        interactions: 0,
                        search_impression_share: 0,
                        search_exact_match_impression_share: 0,
                        top_impression_percentage: 0,
                        absolute_top_impression_percentage: 0,
                        search_rank_lost_impression_share: 0,
                        search_budget_lost_impression_share: 0,
                        search_top_impression_share: 0
                    };

                    data.keywords.push(keyword);
                }
            }
        }
    });

    // Generate 30 days of daily metrics
    for (let day = 0; day < 30; day++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + day);
        const dateStr = date.toISOString().split('T')[0];
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        // Performance multipliers
        const dayMultiplier = isWeekend ? 0.7 : 1.0;
        const trendMultiplier = 0.85 + (day / 30) * 0.35; // Improving trend: 0.85 to 1.2

        data.campaigns.forEach((campaign, cIdx) => {
            if (campaign.campaign_status === 'PAUSED' && day > 20) return; // Paused campaigns stop after day 20

            const campaignPerformance = getCampaignPerformanceMultiplier(campaign.campaign_type, cIdx);

            // Daily campaign metrics
            const dailyImpressions = Math.floor((Math.random() * 8000 + 5000) * dayMultiplier * trendMultiplier * campaignPerformance);
            const baseCTR = 0.025 + (Math.random() * 0.02);
            const dailyClicks = Math.floor(dailyImpressions * baseCTR);
            const dailySpend = Math.floor((campaign.daily_budget * 0.8) + (Math.random() * campaign.daily_budget * 0.4));

            const conversionRate = 0.04 + (Math.random() * 0.04);
            const dailyConversions = Math.floor(dailyClicks * conversionRate * campaignPerformance);
            const revenuePerConversion = 100 + (Math.random() * 100);
            const dailyRevenue = dailyConversions * revenuePerConversion;

            const dailyEngagements = Math.floor(dailyClicks * (0.3 + Math.random() * 0.3));
            const dailyInteractions = Math.floor(dailyClicks * 1.1);

            // Update campaign totals
            campaign.total_impressions += dailyImpressions;
            campaign.total_clicks += dailyClicks;
            campaign.total_spend += dailySpend;
            campaign.total_conversions += dailyConversions;
            campaign.total_revenue += dailyRevenue;
            campaign.engagements += dailyEngagements;
            campaign.interactions += dailyInteractions;

            // Distribute to devices
            const deviceDistribution = campaign.campaign_type === 'VIDEO'
                ? { MOBILE: 0.70, DESKTOP: 0.20, TABLET: 0.10 }
                : { MOBILE: 0.55, DESKTOP: 0.35, TABLET: 0.10 };

            Object.entries(deviceDistribution).forEach(([device, share]) => {
                if (!data.aggregated.byDevice[device]) {
                    data.aggregated.byDevice[device] = {
                        impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0
                    };
                }

                const deviceBonus = device === 'MOBILE' ? 1.25 : device === 'DESKTOP' ? 1.0 : 0.8;
                data.aggregated.byDevice[device].impressions += Math.floor(dailyImpressions * share);
                data.aggregated.byDevice[device].clicks += Math.floor(dailyClicks * share);
                data.aggregated.byDevice[device].spend += Math.floor(dailySpend * share);
                data.aggregated.byDevice[device].conversions += Math.floor(dailyConversions * share * deviceBonus);
                data.aggregated.byDevice[device].revenue += dailyRevenue * share * deviceBonus;
            });

            // Distribute to locations
            const locationShares = [0.30, 0.22, 0.18, 0.15, 0.10, 0.05];
            data.locations.forEach((location, locIdx) => {
                if (!data.aggregated.byLocation[location]) {
                    data.aggregated.byLocation[location] = {
                        impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0
                    };
                }

                const share = locationShares[locIdx];
                const locationBonus = 1.3 - (locIdx * 0.1); // California best, others decrease

                data.aggregated.byLocation[location].impressions += Math.floor(dailyImpressions * share);
                data.aggregated.byLocation[location].clicks += Math.floor(dailyClicks * share);
                data.aggregated.byLocation[location].spend += Math.floor(dailySpend * share);
                data.aggregated.byLocation[location].conversions += Math.floor(dailyConversions * share * locationBonus);
                data.aggregated.byLocation[location].revenue += dailyRevenue * share * locationBonus;
            });

            // Distribute to hours (peak hours: 9-11, 14-16, 19-21)
            for (let hour = 0; hour < 24; hour++) {
                const isPeakHour = (hour >= 9 && hour <= 11) || (hour >= 14 && hour <= 16) || (hour >= 19 && hour <= 21);
                const hourMultiplier = isPeakHour ? 1.6 : 0.6;

                data.aggregated.byHour[hour].impressions += Math.floor((dailyImpressions / 24) * hourMultiplier);
                data.aggregated.byHour[hour].clicks += Math.floor((dailyClicks / 24) * hourMultiplier);
                data.aggregated.byHour[hour].spend += (dailySpend / 24) * hourMultiplier;
                data.aggregated.byHour[hour].conversions += Math.floor((dailyConversions / 24) * hourMultiplier);
                data.aggregated.byHour[hour].revenue += (dailyRevenue / 24) * hourMultiplier;
            }

            // Distribute conversions to types
            data.conversionTypes.forEach((convType, ctIdx) => {
                if (!data.aggregated.byConversionType[convType]) {
                    data.aggregated.byConversionType[convType] = {
                        conversions: 0, revenue: 0, view_through_conversions: 0
                    };
                }

                const typeShare = [0.45, 0.25, 0.15, 0.10, 0.05][ctIdx];
                const postClickConversions = Math.floor(dailyConversions * typeShare * 0.75);
                const postViewConversions = Math.floor(dailyConversions * typeShare * 0.25);

                data.aggregated.byConversionType[convType].conversions += postClickConversions + postViewConversions;
                data.aggregated.byConversionType[convType].revenue += dailyRevenue * typeShare;
                data.aggregated.byConversionType[convType].view_through_conversions += postViewConversions;
            });

            // Store daily metric
            data.dailyMetrics.push({
                date: dateStr,
                campaign_id: campaign.campaign_id,
                campaign_name: campaign.campaign_name,
                impressions: dailyImpressions,
                clicks: dailyClicks,
                spend: dailySpend,
                conversions: dailyConversions,
                revenue: dailyRevenue,
                ctr: (dailyClicks / dailyImpressions * 100).toFixed(2),
                cpc: (dailySpend / dailyClicks).toFixed(2),
                cpa: dailyConversions > 0 ? (dailySpend / dailyConversions).toFixed(2) : 0,
                roas: dailySpend > 0 ? (dailyRevenue / dailySpend).toFixed(2) : 0,
                engagements: dailyEngagements,
                interactions: dailyInteractions
            });
        });
    }

    // Calculate campaign-level derived metrics
    data.campaigns.forEach(campaign => {
        campaign.ctr = (campaign.total_clicks / campaign.total_impressions * 100).toFixed(2);
        campaign.cpc = (campaign.total_spend / campaign.total_clicks).toFixed(2);
        campaign.cpa = campaign.total_conversions > 0 ? (campaign.total_spend / campaign.total_conversions).toFixed(2) : '0.00';
        campaign.roas = campaign.total_spend > 0 ? (campaign.total_revenue / campaign.total_spend).toFixed(2) : '0.00';
        campaign.conversion_rate = (campaign.total_conversions / campaign.total_clicks * 100).toFixed(2);
    });

    // Sort campaigns by ROAS
    data.campaigns.sort((a, b) => parseFloat(b.roas) - parseFloat(a.roas));

    return data;
}

// Helper functions
function getAdGroupName(campaignType, index) {
    const names = {
        SEARCH: ['High Intent Keywords', 'Brand Terms', 'Competitor Keywords', 'Long Tail', 'Product Specific'],
        DISPLAY: ['Remarketing Audience', 'In-Market Shoppers', 'Custom Intent', 'Similar Audiences', 'Topic Targeting'],
        SHOPPING: ['Best Sellers', 'New Arrivals', 'Seasonal Products', 'Clearance Items', 'Premium Products'],
        VIDEO: ['Awareness Audience', 'Consideration Viewers', 'Action-Ready', 'Engaged Viewers', 'Retargeting'],
        APP: ['New User Acquisition', 'Re-engagement', 'High Value Users', 'Lookalike Audience', 'In-App Actions']
    };
    return names[campaignType][index % names[campaignType].length];
}

function getAdFormat(campaignType) {
    const formats = {
        SEARCH: 'EXPANDED_TEXT_AD',
        DISPLAY: 'RESPONSIVE_DISPLAY_AD',
        SHOPPING: 'PRODUCT_AD',
        VIDEO: 'VIDEO_AD',
        APP: 'APP_AD'
    };
    return formats[campaignType] || 'RESPONSIVE_AD';
}

function generateHeadline(campaignName, part) {
    const headlines = [
        ['Save 20% Today', 'Limited Time Offer', 'Shop Now & Save'],
        ['Free Shipping', 'Best Prices Online', 'Top Rated Products']
    ];
    return headlines[part - 1][Math.floor(Math.random() * 3)];
}

function generateDescription(campaignName, part = 1) {
    const descriptions = [
        'Discover amazing deals on top products. Shop now and save big!',
        'High quality products at unbeatable prices. Free shipping on orders over $50.'
    ];
    return descriptions[part - 1];
}

function generateKeyword(campaignName, index) {
    const keywords = [
        'buy online', 'best deals', 'discount products', 'top rated', 'free shipping',
        'shop now', 'sale items', 'premium quality', 'affordable price', 'limited time'
    ];
    return keywords[index % keywords.length];
}

function getCampaignPerformanceMultiplier(type, index) {
    const basePerformance = {
        SEARCH: 1.2,
        DISPLAY: 0.9,
        SHOPPING: 1.1,
        VIDEO: 0.85,
        APP: 0.8
    };

    // First campaigns perform better
    const positionMultiplier = 1.15 - (index * 0.05);

    return (basePerformance[type] || 1.0) * positionMultiplier;
}

// Export for use in dashboard
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateGoogleAdsData };
}
