/**
 * Google Ads Dashboard - Charts Module
 * Comprehensive chart configurations and utilities for all dashboard visualizations
 */

// ============================================================================
// CHART.JS CONFIGURATION & THEME
// ============================================================================

const DARK_THEME = {
  background: '#1a1a2e',
  surface: '#16213e',
  primary: '#0f3460',
  accent: '#e94560',
  text: '#eaeaea',
  textSecondary: '#a0a0a0',
  gridColor: 'rgba(255, 255, 255, 0.1)',
  tooltipBg: 'rgba(22, 33, 62, 0.95)',
};

const COLOR_PALETTE = {
  blue: '#3b82f6',
  green: '#10b981',
  red: '#ef4444',
  yellow: '#f59e0b',
  purple: '#8b5cf6',
  pink: '#ec4899',
  teal: '#14b8a6',
  orange: '#f97316',
  indigo: '#6366f1',
  cyan: '#06b6d4',
};

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 750,
    easing: 'easeInOutQuart',
  },
  plugins: {
    legend: {
      labels: {
        color: DARK_THEME.text,
        font: {
          size: 12,
          family: "'Inter', 'Segoe UI', sans-serif",
        },
        padding: 15,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: DARK_THEME.tooltipBg,
      titleColor: DARK_THEME.text,
      bodyColor: DARK_THEME.text,
      borderColor: DARK_THEME.gridColor,
      borderWidth: 1,
      padding: 12,
      cornerRadius: 6,
      titleFont: {
        size: 13,
        weight: 'bold',
      },
      bodyFont: {
        size: 12,
      },
      displayColors: true,
      boxPadding: 6,
    },
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format currency values
 */
function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format percentage values
 */
function formatPercentage(value, decimals = 2) {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format large numbers with K/M suffixes
 */
function formatNumber(value, decimals = 1) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(decimals)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(decimals)}K`;
  }
  return value.toFixed(decimals);
}

/**
 * Generate gradient for charts
 */
function createGradient(ctx, color1, color2) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

/**
 * Get color based on performance threshold
 */
function getPerformanceColor(value, thresholds) {
  if (value >= thresholds.excellent) return COLOR_PALETTE.green;
  if (value >= thresholds.good) return COLOR_PALETTE.blue;
  if (value >= thresholds.average) return COLOR_PALETTE.yellow;
  return COLOR_PALETTE.red;
}

// ============================================================================
// CHART 1: PERFORMANCE TREND CHART (Multi-line with Dual Y-axes)
// ============================================================================

function createPerformanceTrendChart(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.dates,
      datasets: [
        {
          label: 'Impressions',
          data: data.impressions,
          borderColor: COLOR_PALETTE.blue,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          yAxisID: 'y',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Clicks',
          data: data.clicks,
          borderColor: COLOR_PALETTE.green,
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          yAxisID: 'y',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Conversions',
          data: data.conversions,
          borderColor: COLOR_PALETTE.purple,
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          yAxisID: 'y1',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Cost',
          data: data.cost,
          borderColor: COLOR_PALETTE.orange,
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: false,
          yAxisID: 'y1',
          pointRadius: 4,
          pointHoverRadius: 6,
          borderDash: [5, 5],
        },
      ],
    },
    options: {
      ...CHART_DEFAULTS,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        x: {
          grid: {
            color: DARK_THEME.gridColor,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            maxRotation: 45,
            minRotation: 0,
          },
        },
        y: {
          type: 'linear',
          position: 'left',
          grid: {
            color: DARK_THEME.gridColor,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            callback: function(value) {
              return formatNumber(value);
            },
          },
          title: {
            display: true,
            text: 'Impressions / Clicks',
            color: DARK_THEME.text,
          },
        },
        y1: {
          type: 'linear',
          position: 'right',
          grid: {
            drawOnChartArea: false,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            callback: function(value) {
              return formatNumber(value);
            },
          },
          title: {
            display: true,
            text: 'Conversions / Cost ($)',
            color: DARK_THEME.text,
          },
        },
      },
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              if (label === 'Cost') {
                return `${label}: ${formatCurrency(value)}`;
              }
              return `${label}: ${formatNumber(value, 0)}`;
            },
          },
        },
      },
    },
  });
}

// ============================================================================
// CHART 2: ROAS BY CAMPAIGN (Horizontal Bars, Color-coded)
// ============================================================================

function createROASByCampaignChart(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  const thresholds = { excellent: 4, good: 3, average: 2 };
  const colors = data.roas.map(value => getPerformanceColor(value, thresholds));

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.campaigns,
      datasets: [
        {
          label: 'ROAS',
          data: data.roas,
          backgroundColor: colors,
          borderColor: colors.map(c => c.replace(')', ', 1)').replace('rgba', 'rgb')),
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    },
    options: {
      ...CHART_DEFAULTS,
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            color: DARK_THEME.gridColor,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            callback: function(value) {
              return value.toFixed(1) + 'x';
            },
          },
          title: {
            display: true,
            text: 'Return on Ad Spend (ROAS)',
            color: DARK_THEME.text,
          },
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            font: {
              size: 11,
            },
          },
        },
      },
      plugins: {
        ...CHART_DEFAULTS.plugins,
        legend: {
          display: false,
        },
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: function(context) {
              const value = context.parsed.x;
              const spend = data.spend[context.dataIndex];
              const revenue = data.revenue[context.dataIndex];
              return [
                `ROAS: ${value.toFixed(2)}x`,
                `Spend: ${formatCurrency(spend)}`,
                `Revenue: ${formatCurrency(revenue)}`,
              ];
            },
          },
        },
      },
    },
  });
}

// ============================================================================
// CHART 3: DEVICE PERFORMANCE (Doughnut Chart)
// ============================================================================

function createDevicePerformanceChart(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.devices,
      datasets: [
        {
          label: 'Conversions',
          data: data.conversions,
          backgroundColor: [
            COLOR_PALETTE.blue,
            COLOR_PALETTE.green,
            COLOR_PALETTE.purple,
            COLOR_PALETTE.orange,
          ],
          borderColor: DARK_THEME.surface,
          borderWidth: 3,
          hoverOffset: 15,
        },
      ],
    },
    options: {
      ...CHART_DEFAULTS,
      cutout: '65%',
      plugins: {
        ...CHART_DEFAULTS.plugins,
        legend: {
          ...CHART_DEFAULTS.plugins.legend,
          position: 'right',
        },
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              const cost = data.cost[context.dataIndex];
              const cpa = cost / value;
              return [
                `${label}: ${value} conversions`,
                `Share: ${percentage}%`,
                `CPA: ${formatCurrency(cpa)}`,
              ];
            },
          },
        },
      },
    },
  });
}

// ============================================================================
// CHART 4: GEOGRAPHIC HEATMAP (Top Locations)
// ============================================================================

function createGeographicHeatmapChart(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  const maxValue = Math.max(...data.values);
  const colors = data.values.map(value => {
    const intensity = value / maxValue;
    return `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`;
  });

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.locations,
      datasets: [
        {
          label: 'Performance Score',
          data: data.values,
          backgroundColor: colors,
          borderColor: COLOR_PALETTE.blue,
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    },
    options: {
      ...CHART_DEFAULTS,
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            color: DARK_THEME.gridColor,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            callback: function(value) {
              return formatNumber(value);
            },
          },
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            font: {
              size: 11,
            },
          },
        },
      },
      plugins: {
        ...CHART_DEFAULTS.plugins,
        legend: {
          display: false,
        },
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: function(context) {
              const idx = context.dataIndex;
              return [
                `Conversions: ${data.conversions[idx]}`,
                `Spend: ${formatCurrency(data.spend[idx])}`,
                `CPA: ${formatCurrency(data.spend[idx] / data.conversions[idx])}`,
                `CTR: ${formatPercentage(data.ctr[idx])}`,
              ];
            },
          },
        },
      },
    },
  });
}

// ============================================================================
// CHART 5: HOURLY PERFORMANCE (Matrix Heatmap)
// ============================================================================

function createHourlyPerformanceChart(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  // Transform data for heatmap visualization
  const chartData = [];
  const maxValue = Math.max(...data.values.flat());

  data.hours.forEach((hour, hourIdx) => {
    data.days.forEach((day, dayIdx) => {
      const value = data.values[dayIdx][hourIdx];
      chartData.push({
        x: hour,
        y: day,
        v: value,
      });
    });
  });

  return new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Performance',
          data: chartData,
          backgroundColor: function(context) {
            const value = context.raw.v;
            const intensity = value / maxValue;
            return `rgba(16, 185, 129, ${0.2 + intensity * 0.8})`;
          },
          borderColor: DARK_THEME.gridColor,
          borderWidth: 1,
          pointRadius: 20,
          pointHoverRadius: 22,
        },
      ],
    },
    options: {
      ...CHART_DEFAULTS,
      scales: {
        x: {
          type: 'category',
          labels: data.hours,
          grid: {
            color: DARK_THEME.gridColor,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
          },
          title: {
            display: true,
            text: 'Hour of Day',
            color: DARK_THEME.text,
          },
        },
        y: {
          type: 'category',
          labels: data.days,
          grid: {
            color: DARK_THEME.gridColor,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
          },
          title: {
            display: true,
            text: 'Day of Week',
            color: DARK_THEME.text,
          },
        },
      },
      plugins: {
        ...CHART_DEFAULTS.plugins,
        legend: {
          display: false,
        },
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            title: function(context) {
              const point = context[0].raw;
              return `${point.y} at ${point.x}:00`;
            },
            label: function(context) {
              const value = context.raw.v;
              return [
                `Conversions: ${value}`,
                `Performance: ${((value / maxValue) * 100).toFixed(1)}%`,
              ];
            },
          },
        },
      },
    },
  });
}

// ============================================================================
// CHART 6: CONVERSION FUNNEL (Progressive Funnel)
// ============================================================================

function createConversionFunnelChart(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  const colors = [
    COLOR_PALETTE.blue,
    COLOR_PALETTE.cyan,
    COLOR_PALETTE.green,
    COLOR_PALETTE.yellow,
    COLOR_PALETTE.orange,
  ];

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.stages,
      datasets: [
        {
          label: 'Users',
          data: data.values,
          backgroundColor: colors,
          borderColor: colors.map(c => c.replace(')', ', 1)').replace('rgba', 'rgb')),
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    },
    options: {
      ...CHART_DEFAULTS,
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            color: DARK_THEME.gridColor,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            callback: function(value) {
              return formatNumber(value);
            },
          },
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            font: {
              size: 12,
              weight: 'bold',
            },
          },
        },
      },
      plugins: {
        ...CHART_DEFAULTS.plugins,
        legend: {
          display: false,
        },
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: function(context) {
              const value = context.parsed.x;
              const idx = context.dataIndex;
              const dropoff = idx > 0
                ? ((data.values[idx - 1] - value) / data.values[idx - 1] * 100).toFixed(1)
                : 0;
              const conversionRate = ((value / data.values[0]) * 100).toFixed(2);

              const labels = [
                `Count: ${formatNumber(value, 0)}`,
                `Conversion Rate: ${conversionRate}%`,
              ];

              if (idx > 0) {
                labels.push(`Drop-off: ${dropoff}%`);
              }

              return labels;
            },
          },
        },
      },
    },
  });
}

// ============================================================================
// CHART 7: QUALITY SCORE DISTRIBUTION (Histogram)
// ============================================================================

function createQualityScoreChart(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  const colors = data.scores.map(score => {
    if (score >= 8) return COLOR_PALETTE.green;
    if (score >= 5) return COLOR_PALETTE.yellow;
    return COLOR_PALETTE.red;
  });

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.scores,
      datasets: [
        {
          label: 'Keyword Count',
          data: data.counts,
          backgroundColor: colors,
          borderColor: colors.map(c => c.replace(')', ', 1)').replace('rgba', 'rgb')),
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    },
    options: {
      ...CHART_DEFAULTS,
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
          },
          title: {
            display: true,
            text: 'Quality Score (1-10)',
            color: DARK_THEME.text,
          },
        },
        y: {
          grid: {
            color: DARK_THEME.gridColor,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            callback: function(value) {
              return formatNumber(value, 0);
            },
          },
          title: {
            display: true,
            text: 'Number of Keywords',
            color: DARK_THEME.text,
          },
        },
      },
      plugins: {
        ...CHART_DEFAULTS.plugins,
        legend: {
          display: false,
        },
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            title: function(context) {
              return `Quality Score: ${context[0].label}`;
            },
            label: function(context) {
              const value = context.parsed.y;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return [
                `Keywords: ${value}`,
                `Percentage: ${percentage}%`,
              ];
            },
          },
        },
      },
    },
  });
}

// ============================================================================
// CHART 8: BUDGET PACING (Stacked Bars with Trend)
// ============================================================================

function createBudgetPacingChart(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.campaigns,
      datasets: [
        {
          label: 'Spent',
          data: data.spent,
          backgroundColor: COLOR_PALETTE.blue,
          borderColor: COLOR_PALETTE.blue,
          borderWidth: 1,
          borderRadius: 6,
          stack: 'budget',
        },
        {
          label: 'Remaining',
          data: data.remaining,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: DARK_THEME.gridColor,
          borderWidth: 1,
          borderRadius: 6,
          stack: 'budget',
        },
        {
          label: 'Projected',
          data: data.projected,
          type: 'line',
          borderColor: COLOR_PALETTE.orange,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.4,
        },
      ],
    },
    options: {
      ...CHART_DEFAULTS,
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            maxRotation: 45,
            minRotation: 45,
            font: {
              size: 10,
            },
          },
        },
        y: {
          stacked: true,
          grid: {
            color: DARK_THEME.gridColor,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            callback: function(value) {
              return formatCurrency(value);
            },
          },
          title: {
            display: true,
            text: 'Budget ($)',
            color: DARK_THEME.text,
          },
        },
      },
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              const idx = context.dataIndex;

              if (label === 'Projected') {
                const pacing = data.pacing[idx];
                return [
                  `${label}: ${formatCurrency(value)}`,
                  `Pacing: ${pacing}%`,
                  `Status: ${pacing > 110 ? 'Over' : pacing < 90 ? 'Under' : 'On track'}`,
                ];
              }

              return `${label}: ${formatCurrency(value)}`;
            },
          },
        },
      },
    },
  });
}

// ============================================================================
// CHART 9: CTR BY AD FORMAT (Comparison Chart)
// ============================================================================

function createCTRByAdFormatChart(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.formats,
      datasets: [
        {
          label: 'CTR (%)',
          data: data.ctr,
          backgroundColor: COLOR_PALETTE.purple,
          borderColor: COLOR_PALETTE.purple,
          borderWidth: 1,
          borderRadius: 6,
          yAxisID: 'y',
        },
        {
          label: 'Avg CTR (%)',
          data: data.avgCTR,
          type: 'line',
          borderColor: COLOR_PALETTE.yellow,
          backgroundColor: 'transparent',
          borderWidth: 3,
          borderDash: [8, 4],
          pointRadius: 0,
          yAxisID: 'y',
        },
        {
          label: 'Impressions',
          data: data.impressions,
          type: 'line',
          borderColor: COLOR_PALETTE.cyan,
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      ...CHART_DEFAULTS,
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
          },
        },
        y: {
          type: 'linear',
          position: 'left',
          grid: {
            color: DARK_THEME.gridColor,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            callback: function(value) {
              return value.toFixed(1) + '%';
            },
          },
          title: {
            display: true,
            text: 'Click-Through Rate (%)',
            color: DARK_THEME.text,
          },
        },
        y1: {
          type: 'linear',
          position: 'right',
          grid: {
            drawOnChartArea: false,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            callback: function(value) {
              return formatNumber(value);
            },
          },
          title: {
            display: true,
            text: 'Impressions',
            color: DARK_THEME.text,
          },
        },
      },
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              const idx = context.dataIndex;

              if (label === 'Impressions') {
                return `${label}: ${formatNumber(value, 0)}`;
              }

              if (label === 'CTR (%)') {
                const clicks = data.clicks[idx];
                return [
                  `${label}: ${value.toFixed(2)}%`,
                  `Clicks: ${formatNumber(clicks, 0)}`,
                ];
              }

              return `${label}: ${value.toFixed(2)}%`;
            },
          },
        },
      },
    },
  });
}

// ============================================================================
// CHART 10: KEYWORD PERFORMANCE SCATTER (Bubble Chart)
// ============================================================================

function createKeywordPerformanceScatter(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  // Transform data for bubble chart
  const bubbleData = data.keywords.map((keyword, idx) => ({
    x: data.ctr[idx],
    y: data.conversionRate[idx],
    r: Math.sqrt(data.impressions[idx]) / 50, // Scale radius
    keyword: keyword,
    impressions: data.impressions[idx],
    clicks: data.clicks[idx],
    conversions: data.conversions[idx],
    cost: data.cost[idx],
    qualityScore: data.qualityScore[idx],
  }));

  return new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [
        {
          label: 'Keywords',
          data: bubbleData,
          backgroundColor: function(context) {
            const qs = context.raw.qualityScore;
            if (qs >= 8) return 'rgba(16, 185, 129, 0.6)';
            if (qs >= 5) return 'rgba(245, 158, 11, 0.6)';
            return 'rgba(239, 68, 68, 0.6)';
          },
          borderColor: function(context) {
            const qs = context.raw.qualityScore;
            if (qs >= 8) return COLOR_PALETTE.green;
            if (qs >= 5) return COLOR_PALETTE.yellow;
            return COLOR_PALETTE.red;
          },
          borderWidth: 2,
        },
      ],
    },
    options: {
      ...CHART_DEFAULTS,
      scales: {
        x: {
          grid: {
            color: DARK_THEME.gridColor,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            callback: function(value) {
              return value.toFixed(1) + '%';
            },
          },
          title: {
            display: true,
            text: 'Click-Through Rate (%)',
            color: DARK_THEME.text,
            font: {
              size: 13,
              weight: 'bold',
            },
          },
        },
        y: {
          grid: {
            color: DARK_THEME.gridColor,
            drawBorder: false,
          },
          ticks: {
            color: DARK_THEME.textSecondary,
            callback: function(value) {
              return value.toFixed(1) + '%';
            },
          },
          title: {
            display: true,
            text: 'Conversion Rate (%)',
            color: DARK_THEME.text,
            font: {
              size: 13,
              weight: 'bold',
            },
          },
        },
      },
      plugins: {
        ...CHART_DEFAULTS.plugins,
        legend: {
          display: false,
        },
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            title: function(context) {
              return context[0].raw.keyword;
            },
            label: function(context) {
              const point = context.raw;
              return [
                `CTR: ${point.x.toFixed(2)}%`,
                `Conv. Rate: ${point.y.toFixed(2)}%`,
                `Impressions: ${formatNumber(point.impressions, 0)}`,
                `Clicks: ${formatNumber(point.clicks, 0)}`,
                `Conversions: ${point.conversions}`,
                `Cost: ${formatCurrency(point.cost)}`,
                `Quality Score: ${point.qualityScore}/10`,
              ];
            },
          },
        },
      },
    },
  });
}

// ============================================================================
// CHART MANAGEMENT UTILITIES
// ============================================================================

/**
 * Chart instances registry
 */
const chartInstances = {};

/**
 * Initialize a chart and store its instance
 */
function initChart(chartId, canvasId, chartFunction, data) {
  // Destroy existing chart if present
  if (chartInstances[chartId]) {
    chartInstances[chartId].destroy();
  }

  // Create new chart instance
  chartInstances[chartId] = chartFunction(canvasId, data);
  return chartInstances[chartId];
}

/**
 * Update chart data
 */
function updateChartData(chartId, newData) {
  const chart = chartInstances[chartId];
  if (!chart) {
    console.error(`Chart ${chartId} not found`);
    return;
  }

  chart.data = newData;
  chart.update('active');
}

/**
 * Destroy a chart instance
 */
function destroyChart(chartId) {
  if (chartInstances[chartId]) {
    chartInstances[chartId].destroy();
    delete chartInstances[chartId];
  }
}

/**
 * Destroy all charts
 */
function destroyAllCharts() {
  Object.keys(chartInstances).forEach(chartId => {
    destroyChart(chartId);
  });
}

/**
 * Get chart instance
 */
function getChartInstance(chartId) {
  return chartInstances[chartId];
}

/**
 * Resize all charts (useful for responsive layouts)
 */
function resizeAllCharts() {
  Object.values(chartInstances).forEach(chart => {
    chart.resize();
  });
}

// ============================================================================
// EXPORTS
// ============================================================================

// Export chart creation functions
export {
  createPerformanceTrendChart,
  createROASByCampaignChart,
  createDevicePerformanceChart,
  createGeographicHeatmapChart,
  createHourlyPerformanceChart,
  createConversionFunnelChart,
  createQualityScoreChart,
  createBudgetPacingChart,
  createCTRByAdFormatChart,
  createKeywordPerformanceScatter,
};

// Export utility functions
export {
  formatCurrency,
  formatPercentage,
  formatNumber,
  createGradient,
  getPerformanceColor,
};

// Export chart management
export {
  initChart,
  updateChartData,
  destroyChart,
  destroyAllCharts,
  getChartInstance,
  resizeAllCharts,
};

// Export theme and configuration
export {
  DARK_THEME,
  COLOR_PALETTE,
  CHART_DEFAULTS,
};
