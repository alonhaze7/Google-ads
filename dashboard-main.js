/**
 * Google Ads Intelligence Dashboard - Main Controller
 * Integrates data generator, insights engine, and chart modules
 */

class GoogleAdsDashboard {
    constructor() {
        this.data = null;
        this.insights = null;
        this.charts = {};
        this.init();
    }

    async init() {
        // Generate data
        this.data = generateGoogleAdsData();
        
        // Generate insights
        this.insights = generateInsights(this.data);
        
        // Render all sections
        this.renderHeader();
        this.renderAlerts();
        this.renderInsights();
        this.renderMetrics();
        this.renderPredictions();
        this.renderAnalysis();
        this.renderCharts();
        this.renderCampaignsTable();
        this.renderKeywords();
        this.renderAds();
        this.renderConversions();
        this.populateFilters();
    }

    renderHeader() {
        const totalSpend = this.data.campaigns.reduce((sum, c) => sum + c.total_spend, 0);
        const totalRevenue = this.data.campaigns.reduce((sum, c) => sum + c.total_revenue, 0);
        const overallROAS = totalSpend > 0 ? totalRevenue / totalSpend : 0;

        document.getElementById('totalSpend').textContent = this.formatCurrency(totalSpend);
        document.getElementById('totalRevenue').textContent = this.formatCurrency(totalRevenue);
        document.getElementById('overallROAS').textContent = overallROAS.toFixed(2) + 'x';
    }

    renderInsights() {
        const container = document.getElementById('insightsGrid');
        container.textContent = '';

        const topInsights = this.insights.slice(0, 6);

        topInsights.forEach(insight => {
            const card = this.createInsightCard(insight);
            container.appendChild(card);
        });
    }

    createInsightCard(insight) {
        const card = document.createElement('div');
        card.className = `insight-card ${insight.severity}`;

        const header = document.createElement('div');
        header.className = 'insight-header';

        const title = document.createElement('div');
        title.className = 'insight-title';
        title.textContent = insight.title;

        const badge = document.createElement('span');
        badge.className = `insight-badge ${insight.severity}`;
        badge.textContent = insight.severity;

        header.appendChild(title);
        header.appendChild(badge);

        const metric = document.createElement('div');
        metric.className = 'insight-metric';
        metric.textContent = insight.metric;

        const description = document.createElement('div');
        description.className = 'insight-description';
        description.textContent = insight.description;

        card.appendChild(header);
        card.appendChild(metric);
        card.appendChild(description);

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

            card.appendChild(impactDiv);
        }

        const actions = document.createElement('div');
        actions.className = 'action-buttons';

        insight.actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = `action-btn ${action.type}`;
            btn.textContent = action.label;
            btn.onclick = () => this.handleAction(action.id);
            actions.appendChild(btn);
        });

        card.appendChild(actions);

        return card;
    }

    renderMetrics() {
        const total = this.data.campaigns.reduce((acc, c) => ({
            impressions: acc.impressions + c.total_impressions,
            clicks: acc.clicks + c.total_clicks,
            spend: acc.spend + c.total_spend,
            conversions: acc.conversions + c.total_conversions
        }), { impressions: 0, clicks: 0, spend: 0, conversions: 0 });

        const ctr = (total.clicks / total.impressions * 100).toFixed(2);
        const convRate = (total.conversions / total.clicks * 100).toFixed(2);
        const cpc = (total.spend / total.clicks).toFixed(2);
        const cpa = (total.spend / total.conversions).toFixed(2);

        const keywords = this.data.keywords.filter(k => k.quality_score);
        const avgQS = keywords.length > 0
            ? (keywords.reduce((sum, k) => sum + k.quality_score, 0) / keywords.length).toFixed(1)
            : '0.0';

        document.getElementById('metricImpressions').textContent = this.formatNumber(total.impressions);
        document.getElementById('metricClicks').textContent = this.formatNumber(total.clicks);
        document.getElementById('metricCTR').textContent = ctr + '%';
        document.getElementById('metricConversions').textContent = this.formatNumber(total.conversions);
        document.getElementById('metricConvRate').textContent = convRate + '%';
        document.getElementById('metricCPC').textContent = '$' + cpc;
        document.getElementById('metricCPA').textContent = '$' + cpa;
        document.getElementById('metricQS').textContent = avgQS;

        document.getElementById('trendImpressions').textContent = '+12.3%';
        document.getElementById('trendClicks').textContent = '+8.7%';
        document.getElementById('trendCTR').textContent = '-3.2%';
        document.getElementById('trendConversions').textContent = '+18.5%';
        document.getElementById('trendConvRate').textContent = '+9.1%';
        document.getElementById('trendCPC').textContent = '-5.3%';
        document.getElementById('trendCPA').textContent = '-7.8%';
        document.getElementById('trendQS').textContent = '+0.3';

        document.getElementById('trendCTR').classList.add('negative');
    }

    renderAlerts() {
        const budgetUsage = this.calculateBudgetUsage();
        const lowPerformers = this.data.campaigns.filter(c =>
            c.campaign_status === 'ENABLED' && parseFloat(c.roas) < 1.5
        );

        if (budgetUsage > 85 || lowPerformers.length >= 3) {
            const alertBanner = document.getElementById('alertBanner');
            const alertTitle = document.getElementById('alertTitle');
            const alertMessage = document.getElementById('alertMessage');

            alertBanner.classList.remove('hidden');

            if (budgetUsage > 85) {
                alertTitle.textContent = '🚨 Budget Alert: 85%+ Spent';
                alertMessage.textContent = `You've used ${budgetUsage}% of monthly budget.`;
            } else {
                alertTitle.textContent = '⚠️ Performance Alert';
                alertMessage.textContent = `${lowPerformers.length} campaigns need optimization.`;
            }
        }
    }

    renderPredictions() {
        const recentDays = this.data.dailyMetrics.slice(-7);
        const avgRevenue = recentDays.reduce((sum, d) => sum + d.revenue, 0) / 7;
        const avgConversions = recentDays.reduce((sum, d) => sum + d.conversions, 0) / 7;
        const avgSpend = recentDays.reduce((sum, d) => sum + d.spend, 0) / 7;
        const avgROAS = avgSpend > 0 ? avgRevenue / avgSpend : 0;

        document.getElementById('predRevenue').textContent = this.formatCurrency(avgRevenue * 7 * 1.1);
        document.getElementById('predConversions').textContent = Math.floor(avgConversions * 7 * 1.1);
        document.getElementById('predROAS').textContent = (avgROAS * 1.05).toFixed(2) + 'x';
        document.getElementById('predSpend').textContent = this.formatCurrency(avgSpend * 7);
    }

    renderAnalysis() {
        const devices = Object.entries(this.data.aggregated.byDevice)
            .map(([name, data]) => ({ name, roas: data.revenue / data.spend }))
            .sort((a, b) => b.roas - a.roas);

        document.getElementById('bestDevice').textContent = devices[0].name;
        document.getElementById('deviceROAS').textContent = devices[0].roas.toFixed(2) + 'x';
        document.getElementById('deviceProgress').style.width = '85%';

        const locations = Object.entries(this.data.aggregated.byLocation)
            .map(([name, data]) => ({ name, rate: data.conversions / data.clicks }))
            .sort((a, b) => b.rate - a.rate);

        document.getElementById('topLocation').textContent = locations[0].name;
        document.getElementById('locationRate').textContent = (locations[0].rate * 100).toFixed(1) + '%';
        document.getElementById('locationProgress').style.width = '92%';

        const hours = this.data.aggregated.byHour
            .map((data, hour) => ({ hour, rate: data.conversions / data.clicks }))
            .sort((a, b) => b.rate - a.rate);

        document.getElementById('peakHour').textContent = `${hours[0].hour}:00`;
        document.getElementById('hourRate').textContent = (hours[0].rate * 100).toFixed(1) + '%';
        document.getElementById('hourProgress').style.width = '78%';

        const budgetUsage = this.calculateBudgetUsage();
        document.getElementById('budgetUsage').textContent = budgetUsage + '%';
        document.getElementById('daysLeft').textContent = this.daysRemainingInMonth();
        document.getElementById('budgetProgress').style.width = budgetUsage + '%';
    }

    renderCharts() {
        const trendCtx = document.getElementById('trendChart').getContext('2d');
        const recentDays = this.data.dailyMetrics.slice(-14);

        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: recentDays.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
                datasets: [
                    {
                        label: 'Revenue',
                        data: recentDays.map(d => d.revenue),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Spend',
                        data: recentDays.map(d => d.spend),
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#cbd5e1' } } },
                scales: {
                    x: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8' } },
                    y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8' } }
                }
            }
        });

        const roasCtx = document.getElementById('roasChart').getContext('2d');
        const topCampaigns = this.data.campaigns.slice(0, 6);

        new Chart(roasCtx, {
            type: 'bar',
            data: {
                labels: topCampaigns.map(c => c.campaign_name),
                datasets: [{
                    label: 'ROAS',
                    data: topCampaigns.map(c => parseFloat(c.roas)),
                    backgroundColor: topCampaigns.map(c => {
                        const roas = parseFloat(c.roas);
                        return roas > 4 ? '#10b981' : roas > 2.5 ? '#667eea' : '#f59e0b';
                    }),
                    borderRadius: 8
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8' } },
                    y: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                }
            }
        });

        const deviceCtx = document.getElementById('deviceChart').getContext('2d');
        const devices = Object.entries(this.data.aggregated.byDevice);

        new Chart(deviceCtx, {
            type: 'doughnut',
            data: {
                labels: devices.map(([name]) => name),
                datasets: [{
                    data: devices.map(([, data]) => data.conversions),
                    backgroundColor: ['#667eea', '#10b981', '#f59e0b']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#cbd5e1' } } }
            }
        });
    }

    renderCampaignsTable() {
        const tbody = document.getElementById('campaignsTableBody');
        tbody.textContent = '';

        this.data.campaigns.forEach((campaign, index) => {
            const row = document.createElement('tr');
            
            const cells = [
                index + 1,
                campaign.campaign_name,
                campaign.campaign_status,
                this.formatNumber(campaign.total_impressions),
                this.formatNumber(campaign.total_clicks),
                campaign.ctr + '%',
                this.formatCurrency(campaign.total_spend),
                this.formatNumber(campaign.total_conversions),
                campaign.roas + 'x',
                'View'
            ];

            cells.forEach((content, idx) => {
                const td = document.createElement('td');
                if (idx === 1) {
                    const strong = document.createElement('strong');
                    strong.textContent = content;
                    td.appendChild(strong);
                } else if (idx === 2) {
                    const span = document.createElement('span');
                    span.className = `status-badge status-${content.toLowerCase()}`;
                    span.textContent = content;
                    td.appendChild(span);
                } else if (idx === 9) {
                    const btn = document.createElement('button');
                    btn.className = 'btn-secondary';
                    btn.textContent = content;
                    btn.onclick = () => this.viewCampaign(campaign.campaign_id);
                    td.appendChild(btn);
                } else {
                    td.textContent = content;
                }
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
    }

    renderKeywords() {
        const container = document.getElementById('keywordsGrid');
        container.textContent = '';

        const topKeywords = this.data.keywords
            .sort((a, b) => b.conversions - a.conversions)
            .slice(0, 4);

        topKeywords.forEach(keyword => {
            const card = document.createElement('div');
            card.className = 'keyword-card';
            
            const h4 = document.createElement('h4');
            h4.textContent = keyword.keyword_text;
            
            const badge = document.createElement('div');
            badge.className = 'status-badge';
            badge.textContent = keyword.match_type;
            
            const metrics = document.createElement('div');
            metrics.style.marginTop = '12px';
            
            const conv = document.createElement('div');
            conv.textContent = 'Conversions: ';
            const convStrong = document.createElement('strong');
            convStrong.textContent = keyword.conversions;
            conv.appendChild(convStrong);
            
            const qs = document.createElement('div');
            qs.textContent = 'Quality Score: ';
            const qsStrong = document.createElement('strong');
            qsStrong.textContent = keyword.quality_score + '/10';
            qs.appendChild(qsStrong);
            
            metrics.appendChild(conv);
            metrics.appendChild(qs);
            
            card.appendChild(h4);
            card.appendChild(badge);
            card.appendChild(metrics);
            container.appendChild(card);
        });
    }

    renderAds() {
        const container = document.getElementById('adsGrid');
        container.textContent = '';

        const topAds = this.data.ads
            .sort((a, b) => b.conversions - a.conversions)
            .slice(0, 3);

        topAds.forEach(ad => {
            const card = document.createElement('div');
            card.className = 'ad-card';
            
            const h4 = document.createElement('h4');
            h4.textContent = ad.headline_part_1;
            
            const p = document.createElement('p');
            p.style.cssText = 'color: #64748b; font-size: 13px; margin: 8px 0;';
            p.textContent = ad.description;
            
            const metrics = document.createElement('div');
            metrics.style.marginTop = '12px';
            
            const conv = document.createElement('div');
            conv.textContent = 'Conversions: ';
            const convStrong = document.createElement('strong');
            convStrong.textContent = ad.conversions;
            conv.appendChild(convStrong);
            
            metrics.appendChild(conv);
            
            card.appendChild(h4);
            card.appendChild(p);
            card.appendChild(metrics);
            container.appendChild(card);
        });
    }

    renderConversions() {
        const container = document.getElementById('conversionTypes');
        container.textContent = '';

        const convTypes = Object.entries(this.data.aggregated.byConversionType);

        convTypes.forEach(([type, data]) => {
            const div = document.createElement('div');
            div.style.cssText = 'display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);';
            
            const span = document.createElement('span');
            span.textContent = type;
            
            const strong = document.createElement('strong');
            strong.textContent = data.conversions;
            
            div.appendChild(span);
            div.appendChild(strong);
            container.appendChild(div);
        });
    }

    populateFilters() {
        const campaignFilter = document.getElementById('campaignFilter');
        this.data.campaigns.forEach(c => {
            const option = document.createElement('option');
            option.value = c.campaign_id;
            option.textContent = c.campaign_name;
            campaignFilter.appendChild(option);
        });

        const locationFilter = document.getElementById('locationFilter');
        this.data.locations.forEach(loc => {
            const option = document.createElement('option');
            option.value = loc;
            option.textContent = loc;
            locationFilter.appendChild(option);
        });
    }

    calculateBudgetUsage() {
        const totalBudget = this.data.campaigns.reduce((sum, c) => sum + c.budget, 0);
        const totalSpend = this.data.campaigns.reduce((sum, c) => sum + c.total_spend, 0);
        return Math.floor((totalSpend / totalBudget) * 100);
    }

    daysRemainingInMonth() {
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return lastDay.getDate() - today.getDate();
    }

    handleAction(actionId) {
        alert('Executing action: ' + actionId + '\n\nThis would trigger optimization in production.');
    }

    viewCampaign(campaignId) {
        alert('Viewing campaign: ' + campaignId);
    }

    formatCurrency(value) {
        return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }

    formatNumber(value) {
        return value.toLocaleString('en-US');
    }
}

let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new GoogleAdsDashboard();
});
