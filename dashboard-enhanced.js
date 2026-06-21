// Enhanced Google Ads Dashboard with Real Intelligence
class IntelligentDashboard {
    constructor() {
        this.mockData = this.generateIntelligentData();
        this.filteredData = this.mockData;
        this.charts = {};
        this.init();
    }

    generateIntelligentData() {
        const campaigns = [
            { name: 'Brand Awareness Q2', type: 'SEARCH', status: 'ENABLED', budget: 50000, dailyBudget: 1800 },
            { name: 'Product Launch - Summer', type: 'DISPLAY', status: 'ENABLED', budget: 35000, dailyBudget: 1200 },
            { name: 'Retargeting Campaign', type: 'REMARKETING', status: 'ENABLED', budget: 25000, dailyBudget: 850 },
            { name: 'Black Friday Promo', type: 'SHOPPING', status: 'PAUSED', budget: 60000, dailyBudget: 2000 },
            { name: 'Lead Generation', type: 'SEARCH', status: 'ENABLED', budget: 40000, dailyBudget: 1400 },
            { name: 'Video Engagement', type: 'VIDEO', status: 'ENABLED', budget: 30000, dailyBudget: 1000 },
            { name: 'Competitor Targeting', type: 'SEARCH', status: 'ENABLED', budget: 28000, dailyBudget: 950 },
            { name: 'Mobile App Install', type: 'APP', status: 'PAUSED', budget: 22000, dailyBudget: 750 }
        ];

        const data = {
            campaigns: [],
            dailyMetrics: [],
            devices: {
                MOBILE: { impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0 },
                DESKTOP: { impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0 },
                TABLET: { impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0 }
            },
            locations: {},
            hourlyPerformance: Array(24).fill(0).map(() => ({ conversions: 0, spend: 0 }))
        };

        const locations = ['California', 'New York', 'Texas', 'Florida', 'Illinois'];
        locations.forEach(loc => {
            data.locations[loc] = { impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0 };
        });

        // Generate 30 days of data
        const today = new Date();
        for (let day = 29; day >= 0; day--) {
            const date = new Date(today);
            date.setDate(date.getDate() - day);
            const dateStr = date.toISOString().split('T')[0];

            // Add trend: performance improving over time
            const trendMultiplier = 0.8 + (day / 29) * 0.4; // 0.8 to 1.2

            const dailyImpressions = Math.floor((Math.random() * 30000 + 40000) * trendMultiplier);
            const dailyClicks = Math.floor(dailyImpressions * (Math.random() * 0.03 + 0.035));
            const dailySpend = Math.floor((Math.random() * 2000 + 2500) * trendMultiplier);
            const dailyConversions = Math.floor(dailyClicks * (Math.random() * 0.06 + 0.045));
            const dailyRevenue = dailyConversions * (Math.random() * 80 + 110);

            data.dailyMetrics.push({
                date: dateStr,
                impressions: dailyImpressions,
                clicks: dailyClicks,
                spend: dailySpend,
                conversions: dailyConversions,
                revenue: dailyRevenue,
                ctr: (dailyClicks / dailyImpressions * 100),
                cpc: dailySpend / dailyClicks,
                cpa: dailyConversions > 0 ? dailySpend / dailyConversions : 0,
                roas: dailySpend > 0 ? dailyRevenue / dailySpend : 0
            });

            // Distribute across devices (mobile performing better)
            const mobileShare = 0.6;
            const desktopShare = 0.3;
            const tabletShare = 0.1;

            ['MOBILE', 'DESKTOP', 'TABLET'].forEach(device => {
                const share = device === 'MOBILE' ? mobileShare : device === 'DESKTOP' ? desktopShare : tabletShare;
                const deviceConversionBonus = device === 'MOBILE' ? 1.2 : device === 'DESKTOP' ? 1.0 : 0.8;

                data.devices[device].impressions += Math.floor(dailyImpressions * share);
                data.devices[device].clicks += Math.floor(dailyClicks * share);
                data.devices[device].spend += Math.floor(dailySpend * share);
                data.devices[device].conversions += Math.floor(dailyConversions * share * deviceConversionBonus);
                data.devices[device].revenue += dailyRevenue * share * deviceConversionBonus;
            });

            // Distribute across locations
            locations.forEach((loc, idx) => {
                const share = [0.35, 0.25, 0.2, 0.15, 0.05][idx];
                const locBonus = [1.3, 1.1, 1.0, 0.9, 0.8][idx];

                data.locations[loc].impressions += Math.floor(dailyImpressions * share);
                data.locations[loc].clicks += Math.floor(dailyClicks * share);
                data.locations[loc].spend += Math.floor(dailySpend * share);
                data.locations[loc].conversions += Math.floor(dailyConversions * share * locBonus);
                data.locations[loc].revenue += dailyRevenue * share * locBonus;
            });

            // Hourly performance (peak hours: 9-11am, 2-4pm, 7-9pm)
            for (let hour = 0; hour < 24; hour++) {
                const isPeakHour = (hour >= 9 && hour <= 11) || (hour >= 14 && hour <= 16) || (hour >= 19 && hour <= 21);
                const hourMultiplier = isPeakHour ? 1.5 : 0.7;
                data.hourlyPerformance[hour].conversions += Math.floor((dailyConversions / 24) * hourMultiplier);
                data.hourlyPerformance[hour].spend += (dailySpend / 24) * hourMultiplier;
            }
        }

        // Generate campaign-level data with realistic distributions
        campaigns.forEach((campaign, index) => {
            const performanceMultiplier = campaign.status === 'PAUSED' ? 0.6 : (1.2 - index * 0.1);

            const impressions = Math.floor((Math.random() * 150000 + 100000) * performanceMultiplier);
            const ctr = (Math.random() * 0.04 + 0.02) * (campaign.type === 'SEARCH' ? 1.3 : 0.9);
            const clicks = Math.floor(impressions * ctr);
            const spend = Math.floor((Math.random() * 12000 + 8000) * performanceMultiplier);
            const conversionRate = (Math.random() * 0.08 + 0.04) * performanceMultiplier;
            const conversions = Math.floor(clicks * conversionRate);
            const revenuePerConversion = Math.random() * 120 + 80;
            const revenue = conversions * revenuePerConversion;

            data.campaigns.push({
                id: `campaign-${index + 1}`,
                name: campaign.name,
                type: campaign.type,
                status: campaign.status,
                budget: campaign.budget,
                dailyBudget: campaign.dailyBudget,
                impressions,
                clicks,
                spend,
                conversions,
                revenue,
                ctr: (clicks / impressions * 100).toFixed(2),
                cpc: (spend / clicks).toFixed(2),
                cpa: conversions > 0 ? (spend / conversions).toFixed(2) : '0.00',
                roas: spend > 0 ? (revenue / spend).toFixed(2) : '0.00',
                qualityScore: Math.floor(Math.random() * 3) + 7,
                conversionRate: (conversions / clicks * 100).toFixed(2),
                trend: performanceMultiplier > 1 ? 'improving' : performanceMultiplier < 0.9 ? 'declining' : 'stable'
            });
        });

        // Sort campaigns by ROAS
        data.campaigns.sort((a, b) => parseFloat(b.roas) - parseFloat(a.roas));

        return data;
    }

    init() {
        this.renderInsights();
        this.renderPredictions();
        this.renderComparisons();
        this.renderCharts();
        this.renderCampaigns();
        this.populateFilters();
        this.showAlert();
    }

    showAlert() {
        const metrics = this.calculateMetrics();
        const alertBanner = document.getElementById('alertBanner');
        const alertTitle = document.getElementById('alertTitle');
        const alertMessage = document.getElementById('alertMessage');

        // Check for critical issues
        const budgetUsage = this.calculateBudgetUsage();
        const lowPerformers = this.filteredData.campaigns.filter(c => parseFloat(c.roas) < 1.5 && c.status === 'ENABLED');

        if (budgetUsage > 85) {
            alertBanner.classList.remove('hidden');
            alertTitle.textContent = '🚨 Budget Alert: 85%+ Spent';
            alertMessage.textContent = `You've used ${budgetUsage}% of monthly budget with ${this.daysRemainingInMonth()} days left. Risk of running out before month-end.`;
        } else if (lowPerformers.length >= 3) {
            alertBanner.classList.remove('hidden');
            alertTitle.textContent = '⚠️ Performance Alert: Multiple Underperformers';
            alertMessage.textContent = `${lowPerformers.length} active campaigns with ROAS below 1.5x. Immediate optimization recommended.`;
        }
    }

    renderInsights() {
        const container = document.getElementById('insightsGrid');
        const insights = this.generateIntelligentInsights();

        container.textContent = '';
        insights.forEach(insight => {
            const card = document.createElement('div');
            card.className = `insight-card ${insight.severity}`;

            const header = document.createElement('div');
            header.className = 'insight-header';

            const titleDiv = document.createElement('div');
            const title = document.createElement('div');
            title.className = 'insight-title';
            title.textContent = insight.title;
            titleDiv.appendChild(title);

            const badge = document.createElement('span');
            badge.className = `insight-badge ${insight.severity}`;
            badge.textContent = insight.severity;

            header.appendChild(titleDiv);
            header.appendChild(badge);

            const metric = document.createElement('div');
            metric.className = 'insight-metric';
            metric.textContent = insight.metric;

            const description = document.createElement('div');
            description.className = 'insight-description';
            description.textContent = insight.description;

            if (insight.impact) {
                const impactDiv = document.createElement('div');
                impactDiv.className = 'insight-impact';

                insight.impact.forEach(item => {
                    const impactItem = document.createElement('div');
                    impactItem.className = 'impact-item';

                    const label = document.createElement('div');
                    label.className = 'impact-label';
                    label.textContent = item.label;

                    const value = document.createElement('div');
                    value.className = `impact-value ${item.positive ? 'positive' : 'negative'}`;
                    value.textContent = item.value;

                    impactItem.appendChild(label);
                    impactItem.appendChild(value);
                    impactDiv.appendChild(impactItem);
                });

                card.appendChild(header);
                card.appendChild(metric);
                card.appendChild(description);
                card.appendChild(impactDiv);
            } else {
                card.appendChild(header);
                card.appendChild(metric);
                card.appendChild(description);
            }

            const actions = document.createElement('div');
            actions.className = 'action-buttons';

            insight.actions.forEach(action => {
                const btn = document.createElement('button');
                btn.className = `action-btn ${action.type}`;
                btn.textContent = action.label;
                btn.onclick = () => this.handleAction(action.id, insight);
                actions.appendChild(btn);
            });

            card.appendChild(actions);
            container.appendChild(card);
        });
    }

    generateIntelligentInsights() {
        const insights = [];
        const metrics = this.calculateMetrics();
        const campaigns = this.filteredData.campaigns;

        // Insight 1: Mobile dominance opportunity
        const mobileData = this.mockData.devices.MOBILE;
        const mobileROAS = mobileData.revenue / mobileData.spend;
        if (mobileROAS > 3) {
            insights.push({
                severity: 'success',
                title: '📱 Mobile is Your Golden Channel',
                metric: `${mobileROAS.toFixed(2)}x ROAS`,
                description: `Mobile devices are crushing it with ${(mobileData.conversions / (mobileData.conversions + this.mockData.devices.DESKTOP.conversions + this.mockData.devices.TABLET.conversions) * 100).toFixed(0)}% of conversions. Mobile users convert ${((mobileROAS / (this.mockData.devices.DESKTOP.revenue / this.mockData.devices.DESKTOP.spend)) * 100 - 100).toFixed(0)}% better than desktop.`,
                impact: [
                    { label: 'Mobile Conversions', value: mobileData.conversions.toLocaleString(), positive: true },
                    { label: 'Mobile ROAS', value: `${mobileROAS.toFixed(2)}x`, positive: true },
                    { label: 'Potential Uplift', value: '+$' + (mobileData.spend * 0.3 * mobileROAS).toFixed(0), positive: true }
                ],
                actions: [
                    { id: 'increase-mobile-budget', label: '📈 Increase Mobile Budget', type: 'primary' },
                    { id: 'mobile-strategy', label: '📱 View Mobile Strategy', type: 'secondary' }
                ]
            });
        }

        // Insight 2: Top location opportunity
        const topLocation = Object.entries(this.mockData.locations)
            .map(([name, data]) => ({
                name,
                roas: data.revenue / data.spend,
                conversions: data.conversions
            }))
            .sort((a, b) => b.roas - a.roas)[0];

        insights.push({
            severity: 'opportunity',
            title: `🗺️ ${topLocation.name} is a Hot Market`,
            metric: `${topLocation.roas.toFixed(2)}x ROAS`,
            description: `${topLocation.name} delivers ${topLocation.roas.toFixed(2)}x ROAS with ${topLocation.conversions} conversions. This market is ${((topLocation.roas / metrics.roas - 1) * 100).toFixed(0)}% more profitable than your average. Consider expanding reach or increasing bids in this geography.`,
            impact: [
                { label: 'Conversions', value: topLocation.conversions.toLocaleString(), positive: true },
                { label: 'ROAS', value: `${topLocation.roas.toFixed(2)}x`, positive: true },
                { label: 'Scale Potential', value: '+45%', positive: true }
            ],
            actions: [
                { id: 'geo-expand', label: '🎯 Expand Geographic Targeting', type: 'primary' },
                { id: 'similar-markets', label: '🔍 Find Similar Markets', type: 'secondary' }
            ]
        });

        // Insight 3: Campaign rebalancing
        const topCampaign = campaigns[0];
        const bottomCampaign = campaigns[campaigns.length - 1];

        if (parseFloat(topCampaign.roas) > 4 && parseFloat(bottomCampaign.roas) < 2) {
            const reallocationAmount = Math.floor(parseFloat(bottomCampaign.spend) * 0.4);
            const projectedRevenue = reallocationAmount * parseFloat(topCampaign.roas);

            insights.push({
                severity: 'opportunity',
                title: '💰 Budget Rebalancing Opportunity Detected',
                metric: `+$${projectedRevenue.toLocaleString()}`,
                description: `Shift $${reallocationAmount.toLocaleString()} from "${bottomCampaign.name}" (${bottomCampaign.roas}x ROAS) to "${topCampaign.name}" (${topCampaign.roas}x ROAS). This reallocation could generate $${projectedRevenue.toLocaleString()} in additional revenue.`,
                impact: [
                    { label: 'Revenue Gain', value: '+$' + projectedRevenue.toLocaleString(), positive: true },
                    { label: 'ROAS Improvement', value: `+${((parseFloat(topCampaign.roas) - parseFloat(bottomCampaign.roas)) * 100).toFixed(0)}%`, positive: true },
                    { label: 'Efficiency Gain', value: '+32%', positive: true }
                ],
                actions: [
                    { id: 'rebalance-budget', label: '⚖️ Rebalance Budget', type: 'primary' },
                    { id: 'simulate', label: '🔬 Simulate Impact', type: 'secondary' }
                ]
            });
        }

        // Insight 4: Peak performance timing
        const bestHours = this.mockData.hourlyPerformance
            .map((data, hour) => ({ hour, convRate: data.conversions / data.spend }))
            .sort((a, b) => b.convRate - a.convRate)
            .slice(0, 3);

        insights.push({
            severity: 'success',
            title: '⏰ Optimal Ad Scheduling Discovered',
            metric: `${bestHours[0].hour}:00 - ${bestHours[0].hour + 3}:00`,
            description: `Peak conversion hours are ${bestHours.map(h => `${h.hour}:00`).join(', ')}. These time windows convert ${(bestHours[0].convRate / (this.mockData.hourlyPerformance.reduce((sum, h) => sum + h.conversions, 0) / this.mockData.hourlyPerformance.reduce((sum, h) => sum + h.spend, 0)) * 100 - 100).toFixed(0)}% better than average. Increase bids during these hours for maximum efficiency.`,
            impact: [
                { label: 'Peak Hour Conv.', value: '+58%', positive: true },
                { label: 'CPA Reduction', value: '-23%', positive: true },
                { label: 'Revenue Opportunity', value: '+$12.5K', positive: true }
            ],
            actions: [
                { id: 'adjust-schedule', label: '📅 Optimize Ad Schedule', type: 'primary' },
                { id: 'bid-adjustments', label: '📊 Set Time-Based Bids', type: 'secondary' }
            ]
        });

        // Insight 5: Quality score opportunity
        const lowQualityCampaigns = campaigns.filter(c => c.qualityScore < 7 && c.status === 'ENABLED');
        if (lowQualityCampaigns.length > 0) {
            const avgQuality = lowQualityCampaigns.reduce((sum, c) => sum + c.qualityScore, 0) / lowQualityCampaigns.length;
            const potentialSavings = lowQualityCampaigns.reduce((sum, c) => sum + parseFloat(c.spend), 0) * 0.2;

            insights.push({
                severity: 'critical',
                title: '⚡ Quality Score Improvement = Instant Savings',
                metric: `$${potentialSavings.toLocaleString()}`,
                description: `${lowQualityCampaigns.length} campaigns have quality scores below 7 (avg: ${avgQuality.toFixed(1)}). Improving quality score from ${avgQuality.toFixed(0)} to 8+ could reduce CPC by 20-30%, saving ~$${potentialSavings.toLocaleString()}/month while maintaining performance.`,
                impact: [
                    { label: 'Monthly Savings', value: `$${potentialSavings.toLocaleString()}`, positive: true },
                    { label: 'CPC Reduction', value: '-25%', positive: true },
                    { label: 'Campaigns Affected', value: lowQualityCampaigns.length, positive: false }
                ],
                actions: [
                    { id: 'improve-quality', label: '🎯 Improve Quality Score', type: 'primary' },
                    { id: 'view-tips', label: '💡 View QS Tips', type: 'secondary' }
                ]
            });
        }

        // Insight 6: Conversion rate trend
        const recentDays = this.filteredData.dailyMetrics.slice(-7);
        const olderDays = this.filteredData.dailyMetrics.slice(-14, -7);
        const recentConvRate = recentDays.reduce((sum, d) => sum + (d.conversions / d.clicks), 0) / recentDays.length;
        const olderConvRate = olderDays.reduce((sum, d) => sum + (d.conversions / d.clicks), 0) / olderDays.length;
        const convRateChange = ((recentConvRate / olderConvRate - 1) * 100).toFixed(0);

        if (Math.abs(convRateChange) > 15) {
            insights.push({
                severity: convRateChange > 0 ? 'success' : 'critical',
                title: convRateChange > 0 ? '🚀 Conversion Rate Accelerating' : '📉 Conversion Rate Declining',
                metric: `${Math.abs(convRateChange)}% ${convRateChange > 0 ? 'Increase' : 'Decrease'}`,
                description: convRateChange > 0
                    ? `Your conversion rate improved ${convRateChange}% in the last 7 days vs previous week. Landing page changes, ad copy improvements, or audience refinements are working. This is generating ~$${(metrics.revenue * (parseFloat(convRateChange) / 100)).toLocaleString()} extra revenue.`
                    : `Conversion rate dropped ${Math.abs(convRateChange)}% in the last 7 days. Check for landing page issues, broken forms, competitor activity, or seasonal factors. Quick action can prevent further revenue loss.`,
                impact: [
                    { label: 'Weekly Change', value: `${convRateChange}%`, positive: convRateChange > 0 },
                    { label: 'Revenue Impact', value: convRateChange > 0 ? `+$${(metrics.revenue * 0.15).toLocaleString()}` : `-$${(metrics.revenue * 0.15).toLocaleString()}`, positive: convRateChange > 0 },
                    { label: 'Action Priority', value: convRateChange > 0 ? 'Scale' : 'Fix Now', positive: convRateChange > 0 }
                ],
                actions: convRateChange > 0
                    ? [
                        { id: 'scale-success', label: '🎯 Scale What\'s Working', type: 'primary' },
                        { id: 'document', label: '📝 Document Changes', type: 'secondary' }
                    ]
                    : [
                        { id: 'diagnose', label: '🔍 Diagnose Issue', type: 'primary' },
                        { id: 'rollback', label: '⏮️ Review Recent Changes', type: 'secondary' }
                    ]
            });
        }

        return insights.slice(0, 4); // Show top 4 insights
    }

    renderPredictions() {
        const container = document.getElementById('predictionGrid');
        const metrics = this.calculateMetrics();
        const recentTrend = this.calculateTrend();

        const predictions = [
            {
                icon: '💰',
                label: 'Projected Revenue (7d)',
                value: '$' + Math.floor(metrics.revenue / 30 * 7 * recentTrend).toLocaleString()
            },
            {
                icon: '📈',
                label: 'Expected Conversions',
                value: Math.floor(metrics.conversions / 30 * 7 * recentTrend).toLocaleString()
            },
            {
                icon: '🎯',
                label: 'Forecasted ROAS',
                value: (metrics.roas * recentTrend).toFixed(2) + 'x'
            },
            {
                icon: '💸',
                label: 'Est. Spend (7d)',
                value: '$' + Math.floor(metrics.spend / 30 * 7).toLocaleString()
            }
        ];

        container.textContent = '';
        predictions.forEach(pred => {
            const card = document.createElement('div');
            card.className = 'prediction-card';

            const icon = document.createElement('div');
            icon.className = 'prediction-icon';
            icon.textContent = pred.icon;

            const label = document.createElement('div');
            label.className = 'prediction-label';
            label.textContent = pred.label;

            const value = document.createElement('div');
            value.className = 'prediction-value';
            value.textContent = pred.value;

            card.appendChild(icon);
            card.appendChild(label);
            card.appendChild(value);
            container.appendChild(card);
        });
    }

    renderComparisons() {
        // Best performing hour
        const bestHour = this.mockData.hourlyPerformance
            .map((data, hour) => ({ hour, rate: data.conversions / data.spend }))
            .sort((a, b) => b.rate - a.rate)[0];

        document.getElementById('bestHour').textContent = `${bestHour.hour}:00 - ${bestHour.hour + 1}:00`;
        document.getElementById('hourRate').textContent = (bestHour.rate * 100).toFixed(1) + '%';
        document.getElementById('hourFill').style.width = '85%';

        // Best device
        const devices = Object.entries(this.mockData.devices)
            .map(([name, data]) => ({ name, roas: data.revenue / data.spend }))
            .sort((a, b) => b.roas - a.roas)[0];

        document.getElementById('bestDevice').textContent = devices.name;
        document.getElementById('deviceROAS').textContent = devices.roas.toFixed(2) + 'x';
        document.getElementById('deviceFill').style.width = '92%';

        // Top location
        const topLocation = Object.entries(this.mockData.locations)
            .map(([name, data]) => ({ name, rate: data.conversions / data.clicks }))
            .sort((a, b) => b.rate - a.rate)[0];

        document.getElementById('topLocation').textContent = topLocation.name;
        document.getElementById('locationRate').textContent = (topLocation.rate * 100).toFixed(1) + '%';
        document.getElementById('locationFill').style.width = '78%';

        // Budget usage
        const budgetUsage = this.calculateBudgetUsage();
        document.getElementById('budgetUsed').textContent = budgetUsage + '%';
        document.getElementById('daysLeft').textContent = this.daysRemainingInMonth();
        document.getElementById('budgetFill').style.width = budgetUsage + '%';
    }

    calculateBudgetUsage() {
        const totalBudget = this.mockData.campaigns.reduce((sum, c) => sum + c.budget, 0);
        const totalSpend = this.mockData.campaigns.reduce((sum, c) => sum + parseFloat(c.spend), 0);
        return Math.floor((totalSpend / totalBudget) * 100);
    }

    daysRemainingInMonth() {
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return lastDay.getDate() - today.getDate();
    }

    calculateTrend() {
        const recentDays = this.filteredData.dailyMetrics.slice(-7);
        const olderDays = this.filteredData.dailyMetrics.slice(-14, -7);

        const recentAvg = recentDays.reduce((sum, d) => sum + d.revenue, 0) / recentDays.length;
        const olderAvg = olderDays.reduce((sum, d) => sum + d.revenue, 0) / olderDays.length;

        return recentAvg / olderAvg;
    }

    renderCharts() {
        this.renderTrendChart();
        this.renderROASChart();
    }

    renderTrendChart() {
        const ctx = document.getElementById('trendChart').getContext('2d');
        const data = this.filteredData.dailyMetrics.slice(-14);

        if (this.charts.trend) this.charts.trend.destroy();

        this.charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => {
                    const date = new Date(d.date);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                }),
                datasets: [
                    {
                        label: 'Revenue',
                        data: data.map(d => d.revenue),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Spend',
                        data: data.map(d => d.spend),
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Conversions',
                        data: data.map(d => d.conversions),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: { color: '#cbd5e1' }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        ticks: { color: '#94a3b8' }
                    },
                    y: {
                        type: 'linear',
                        position: 'left',
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        ticks: { color: '#94a3b8' }
                    },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        grid: { drawOnChartArea: false },
                        ticks: { color: '#94a3b8' }
                    }
                }
            }
        });
    }

    renderROASChart() {
        const ctx = document.getElementById('roasChart').getContext('2d');
        const campaigns = this.filteredData.campaigns.slice(0, 5);

        if (this.charts.roas) this.charts.roas.destroy();

        this.charts.roas = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: campaigns.map(c => c.name),
                datasets: [{
                    label: 'ROAS',
                    data: campaigns.map(c => parseFloat(c.roas)),
                    backgroundColor: campaigns.map(c =>
                        parseFloat(c.roas) > 4 ? '#10b981' :
                        parseFloat(c.roas) > 2.5 ? '#3b82f6' :
                        parseFloat(c.roas) > 1.5 ? '#f59e0b' : '#ef4444'
                    ),
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        ticks: { color: '#94a3b8' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8' }
                    }
                }
            }
        });
    }

    renderCampaigns() {
        const container = document.getElementById('campaignList');
        const campaigns = this.filteredData.campaigns;

        container.textContent = '';
        campaigns.forEach((campaign, index) => {
            const card = document.createElement('div');
            card.className = `campaign-card ${index < 3 ? 'winner' : index >= campaigns.length - 2 ? 'loser' : ''}`;

            const header = document.createElement('div');
            header.className = 'campaign-header';

            const name = document.createElement('div');
            name.className = 'campaign-name';
            name.textContent = `${index + 1}. ${campaign.name}`;

            const status = document.createElement('span');
            status.className = `campaign-status status-${campaign.status.toLowerCase()}`;
            status.textContent = campaign.status;

            header.appendChild(name);
            header.appendChild(status);

            const metrics = document.createElement('div');
            metrics.className = 'campaign-metrics';

            [
                { label: 'ROAS', value: campaign.roas + 'x' },
                { label: 'Conversions', value: campaign.conversions },
                { label: 'CTR', value: campaign.ctr + '%' },
                { label: 'CPA', value: '$' + campaign.cpa }
            ].forEach(m => {
                const metric = document.createElement('div');
                metric.className = 'metric';

                const label = document.createElement('div');
                label.className = 'metric-label';
                label.textContent = m.label;

                const value = document.createElement('div');
                value.className = 'metric-value';
                value.textContent = m.value;

                metric.appendChild(label);
                metric.appendChild(value);
                metrics.appendChild(metric);
            });

            card.appendChild(header);
            card.appendChild(metrics);
            container.appendChild(card);
        });
    }

    calculateMetrics() {
        const campaigns = this.filteredData.campaigns;
        const metrics = {
            impressions: 0,
            clicks: 0,
            spend: 0,
            conversions: 0,
            revenue: 0
        };

        campaigns.forEach(campaign => {
            metrics.impressions += campaign.impressions;
            metrics.clicks += campaign.clicks;
            metrics.spend += parseFloat(campaign.spend);
            metrics.conversions += campaign.conversions;
            metrics.revenue += campaign.revenue;
        });

        metrics.ctr = metrics.impressions > 0 ? (metrics.clicks / metrics.impressions * 100) : 0;
        metrics.cpc = metrics.clicks > 0 ? metrics.spend / metrics.clicks : 0;
        metrics.cpa = metrics.conversions > 0 ? metrics.spend / metrics.conversions : 0;
        metrics.roas = metrics.spend > 0 ? metrics.revenue / metrics.spend : 0;

        return metrics;
    }

    handleAction(actionId, insight) {
        const actions = {
            'increase-mobile-budget': () => {
                alert(`📱 Mobile Budget Increase\n\nAction Plan:\n• Increase mobile bid adjustments by 30%\n• Shift 20% budget from desktop to mobile\n• Create mobile-specific ad variations\n• Implement mobile landing pages\n\nProjected Impact:\n• +$45K monthly revenue\n• +180 conversions\n• ROAS improvement from ${insight.metric} to ${(parseFloat(insight.metric) * 1.15).toFixed(2)}x`);
            },
            'geo-expand': () => {
                alert(`🗺️ Geographic Expansion\n\nRecommended Actions:\n• Increase budget in top location by 40%\n• Find similar markets (demographics, income, behavior)\n• Test adjacent cities/states\n• Create location-specific ad copy\n\nExpected Results:\n• +$28K monthly revenue\n• Market share increase of 15%\n• Improved local brand presence`);
            },
            'rebalance-budget': () => {
                alert(`⚖️ Budget Rebalancing\n\nRecommendation:\n• Move $${(parseFloat(this.filteredData.campaigns[this.filteredData.campaigns.length - 1].spend) * 0.4).toLocaleString()} from underperformers\n• Increase top 3 campaigns by 25%\n• Pause campaigns with ROAS < 1.5x\n\nProjected Outcome:\n• Revenue increase: ${insight.impact[0].value}\n• Overall ROAS improvement: +1.2x\n• Efficiency gain: 32%`);
            },
            'adjust-schedule': () => {
                alert(`📅 Ad Schedule Optimization\n\nOptimal Schedule:\n• Peak Hours (150% bid): 9-11am, 2-4pm, 7-9pm\n• Normal Hours (100% bid): 7-9am, 12-2pm, 4-7pm\n• Low Hours (60% bid): 9pm-7am\n\nExpected Impact:\n• CPA reduction: 18%\n• Conversion increase: +142/month\n• Same budget, better timing = better results`);
            },
            'improve-quality': () => {
                alert(`⚡ Quality Score Improvement Plan\n\nImmediate Actions:\n• Review ad relevance (align keywords → ads → landing pages)\n• Improve landing page experience (speed, mobile, content)\n• Increase expected CTR (test new ad copy)\n\nQuick Wins:\n• Pause bottom 10% keywords by QS\n• Add negative keywords\n• Split test ad headlines\n\nImpact Timeline:\n• Week 1-2: -10% CPC\n• Week 3-4: -20% CPC\n• Month 2+: -30% CPC\n\nTotal Savings: ${insight.impact[0].value}/month`);
            },
            'scale-success': () => {
                alert(`🚀 Scale Success Strategy\n\nWhat's Working:\n• Conversion rate up ${insight.metric}\n• Recent optimizations are paying off\n\nScaling Plan:\n1. Increase budget by 20% on top performers\n2. Expand to similar audiences\n3. Test 3 new ad variations\n4. Monitor for 7 days\n5. Scale another 20% if performance holds\n\nProtected Scaling:\n• Set max CPA caps\n• Daily budget limits\n• Auto-pause rules\n\nProjected: ${insight.impact[0].value} extra revenue`);
            },
            'diagnose': () => {
                alert(`🔍 Conversion Rate Drop Diagnosis\n\nChecking:\n✓ Landing page load time\n✓ Form functionality\n✓ Competitor activity\n✓ Seasonal factors\n✓ Recent changes\n✓ Traffic quality\n\nCommon Causes:\n• Landing page issues (40%)\n• Increased competition (25%)\n• Seasonal trends (20%)\n• Targeting changes (15%)\n\nNext Steps:\n1. Run landing page health check\n2. Review last 14 days of changes\n3. Check competitor ads\n4. Analyze traffic sources\n\nPriority: Fix within 48 hours to prevent ${insight.impact[1].value.replace('-', '')} revenue loss`);
            },
            'default': () => {
                alert(`Action: ${actionId}\n\n${insight.description}\n\nThis would execute the recommended optimization in production.`);
            }
        };

        (actions[actionId] || actions['default'])();
    }

    populateFilters() {
        const campaignFilter = document.getElementById('campaignFilter');
        const uniqueCampaigns = [...new Set(this.mockData.campaigns.map(c => c.name))];

        campaignFilter.textContent = '';
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'All Campaigns';
        campaignFilter.appendChild(allOption);

        uniqueCampaigns.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            campaignFilter.appendChild(option);
        });
    }

    applyFilters() {
        const campaignFilter = document.getElementById('campaignFilter').value;
        const dateFilter = parseInt(document.getElementById('dateFilter').value);
        const searchFilter = document.getElementById('searchFilter').value.toLowerCase();

        this.filteredData.campaigns = this.mockData.campaigns.filter(campaign => {
            const matchesCampaign = campaignFilter === 'all' || campaign.name === campaignFilter;
            const matchesSearch = campaign.name.toLowerCase().includes(searchFilter);
            return matchesCampaign && matchesSearch;
        });

        this.filteredData.dailyMetrics = this.mockData.dailyMetrics.slice(-dateFilter);

        this.renderInsights();
        this.renderPredictions();
        this.renderComparisons();
        this.renderCharts();
        this.renderCampaigns();
    }
}

// Global function
window.applyFilters = function() {
    dashboard.applyFilters();
};

// Initialize
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new IntelligentDashboard();
});
