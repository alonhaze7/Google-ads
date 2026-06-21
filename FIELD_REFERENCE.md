# 📊 Field Reference Guide - Google Ads Dashboard

Quick reference for all available and missing fields based on source data analysis.

## 🔗 Source Information

**Original File:** `/Users/ahaze/Downloads/Data Sets (1).xlsx`  
**Source Platform:** Pinterest Ads (adapted for Google Ads)  
**Total Fields Identified:** 91 fields across 2 data sets

---

## ✅ Implemented Fields (Currently in Dashboard)

### Campaign Metrics
| Field | Type | Source | Current Use |
|-------|------|--------|------------|
| Campaign ID | Text | CAMPAIGN_ID | Unique identifier |
| Campaign Name | Text | CAMPAIGN_NAME | Display name |
| Campaign Status | Text | CAMPAIGN_STATUS | ENABLED/PAUSED |
| Campaign Type | Text | Custom | Search/Display/Video/Shopping/App |
| Impressions | Number | IMPRESSION_1 + IMPRESSION_2 | Total ad views |
| Clicks | Number | CLICKTHROUGH_1 + CLICKTHROUGH_2 | Total clicks |
| CTR | Number | Calculated | Click-through rate (%) |
| Spend | Number | SPEND_IN_MICRO_DOLLAR | Total cost |
| CPC | Number | Calculated | Cost per click |
| Conversions | Number | ConversionTotalConversions | Goal completions |
| CPA | Number | Calculated | Cost per acquisition |
| Revenue | Number | ConversionRevenue | Total revenue |
| ROAS | Number | Calculated | Return on ad spend |
| Date | DateTime | Date | Date dimension |

**Total Implemented:** 14 core fields

---

## ❌ Missing Fields - By Priority

### 🔴 HIGH PRIORITY (Critical for Full Functionality)

#### Account Level
| Field | Source | Why Critical | Impact |
|-------|--------|-------------|---------|
| Advertiser Name | Name | Account identification | Can't distinguish accounts |
| Advertiser ID | AdAccountId | Unique account ID | Multi-account support |
| Currency | Currency | Multi-currency | International campaigns |

#### Ad Group Level (Entire Hierarchy Missing!)
| Field | Source | Why Critical | Impact |
|-------|--------|-------------|---------|
| Ad Group ID | AD_GROUP_ID | Granular tracking | Missing hierarchy level |
| Ad Group Name | AD_GROUP_NAME | Organization | Can't optimize by ad group |
| Ad Group Status | AdGroupEntityStatus | Management | Can't pause ad groups |
| Ad Group Budget | budget_in_micro_currency_Daily | Budget control | No granular budget |

#### Targeting & Segmentation
| Field | Source | Why Critical | Impact |
|-------|--------|-------------|---------|
| Device Type | APPTYPE | Device optimization | Can't see mobile vs desktop |
| Location | LOCATION | Geographic targeting | Can't optimize by region |
| Gender | GENDER | Demographic targeting | Missing audience insights |
| Interest | INTEREST | Audience segments | Can't target interests |
| Targeting Type | MEDIA_BUY_TARGETING_TYPE | Strategy type | Unknown targeting method |

#### Budget & Scheduling
| Field | Source | Why Critical | Impact |
|-------|--------|-------------|---------|
| Daily Budget | budget_in_micro_currency_Daily | Spend control | No budget caps |
| Lifetime Budget | budget_in_micro_currency_lifetime | Total budget | Can't track total |
| Start Date | start_time / StartTime | Timeline | Don't know when started |
| End Date | end_time / EndTime | Duration | Can't track campaign end |

#### Conversion Details
| Field | Source | Why Critical | Impact |
|-------|--------|-------------|---------|
| Conversion Tag Name | TagName | Conversion type | All conversions lumped together |
| Conversion Category | Category | Grouping | Can't separate purchase/signup |
| Post-Click Conversions | ConversionPostClickConversions | Attribution | Don't know click attribution |
| Post-View Conversions | ConversionPostImpressionConversions | Attribution | Missing view-through |
| Post-Click Revenue | ConversionPostClickRevenue | Revenue split | Can't attribute revenue |
| Post-View Revenue | ConversionPostImpressionRevenue | Revenue split | Missing view revenue |

**High Priority Missing:** 22 fields

---

### 🟡 MEDIUM PRIORITY (Important for Optimization)

#### Ad Creative Level
| Field | Source | Why Important | Impact |
|-------|--------|---------------|---------|
| Ad ID | PIN_PROMOTION_ID | Individual ad tracking | Can't track specific ads |
| Ad Name | PIN_PROMOTION_NAME | Ad identification | Don't know ad names |
| Ad Status | PIN_PROMOTION_STATUS | Creative management | Can't pause ads |
| Ad Format | CreativeType | Type tracking | Don't know format |
| Destination URL | destination_url | Landing page | Can't see URLs |
| Creative Image | media.media_type.image | Visual reference | No thumbnails |

#### Strategy & Method
| Field | Source | Why Important | Impact |
|-------|--------|---------------|---------|
| Objective Type | objective_type | Campaign goal | Don't know objective |
| Optimization Goal | optimization_goal_metadata.conversion_event | What's optimized | Unknown optimization |
| Bidding Strategy | (implied) | Bid method | Can't see strategy |

#### Engagement Metrics
| Field | Source | Why Important | Impact |
|-------|--------|---------------|---------|
| Social Impressions | IMPRESSION_2 | Organic reach | Missing viral component |
| Social Post Shares | REPIN_1 + REPIN_2 | Sharing | No social signals |
| Total Engagement | TOTAL_ENGAGEMENT | Interaction | Overall engagement unknown |
| Website Clicks | OUTBOUND_CLICK_1 + OUTBOUND_CLICK_2 | Link clicks | vs all clicks |

#### Quality Indicators (Google Ads Specific)
| Field | Source | Why Important | Impact |
|-------|--------|---------------|---------|
| Quality Score | (not in source) | Ad relevance | Can't improve quality |
| Ad Rank | (calculated) | Position | Don't know rank |
| Search Impression Share | (not in source) | Market share | Missing opportunity data |
| Lost IS (Budget) | (not in source) | Budget limitation | Don't know lost impressions |
| Lost IS (Rank) | (not in source) | Quality limitation | Don't know quality issues |

**Medium Priority Missing:** 20 fields

---

### 🟢 LOW PRIORITY (Nice to Have)

#### Video Metrics (Only for Video Campaigns)
| Field | Source | Why Nice to Have | Impact |
|-------|--------|-----------------|---------|
| Video Views | VIDEO_MRC_VIEWS_1 + VIDEO_MRC_VIEWS_2 | View tracking | Video campaign only |
| Video Views 3s | TOTAL_VIDEO_3SEC_VIEWS | Quick views | Video engagement |
| Video 25% Complete | VIDEO_P25_COMBINED_1 + VIDEO_P25_COMBINED_2 | Completion tracking | Funnel analysis |
| Video 50% Complete | VIDEO_P50_COMBINED_1 + VIDEO_P50_COMBINED_2 | Half views | Engagement level |
| Video 75% Complete | VIDEO_P75_COMBINED_1 + VIDEO_P75_COMBINED_2 | Most of video | Strong interest |
| Video 100% Complete | VIDEO_P100_COMPlETE_1 + VIDEO_P100_COMPlETE_2 | Full views | Completed views |
| Earned Video Views | VIDEO_MRC_VIEWS_2 | Organic views | Viral potential |

#### Additional Creative Details
| Field | Source | Why Nice to Have | Impact |
|-------|--------|-----------------|---------|
| Primary Creative ID | pin_id | Creative reference | Asset tracking |
| Daily Spend Cap | daily_spend_cap | Granular control | Extra safety net |

**Low Priority Missing:** 9 fields

---

## 📊 Coverage Summary

| Priority | Missing | Percentage of Total |
|----------|---------|-------------------|
| **HIGH** | 22 fields | 43% |
| **MEDIUM** | 20 fields | 39% |
| **LOW** | 9 fields | 18% |
| **Total Missing** | **51 fields** | **100%** |

**Current Implementation:** 14 fields (22% of available data)  
**Potential Full Implementation:** 65 fields total

---

## 🎯 Implementation Impact by Field Category

### Account & Hierarchy (Missing: 7 fields)
**Current State:** Single campaign view only  
**With Implementation:** Multi-account, multi-level hierarchy  
**Effort:** Medium (2-3 days)  
**Business Value:** High

### Targeting & Segmentation (Missing: 5 fields)
**Current State:** No targeting insights  
**With Implementation:** Full audience optimization  
**Effort:** Medium (3-4 days)  
**Business Value:** Very High

### Budget & Scheduling (Missing: 5 fields)
**Current State:** No budget tracking  
**With Implementation:** Full budget pacing and alerts  
**Effort:** Low (1-2 days)  
**Business Value:** High

### Conversion Attribution (Missing: 6 fields)
**Current State:** Total conversions only  
**With Implementation:** Multi-touch attribution  
**Effort:** Medium (2-3 days)  
**Business Value:** Very High

### Ad Creative (Missing: 6 fields)
**Current State:** No ad-level data  
**With Implementation:** Creative performance tracking  
**Effort:** Medium (2-3 days)  
**Business Value:** High

### Quality & Competitive (Missing: 5 fields)
**Current State:** No quality metrics  
**With Implementation:** Full quality optimization  
**Effort:** Low (1-2 days, if API available)  
**Business Value:** High

### Video Metrics (Missing: 7 fields)
**Current State:** No video tracking  
**With Implementation:** Full video funnel  
**Effort:** Medium (2-3 days)  
**Business Value:** Medium (video campaigns only)

### Engagement (Missing: 4 fields)
**Current State:** Clicks only  
**With Implementation:** Full engagement tracking  
**Effort:** Low (1 day)  
**Business Value:** Medium

### Strategy (Missing: 3 fields)
**Current State:** Unknown objectives  
**With Implementation:** Strategy-based insights  
**Effort:** Low (1 day)  
**Business Value:** Medium

---

## 🚀 Quick Implementation Guide

### Step 1: Add High Priority Fields (Week 1)
```javascript
// 1. Add account info
const account = {
    name: "Acme Corp",
    id: "123-456-7890",
    currency: "USD"
};

// 2. Add ad groups
const adGroups = [
    { id: "ag-1", name: "High Intent", budget: 500 },
    { id: "ag-2", name: "Brand Terms", budget: 300 }
];

// 3. Add device breakdown
const devices = {
    MOBILE: { impressions: 50000, conversions: 125 },
    DESKTOP: { impressions: 30000, conversions: 90 },
    TABLET: { impressions: 5000, conversions: 10 }
};

// 4. Add budget tracking
const budget = {
    daily: 1000,
    lifetime: 30000,
    spent: 18500,
    startDate: "2026-06-01",
    endDate: "2026-06-30"
};
```

### Step 2: Add Medium Priority Fields (Week 2-3)
```javascript
// 1. Add ad creative level
const ads = [
    { id: "ad-1", name: "Summer Sale", status: "ENABLED", ctr: 4.2 }
];

// 2. Add conversion types
const conversions = {
    PURCHASE: { count: 125, revenue: 18750 },
    SIGNUP: { count: 80, revenue: 0 },
    ADD_TO_CART: { count: 40, revenue: 0 }
};

// 3. Add quality scores
const quality = {
    qualityScore: 7,
    impressionShare: 65.3,
    lostISBudget: 25.2
};
```

### Step 3: Add Low Priority Fields (Week 4+)
Only implement if running video campaigns or need advanced features.

---

## 📋 Field Validation Checklist

Before implementing, verify:

- [ ] Field exists in Google Ads API
- [ ] Field has mock data generator logic
- [ ] Field displays in UI correctly
- [ ] Field has proper formatting (currency, percentage, etc.)
- [ ] Field has appropriate aggregation (sum, average, etc.)
- [ ] Field has relevant insights/alerts
- [ ] Field has filtering/sorting support
- [ ] Field documentation updated

---

## 🔗 External Resources

### Source Files
- **Original Data:** `/Users/ahaze/Downloads/Data Sets (1).xlsx`
- **Dashboard Code:** https://github.com/alonhaze7/Google-ads

### API Documentation
- **Google Ads API:** https://developers.google.com/google-ads/api
- **Reporting Fields:** https://developers.google.com/google-ads/api/fields/v14/overview
- **Performance Metrics:** https://developers.google.com/google-ads/api/docs/reporting/overview

### Field Mappings
- **Campaign Fields:** https://developers.google.com/google-ads/api/fields/v14/campaign
- **Ad Group Fields:** https://developers.google.com/google-ads/api/fields/v14/ad_group
- **Ad Fields:** https://developers.google.com/google-ads/api/fields/v14/ad_group_ad

---

## 📞 Questions or Issues?

- **Missing Field Not Listed?** Open an issue on GitHub
- **Implementation Help?** Check MISSING_FIELDS_ANALYSIS.md
- **API Questions?** See Google Ads API documentation

---

**Document Version:** 1.0  
**Last Updated:** June 21, 2026  
**Maintainer:** Dashboard Development Team
