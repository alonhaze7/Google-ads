// Mock Data Generator for Google Ads
class GoogleAdsDashboard {
    constructor() {
        this.mockData = this.generateMockData();
        this.filteredData = this.mockData;
        this.charts = {};
        this.init();
    }

    generateMockData() {
        const campaigns = [
            { name: 'Brand Awareness Q2', type: 'SEARCH', status: 'ENABLED' },
            { name: 'Product Launch - Summer', type: 'DISPLAY', status: 'ENABLED' },
            { name: 'Retargeting Campaign', type: 'REMARKETING', status: 'ENABLED' },
            { name: 'Black Friday Promo', type: 'SHOPPING', status: 'PAUSED' },
            { name: 'Lead Generation Campaign', type: 'SEARCH', status: 'ENABLED' },
            { name: 'Video Engagement', type: 'VIDEO', status: 'ENABLED' },
            { name: 'Competitor Targeting', type: 'SEARCH', status: 'ENABLED' },
            { name: 'Mobile App Install', type: 'APP', status: 'PAUSED' }
        ];

        const data = {
            campaigns: [],
            dailyMetrics: [],
            totalMetrics: {
                impressions: 0,
                clicks: 0,
                spend: 0,
                conversions: 0,
                revenue: 0
            }
        };

        // Generate 30 days of historical data
        const today = new Date();
        for (let day = 29; day >= 0; day--) {
            const date = new Date(today);
            date.setDate(date.getDate() - day);
            const dateStr = date.toISOString().split('T')[0];

            const dailyImpressions = Math.floor(Math.random() * 50000) + 30000;
            const dailyClicks = Math.floor(dailyImpressions * (Math.random() * 0.05 + 0.02));
            const dailySpend = Math.floor(Math.random() * 3000) + 1000;
            const dailyConversions = Math.floor(dailyClicks * (Math.random() * 0.08 + 0.02));
            const dailyRevenue = dailyConversions * (Math.random() * 100 + 50);

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

            data.totalMetrics.impressions += dailyImpressions;
            data.totalMetrics.clicks += dailyClicks;
            data.totalMetrics.spend += dailySpend;
            data.totalMetrics.conversions += dailyConversions;
            data.totalMetrics.revenue += dailyRevenue;
        }

        // Generate campaign-level data
        campaigns.forEach((campaign, index) => {
            const impressions = Math.floor(Math.random() * 200000) + 50000;
            const clicks = Math.floor(impressions * (Math.random() * 0.06 + 0.02));
            const spend = Math.floor(Math.random() * 15000) + 5000;
            const conversions = Math.floor(clicks * (Math.random() * 0.1 + 0.03));
            const revenue = conversions * (Math.random() * 150 + 40);

            data.campaigns.push({
                id: `campaign-${index + 1}`,
                name: campaign.name,
                type: campaign.type,
                status: campaign.status,
                impressions,
                clicks,
                spend,
                conversions,
                revenue,
                ctr: (clicks / impressions * 100).toFixed(2),
                cpc: (spend / clicks).toFixed(2),
                cpa: conversions > 0 ? (spend / conversions).toFixed(2) : '0.00',
                roas: spend > 0 ? (revenue / spend).toFixed(2) : '0.00',
                qualityScore: Math.floor(Math.random() * 4) + 6
            });
        });

        return data;
    }

    init() {
        this.renderKPIs();
        this.renderCharts();
        this.renderInsights();
        this.renderTable();
        this.populateFilters();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    renderKPIs() {
        const metrics = this.calculateMetrics();
        const kpiGrid = document.getElementById('kpiGrid');

        const kpis = [
            {
                title: 'Total Impressions',
                value: this.formatNumber(metrics.impressions),
                change: '+12.5%',
                positive: true
            },
            {
                title: 'Total Clicks',
                value: this.formatNumber(metrics.clicks),
                change: '+8.3%',
                positive: true
            },
            {
                title: 'CTR',
                value: metrics.ctr.toFixed(2) + '%',
                change: '-2.1%',
                positive: false
            },
            {
                title: 'Total Spend',
                value: '$' + this.formatNumber(metrics.spend.toFixed(0)),
                change: '+15.7%',
                positive: false,
                warning: true
            },
            {
                title: 'Conversions',
                value: this.formatNumber(metrics.conversions),
                change: '+22.4%',
                positive: true
            },
            {
                title: 'CPA',
                value: '$' + metrics.cpa.toFixed(2),
                change: '-5.8%',
                positive: true
            },
            {
                title: 'Revenue',
                value: '$' + this.formatNumber(metrics.revenue.toFixed(0)),
                change: '+28.9%',
                positive: true
            },
            {
                title: 'ROAS',
                value: metrics.roas.toFixed(2) + 'x',
                change: '+11.2%',
                positive: true
            }
        ];

        kpiGrid.textContent = '';
        kpis.forEach(kpi => {
            const card = document.createElement('div');
            card.className = `kpi-card ${kpi.warning ? 'warning' : ''}`;

            const title = document.createElement('div');
            title.className = 'kpi-title';
            title.textContent = kpi.title;

            const value = document.createElement('div');
            value.className = 'kpi-value';
            value.textContent = kpi.value;

            const change = document.createElement('div');
            change.className = `kpi-change ${kpi.positive ? 'positive' : 'negative'}`;
            change.textContent = `${kpi.positive ? '↑' : '↓'} ${kpi.change} vs last period`;

            card.appendChild(title);
            card.appendChild(value);
            card.appendChild(change);
            kpiGrid.appendChild(card);
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
            metrics.spend += campaign.spend;
            metrics.conversions += campaign.conversions;
            metrics.revenue += campaign.revenue;
        });

        metrics.ctr = metrics.impressions > 0 ? (metrics.clicks / metrics.impressions * 100) : 0;
        metrics.cpc = metrics.clicks > 0 ? metrics.spend / metrics.clicks : 0;
        metrics.cpa = metrics.conversions > 0 ? metrics.spend / metrics.conversions : 0;
        metrics.roas = metrics.spend > 0 ? metrics.revenue / metrics.spend : 0;

        return metrics;
    }

    renderCharts() {
        this.renderPerformanceChart();
        this.renderCampaignChart();
        this.renderSpendChart();
        this.renderCTRChart();
    }

    renderPerformanceChart() {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        const data = this.filteredData.dailyMetrics;

        if (this.charts.performance) {
            this.charts.performance.destroy();
        }

        this.charts.performance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.date),
                datasets: [
                    {
                        label: 'Clicks',
                        data: data.map(d => d.clicks),
                        borderColor: '#4285f4',
                        backgroundColor: 'rgba(66, 133, 244, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Conversions',
                        data: data.map(d => d.conversions),
                        borderColor: '#34a853',
                        backgroundColor: 'rgba(52, 168, 83, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    x: {
                        display: true,
                        ticks: {
                            maxTicksLimit: 10
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    renderCampaignChart() {
        const ctx = document.getElementById('campaignChart').getContext('2d');
        const campaigns = this.filteredData.campaigns.slice(0, 6);

        if (this.charts.campaign) {
            this.charts.campaign.destroy();
        }

        this.charts.campaign = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: campaigns.map(c => c.name),
                datasets: [{
                    data: campaigns.map(c => c.spend),
                    backgroundColor: [
                        '#4285f4',
                        '#34a853',
                        '#fbbc04',
                        '#ea4335',
                        '#9c27b0',
                        '#00bcd4'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    }

    renderSpendChart() {
        const ctx = document.getElementById('spendChart').getContext('2d');
        const data = this.filteredData.dailyMetrics.slice(-14);

        if (this.charts.spend) {
            this.charts.spend.destroy();
        }

        this.charts.spend = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.date),
                datasets: [
                    {
                        label: 'Spend ($)',
                        data: data.map(d => d.spend),
                        backgroundColor: 'rgba(234, 67, 53, 0.8)',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Conversions',
                        data: data.map(d => d.conversions),
                        backgroundColor: 'rgba(52, 168, 83, 0.8)',
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Spend ($)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Conversions'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }

    renderCTRChart() {
        const ctx = document.getElementById('ctrChart').getContext('2d');
        const campaigns = this.filteredData.campaigns;

        if (this.charts.ctr) {
            this.charts.ctr.destroy();
        }

        this.charts.ctr = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: campaigns.map(c => c.name),
                datasets: [{
                    label: 'CTR (%)',
                    data: campaigns.map(c => parseFloat(c.ctr)),
                    backgroundColor: campaigns.map(c =>
                        parseFloat(c.ctr) > 3 ? '#34a853' :
                        parseFloat(c.ctr) > 2 ? '#fbbc04' : '#ea4335'
                    )
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'CTR (%)'
                        }
                    }
                }
            }
        });
    }

    renderInsights() {
        const insights = this.generateInsights();
        const container = document.getElementById('insightsContainer');

        container.textContent = '';
        insights.forEach(insight => {
            const card = document.createElement('div');
            card.className = `insight-card ${insight.severity}`;

            const header = document.createElement('div');
            header.className = 'insight-header';

            const title = document.createElement('div');
            title.className = 'insight-title';
            title.textContent = `${insight.icon} ${insight.title}`;

            const badge = document.createElement('span');
            badge.className = `insight-badge ${insight.severity}`;
            badge.textContent = insight.severity;

            header.appendChild(title);
            header.appendChild(badge);

            const description = document.createElement('div');
            description.className = 'insight-description';
            description.textContent = insight.description;

            const actionButtons = document.createElement('div');
            actionButtons.className = 'action-buttons';

            insight.actions.forEach(action => {
                const btn = document.createElement('button');
                btn.className = `action-btn ${action.type}`;
                btn.textContent = action.label;
                btn.onclick = () => window.handleAction(action.id, insight.title);
                actionButtons.appendChild(btn);
            });

            card.appendChild(header);
            card.appendChild(description);
            card.appendChild(actionButtons);
            container.appendChild(card);
        });
    }

    generateInsights() {
        const campaigns = this.filteredData.campaigns;
        const metrics = this.calculateMetrics();
        const insights = [];

        // Critical: Low CTR campaigns
        const lowCTRCampaigns = campaigns.filter(c => parseFloat(c.ctr) < 2);
        if (lowCTRCampaigns.length > 0) {
            insights.push({
                severity: 'critical',
                icon: '🚨',
                title: 'Low CTR Detected on Multiple Campaigns',
                description: `${lowCTRCampaigns.length} campaigns have CTR below 2% (${lowCTRCampaigns.map(c => c.name).join(', ')}). This indicates poor ad relevance or targeting issues. Industry average is 3-5%.`,
                actions: [
                    { id: 'improve-ad-copy', label: '✏️ Improve Ad Copy', type: 'primary' },
                    { id: 'refine-targeting', label: '🎯 Refine Targeting', type: 'primary' },
                    { id: 'view-details', label: '📊 View Details', type: 'secondary' }
                ]
            });
        }

        // Warning: High CPA
        const highCPACampaigns = campaigns.filter(c => parseFloat(c.cpa) > 100);
        if (highCPACampaigns.length > 0) {
            insights.push({
                severity: 'warning',
                icon: '💰',
                title: 'High Cost Per Acquisition Alert',
                description: `${highCPACampaigns.length} campaigns have CPA above $100 (${highCPACampaigns.map(c => `${c.name}: $${c.cpa}`).join(', ')}). Consider optimizing bid strategy or pausing underperforming campaigns.`,
                actions: [
                    { id: 'adjust-bids', label: '📉 Adjust Bids', type: 'primary' },
                    { id: 'pause-campaigns', label: '⏸️ Pause Campaigns', type: 'secondary' },
                    { id: 'analyze-keywords', label: '🔍 Analyze Keywords', type: 'secondary' }
                ]
            });
        }

        // Success: High ROAS
        const highROASCampaigns = campaigns.filter(c => parseFloat(c.roas) > 3);
        if (highROASCampaigns.length > 0) {
            insights.push({
                severity: 'success',
                icon: '🎉',
                title: 'Excellent ROAS Performance',
                description: `${highROASCampaigns.length} campaigns are delivering exceptional returns (${highROASCampaigns.map(c => `${c.name}: ${c.roas}x`).join(', ')}). Consider increasing budget allocation to scale these winners.`,
                actions: [
                    { id: 'increase-budget', label: '💵 Increase Budget', type: 'primary' },
                    { id: 'duplicate-campaign', label: '📋 Duplicate Campaign', type: 'secondary' },
                    { id: 'export-insights', label: '📤 Export Insights', type: 'secondary' }
                ]
            });
        }

        // Warning: Paused campaigns with good performance
        const pausedCampaigns = campaigns.filter(c => c.status === 'PAUSED' && parseFloat(c.roas) > 2);
        if (pausedCampaigns.length > 0) {
            insights.push({
                severity: 'warning',
                icon: '⏸️',
                title: 'Paused Campaigns with Strong Historical Performance',
                description: `${pausedCampaigns.length} paused campaigns previously showed strong ROAS (${pausedCampaigns.map(c => c.name).join(', ')}). Consider reactivating them with updated targeting.`,
                actions: [
                    { id: 'reactivate', label: '▶️ Reactivate Campaigns', type: 'primary' },
                    { id: 'review-history', label: '📜 Review History', type: 'secondary' }
                ]
            });
        }

        // Critical: Budget pacing issues
        if (metrics.spend > 50000) {
            insights.push({
                severity: 'critical',
                icon: '⚡',
                title: 'Accelerated Budget Spend Detected',
                description: `Current spend rate ($${metrics.spend.toFixed(0)}) is 23% higher than projected monthly budget. You may exhaust your budget before month-end. Consider implementing spend caps.`,
                actions: [
                    { id: 'set-budget-cap', label: '🛡️ Set Budget Cap', type: 'primary' },
                    { id: 'adjust-schedule', label: '📅 Adjust Schedule', type: 'secondary' },
                    { id: 'view-forecast', label: '📈 View Forecast', type: 'secondary' }
                ]
            });
        }

        // Success: Conversion rate improvement
        insights.push({
            severity: 'success',
            icon: '📈',
            title: 'Conversion Rate Trending Upward',
            description: `Overall conversion rate has improved by 22.4% compared to the previous period. Your landing page optimizations and ad messaging alignment are paying off.`,
            actions: [
                { id: 'maintain-strategy', label: '✅ Maintain Strategy', type: 'primary' },
                { id: 'scale-winners', label: '🚀 Scale Winners', type: 'primary' },
                { id: 'document-learnings', label: '📝 Document Learnings', type: 'secondary' }
            ]
        });

        return insights;
    }

    renderTable() {
        const tbody = document.getElementById('campaignTableBody');
        const campaigns = this.filteredData.campaigns;

        tbody.textContent = '';
        campaigns.forEach(campaign => {
            const row = document.createElement('tr');

            const cells = [
                { text: campaign.name, bold: true },
                { html: `<span class="status-badge status-${campaign.status.toLowerCase()}">${campaign.status}</span>` },
                { text: this.formatNumber(campaign.impressions) },
                { text: this.formatNumber(campaign.clicks) },
                { text: campaign.ctr + '%' },
                { text: '$' + this.formatNumber(campaign.spend.toFixed(0)) },
                { text: this.formatNumber(campaign.conversions) },
                { text: '$' + campaign.cpa },
                { text: campaign.roas + 'x' },
                { button: true, campaignId: campaign.id }
            ];

            cells.forEach(cell => {
                const td = document.createElement('td');
                if (cell.bold) {
                    const strong = document.createElement('strong');
                    strong.textContent = cell.text;
                    td.appendChild(strong);
                } else if (cell.html) {
                    const span = document.createElement('span');
                    span.className = `status-badge status-${campaign.status.toLowerCase()}`;
                    span.textContent = campaign.status;
                    td.appendChild(span);
                } else if (cell.button) {
                    const btn = document.createElement('button');
                    btn.className = 'action-btn secondary';
                    btn.textContent = '✏️ Edit';
                    btn.onclick = () => window.editCampaign(cell.campaignId);
                    td.appendChild(btn);
                } else {
                    td.textContent = cell.text;
                }
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
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
        const statusFilter = document.getElementById('statusFilter').value;
        const dateFilter = parseInt(document.getElementById('dateFilter').value);
        const searchFilter = document.getElementById('searchFilter').value.toLowerCase();

        // Filter campaigns
        this.filteredData.campaigns = this.mockData.campaigns.filter(campaign => {
            const matchesCampaign = campaignFilter === 'all' || campaign.name === campaignFilter;
            const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
            const matchesSearch = campaign.name.toLowerCase().includes(searchFilter);

            return matchesCampaign && matchesStatus && matchesSearch;
        });

        // Filter daily metrics
        this.filteredData.dailyMetrics = this.mockData.dailyMetrics.slice(-dateFilter);

        // Re-render everything
        this.renderKPIs();
        this.renderCharts();
        this.renderInsights();
        this.renderTable();
    }

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// Global functions for button actions
window.handleAction = function(actionId, insightTitle) {
    const actions = {
        'improve-ad-copy': () => {
            alert('🎯 Ad Copy Improvement Wizard\n\nOpening AI-powered ad copy suggestions based on top performers...\n\nRecommended changes:\n• Add more emotional triggers\n• Include specific numbers/stats\n• Stronger call-to-action\n• A/B test 3-5 variations');
        },
        'refine-targeting': () => {
            alert('🎯 Targeting Refinement\n\nAnalyzing audience segments...\n\nRecommendations:\n• Exclude low-converting demographics\n• Add lookalike audiences based on converters\n• Tighten geographic targeting\n• Implement dayparting for peak hours');
        },
        'adjust-bids': () => {
            alert('📉 Bid Adjustment Tool\n\nSuggested bid changes:\n• Reduce bids by 15-20% on low CTR keywords\n• Implement automated bidding strategy\n• Set max CPA caps at $80\n• Increase bids on high-converting placements');
        },
        'pause-campaigns': () => {
            const confirmed = confirm('⏸️ Pause Low-Performing Campaigns?\n\nThis will pause campaigns with CPA above $100.\n\nEstimated monthly savings: $12,500\n\nProceed?');
            if (confirmed) {
                alert('✅ Campaigns paused successfully!\n\nYou can reactivate them anytime from the campaign manager.');
            }
        },
        'increase-budget': () => {
            alert('💵 Budget Increase Recommendation\n\nBased on ROAS analysis:\n\nCurrent budget: $45,000/month\nRecommended: $65,000/month (+44%)\n\nProjected additional revenue: $45,000\nProjected additional profit: $20,000\n\nRecommendation: Increase budget by 20% weekly to test scalability.');
        },
        'reactivate': () => {
            const confirmed = confirm('▶️ Reactivate Paused Campaigns?\n\nThis will reactivate campaigns that showed strong historical performance.\n\nEstimated opportunity: $8,000 monthly revenue\n\nProceed?');
            if (confirmed) {
                alert('✅ Campaigns reactivated!\n\nMonitor performance closely over the next 7 days.');
            }
        },
        'set-budget-cap': () => {
            alert('🛡️ Budget Cap Configuration\n\nRecommended settings:\n• Daily cap: $2,200\n• Monthly cap: $65,000\n• Alert threshold: 85% of cap\n• Auto-pause at 100%\n\nThis will prevent budget overruns and ensure consistent spend pacing.');
        },
        'scale-winners': () => {
            alert('🚀 Campaign Scaling Strategy\n\nIdentified winners:\n• Brand Awareness Q2 (ROAS: 4.2x)\n• Lead Generation Campaign (ROAS: 3.8x)\n\nScaling plan:\n1. Increase budget by 20%\n2. Expand to similar audiences\n3. Test new ad variations\n4. Monitor for 7 days\n5. Scale by another 20% if performance holds');
        },
        'default': () => {
            alert(`Action: ${actionId}\n\nThis action would normally:\n\nFor "${insightTitle}":\n• Open relevant tools\n• Apply recommended changes\n• Track results\n\nThis is a demo - in production, this would trigger real API calls to Google Ads.`);
        }
    };

    (actions[actionId] || actions['default'])();
};

window.editCampaign = function(campaignId) {
    alert(`✏️ Edit Campaign: ${campaignId}\n\nThis would open the campaign editor where you can:\n\n• Adjust bids and budgets\n• Modify targeting settings\n• Update ad copy and creatives\n• Change campaign status\n• Review performance history\n\nIn production, this would navigate to the Google Ads interface.`);
};

window.applyFilters = function() {
    dashboard.applyFilters();
};

window.refreshData = function() {
    const btn = event.target;
    btn.disabled = true;
    btn.textContent = '⏳ Refreshing...';

    setTimeout(() => {
        dashboard.mockData = dashboard.generateMockData();
        dashboard.filteredData = dashboard.mockData;
        dashboard.renderKPIs();
        dashboard.renderCharts();
        dashboard.renderInsights();
        dashboard.renderTable();
        dashboard.populateFilters();

        btn.disabled = false;
        btn.textContent = '🔄 Refresh Data';
        alert('✅ Data refreshed successfully!\n\nLast updated: ' + new Date().toLocaleString());
    }, 1500);
};

// Initialize dashboard
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new GoogleAdsDashboard();
});
