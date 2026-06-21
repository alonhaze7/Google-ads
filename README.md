# Google Ads Integration Dashboard

An interactive dashboard for monitoring and analyzing Google Ads campaigns with Salesforce Data Cloud integration. Built on real Google Ads API structure with support for multi-level campaign hierarchy, conversion tracking, keyword quality metrics, and segment performance analysis.

## Google Ads API Integration

### Multi-Level Campaign Structure

The dashboard reflects the actual Google Ads API hierarchy:

**Campaign Level**
- Campaign ID, name, status (ENABLED, PAUSED, REMOVED)
- Budget allocation and spend tracking
- Campaign start/end dates and scheduling
- Network type (Search, Display, YouTube, Search Partners)

**Ad Group Level (Media Buy)**
- Ad group ID, name, and labels
- Group-level performance metrics
- Budget distribution within campaigns

**Ad Creative Level**
- Multiple ad formats (TEXT_AD, RESPONSIVE_SEARCH_AD, etc.)
- Headline components (primary & secondary)
- Description fields (description, description_2)
- Display URL and final destination URLs
- Path components for URL customization

**Keyword Level**
- Keyword criterion ID and text
- Match types (EXACT, PHRASE, BROAD)
- Keyword status management
- Keyword-specific landing pages

### Four Core Data Sets

**1. Media Delivery**
- Impressions, clicks, and engagement metrics
- Cost tracking (in micros - divide by 1M)
- Campaign and ad group performance
- Network distribution analysis

**2. Media Conversion**
- Conversion action tracking by name and category
- Conversion value and revenue attribution
- View-through conversions (post-impression)
- Segment-level conversion analysis

**3. Keyword Delivery**
- Search keyword performance metrics
- Quality scores (1-10 scale with components)
- Impression share metrics (search, exact match)
- Lost impression tracking (rank vs. budget)
- Position metrics (top, absolute top percentages)

**4. Keyword Conversion**
- Keyword-driven conversion tracking
- Revenue attribution by keyword
- Conversion category analysis (PURCHASE, LEAD, SIGNUP)
- Quality score impact on conversions

### Key Performance Indicators (KPIs)

**Core Metrics**
- **Impressions** - Total ad impressions across networks
- **Clicks** - Total ad clicks and click-through rate
- **Spend** - Campaign costs (automatically converted from micros)
- **Interactions** - Clicks plus paid engagements

**Conversion Metrics**
- **Conversions** - Click-through conversion count
- **Revenue** - Total conversion value
- **View-Through Conversions** - Post-impression conversions
- **CPA** - Cost per acquisition
- **ROAS** - Return on ad spend (Revenue / Spend)

**Quality & Competition Metrics**
- **Quality Score** - Keyword quality (1-10 scale)
- **Search Impression Share** - Percentage of possible impressions
- **Rank Lost Impression Share** - Lost due to low ad rank
- **Budget Lost Impression Share** - Lost due to insufficient budget
- **Top Impression %** - Percentage in top positions

### Device, Location & Time Insights

**Network Segmentation**
- SEARCH - Google Search and search partners performance
- DISPLAY - Google Display Network metrics
- YOUTUBE - Video ad engagement and conversions
- MIXED - Multi-network campaign analysis

**Temporal Analysis**
- Daily performance tracking via `date_id`
- Campaign scheduling (start/end dates)
- Historical trend analysis
- Time-based conversion attribution

**Conversion Tracking**
- Multiple conversion categories (PURCHASE, LEAD, SIGNUP, PAGE_VIEW, ADD_TO_CART, DOWNLOAD)
- Conversion action-level granularity
- Attribution window support
- View-through vs. click-through analysis

### Salesforce Data Cloud Segment Integration

**Segment Performance**
- Market Segment ID mapping
- Segment name and description
- Segment origin source tracking
- Cross-segment performance comparison
- Segment-level conversion rates and ROAS

**Use Cases**
- Evaluate segment activation effectiveness
- Optimize targeting based on segment performance
- Historical segment analysis for future campaigns
- Data-driven segment building decisions

### Interactive Visualizations

1. **Performance Trends** - Multi-metric time series with impressions, clicks, conversions
2. **Campaign Distribution** - Spend allocation and budget utilization
3. **Conversion Analysis** - Conversion rate by category and network type
4. **Quality Score Distribution** - Keyword quality across campaigns
5. **Impression Share Analysis** - Competitive positioning and lost opportunity tracking
6. **Network Performance** - Comparative metrics across Search, Display, YouTube

### AI-Powered Insights

The dashboard analyzes performance across multiple dimensions:

**Campaign Health Monitoring**
- Low CTR detection (< 2%) with ad copy recommendations
- High CPA identification (> $100) with bid optimization suggestions
- Budget pacing alerts (accelerated spend vs. scheduled)
- Paused campaign opportunity analysis

**Keyword Optimization**
- Quality score alerts (< 5) with improvement recommendations
- Low impression share identification with budget/bid suggestions
- Match type performance comparison
- Negative keyword opportunities

**Conversion Optimization**
- High-performing conversion category identification
- ROAS-based scaling recommendations (> 3x)
- View-through conversion analysis
- Multi-touch attribution insights

**Segment Performance Analysis**
- Top-performing Data Cloud segments
- Segment conversion rate benchmarking
- Segment activation ROI analysis
- Cross-segment comparison and recommendations

### Actionable Recommendations

**Ad Creative Optimization**
- Improve ad copy based on CTR benchmarks
- A/B testing suggestions for headlines and descriptions
- Landing page quality improvements (post-click quality score)

**Targeting Refinement**
- Audience segment optimization
- Network performance-based allocation
- Geographic and device targeting adjustments

**Bidding Strategy**
- Bid adjustments based on quality score and position
- Budget reallocation to high-ROAS campaigns
- Impression share recovery strategies (rank vs. budget)

**Campaign Management**
- Quick pause/reactivate based on performance
- Budget scaling for successful campaigns
- Conversion action optimization by category

### Advanced Filtering & Drill-Down

**Campaign Level**
- Filter by campaign ID or name
- Status filtering (ENABLED, PAUSED, REMOVED)
- Network type filtering (Search, Display, YouTube)
- Date range selection with custom periods
- Budget-based filtering

**Ad Group Level**
- Ad group ID and name filtering
- Label-based organization
- Performance threshold filtering

**Keyword Level**
- Match type filtering (EXACT, PHRASE, BROAD)
- Quality score range filtering (1-10)
- Impression share analysis
- Status filtering

**Conversion Tracking**
- Conversion action filtering by name
- Category-based analysis (PURCHASE, LEAD, etc.)
- Revenue threshold filtering
- Attribution type (click-through vs. view-through)

**Segment Analysis**
- Market Segment ID filtering
- Segment origin source filtering
- Cross-segment comparison
- Performance benchmarking by segment

### Comprehensive Data Tables

**Campaign Performance Table**
- Campaign hierarchy (ID, name, status, dates)
- Budget allocation and spend tracking
- Core metrics (impressions, clicks, CTR, interactions)
- Conversion metrics (conversions, revenue, CPA, ROAS)
- Network distribution

**Keyword Performance Table**
- Keyword text and match type
- Quality score components
- Impression share metrics (total, exact match, lost share)
- Position metrics (top, absolute top percentages)
- Keyword-level conversions and revenue

**Conversion Analysis Table**
- Conversion action details (name, category, ID)
- Conversion count by action
- Revenue attribution by conversion type
- View-through vs. click-through split
- Cost per conversion by category

**Segment Performance Table**
- Segment identification (ID, name, description)
- Segment origin source
- Activation metrics (impressions, clicks, conversions)
- Segment-level ROAS and CPA
- Historical performance trends

## 🚀 Quick Start

### Option 1: Open Locally
1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. No installation or build process required!

### Option 2: GitHub Pages
The dashboard is automatically deployed via GitHub Pages:

**Live Demo:** `https://alonhaze7.github.io/Google-ads/`

## Real Google Ads API Data Structure

### Field Mapping & Data Types

**Text Fields (52 total)**
- Campaign, ad group, ad, and keyword identifiers
- Status fields (campaign_status, ad_group_criterion.status)
- Creative content (headlines, descriptions, URLs)
- Match types, network types, conversion categories
- Segment integration fields

**Number Fields (25 total)**
- Performance metrics (impressions, clicks, cost_micros)
- Conversion metrics (conversions, conversions_value)
- Quality scores and components
- Impression share percentages
- Position metrics

**DateTime Fields (4 total)**
- `date_id` - Primary temporal dimension
- `campaign.start_date` - Campaign activation
- `campaign.end_date` - Campaign expiration

**Currency Fields (2 total)**
- `currency` - Campaign currency code (USD, EUR, etc.)

### Cost Representation

All cost fields use **micros** (1/1,000,000 of currency unit):
- `cost_micros = 5000000` equals $5.00 USD
- Automatic conversion in dashboard displays
- Maintains precision for large-scale reporting

### Quality Score Components

**Overall Quality Score (1-10)**
- Expected click-through rate
- Ad relevance to search query
- Landing page experience
- Historical account performance

**Component Scores**
- `creative_quality_score` - Ad creative quality
- `post_click_quality_score` - Landing page quality
- Individual component optimization recommendations

### Impression Share Metrics

**Search Impression Share**
- Percentage of total available impressions received
- Benchmarking against competition
- Network-specific calculations

**Lost Impression Share**
- `search_rank_lost_impression_share` - Lost due to low ad rank
- `search_budget_lost_impression_share` - Lost due to budget constraints
- Prioritization for budget increases vs. bid optimization

**Position Metrics**
- `top_impression_percentage` - Impressions at top of page
- `absolute_top_impression_percentage` - First position impressions
- `search_top_impression_share` - Competitive positioning

### Mock Data for Development

The dashboard generates realistic data matching Google Ads API structure:

**30-Day Historical Data**
- Daily granularity with `date_id`
- Campaign lifecycle simulation (start/end dates)
- Network distribution (Search, Display, YouTube)
- Multiple conversion categories

**8 Sample Campaigns**
- Search campaigns (branded & non-branded)
- Display campaigns (standard & remarketing)
- Video campaigns (YouTube)
- Shopping campaigns
- App install campaigns

**Realistic Ranges**
- Impressions: 30,000 - 80,000 daily
- CTR: 2% - 7% (varies by network)
- Daily spend: $1,000 - $4,000
- Quality scores: 3 - 9 (keyword level)
- Impression share: 45% - 85%
- Lost impression share: 15% - 40% (rank + budget)
- Conversion rates: 2% - 10%
- ROAS: 1.5x - 5x

## 🛠️ Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No framework dependencies
- **Chart.js** - Beautiful, responsive charts
- **No backend required** - Fully client-side application

## 🎨 Design Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, professional Google-inspired design
- **Interactive Elements** - Hover effects and smooth transitions
- **Color-Coded Insights** - Visual hierarchy for quick scanning
- **Accessibility** - Semantic HTML and proper contrast ratios

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with ES6+ support

## 🔄 Refresh Data

Click the "🔄 Refresh Data" button in the header to generate new mock data and see how the dashboard responds to different scenarios.

## 🎯 Use Cases

### For Marketing Managers
- Monitor campaign performance at a glance
- Identify underperforming campaigns quickly
- Make data-driven budget decisions
- Track ROAS and conversion trends

### For Digital Marketing Agencies
- Client reporting dashboard
- Performance monitoring across multiple campaigns
- Quick identification of optimization opportunities
- Demonstrable ROI tracking

### For Business Owners
- Understand advertising effectiveness
- Track marketing spend and returns
- Make informed budget allocation decisions
- Monitor conversion trends

## Key Metrics & Formulas

### Click-Through Rate (CTR)
- **Formula:** (Clicks / Impressions) × 100
- **Search Benchmark:** 3-5%
- **Display Benchmark:** 0.5-1%
- **YouTube Benchmark:** 1-3%
- **Action:** CTR < 2% indicates poor ad relevance or targeting

### Cost Per Acquisition (CPA)
- **Formula:** Spend / Conversions
- **Calculation:** Uses `cost_micros` converted to currency
- **Category-Specific:** PURCHASE vs. LEAD vs. SIGNUP have different targets
- **Optimization:** High CPA suggests bid reduction or quality score improvement

### Return on Ad Spend (ROAS)
- **Formula:** conversions_value / (cost_micros / 1,000,000)
- **Target Ranges:**
  - Minimum viable: 2x
  - Good performance: 3-4x
  - Excellent performance: 5x+
- **Action:** Scale campaigns with ROAS > 3x, pause campaigns < 1.5x

### Quality Score (1-10)
- **Components:**
  - Expected CTR (historical performance)
  - Ad relevance (keyword-ad alignment)
  - Landing page experience (post-click quality)
- **Impact:**
  - Score 8-10: Lower CPC, better positions
  - Score 5-7: Average performance
  - Score 1-4: Higher CPC, poor positions
- **Optimization:** Focus on keywords < 5, consider pausing keywords < 3

### Search Impression Share
- **Formula:** (Impressions received / Total eligible impressions) × 100
- **Interpretation:**
  - 80%+ : Strong visibility
  - 50-80%: Moderate visibility with growth potential
  - < 50%: Limited visibility, investigate lost share
- **Lost Share Analysis:**
  - Rank lost > Budget lost: Increase bids or improve quality score
  - Budget lost > Rank lost: Increase daily budget

### Position Metrics
- **Top Impression %:** Percentage of impressions at top of search results
- **Absolute Top Impression %:** Percentage in first position
- **Target:** Top impression % > 60% for branded campaigns
- **Optimization:** Low position % may indicate bid adjustments needed

### Conversion Metrics
- **Conversions:** Click-through conversions (primary attribution)
- **View-Through Conversions:** Post-impression conversions (assisted)
- **Total Conversions:** conversions + view_through_conversions
- **Revenue Attribution:** conversions_value by conversion_action_category

### Interaction Metrics
- **Interactions:** clicks + engagements
- **Engagements:** Video views, app installs, social interactions
- **Network-Specific:** Varies by ad_network_type

## Google Ads API Integration Features

### Supported Data Sets
1. **Media Delivery** - Campaign performance and engagement
2. **Media Conversion** - Conversion tracking and revenue
3. **Keyword Delivery** - Search keyword metrics and quality
4. **Keyword Conversion** - Keyword-level conversion attribution

### Multi-Level Hierarchy Support
- **Campaign Level:** Budget, status, dates, network targeting
- **Ad Group Level:** Grouping, labels, performance segmentation
- **Ad Creative Level:** Multiple formats, headlines, descriptions, URLs
- **Keyword Level:** Match types, quality scores, impression share

### Conversion Tracking Categories
- PURCHASE - E-commerce transactions
- LEAD - Lead generation forms
- SIGNUP - Account registrations
- PAGE_VIEW - Key page visits
- ADD_TO_CART - Shopping actions
- DOWNLOAD - File/app downloads

### Quality & Performance Metrics
- Overall quality score (1-10)
- Component scores (creative, post-click)
- Impression share (search, exact match)
- Lost impression share (rank, budget)
- Position metrics (top, absolute top)

### Network Coverage
- SEARCH - Google Search + partners
- DISPLAY - Google Display Network
- YOUTUBE - Video advertising
- SEARCH_PARTNERS - Extended search network
- MIXED - Multi-network campaigns

### Salesforce Data Cloud Integration
- Market Segment ID mapping
- Segment name and description
- Segment origin source tracking
- Cross-platform segment performance
- Historical segment analysis

### Device, Location & Time Insights
- Daily granularity via `date_id`
- Campaign scheduling (start/end dates)
- Network-based segmentation
- Conversion attribution windows
- View-through conversion tracking

## Future Enhancements

### API Integration
- Live Google Ads API connection
- OAuth 2.0 authentication
- Real-time data synchronization
- Multi-account (MCC) support

### Advanced Analytics
- Automated bidding recommendations
- A/B test tracking and analysis
- Competitor impression share analysis
- Attribution modeling (multi-touch)
- Predictive performance forecasting
- Anomaly detection and alerts

### Reporting & Export
- Custom date range selection
- Scheduled report generation
- PDF/CSV/Excel export
- Email alerts for thresholds
- Slack/Teams integration notifications
- Executive summary dashboards

### Segment Optimization
- AI-powered segment recommendations
- Lookalike audience suggestions
- Cross-segment performance comparison
- Segment activation ROI tracking
- Historical segment trend analysis

### Integration Expansion
- Google Analytics 4 integration
- Google Tag Manager connection
- CRM data synchronization (Salesforce)
- Data Cloud identity resolution
- Cross-channel attribution

## Customization Guide

### Data Configuration

**Mock Data Adjustment**
- Edit `generateMockData()` in `dashboard.js`
- Customize campaign names, types, and network distribution
- Adjust metric ranges (impressions, CTR, quality scores)
- Modify conversion categories and rates
- Configure segment mapping

**Real API Integration**
- Replace mock data functions with Google Ads API calls
- Implement OAuth 2.0 authentication flow
- Configure API request batching and caching
- Set up data refresh intervals
- Map API responses to dashboard data structure

### Threshold Configuration

**Performance Alerts**
- CTR thresholds (default: < 2% critical, > 5% excellent)
- CPA thresholds (adjust by industry/margin)
- ROAS targets (default: < 2x warning, > 3x success)
- Quality score alerts (default: < 5 warning, < 3 critical)
- Impression share targets (default: < 50% warning)

**Budget Monitoring**
- Daily spend pacing alerts
- Budget exhaustion warnings
- Lost impression share thresholds (rank vs. budget)

### Field Mapping Customization

Reference `FIELD_MAPPING.md` for:
- Complete field inventory (83 fields across 4 data sets)
- Priority levels (HIGH, MEDIUM, LOW)
- Data types and formats
- EMI field mappings
- Implementation status

**Custom Field Addition**
1. Identify Google Ads API field
2. Add to appropriate data set (Media/Keyword Delivery/Conversion)
3. Map to EMI field name if applicable
4. Update dashboard data structure
5. Add visualization if needed

### Visualization Customization

**Chart Configuration**
- Modify Chart.js options in `dashboard.js`
- Adjust color schemes and gradients
- Configure tooltips and legends
- Add new chart types (scatter, radar, etc.)

**Metric Display**
- Edit KPI card components
- Add custom calculated metrics
- Configure number formatting
- Adjust currency display (micros conversion)

### Styling Customization

**CSS Variables**
- Modify color schemes in `index.html`
- Adjust spacing and typography
- Configure responsive breakpoints
- Customize animation timings

**Component Styling**
- Update card layouts
- Modify table designs
- Adjust chart container sizes
- Configure mobile responsiveness

### Segment Integration

**Data Cloud Connection**
- Configure segment ID mapping
- Set up segment refresh intervals
- Customize segment performance calculations
- Add segment-specific thresholds

**Formula Field Configuration**
- Map Market Segment ID sources
- Configure segment name display
- Set up segment origin tracking
- Implement cross-segment analysis

## 🤝 Contributing

Feel free to fork this project and submit pull requests for:
- Bug fixes
- New features
- Improved visualizations
- Better mobile responsiveness
- Documentation improvements

## 📄 License

This project is open source and available under the MIT License.

## Related Documentation

- **FIELD_MAPPING.md** - Complete Google Ads API field reference with categories, priorities, and usage notes
- **FIELD_REFERENCE.md** - Detailed field descriptions and examples
- **MISSING_FIELDS_ANALYSIS.md** - Gap analysis and implementation roadmap
- **DEPLOYMENT.md** - Integration setup and configuration guide
- **QUICK_START.md** - Getting started with the dashboard

## Technical Architecture

### Data Model
- 4 primary data sets (Media Delivery, Media Conversion, Keyword Delivery, Keyword Conversion)
- 83 total fields across all data sets
- Multi-level hierarchy (Campaign → Ad Group → Ad → Keyword)
- Temporal granularity via `date_id`

### Integration Points
- Google Ads API (primary data source)
- Salesforce Data Cloud (segment integration)
- EMI field mapping (standardized naming)
- Currency handling (micros to standard conversion)

### Performance Considerations
- Cost fields in micros (divide by 1,000,000)
- Quality score components (1-10 scale)
- Impression share percentages (0-100)
- Conversion attribution windows
- Data refresh latency (typically 24 hours)

## Acknowledgments

- Google Ads API for comprehensive advertising data structure
- Salesforce Data Cloud for segment integration capabilities
- Chart.js for visualization framework
- EMI standardization for cross-platform field mapping

---

**Google Ads Dashboard with Salesforce Data Cloud Integration**

For questions, issues, or contributions, please open an issue on GitHub.

**Document Version:** 2.0  
**Last Updated:** June 21, 2026  
**API Version:** Google Ads API via Salesforce Data Cloud
