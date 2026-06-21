# Google Ads Field Mapping Reference

This document provides a complete reference for all Google Ads API fields available in the Salesforce Data Cloud integration, organized by data set and category.

## Overview

Google Ads integration brings together first-party and third-party marketing data to deliver insights on segments activated to Google Ads. This enables customers to track the effectiveness of segments used for targeting and utilize historical performance to make data-driven decisions when building new segments and optimizing media campaigns.

## Data Sets

The Google Ads integration provides four primary data sets:

1. **Media Delivery** - Campaign performance, impressions, clicks, and engagement metrics
2. **Media Conversion** - Conversion tracking, revenue, and post-impression conversions
3. **Keyword Delivery** - Search keyword performance, quality scores, and impression share
4. **Keyword Conversion** - Keyword-level conversion tracking and revenue attribution

---

## 1. Media Delivery Data Set

### Temporal & Currency Fields

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `date_id` | Date Time | DateTime | HIGH | Primary time dimension for reporting |
| `currency` | Currency | Currency | HIGH | Campaign currency code (USD, EUR, etc.) |

### Campaign Hierarchy

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `campaign_id` | Campaign Id | Text | HIGH | Unique campaign identifier |
| `campaign_name` | Campaign Name | Text | HIGH | Campaign display name |
| `campaign_status` | Campaign Status | Text | HIGH | ENABLED, PAUSED, REMOVED |
| `campaign.start_date` | Campaign Start Date | DateTime | MEDIUM | Campaign activation date |
| `campaign.end_date` | Campaign End Date | DateTime | MEDIUM | Campaign end date (if scheduled) |
| `campaign_billing_code` | Campaign Billing Method | Text | LOW | Billing configuration |
| `camapgin_category` | Campaign Method | Text | MEDIUM | Campaign type classification |
| `budget` | Budgeted Cost Amount | Number | HIGH | Daily or total campaign budget |

### Ad Group (Media Buy) Level

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `ad_group_id` | Media Buy Id | Text | HIGH | Unique ad group identifier |
| `ad_group_name` | Media Buy Name | Text | HIGH | Ad group display name |
| `label` | Ad Group | Text | MEDIUM | Ad group labels for organization |

### Ad Creative Fields

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `ad_id` | Ad Id | Text | HIGH | Unique ad identifier |
| `ad_name` | Ad Name | Text | HIGH | Ad display name |
| `type` | Ad Format | Text | HIGH | TEXT_AD, RESPONSIVE_SEARCH_AD, etc. |
| `headline_part_1_or_headlines` | Ad Headline | Text | HIGH | Primary headline(s) |
| `headline_part_2` | Ad Headline | Text | MEDIUM | Secondary headline |
| `description` | Ad Creative Text | Text | HIGH | Primary ad description |
| `description_2` | Ad Creative Text | Text | MEDIUM | Secondary ad description |
| `Creative Title Name` | Ad Creative Title Name | Text | MEDIUM | Creative title identifier |
| `display_url` | Ad Creative Url | Text | MEDIUM | Visible URL in ad |
| `final_urls` | Ad Creative Click Url | Text | HIGH | Landing page destination |
| `path1` | (Unmapped) | Text | LOW | URL path component 1 |
| `path2` | (Unmapped) | Text | LOW | URL path component 2 |

### Network & Placement

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `ad_network_type` | Site Name | Text | HIGH | SEARCH, DISPLAY, YOUTUBE, etc. |

### Advertiser Information

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `campaign_advertiser_id` | Advertiser Id | Text | MEDIUM | Advertiser account identifier |
| `campaign_advertiser` | Advertiser Name | Text | MEDIUM | Advertiser display name |

### Performance Metrics

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `impressions` | Impressions | Number | HIGH | Total ad impressions |
| `clicks` | Clicks | Number | HIGH | Total ad clicks |
| `cost_micros` | Spend | Number | HIGH | Cost in micros (divide by 1M for actual) |
| `Engagements` | Paid Engagements | Number | MEDIUM | Video views, app installs, etc. |
| `interactions` | Interactions | Number | MEDIUM | Clicks + engagements |

### Segment Integration (Formulas)

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `Formula` | Market Segment ID | Text | HIGH | Data Cloud segment identifier |
| `Formula` | Name | Text | HIGH | Segment name |
| `Formula` | Description | Text | MEDIUM | Segment description |
| `Formula` | Segment Origin Source | Text | MEDIUM | Segment source system |

---

## 2. Media Conversion Data Set

### Temporal & Currency Fields

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `date_id` | Date Time | DateTime | HIGH | Primary time dimension for reporting |
| `currency` | Currency | Currency | HIGH | Campaign currency code |

### Campaign Hierarchy
*(Same fields as Media Delivery - see above)*

### Ad Group & Creative Fields
*(Same fields as Media Delivery - see above)*

### Conversion Tracking

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `conversion_action_name` | Conversion Tag Name | Text | HIGH | Name of conversion action |
| `conversion_action_category` | Conversion Tag Category | Text | HIGH | PURCHASE, LEAD, SIGNUP, etc. |

### Conversion Metrics

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `conversions` | Conversions | Number | HIGH | Total conversions (click-through) |
| `conversions_value` | Revenue | Number | HIGH | Total conversion value/revenue |
| `view_through_conversions` | Post Impression Conversions | Number | MEDIUM | View-through conversions |
| `budget` | Campaign Budget | Number | HIGH | Campaign budget amount |

### Segment Integration (Formulas)
*(Same fields as Media Delivery - see above)*

---

## 3. Keyword Delivery Data Set

### Keyword Identification

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `ad_group_criterion.criterion_id` | Ad Keyword Id | Text | HIGH | Unique keyword criterion ID |
| `ad_group_criterion.keyword.text` | Name | Text | HIGH | Actual keyword text |
| `ad_group_criterion.keyword.match_type` | Ad Keyword Match Type | Text | HIGH | EXACT, PHRASE, BROAD |
| `ad_group_criterion.status` | Ad Keyword Status | Text | HIGH | ENABLED, PAUSED, REMOVED |
| `ad_group_criterion.final_urls` | Search URL | Text | MEDIUM | Keyword-specific landing page |

### Quality Metrics

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `ad_group_criterion.quality_info.creative_quality_score` | Quality Score | Text | HIGH | Creative quality component (text) |
| `ad_group_criterion.quality_info.post_click_quality_score` | (Unmapped) | Text | MEDIUM | Landing page experience |
| `ad_group_criterion.quality_info.quality_score` | (Unmapped) | Number | HIGH | Overall quality score (1-10) |

### Performance Metrics

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `Impressions` | Impressions | Number | HIGH | Total keyword impressions |
| `Clicks` | Clicks | Number | HIGH | Total keyword clicks |
| `Cost` | Spend | Number | HIGH | Total keyword cost |
| `metrics.engagements` | Paid Engagements | Number | MEDIUM | Keyword-level engagements |
| `metrics.interactions` | Interactions | Number | MEDIUM | Total interactions |

### Search Impression Share Metrics

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `metrics.search_impression_share` | Search Impression Share | Number | HIGH | % of possible impressions received |
| `metrics.search_exact_match_impression_share` | (Unmapped) | Number | MEDIUM | Exact match impression share |
| `metrics.search_rank_lost_impression_share` | Search Rank Lost Impression Share | Number | HIGH | Lost impressions due to rank |
| `metrics.search_budget_lost_impression_share` | Search Budget Lost Impression Share | Number | HIGH | Lost impressions due to budget |

### Position Metrics

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `metrics.search_top_impression_share` | Search Keyword Rank | Number | HIGH | % of impressions in top positions |
| `metrics.top_impression_percentage` | (Unmapped) | Number | MEDIUM | % impressions at top of page |
| `metrics.absolute_top_impression_percentage` | (Unmapped) | Number | MEDIUM | % impressions in absolute top position |

---

## 4. Keyword Conversion Data Set

### Keyword Identification
*(Same fields as Keyword Delivery - see above)*

### Quality Metrics
*(Same fields as Keyword Delivery - see above)*

### Conversion Tracking

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `conversion_action` | Conversion Tag Id | Text | HIGH | Conversion action resource name |
| `conversion_action_name` | Conversion Tag Name | Text | HIGH | Conversion action display name |
| `conversion_action_category` | Conversion Tag Category | Text | HIGH | PURCHASE, LEAD, SIGNUP, etc. |

### Conversion Metrics

| Google Ads Field | EMI Field | Type | Priority | Notes |
|-----------------|-----------|------|----------|-------|
| `conversions` | Conversions | Number | HIGH | Total keyword-driven conversions |
| `conversions_value` | Revenue | Number | HIGH | Revenue from keyword conversions |
| `view_through_conversions` | Post Impression Conversions | Number | MEDIUM | View-through conversions |

---

## Field Categories Summary

### By Implementation Status

#### Fully Mapped (HIGH Priority)
- All campaign, ad group, and ad creative identifiers
- Core performance metrics (impressions, clicks, spend)
- Conversion tracking fields
- Keyword identification and match types
- Quality scores (creative quality)
- Impression share metrics
- Segment integration formulas

#### Partially Mapped (MEDIUM Priority)
- Campaign dates (start/end)
- Secondary ad descriptions
- Advertiser information
- Post-click quality scores
- Position metrics (top/absolute top)

#### Unmapped (LOW Priority)
- URL path components (path1, path2)
- Some granular quality score components
- Exact match impression share
- Detailed position percentages

### By Data Type

#### Text Fields (52 fields)
- Identifiers (IDs, names, resource names)
- Status fields (campaign, keyword)
- Creative content (headlines, descriptions, URLs)
- Categories (conversion types, match types)

#### Number Fields (25 fields)
- Performance metrics (impressions, clicks, cost)
- Conversion metrics (conversions, revenue)
- Quality and position metrics
- Impression share percentages

#### DateTime Fields (4 fields)
- `date_id` (primary temporal dimension)
- `campaign.start_date`
- `campaign.end_date`

#### Currency Fields (2 fields)
- `currency` (campaign currency code)

---

## Usage Notes

### Cost Fields
- All cost fields are in **micros** (divide by 1,000,000 for actual currency value)
- Example: `cost_micros = 5000000` equals $5.00 USD

### Quality Scores
- Quality scores range from 1-10
- Components include: expected CTR, ad relevance, landing page experience
- Higher scores generally lead to lower CPCs and better ad positions

### Impression Share
- Expressed as percentages (0-100)
- Combined metrics: search_impression_share + rank_lost + budget_lost may not equal 100% due to other factors

### Match Types
- **EXACT** - Exact keyword match only
- **PHRASE** - Keyword phrase in search query
- **BROAD** - Related variations and synonyms
- Each match type has different performance characteristics

### Conversion Categories
Common categories include:
- `PURCHASE` - E-commerce transactions
- `LEAD` - Lead generation actions
- `SIGNUP` - Account registrations
- `PAGE_VIEW` - Specific page views
- `ADD_TO_CART` - Shopping cart actions
- `DOWNLOAD` - File or app downloads

### Network Types
- `SEARCH` - Google Search and search partners
- `DISPLAY` - Google Display Network
- `YOUTUBE` - YouTube video ads
- `SEARCH_PARTNERS` - Search partner sites
- `MIXED` - Multiple networks

### Formula Fields
These fields are computed by the integration to connect Google Ads data with Salesforce Data Cloud segments, enabling segment performance analysis and optimization.

---

## Integration Best Practices

### Data Freshness
- Media Delivery & Conversion data typically updated daily
- Keyword data may have up to 24-hour latency
- Conversion data can be attributed retroactively (conversion window)

### Performance Optimization
- Focus on HIGH priority fields for dashboards
- Use MEDIUM priority fields for detailed analysis
- LOW priority fields for advanced use cases only

### Segment Analysis
- Use Formula fields to join with Data Cloud segments
- Track segment performance across campaigns
- Optimize targeting based on segment conversion rates

### Quality Score Optimization
- Monitor keyword-level quality scores
- Improve low-scoring keywords (< 5)
- Consider pausing keywords with quality score < 3

### Budget Management
- Track impression share loss metrics
- Budget-limited campaigns: increase budget
- Rank-limited campaigns: improve bids or quality

---

## Related Documentation

- **FIELD_REFERENCE.md** - Detailed field descriptions and examples
- **MISSING_FIELDS_ANALYSIS.md** - Gap analysis and field mapping details
- **DEPLOYMENT.md** - Integration setup and configuration
- **QUICK_START.md** - Getting started guide

---

**Document Version:** 1.0  
**Last Updated:** June 21, 2026  
**Data Source:** Google Ads API via Salesforce Data Cloud
