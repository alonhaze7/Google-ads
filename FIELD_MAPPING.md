# Google Ads Field Mapping Reference

## ⚠️ Implementation Status

This document maps all 77 Google Ads API fields from the source CSV to the current dashboard implementation.

**Current Implementation:** 18 of 77 fields (23%)  
**Source:** `/Users/ahaze/Downloads/Data Sets - Google Ads.csv`

---

## Quick Implementation Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ **Implemented** | 18 | 23% |
| ⚡ **High Priority Missing** | 29 | 38% |
| 🔶 **Medium Priority Missing** | 20 | 26% |
| 🔸 **Low Priority Missing** | 10 | 13% |
| **Total Fields** | **77** | **100%** |

---

## 1. Media Delivery Data Set (39 fields)

### Temporal & Currency Fields

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `date_id` | Date Time | DateTime | ✅ **Implemented** | HIGH | Used for 30-day historical tracking |
| `currency` | Currency | Currency | ✅ **Implemented** | HIGH | Fixed to USD in current version |

### Campaign Hierarchy

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `campaign_id` | Campaign Id | Text | ✅ **Implemented** | HIGH | Unique campaign identifier |
| `campaign_name` | Campaign Name | Text | ✅ **Implemented** | HIGH | Displayed in tables and charts |
| `campaign_status` | Campaign Status | Text | ✅ **Implemented** | HIGH | ENABLED/PAUSED status |
| `campaign.start_date` | Campaign Start Date | DateTime | ✅ **Implemented** | MEDIUM | Generated for each campaign |
| `campaign.end_date` | Campaign End Date | DateTime | ✅ **Implemented** | MEDIUM | Null for active campaigns |
| `campaign_billing_code` | Campaign Billing Method | Text | ❌ **Missing** | LOW | Not implemented |
| `camapgin_category` | Campaign Method | Text | ✅ **Partially** | MEDIUM | Using `campaign_type` instead |
| `budget` | Budgeted Cost Amount | Number | ✅ **Implemented** | HIGH | Daily & lifetime budgets tracked |

### Ad Group (Media Buy) Level

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `ad_group_id` | Media Buy Id | Text | ✅ **Implemented** | HIGH | Generated but not displayed |
| `ad_group_name` | Media Buy Name | Text | ✅ **Implemented** | HIGH | Generated but not displayed |
| `label` | Ad Group | Text | ❌ **Missing** | MEDIUM | No label system implemented |

### Ad Creative Fields

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `ad_id` | Ad Id | Text | ✅ **Implemented** | HIGH | Generated for all ads |
| `ad_name` | Ad Name | Text | ✅ **Implemented** | HIGH | Displayed in ad performance section |
| `type` | Ad Format | Text | ✅ **Implemented** | HIGH | EXPANDED_TEXT_AD, RESPONSIVE_DISPLAY_AD, etc. |
| `headline_part_1_or_headlines` | Ad Headline | Text | ✅ **Implemented** | HIGH | Primary headline shown |
| `headline_part_2` | Ad Headline | Text | ✅ **Implemented** | MEDIUM | Secondary headline generated |
| `description` | Ad Creative Text | Text | ✅ **Implemented** | HIGH | Shown in ad cards |
| `description_2` | Ad Creative Text | Text | ✅ **Implemented** | MEDIUM | Generated but not always displayed |
| `Creative Title Name` | Ad Creative Title Name | Text | ✅ **Implemented** | MEDIUM | Internal creative identifier |
| `display_url` | Ad Creative Url | Text | ❌ **Missing** | MEDIUM | Not displayed |
| `final_urls` | Ad Creative Click Url | Text | ✅ **Implemented** | HIGH | Generated but not displayed |
| `path1` | (Unmapped) | Text | ❌ **Missing** | LOW | URL path component |
| `path2` | (Unmapped) | Text | ❌ **Missing** | LOW | URL path component |

### Network & Placement

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `ad_network_type` | Site Name | Text | ⚡ **HIGH PRIORITY MISSING** | HIGH | Cannot distinguish SEARCH vs DISPLAY vs YOUTUBE |

### Advertiser Information

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `campaign_advertiser_id` | Advertiser Id | Text | ✅ **Implemented** | MEDIUM | Fixed value in current version |
| `campaign_advertiser` | Advertiser Name | Text | ✅ **Implemented** | MEDIUM | Fixed to "Acme Corporation" |

### Performance Metrics

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `impressions` | Impressions | Number | ✅ **Implemented** | HIGH | Core metric - fully tracked |
| `clicks` | Clicks | Number | ✅ **Implemented** | HIGH | Core metric - fully tracked |
| `cost_micros` | Spend | Number | ✅ **Implemented** | HIGH | Already converted from micros |
| `Engagements` | Paid Engagements | Number | ⚡ **HIGH PRIORITY MISSING** | MEDIUM | Video views, app installs tracking |
| `interactions` | Interactions | Number | ⚡ **HIGH PRIORITY MISSING** | MEDIUM | Clicks + engagements combined |

### Segment Integration

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `Formula` (Market Segment ID) | Market Segment ID | Text | ❌ **Missing** | HIGH | Salesforce Data Cloud integration |
| `Formula` (Name) | Name | Text | ❌ **Missing** | HIGH | Segment name tracking |
| `Formula` (Description) | Description | Text | ❌ **Missing** | MEDIUM | Segment description |
| `Formula` (Origin) | Segment Origin Source | Text | ❌ **Missing** | MEDIUM | Source system tracking |

---

## 2. Media Conversion Data Set (38 fields)

**Note:** Media Conversion includes all Media Delivery fields PLUS the following:

### Conversion Tracking

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `conversion_action_name` | Conversion Tag Name | Text | ⚡ **HIGH PRIORITY MISSING** | HIGH | PURCHASE, LEAD, SIGNUP, etc. - **Critical Gap** |
| `conversion_action_category` | Conversion Tag Category | Text | ⚡ **HIGH PRIORITY MISSING** | HIGH | Cannot segment conversions by type |
| `conversions_value` | Revenue | Number | ✅ **Implemented** | HIGH | Tracked as `revenue` |
| `view_through_conversions` | Post Impression Conversions | Number | ⚡ **HIGH PRIORITY MISSING** | HIGH | No post-view attribution |
| `conversions` | Conversions | Number | ✅ **Implemented** | HIGH | Core metric - fully tracked |

**Impact:** Without conversion action fields, all conversions are lumped together. Cannot distinguish between purchases, leads, signups, etc.

---

## 3. Keyword Delivery Data Set (19 fields)

### Keyword Identification

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `ad_group_criterion.criterion_id` | Ad Keyword Id | Text | ✅ **Implemented** | HIGH | Generated for search campaigns |
| `ad_group_criterion.keyword.text` | Name | Text | ✅ **Implemented** | HIGH | Keyword text displayed |
| `ad_group_criterion.keyword.match_type` | Ad Keyword Match Type | Text | ✅ **Implemented** | HIGH | EXACT, PHRASE, BROAD |
| `ad_group_criterion.status` | Ad Keyword Status | Text | ✅ **Implemented** | HIGH | ENABLED/PAUSED |
| `ad_group_criterion.final_urls` | Search URL | Text | ❌ **Missing** | MEDIUM | Keyword-specific landing pages |

### Quality Metrics

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `ad_group_criterion.quality_info.creative_quality_score` | Quality Score | Text | ⚡ **HIGH PRIORITY MISSING** | HIGH | Creative component of QS |
| `ad_group_criterion.quality_info.post_click_quality_score` | (Unmapped) | Text | ⚡ **HIGH PRIORITY MISSING** | HIGH | Landing page component of QS |
| `ad_group_criterion.quality_info.quality_score` | (Unmapped) | Number | ✅ **Implemented** | HIGH | Overall quality score (1-10) |

### Performance Metrics

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `Impressions` | Impressions | Number | ✅ **Implemented** | HIGH | Keyword-level impressions |
| `Clicks` | Clicks | Number | ✅ **Implemented** | HIGH | Keyword-level clicks |
| `Cost` | Spend | Number | ✅ **Implemented** | HIGH | Keyword-level spend |

### Impression Share Metrics

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `metrics.search_impression_share` | Search Impression Share | Number | ⚡ **HIGH PRIORITY MISSING** | HIGH | % of possible impressions - **Critical for competitive analysis** |
| `metrics.search_exact_match_impression_share` | (Unmapped) | Number | ❌ **Missing** | MEDIUM | Exact match impression share |
| `metrics.search_rank_lost_impression_share` | Search Rank Lost Impression Share | Number | ⚡ **HIGH PRIORITY MISSING** | HIGH | Lost due to low ad rank |
| `metrics.search_budget_lost_impression_share` | Search Budget Lost Impression Share | Number | ⚡ **HIGH PRIORITY MISSING** | HIGH | Lost due to insufficient budget |
| `metrics.top_impression_percentage` | (Unmapped) | Number | ❌ **Missing** | MEDIUM | % shown in top positions |
| `metrics.absolute_top_impression_percentage` | (Unmapped) | Number | ❌ **Missing** | MEDIUM | % shown in #1 position |
| `metrics.search_top_impression_share` | Search Keyword Rank | Number | ❌ **Missing** | MEDIUM | Top position impression share |

### Engagement Metrics

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `metrics.engagements` | Paid Engagements | Number | ❌ **Missing** | MEDIUM | Keyword-level engagements |
| `metrics.interactions` | Interactions | Number | ❌ **Missing** | MEDIUM | Keyword-level interactions |

---

## 4. Keyword Conversion Data Set (13 fields)

**Note:** Keyword Conversion includes all Keyword Delivery fields PLUS:

### Conversion Tracking

| Field | EMI Mapping | Type | Status | Priority | Notes |
|-------|-------------|------|--------|----------|-------|
| `conversion_action` | Conversion Tag Id | Text | ❌ **Missing** | HIGH | Conversion action identifier |
| `conversion_action_name` | Conversion Tag Name | Text | ⚡ **HIGH PRIORITY MISSING** | HIGH | Cannot track conversions by keyword |
| `conversion_action_category` | Conversion Tag Category | Text | ⚡ **HIGH PRIORITY MISSING** | HIGH | No conversion segmentation |
| `conversions_value` | Revenue | Number | ❌ **Missing** | HIGH | Keyword-level revenue not tracked |
| `view_through_conversions` | Post Impression Conversions | Number | ❌ **Missing** | HIGH | No keyword view-through tracking |
| `conversions` | Conversions | Number | ✅ **Implemented** | HIGH | Keyword-level conversions tracked |

---

## Critical Gaps Summary

### 🚨 **Top 10 Missing Fields (Highest Impact)**

1. **`ad_network_type`** - Cannot distinguish Search vs Display vs YouTube
2. **`conversion_action_name`** - All conversions lumped together (CRITICAL)
3. **`conversion_action_category`** - Cannot segment by conversion type
4. **`view_through_conversions`** - Missing post-view attribution
5. **`metrics.search_impression_share`** - No competitive positioning data
6. **`metrics.search_rank_lost_impression_share`** - Don't know why impressions lost
7. **`metrics.search_budget_lost_impression_share`** - Can't identify budget constraints
8. **`Engagements`** - Missing video/app engagement tracking
9. **`interactions`** - Incomplete engagement picture
10. **`quality_info.creative_quality_score`** - Missing QS components

### **Business Impact**

| Missing Feature | Business Impact |
|----------------|-----------------|
| **Network Type** | Cannot optimize by channel (Search vs Display) |
| **Conversion Actions** | Cannot distinguish $1000 purchases from $0 signups |
| **View-Through Conversions** | Undervaluing display campaign impact |
| **Impression Share** | Cannot assess competitive position or growth opportunity |
| **Lost Impression Share** | Don't know if budget or quality is the constraint |
| **Engagements** | Missing video view and app install metrics |
| **Quality Score Components** | Cannot diagnose which part of QS to improve |
| **Segment Integration** | No Salesforce Data Cloud segment tracking |

---

## What's Working Well

### ✅ **Fully Functional Features**

1. **Campaign-Level Tracking** - Complete performance by campaign
2. **Ad-Level Analysis** - Top performing ads identified
3. **Keyword Performance** - Quality scores, match types, conversions
4. **30-Day Historical Data** - Daily trends and patterns
5. **Device/Location/Time Analysis** - Aggregated insights (simulated)
6. **Budget Tracking** - Daily and lifetime budgets with pacing
7. **ROAS Calculation** - Revenue / Spend properly calculated
8. **Intelligent Insights** - 10 AI-powered recommendations

---

## Implementation Roadmap

### Phase 1: Critical Missing Fields (1-2 weeks)
- [ ] Add `ad_network_type` - Network filtering
- [ ] Implement `conversion_action_name` & `category` - Conversion segmentation
- [ ] Add `view_through_conversions` - Post-view attribution
- [ ] Implement impression share metrics (3 fields)
- [ ] Add `Engagements` & `interactions`

### Phase 2: Quality & Competitive (1 week)
- [ ] Add quality score components (creative, post-click)
- [ ] Implement top/absolute top impression percentages
- [ ] Add exact match impression share
- [ ] Keyword-level revenue tracking

### Phase 3: Integration & Polish (1 week)
- [ ] Salesforce Data Cloud segment integration (4 fields)
- [ ] URL path components (path1, path2)
- [ ] Labels and organization tags
- [ ] Billing code tracking

---

## How to Use This Document

**For Developers:**
- Check "Status" column to see what's implemented
- "Priority" indicates importance for next implementation
- "Notes" provide context and current limitations

**For Product Managers:**
- Review "Critical Gaps Summary" for business impact
- Use "Implementation Roadmap" for sprint planning
- Reference "What's Working Well" for current capabilities

**For Data Analysts:**
- Understand data availability before building reports
- Know limitations when interpreting results
- Plan for future enhancements

---

## Source Reference

**Original CSV:** `/Users/ahaze/Downloads/Data Sets - Google Ads.csv`  
**Total Fields in CSV:** 77 fields across 4 data sets  
**Currently Implemented:** 18 fields (23%)  

---

**Last Updated:** June 21, 2026  
**Dashboard Version:** 1.0  
**Next Review:** After Phase 1 implementation
