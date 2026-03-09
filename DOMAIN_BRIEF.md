# Domain Knowledge Brief — Onsite Wastewater System Design & Permitting (Arkansas)

## Sub-Domain Classification

Small to mid-size Licensed Designated Representative (DR) firm operating in Arkansas, providing full-service onsite wastewater system (OWS) solutions: site evaluation, soil/perc testing, system design, EHP-19 permit submission to ADH, installation oversight, and inspection. Serves residential (new construction, replacement systems) and light commercial clients across Northwest Arkansas (Benton, Washington counties) and surrounding counties. Comparable to PercPro LLC — a founding-era DR/installer combo firm with 5-15 staff.

---

## Job Analyst Vocabulary — Confirmed and Extended

The client uses specific Arkansas ADH regulatory terminology throughout. The vocabulary below has been validated against state rules, ADH forms, and industry sources.

### Confirmed Primary Entity Names

- **Primary record type**: "Job" or "Site" — each project is a site with one address and parcel
- **Permit document**: "Permit" — specifically the EHP-19 or EHP-19N (new construction vs. new system type)
- **Permit issuer**: "ADH" (Arkansas Department of Health) — specifically the county Environmental Health unit
- **Field professional**: "DR" (Designated Representative) — the licensed person who conducts site evaluation, writes perc test results, and submits the permit application
- **Secondary professional**: "Installer" — the licensed person who physically installs the system
- **Secondary entities**: "Field Lines", "Trenches", "D-Box" (distribution box), "Dose Tank", "Septic Tank", "ATU" (Alternative Treatment Unit), "Absorption Area"
- **Site assessment doc**: "Shot Sheet" — the elevation/grade reading document produced from laser level survey
- **Soil test doc**: "Perc Test" or "Soil Profile" — the percolation test and soil horizon evaluation
- **Primary site plan**: "Site Plan" or "System Drawing" — the scaled drawing submitted with EHP-19
- **Property record lookup**: "Parcel" — referenced by parcel number from actdatascout.com or arcountydata.com

### Expanded KPI Vocabulary

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Active Permits | Count of permits currently in ADH review or approved awaiting install | Count |
| Pending Submissions | Permits designed but not yet submitted to ADH | Count |
| Avg Review Time | Average calendar days from EHP-19 submission to ADH approval | Days |
| Jobs Completed (Month) | Site evaluations + installs completed in current month | Count |
| Permit Approval Rate | % of submitted permits approved without revision request | % |
| Revision Rate | % of permits returned by ADH requiring correction/resubmission | % |
| Perc Tests Scheduled | Upcoming perc/soil evaluations on the calendar | Count |
| Sites Failing Perc | Sites where soil conditions required ATU or system denial | Count |
| Revenue (Month) | Total billable revenue for design, install, perc testing | $ |
| Outstanding Invoices | Unbilled or unpaid jobs | $ |
| Field Crew Utilization | % of available DR/technician time scheduled vs. idle | % |

### Status Label Vocabulary

**Active/In-Progress states:**
- "Site Evaluation Scheduled"
- "Perc Test Complete — Awaiting Design"
- "Design In Progress"
- "Permit Submitted"
- "Under ADH Review"
- "Approved — Awaiting Install"
- "Installation In Progress"
- "Inspection Scheduled"

**Problem states:**
- "Revision Requested" (ADH sent back form for correction)
- "Site Failing" (soil conditions not suitable for standard system)
- "On Hold" (client-requested delay)
- "Permit Expired" (1-year permit validity lapsed)

**Terminal states:**
- "Permit Issued" (ADH approved, Part 1 of permit)
- "Operation Permit Issued" (post-install inspection passed, Part 2)
- "Denied" (site truly unsuitable)
- "Cancelled" (client withdrew)

### Workflow and Action Vocabulary

**Primary actions:**
- "Schedule Perc Test" — book DR to site for soil evaluation
- "Submit Permit" — send EHP-19/EHP-19N to local ADH county health unit
- "Request Revision" (ADH action on the firm's permit)
- "Approve" (ADH action)
- "Issue Operation Permit" (ADH post-install sign-off)
- "Log Shot Sheet" — record laser level elevation readings
- "Size System" — calculate field line area and tank size from perc rate + bedroom count

**Secondary actions:**
- "Assign DR" — assign a DR to a new site evaluation
- "Upload Docs" — attach GPS site plan, shot sheet, soil profile to permit record
- "Flag Site" — mark a site with unusual conditions (high water table, rock, steep slope)
- "Request Retest" — schedule second perc test if results inconclusive
- "Resubmit" — send corrected EHP-19 after revision request

### Sidebar Navigation Candidates

- **Job Board** (not "Orders" or "Projects" — this is what the firm's ops team calls the active list)
- **Permit Tracker** (not "Applications" — tracks EHP-19 submissions by ADH status)
- **Site Calendar** (not "Scheduling" — perc tests and installations on a calendar)
- **Perc Tests** (not "Testing" — the specific field service type)
- **Field Crews** (not "Employees" or "Staff" — reflects the DR + installer crew structure)
- **Site Library** (not "Documents" — stores shot sheets, site plans, soil profiles per site)
- **Clients** (acceptable in this domain — property owners and builders)
- **Reports** (acceptable — ADH compliance and revenue reporting)

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

This is a field-service/permitting business, not a consumer product. The practitioners — DRs, installers, office managers — use a mix of paper forms, email, spreadsheets, and basic field-service software. The current software ecosystem is fragmented: Jobber for scheduling/invoicing, Uinta (Juniper Systems) for GPS mapping, Google Sheets for tracking permit status. What a PercPro-type firm wants is a single "command center" that replaces the spreadsheet-and-email shuffle.

The visual reference class for this domain is: **field-service operations dashboards** — think ServiceTitan, Jobber's desktop web app, or a simplified version of Procore's job list. These are characterized by: status-badge-heavy list views, sidebar navigation, a prominent active-jobs overview, and a calendar. Density is standard to compact. Color is used functionally to distinguish permit statuses (green = approved, amber = under review, red = revision/problem). Typography is utilitarian — this is not a brand-forward product.

The firm owner (a soil scientist with a professional soil classifier license) values technical credibility signals. A demo that shows the actual EHP-19 form fields, uses "ADH" not "Health Department", shows "loading rate" not "absorption rate", and references "Benton County" or "NWA" will read as built-by-someone-who-knows. Conversely, a generic field service dashboard with "Work Orders" and "Customers" will read as a template.

### Real-World Apps Clients Would Recognize as "Premium"

1. **Jobber** — The most widely used FSM software for small field service businesses. Visual convention: clean white sidebar, status badges on jobs, calendar view, mobile-friendly. DRs and installers use this for scheduling and invoicing. The PercPro demo should feel like an industry-specialized version of Jobber — but with septic/permitting-specific columns and ADH status tracking that Jobber doesn't have.

2. **Septic Edge** — A niche design tool for septic system designers. Allows field-based rapid design with automatic tank/trench sizing calculations from soil data. Less polished visually but extremely credible as a reference because only people in the industry know it exists. If the demo references Septic Edge-style calculation views, domain experts will notice.

3. **ServiceTitan** — The premium tier of field-service software. Dense, data-rich, status-heavy. Used by larger contractors. Signals "serious business." The visual language — status pipelines, job cards with crew assignments, revenue dashboards — is the aesthetic target for an ambitious PercPro platform.

### Aesthetic Validation

- **Job Analyst chose**: (awaiting brief — defaulting to domain-informed recommendation)
- **Domain validation**: This domain calls for **Corporate Enterprise** or **SaaS Modern** aesthetic — not dark, not editorial, not warm/organic. The work is technical/regulatory and the software must project professionalism to a clients who deals with ADH permitting, licensed DRs, and state regulations. Light theme is strongly preferred. Clean whites with a subtle teal or forest-green primary (connecting to the environmental/land domain) works well. Avoid consumer-app warmth (this is a business ops tool) and avoid dark premium (this is not a tech startup).
- **Recommended primary color**: Teal-green (e.g., oklch(0.54 0.14 185)) — grounds the app in environmental/land work without being clinical blue. Or a muted blue-slate (oklch(0.48 0.11 235)) for more conservative regulatory-office feel.
- **Density adjustment**: Standard density. This is a dashboard app used at a desk — compact enough to show a list of 10-15 jobs at once, but not so dense as to feel like a trading terminal.

### Format Validation

- **Recommended format**: `dashboard-app` — This is unambiguously an internal operations tool for a field-service business. Sidebar navigation, job list as main view, feature pages for permits/scheduling/crew management.
- **Domain validation**: Confirmed. Not a consumer mobile app. Not a landing page. The client needs to see a working dashboard that looks like what they'd actually use day-to-day.
- **Format-specific design notes**: The main dashboard should lead with: active jobs by status (pipeline/kanban or table), today's scheduled perc tests, and permit status summary (count pending/approved/under review). The system should feel like a dispatch board + permit tracker hybrid.

### Density and Layout Expectations

**Standard density** — not a trading terminal, not a wellness app. This is a field service ops tool.

**List-heavy views predominate**: The core of the app is job lists, permit queues, and scheduling tables. Think: columns for Job ID, Client, Address, County, Status, Assigned DR, Next Step. Card-based views appear on the detail pages (per-job view showing all attached documents, shot sheet data, and permit history).

**Color-coded status badges are expected** by practitioners — this is how Jobber and ServiceTitan signal job state and it's become the visual grammar of field service dashboards.

---

## Entity Names (10+ realistic names)

### Companies / Organizations (Client firms and related entities)

1. Ozark Ridge Development LLC
2. Beaver Lake Properties Inc.
3. Bentonville Custom Homes
4. Razorback Land & Excavation
5. Three Forks Construction
6. Carroll County Builders Association
7. Staghorn Properties LLC
8. Pinnacle Ridge Excavating
9. White River Homes
10. Ozarks Rural Electric Cooperative
11. NWA Land Development Group
12. Baxter County Home Builders

### People Names (DR/Installer/office staff — demographically appropriate for rural Arkansas)

- **DRs / Project Leads**: Bodie Hawkins, Travis Willard, Caleb Norwood, Jesse Renfroe, Amber Tilley
- **Installers / Field Crew**: Dale Pruitt, Ronnie Sims, Wade Cantrell, Marcus Blevins
- **Office / Admin**: Sherry Patton, Lindsey Croft

### Products / Services / SKUs (system types and components)

1. Conventional Gravity — Standard (3BR / 1000 gal / trenches)
2. Conventional Gravity — Large (4BR / 1250 gal / trenches)
3. ATU — SludgeHammer S-400 (up to 400 GPD)
4. ATU — SludgeHammer S-600 (up to 600 GPD)
5. ATU — SludgeHammer S-800 (up to 800 GPD)
6. ATU — Infiltrator Ecopod (Delta Treatment Systems)
7. Pumped System — LPP (Low Pressure Pipe) with Zoeller 151
8. Mound System (limited use, high water table sites)
9. Perc Test & Soil Profile (standalone service)
10. Shot Sheet / Site Survey
11. EHP-19 Permit Preparation & Submission
12. EHP-19N New System Application
13. Private Inspection (property transfer)
14. Subdivision Plat Review (multiple lots, bulk permit prep)
15. RV Park System Design

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Perc rate (min/inch) | 1 | 12–25 | 60+ | >60 = failing; suitable range is 1–60 for conventional |
| Loading rate (GPD/ft²) | 0.2 | 0.4–0.6 | 0.8 | Faster perc = higher rate; from Arkansas Appendix A table |
| Absorption area (sq ft) | 420 | 600–900 | 1,800+ | Depends on perc rate + bedroom count |
| Tank size (gallons) | 1,000 | 1,000–1,250 | 2,000+ | AR minimum: 1000 gal (1-3 BR); 1250 (4 BR); ATU needs larger |
| Dose tank size (gallons) | 300 | 300–500 | 750 | Used with pumped/LPP systems |
| Field line trench length (ft) | 60 | 100–200 | 300 | Single trench max 100 ft per AR rules; multiple trenches typical |
| Trench width (inches) | 12 | 24–36 | 36 | Standard trench width per AR regulations |
| Trench depth (inches) | 18 | 24–36 | 48 | Below inlet invert |
| Trench spacing (ft) | 6 (edge-to-edge) | 8–10 | 12 | 6 ft min between trenches, 8 ft center-to-center |
| Daily flow calc (1st BR) | 150 GPD | 150 GPD | 150 GPD | Fixed per AR rules |
| Daily flow (each add'l BR) | 100 GPD | 100 GPD | 100 GPD | Fixed per AR rules |
| Total daily flow (3BR) | 350 GPD | 350 GPD | 350 GPD | 150 + 100 + 100 |
| Total daily flow (4BR) | 450 GPD | 450 GPD | 450 GPD | 150 + 100 + 100 + 100 |
| Permit fee (plan review) | $50 | $50–$150 | $500 | 1% of estimated cost; min $50, max $500 |
| Permit review time (ADH) | 5 days | 10–15 business days | 30+ days | Busy periods or revisions cause delays |
| Total project cost (conventional) | $3,500 | $5,000–$9,000 | $15,000 | Varies by soil, access, system type |
| Total project cost (ATU) | $10,000 | $12,000–$16,000 | $22,000 | ATU + larger absorption area |
| Perc test fee (standalone) | $350 | $450–$650 | $900 | Includes DR time and report |
| Design/permit prep fee | $400 | $500–$850 | $1,500 | Varies by complexity |
| Setback — property line | 10 ft | 10 ft | — | Minimum per AR rules |
| Setback — water well | 100 ft | 100 ft | — | Minimum per AR rules |
| Setback — lake/stream | 100 ft | 100 ft | — | Minimum per AR rules |
| Setback — dwelling | 10 ft | 10 ft | — | Minimum per AR rules |

---

## Industry Terminology Glossary (20+ terms)

| Term | Definition | Usage Context |
|------|-----------|---------------|
| ADH | Arkansas Department of Health | The permitting authority; all permits submitted here |
| DR | Designated Representative | Licensed professional who conducts site eval and signs permit app |
| EHP-19 | ADH permit application form for individual onsite wastewater systems | Standard form for all residential systems |
| EHP-19N | New version of permit form (current as of 2025) | Replaced older EHP-19; uses updated fields |
| EHP-6 | Installation specification document | Submitted by installer upon system completion |
| Perc Test | Percolation test — measures rate of water absorption into soil | Determines field size and system type |
| Soil Profile | Evaluation of soil horizons, texture, and seasonal water table | Conducted simultaneously with perc test |
| Loading Rate | Gallons of effluent per square foot per day the soil can accept | From Appendix A of AR rules; drives field sizing |
| Absorption Area | Total square footage of trench bottom required for system | Calculated as Daily Flow ÷ Loading Rate |
| Shot Sheet | Field elevation survey document; records benchmark, rod readings, flow lines | DR produces this on-site with laser level |
| Benchmark (BM) | Stable physical reference point for elevation measurements | Set at dwelling corner or established marker |
| Flow Line (FL) | Top of pipe elevation + 4 inches; used for gravity calculations | Critical for ensuring gravity flow to field |
| Field Lines | The perforated pipes in the absorption trenches | Lay-term for drainfield pipes; used by installers |
| D-Box | Distribution box — distributes effluent evenly to multiple field lines | Essential component in multi-line systems |
| ATU | Alternative Treatment Unit — advanced treatment (aerobic) system | Used when conventional fails or soil is marginal |
| SludgeHammer | Brand of ATU certified in Arkansas (S-400, S-600, S-800, S-1000 models) | Installed in inlet chamber of oversized tank |
| LPP | Low Pressure Pipe — pumped system distributing effluent under pressure | Used when gravity flow is insufficient |
| Mound System | Drainfield built above grade in imported fill | Used at high water table sites |
| Zoeller 150 | Model line of submersible effluent pumps used in dose/pump tanks | Common brand referenced by installers |
| Dose Tank | Secondary holding tank from which pump doses effluent to field | Used with pumped LPP and ATU systems |
| Manifold | Distribution header pipe connecting D-box to multiple field lines | Used in larger systems |
| On-Contour | Field lines installed following the land's contour lines | Required placement for level distribution |
| Seasonal High Water Table (SHWT) | Highest elevation of saturated soil during wet season | Must maintain 4 ft separation from trench bottom |
| Mottling | Soil discoloration indicating periodic saturation | Used to identify SHWT depth in soil profile |
| Act 402 | Arkansas law (A.C.A. 14-236-101) authorizing ADH to regulate installers/DRs | Foundational licensing law |
| Parcel Number | County assessor's unique property identifier | From actdatascout.com / arcountydata.com |
| GPS Coordinates | Lat/lng of system components for site plan | Collected with Geode receiver or Uinta app |
| Plan Review Number | ADH-assigned tracking number on EHP-19 | Appears on permit top right; used for tracking |
| Permit for Construction | Part 1 of the permit — authorizes installation to begin | Issued after ADH review and approval |
| Operation Permit | Part 2 — issued after inspector verifies installation | Required to legally operate the system |
| Revision Request | ADH returns permit with required corrections | Most common delay; triggers resubmit workflow |
| NSF/ANSI 40 | Certification standard for residential aerobic treatment units | SludgeHammer and Ecopod are certified |

---

## Common Workflows

### Workflow 1: New Residential Permit (Conventional System)

1. **Client intake** — Property owner or builder contacts firm; collect address, parcel number, bedroom count, and lot description
2. **Parcel lookup** — Look up property on actdatascout.com / arcountydata.com for lot dimensions, zoning, existing utilities
3. **Site visit scheduling** — Assign DR; schedule perc test (typically 2-3 days out for test hole preparation)
4. **Field work — Day 1 (hole prep)** — DR digs test holes per ADH spec (6" x 6" min, pre-soak 24 hrs)
5. **Field work — Day 2 (perc test)** — DR conducts timed water drop test; records min/inch results; simultaneously evaluates soil profile (horizon depths, texture, mottling); records benchmark and shot sheet elevations
6. **System sizing** — Back in office, DR calculates: Daily Flow (bedrooms × flow rate), Loading Rate (from Appendix A based on perc result), Absorption Area (flow ÷ loading rate), tank size, trench count and length
7. **Site plan drawing** — Scaled drawing showing property lines, dwelling, septic tank location, D-box, field lines on-contour, setback measurements, GPS coordinates; exported as 11x17 PDF
8. **EHP-19/EHP-19N form completion** — Fill in all fields: owner info, parcel, GPS coords, perc results, soil data, system specs (tank size, dose tank, absorption area, field line count/length, trench dimensions, loading rate)
9. **Permit submission** — Submit to ADH county health unit (local Environmental Health Specialist); pay plan review fee
10. **ADH review** — Typically 10-15 business days; status: "Under ADH Review"
11. **Approval or Revision** — If approved, DR receives Permit for Construction; if revision requested, correct and resubmit
12. **Installation** — Licensed installer excavates and installs per approved design; DR may oversee
13. **Post-installation inspection** — ADH inspector verifies installation matches approved design
14. **Operation Permit issued** — System legally operational

### Workflow 2: ATU (Alternative Treatment Unit) System — Failing Site

1. **Standard site evaluation** — Perc test returns >60 min/inch (failing) or soil profile shows SHWT too shallow
2. **DR documents failure** — Records in soil profile: mottling depth, restrictive horizon, actual perc rate
3. **ATU recommendation** — DR evaluates which ATU fits site: SludgeHammer S-400 for 1-3 BR, S-600 for 4-5 BR; Infiltrator Ecopod as alternative
4. **Alternate system design** — ATU installed in larger tank (1500-2000 gal); reduced absorption area (ATU effluent has higher quality, lower loading rate allowed); may still require pumped LPP delivery to field
5. **EHP-19N submission** — ATU systems require the newer EHP-19N form and additional documentation (ATU specs, NSF/ANSI 40 certification docs)
6. **Permit approved** — ATU systems sometimes require variance or special condition
7. **ATU installation and commissioning** — Zoeller pump installed; float switches set; SludgeHammer blower unit wired
8. **Annual service contract** — ATU systems require annual maintenance inspection; DR or service tech performs

### Workflow 3: Property Transfer Inspection

1. **Request received** — Real estate agent or property owner requests inspection before sale
2. **Records search** — Look up existing permit via ADH or county records; verify system age, design specs, tank size
3. **Field inspection** — Locate tank, pump-out access lids; inspect condition; check for signs of failure (surfacing effluent, backup)
4. **Report generation** — Written report documenting system condition, age, apparent compliance with original permit
5. **Recommendations** — If issues found, recommend repair, pump-out, or full replacement
6. **Transfer documentation** — Submit "Request for Permit Transfer" to ADH if ownership changing

---

## Common Edge Cases

1. **Failing perc test** — Site returns >60 min/inch; conventional system not possible; triggers ATU design path or site denial. Common in areas with heavy clay (Cecil or Leadvale series soils in the Ozarks)
2. **Revision request from ADH** — EHP-19 returned with notes from Environmental Specialist: "Loading rate does not match perc test result," "Setback from well not documented," "Site plan scale missing." Requires correction and resubmission — adds 1-3 weeks
3. **Permit expired** — Client delays start of construction; 1-year permit validity lapses. Must revalidate with ADH. If site conditions changed, may need new perc test
4. **High seasonal water table** — Soil profile shows mottling within 4 ft of proposed trench bottom; system cannot be placed at standard depth; requires mound system or ATU with reduced absorption
5. **Rocky site / shallow bedrock** — Trench excavation hits rock; depth cannot be achieved; system requires redesign or variance
6. **Steep slope (>12%)** — Lot slope exceeds absorption field placement rules; on-contour placement cannot achieve gravity flow; requires pumped system
7. **Missing GPS coordinates** — Site plan submitted without coordinates; ADH returns for revision; common when GPS device battery died in field or signal lost
8. **Subdivision plat review** — Developer submits 10-20 lots at once; some lots fail perc, some pass; DR must evaluate each individually; some lots may be deemed unbuildable for wastewater
9. **ATU service non-compliance** — ATU system has no current maintenance contract; system flagged during permit transfer inspection
10. **Property near water body** — Lot within 100 ft of lake or stream; setback rules prevent standard placement; may require variance or site redesign

---

## What Would Impress a Domain Expert

1. **Using "DR" not "designer" or "engineer"** — In Arkansas, the specific licensed credential is "Designated Representative." An engineer can be a DR but not all DRs are engineers. The term "engineer" is actually wrong for most residential DR work in Arkansas and would signal unfamiliarity.

2. **Showing both EHP-19 and EHP-19N** — The newer EHP-19N form (revised May 2025) is distinct from the original EHP-19 and is used for different system types. A demo that tracks which form was submitted (and references the "Plan Review Number" in the top right corner) shows granular knowledge of ADH paperwork.

3. **Loading rate table reference (Appendix A)** — The loading rate is not a round number — it comes from a specific table in the Arkansas rules where perc rate ranges map to allowed GPD/ft² values. A demo that shows "Perc rate: 18 min/in → Loading rate: 0.45 GPD/ft²" instead of just "0.5" signals real knowledge.

4. **Shot sheet elevation workflow** — The concept of a benchmark, rod readings, instrument height (H.I.), and flow line calculations is specific enough to Arkansas DR fieldwork that including it in the app (even as a data entry section) would be immediately recognized by any DR as authentic.

5. **Seasonal timing awareness** — Perc tests in Arkansas cannot be conducted in frozen ground. The busiest season is spring (March–June, new construction) and fall (September–November, pre-winter). Knowing that a dashboard showing "Perc Tests Scheduled" for January would be sparse in a real Arkansas DR firm shows operational knowledge.

---

## Common Systems & Tools Used

| Tool | Category | How Used |
|------|----------|----------|
| Uinta (Juniper Systems) | GPS mapping / field data collection | GPS coordinates for site plans; offline map capture |
| Jobber | Field service management (FSM) | Scheduling, dispatching, invoicing, customer records |
| Septic Edge | Septic system design software | Rapid field-based system sizing and site plan generation |
| actdatascout.com | County property records | Parcel number lookup, property dimensions, ownership |
| arcountydata.com | County property records (alternative) | Same as above; preferred in some AR counties |
| Benton County GIS | County parcel mapping | Parcel overlays for site plans |
| Google Sheets / Excel | Internal tracking | Permit status tracking, revenue, job queues |
| ADH Online Portal | Permit submission | Submit EHP-19 forms to Arkansas Dept of Health |
| Zoom / DocuSign | Client communication | Remote form signatures for property owners |
| QuickBooks | Accounting | Invoicing and payment tracking |

---

## Geographic / Cultural Considerations

- **Primary service area**: Northwest Arkansas — Benton County (Bentonville, Rogers, Fayetteville surroundings), Washington County (Fayetteville, Springdale), Carroll County, and broader NWA
- **Other active AR counties**: Baxter (Mountain Home area), Faulkner (Conway area), Pulaski (Little Rock suburbs), Sebastian (Fort Smith)
- **Parcel number format (Arkansas)**: Varies by county; typically format is `XXX-XXXXX-XXX` (e.g., Benton County: `01-03420-000`); accessed via actdatascout.com
- **Address format**: Mix of rural route addresses and 911-assigned addresses; rural addresses common (e.g., "4710 S Hiwasse Rd, Garfield AR 72732")
- **Time zone**: Central Time (CST/CDT)
- **Seasonal patterns**:
  - Spring (March–June): Peak season — new home construction starts, DR firms are busiest, permit backlog at ADH highest
  - Summer (July–August): Continued activity, heat slows field work
  - Fall (September–November): Second busy period, property transfers before year-end
  - Winter (December–February): Slowest; frozen ground prevents perc tests; permit prep and admin work only
- **Currency**: USD
- **Units**: Imperial throughout (feet, inches, gallons per day)
- **Key regulatory reference**: Arkansas State Board of Health Rules Pertaining to Onsite Wastewater Systems (current version 2014 + amendments); Act 402 of 1977 (A.C.A. § 14-236-101 et seq.)
- **County health unit contacts**: Each county has an ADH Environmental Health Specialist who reviews permits; relationships with these specialists matter operationally

---

## Data Architect Notes

**Entity structure for mock data:**

1. **`jobs`** (primary dataset, 15-20 records): Each job = one site/permit application. Fields: `jobId`, `clientName`, `clientType` (homeowner/builder/developer), `address`, `county`, `parcelNumber`, `bedroomCount`, `systemType` (conventional/ATU/LPP), `status` (use exact status strings above), `assignedDR`, `submittedDate`, `approvedDate`, `permitNumber` (ADH plan review number format: "PR-2024-XXXX"), `percRate` (min/inch), `loadingRate` (GPD/ft²), `absorptionArea` (sq ft), `tankSize` (gallons), `doseSize` (gallons or null), `estimatedCost` ($), `invoiceStatus` (Billed/Unpaid/Paid)

2. **`percTests`** (12-18 records): Each perc test = a field visit. Fields: `testId`, `jobId` (FK), `testDate`, `dr` (name), `holeCount` (3-6), `avgPercRate` (min/inch), `soilProfile` (Loam/Sandy Loam/Clay Loam/Heavy Clay), `shwtDepth` (inches), `passFailStatus` (Pass/Marginal/Fail), `notes`

3. **`permits`** (15-20 records): Mirrors jobs but focus on ADH interaction. Fields: `permitId`, `jobId` (FK), `formType` (EHP-19/EHP-19N), `submittedDate`, `adh_status` (Submitted/Under Review/Revision Requested/Approved/Denied), `revisionCount` (0-3), `approvalDate`, `expiryDate` (1 year from approval), `planReviewNumber`, `constructionPermitNumber`, `operationPermitNumber`

4. **`crew`** (6-8 records): Staff. Fields: `crewId`, `name`, `role` (DR/Installer/Office Manager), `license` (DR-XXXX or Installer-XXXX), `activeJobs` (count), `scheduledDays`

5. **`calendar`** (10-15 events): Upcoming field visits. Fields: `eventId`, `jobId` (FK), `eventType` (Perc Test/Installation/Inspection/Retest), `date`, `drAssigned`, `status` (Scheduled/Completed/Cancelled)

**Status labels to use verbatim** (not generic Active/Inactive):
- "Site Evaluation Scheduled", "Perc Test Complete — Awaiting Design", "Design In Progress", "Permit Submitted", "Under ADH Review", "Revision Requested", "Approved — Awaiting Install", "Installation In Progress", "Inspection Scheduled", "Permit Issued", "Operation Permit Issued", "Denied", "Cancelled", "On Hold", "Permit Expired"

**Edge cases to include as specific records**:
- 1 job with status "Revision Requested" and revisionCount = 2
- 1 job with status "Permit Expired" (approvalDate > 12 months ago, no install started)
- 1 job with percRate = 72 (failing) and systemType = "ATU — SludgeHammer S-600"
- 1 job in "Denied" status with notes about rocky site
- 1 job with doseSize set (pumped LPP system) and Zoeller 151 pump specified
- 1 subdivision job with clientType = "Developer" and 8 lots (multiple parcels)
- 1 job "On Hold" with client-requested delay note
- At least 2 jobs with invoiceStatus = "Unpaid"

**Date patterns**:
- Jobs created in last 90 days relative to today
- Spring clustering: March–May dates prominent (peak season)
- Permit review times: 10-15 business days for clean submits, 25-35 days for revised submits
- Field line perc test dates: Tuesdays and Thursdays most common (crews schedule batches)
- Permit expiry: 12 months after approval date

**Revenue ranges**:
- Perc test only: $450–$750
- Design + permit prep: $600–$1,200
- Full job (design + install, conventional): $5,200–$9,800
- Full job (ATU system): $12,000–$18,500
- Private inspection: $350–$550
- Monthly revenue for firm this size: $22,000–$85,000

---

## Layout Builder Notes

**Density**: Standard. Use `--content-padding: 1.5rem`, `--card-padding: 1.5rem`. Not compact — DRs and office staff need readable text, not cramped data.

**Sidebar width**: 16rem (standard). Nav labels are short (Job Board, Permit Tracker, etc.) — no need for 18rem.

**Status badge color system** (critical for domain credibility):
- "Under ADH Review" → amber/warning
- "Revision Requested" → orange-red / warning-high
- "Approved — Awaiting Install" → green / success
- "Permit Issued" / "Operation Permit Issued" → dark green / strong success
- "Denied" / "Permit Expired" → red / destructive
- "On Hold" / "Cancelled" → gray / muted
- "Design In Progress" / "Perc Test Complete" → blue / info

**Primary color recommendation**: Teal-green (oklch(0.54 0.14 185)) — connects to environmental/soil/land work without being clinical. Alternative: slate-blue (oklch(0.48 0.11 235)) for a more regulatory/compliance feel.

**Visual patterns the Layout Builder must know**:
- Status badge columns in job tables are EXPECTED — not optional decoration
- A "today's schedule" panel (upcoming perc tests and installs) on the main dashboard is what field service ops managers look at first every morning
- County as a data field on every job record — this is how ADH routing works
- Permit number display: show partial ADH Plan Review Number prominently (e.g., "PR-2024-0847")

---

## Demo Screen Builder Notes

**Single most important metric**: Active Permits (count currently in ADH pipeline). This is the operational heartbeat of a DR firm — every morning the owner checks how many permits are "Under ADH Review."

**Secondary hero metrics** (KPI row, left to right):
1. Active Permits (count)
2. Jobs This Month (count)
3. Pending Invoices ($)
4. Avg Review Time (days)

**Chart type**: Bar chart for monthly job completions (by system type — conventional vs. ATU) over 6-12 months. Line/area for monthly revenue trend. These are the two charts a DR firm owner would want.

**One domain-specific panel that would impress a practitioner**: A **"Permit Pipeline"** panel showing the count at each ADH status stage (Submitted → Under Review → Revision Requested → Approved) as a horizontal funnel or status-bucketed count list. This mirrors how DRs actually track their ADH backlog and is something no generic FSM software shows.

**Canvas animation direction**: Subtle **grid animation with moving node elements** — representing a site plan grid where nodes (representing well, tank, field lines) animate gently along a contour. Color-matched to teal-green primary. This is abstract enough to not distract but visually connects to the surveying/mapping nature of the work. Alternatively: **organic soil layer animation** — horizontal bands representing soil horizons (topsoil, subsoil, bedrock) with a subtle pulsing indicating the water table level. More domain-specific and likely to cause a domain expert to smile.
