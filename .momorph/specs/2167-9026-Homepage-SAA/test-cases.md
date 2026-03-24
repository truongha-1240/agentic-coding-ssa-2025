# Test Cases: Homepage SAA

**Frame ID**: `2167:9026`
**Generated At**: 2026-03-24
**Total Test Cases**: 63

---

## TC-001: Homepage SAA - Check access permission

- **ID**: ID-0
- **Type**: ACCESSING
- **Area**: ACCESSING > Check access permission
- **Priority**: High
- **Pre-condition**: User is not logged in browser is open
- **Test Data**: URL: / (homepage)

**Steps**:
1. Open browser
2. Navigate to homepage URL
3. Verify page loads

**Expected Result**:
Homepage displayed successfully with all public content

---

## TC-002: Homepage SAA - Check access permission

- **ID**: ID-1
- **Type**: ACCESSING
- **Area**: ACCESSING > Check access permission
- **Priority**: High
- **Pre-condition**: User is logged in
- **Test Data**: URL: / (homepage)

**Steps**:
1. User logs in
2. Navigate to homepage URL
3. Verify page loads with user-specific features

**Expected Result**:
Homepage displayed with notification bell account menu and personalized options

---

## TC-003: Homepage SAA - Check navigation path

- **ID**: ID-2
- **Type**: ACCESSING
- **Area**: ACCESSING > Check navigation path
- **Priority**: High
- **Pre-condition**: User is on any page
- **Test Data**: N/A

**Steps**:
1. Navigate to any page
2. Click logo in header
3. Verify navigation

**Expected Result**:
Homepage displayed and scrolled to top

---

## TC-004: Homepage SAA - Check navigation path

- **ID**: ID-3
- **Type**: ACCESSING
- **Area**: ACCESSING > Check navigation path
- **Priority**: High
- **Pre-condition**: User is on any page
- **Test Data**: N/A

**Steps**:
1. Navigate to any page
2. Click About SAA 2025 in header
3. Verify navigation

**Expected Result**:
Homepage displayed with About SAA 2025 section visible

---

## TC-005: Homepage SAA - Check navigation path

- **ID**: ID-4
- **Type**: ACCESSING
- **Area**: ACCESSING > Check navigation path
- **Priority**: Medium
- **Pre-condition**: User is on any page scrolled to footer
- **Test Data**: N/A

**Steps**:
1. Navigate to any page
2. Scroll to footer
3. Click About SAA 2025 link
4. Verify navigation

**Expected Result**:
Homepage displayed and scrolled to top

---

## TC-006: Homepage SAA - Check authentication

- **ID**: ID-5
- **Type**: ACCESSING
- **Area**: ACCESSING > Check authentication
- **Priority**: High
- **Pre-condition**: Admin user is logged in
- **Test Data**: User with admin role

**Steps**:
1. Login as admin user
2. Navigate to homepage
3. Click account button
4. Verify menu options

**Expected Result**:
Account menu displays with Admin Dashboard option

---

## TC-007: Homepage SAA - Check authentication

- **ID**: ID-6
- **Type**: ACCESSING
- **Area**: ACCESSING > Check authentication
- **Priority**: High
- **Pre-condition**: Regular user is logged in
- **Test Data**: User with regular role

**Steps**:
1. Login as regular user
2. Navigate to homepage
3. Click account button
4. Verify menu options

**Expected Result**:
Account menu displays without Admin Dashboard option

---

## TC-008: Homepage SAA - Check layout

- **ID**: ID-7
- **Type**: GUI
- **Area**: GUI > Check layout
- **Priority**: High
- **Pre-condition**: User navigated to homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Observe overall page structure
3. Verify positions of main sections

**Expected Result**:
Header at top with logo left nav center controls right; Hero section with ROOT FURTHER title centered; Countdown below hero; Awards grid; Sun* Kudos section; Widget button fixed bottom right; Footer at bottom

---

## TC-009: Homepage SAA - Initialize

- **ID**: ID-8
- **Type**: GUI
- **Area**: GUI > Initialize
- **Priority**: Medium
- **Pre-condition**: User navigated to homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Observe header logo
3. Check size and alt text

**Expected Result**:
Logo 64x60px visible at header left with alt text

---

## TC-010: Homepage SAA - Initialize

- **ID**: ID-9
- **Type**: GUI
- **Area**: GUI > Initialize
- **Priority**: Medium
- **Pre-condition**: User navigated to homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Observe navigation links in header
3. Check active link styling

**Expected Result**:
About SAA 2025 link highlighted with yellow color/underline

---

## TC-011: Homepage SAA - Initialize

- **ID**: ID-10
- **Type**: GUI
- **Area**: GUI > Initialize
- **Priority**: Medium
- **Pre-condition**: User navigated to homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Observe language button in header
3. Check displayed value

**Expected Result**:
Language button displays VN

---

## TC-012: Homepage SAA - Initialize

- **ID**: ID-11
- **Type**: GUI
- **Area**: GUI > Initialize
- **Priority**: Medium
- **Pre-condition**: User navigated to homepage (authenticated)
- **Test Data**: Authenticated user

**Steps**:
1. Login and navigate to homepage
2. Observe notification button
3. Check icon and badge

**Expected Result**:
Notification icon 40x40px visible; Badge visible if unread notifications exist

---

## TC-013: Homepage SAA - Initialize

- **ID**: ID-12
- **Type**: GUI
- **Area**: GUI > Initialize
- **Priority**: High
- **Pre-condition**: User navigated to homepage
- **Test Data**: Event datetime configured

**Steps**:
1. Open homepage
2. Observe countdown section
3. Check DAYS HOURS MINUTES display

**Expected Result**:
Three countdown units display 2-digit values with labels DAYS HOURS MINUTES

---

## TC-014: Homepage SAA - Initialize

- **ID**: ID-13
- **Type**: GUI
- **Area**: GUI > Initialize
- **Priority**: Medium
- **Pre-condition**: User navigated to homepage before event start time
- **Test Data**: Event not started

**Steps**:
1. Open homepage
2. Observe hero section
3. Check Coming soon label

**Expected Result**:
Coming soon label visible below ROOT FURTHER title

---

## TC-015: Homepage SAA - Initialize

- **ID**: ID-14
- **Type**: GUI
- **Area**: GUI > Initialize
- **Priority**: Medium
- **Pre-condition**: User navigated to homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Observe event information section
3. Check content

**Expected Result**:
Thời gian: 18h30; Địa điểm: Nhà hát nghệ thuật quân đội; Tường thuật trực tiếp tại Group Facebook Sun* Family displayed

---

## TC-016: Homepage SAA - Initialize

- **ID**: ID-15
- **Type**: GUI
- **Area**: GUI > Initialize
- **Priority**: High
- **Pre-condition**: User navigated to homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage on desktop
2. Observe award cards section
3. Check grid columns

**Expected Result**:
Award cards display in 3-column grid (desktop); Each card shows thumbnail title description and Chi tiết link

---

## TC-017: Homepage SAA - Initialize

- **ID**: ID-16
- **Type**: GUI
- **Area**: GUI > Initialize
- **Priority**: High
- **Pre-condition**: User navigated to homepage on tablet or mobile
- **Test Data**: Tablet/mobile viewport

**Steps**:
1. Open homepage on tablet/mobile
2. Observe award cards section
3. Check grid columns

**Expected Result**:
Award cards display in 2-column grid

---

## TC-018: Homepage SAA - Initialize

- **ID**: ID-17
- **Type**: GUI
- **Area**: GUI > Initialize
- **Priority**: Medium
- **Pre-condition**: User navigated to homepage scrolled to bottom
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Scroll to footer
3. Observe footer content

**Expected Result**:
Footer displays with logo navigation links copyright text

---

## TC-019: Homepage SAA - Check component interaction

- **ID**: ID-18
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on any page
- **Test Data**: N/A

**Steps**:
1. Navigate to any page
2. Click header logo
3. Verify result

**Expected Result**:
Page navigates to homepage and scrolls to top

---

## TC-020: Homepage SAA - Check component interaction

- **ID**: ID-19
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on any page scrolled to footer
- **Test Data**: N/A

**Steps**:
1. Navigate to any page
2. Scroll to footer
3. Click footer logo
4. Verify result

**Expected Result**:
Page navigates to homepage and scrolls to top

---

## TC-021: Homepage SAA - Check component interaction

- **ID**: ID-20
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Click About SAA 2025 in header
3. Verify result

**Expected Result**:
Page scrolls to About SAA 2025 section or reloads homepage

---

## TC-022: Homepage SAA - Check component interaction

- **ID**: ID-21
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Click Awards Information in header
3. Verify result

**Expected Result**:
Page navigates to Awards Information page

---

## TC-023: Homepage SAA - Check component interaction

- **ID**: ID-22
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Click Sun* Kudos in header
3. Verify result

**Expected Result**:
Page navigates to Sun* Kudos page

---

## TC-024: Homepage SAA - Check component interaction

- **ID**: ID-23
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User on homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Hover mouse over Awards Information link
3. Observe visual change

**Expected Result**:
Link displays bright background highlight

---

## TC-025: Homepage SAA - Check component interaction

- **ID**: ID-24
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Click language button VN
3. Verify result

**Expected Result**:
Language selection menu opens with VN/EN options

---

## TC-026: Homepage SAA - Check component interaction

- **ID**: ID-25
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage language menu open
- **Test Data**: Select EN

**Steps**:
1. Open homepage
2. Click language button
3. Select EN
4. Verify result

**Expected Result**:
Interface switches to English language

---

## TC-027: Homepage SAA - Check component interaction

- **ID**: ID-26
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage with EN language menu open
- **Test Data**: Select VN

**Steps**:
1. Homepage in English
2. Click language button
3. Select VN
4. Verify result

**Expected Result**:
Interface switches to Vietnamese language

---

## TC-028: Homepage SAA - Check component interaction

- **ID**: ID-27
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User logged in on homepage
- **Test Data**: Authenticated user

**Steps**:
1. Login
2. Open homepage
3. Click notification button
4. Verify result

**Expected Result**:
Notification panel opens

---

## TC-029: Homepage SAA - Check component interaction

- **ID**: ID-28
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User logged in with unread notifications
- **Test Data**: User with unread notifications

**Steps**:
1. Login with unread notifications
2. Open homepage
3. Observe notification button

**Expected Result**:
Red badge visible on notification icon

---

## TC-030: Homepage SAA - Check component interaction

- **ID**: ID-29
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User logged in with all notifications read
- **Test Data**: User with no unread notifications

**Steps**:
1. Login with no unread notifications
2. Open homepage
3. Observe notification button

**Expected Result**:
No badge visible on notification icon

---

## TC-031: Homepage SAA - Check component interaction

- **ID**: ID-30
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User on homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Click dropdown menu button
3. Verify result

**Expected Result**:
Dropdown menu opens

---

## TC-032: Homepage SAA - Check component interaction

- **ID**: ID-31
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User on homepage menu open
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Click dropdown menu button (opens)
3. Click again
4. Verify result

**Expected Result**:
Dropdown menu closes

---

## TC-033: Homepage SAA - Check component interaction

- **ID**: ID-32
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User on homepage menu open
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Click dropdown menu button
3. Click outside menu area
4. Verify result

**Expected Result**:
Dropdown menu closes

---

## TC-034: Homepage SAA - Check component interaction

- **ID**: ID-33
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User on homepage menu focused
- **Test Data**: Keyboard

**Steps**:
1. Open homepage
2. Tab to dropdown menu button
3. Press Enter
4. Verify result

**Expected Result**:
Dropdown menu opens

---

## TC-035: Homepage SAA - Check component interaction

- **ID**: ID-34
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User on homepage menu focused
- **Test Data**: Keyboard

**Steps**:
1. Open homepage
2. Tab to dropdown menu button
3. Press Space
4. Verify result

**Expected Result**:
Dropdown menu opens

---

## TC-036: Homepage SAA - Check component interaction

- **ID**: ID-35
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User on homepage menu open
- **Test Data**: Keyboard

**Steps**:
1. Open homepage
2. Open dropdown menu
3. Press Esc
4. Verify result

**Expected Result**:
Dropdown menu closes

---

## TC-037: Homepage SAA - Check component interaction

- **ID**: ID-36
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User logged in on homepage
- **Test Data**: Authenticated user

**Steps**:
1. Login
2. Open homepage
3. Click account button
4. Verify result

**Expected Result**:
Account menu opens with Profile and Sign out options

---

## TC-038: Homepage SAA - Check component interaction

- **ID**: ID-37
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: Admin user logged in
- **Test Data**: Admin user

**Steps**:
1. Login as admin
2. Open homepage
3. Click account button
4. Check menu options

**Expected Result**:
Menu displays Profile Sign out and Admin Dashboard

---

## TC-039: Homepage SAA - Check component interaction

- **ID**: ID-38
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: Regular user logged in
- **Test Data**: Regular user

**Steps**:
1. Login as regular user
2. Open homepage
3. Click account button
4. Check menu options

**Expected Result**:
Menu displays Profile and Sign out only

---

## TC-040: Homepage SAA - Check component interaction

- **ID**: ID-39
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage wait 1 minute
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Note current countdown values
3. Wait 1 minute
4. Observe countdown

**Expected Result**:
Minutes value decreases by 1

---

## TC-041: Homepage SAA - Check component interaction

- **ID**: ID-40
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User on homepage before event
- **Test Data**: Countdown with single-digit values

**Steps**:
1. Open homepage when countdown has single digits
2. Observe display format

**Expected Result**:
Values display with leading zero (e.g. 05 09)

---

## TC-042: Homepage SAA - Check component interaction

- **ID**: ID-41
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage at event start time
- **Test Data**: Event start time reached

**Steps**:
1. Open homepage at event start time
2. Observe countdown
3. Check display

**Expected Result**:
Countdown shows 00 00 00; Coming soon label hidden

---

## TC-043: Homepage SAA - Check component interaction

- **ID**: ID-42
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage after event start
- **Test Data**: Event already started

**Steps**:
1. Open homepage after event start time
2. Observe hero section
3. Check label visibility

**Expected Result**:
Coming soon label not displayed

---

## TC-044: Homepage SAA - Check component interaction

- **ID**: ID-43
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage before event start
- **Test Data**: Event not started

**Steps**:
1. Open homepage before event start time
2. Observe hero section
3. Check label visibility

**Expected Result**:
Coming soon label displayed

---

## TC-045: Homepage SAA - Check component interaction

- **ID**: ID-44
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Click ABOUT AWARDS button
3. Verify result

**Expected Result**:
Page navigates to Awards Information page

---

## TC-046: Homepage SAA - Check component interaction

- **ID**: ID-45
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Click ABOUT KUDOS button
3. Verify result

**Expected Result**:
Page navigates to Sun* Kudos page

---

## TC-047: Homepage SAA - Check component interaction

- **ID**: ID-46
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User on homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Hover over ABOUT AWARDS button
3. Observe visual change

**Expected Result**:
Button displays hover styling

---

## TC-048: Homepage SAA - Check component interaction

- **ID**: ID-47
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: Award: Top Talent

**Steps**:
1. Open homepage
2. Click Top Talent card image
3. Verify result

**Expected Result**:
Page navigates to Awards Information with hashtag scrolls to Top Talent section

---

## TC-049: Homepage SAA - Check component interaction

- **ID**: ID-48
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: Award: Top Talent

**Steps**:
1. Open homepage
2. Click Top Talent card title
3. Verify result

**Expected Result**:
Page navigates to Awards Information with hashtag scrolls to Top Talent section

---

## TC-050: Homepage SAA - Check component interaction

- **ID**: ID-49
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: Award: Top Talent

**Steps**:
1. Open homepage
2. Click Chi tiết link on Top Talent card
3. Verify result

**Expected Result**:
Page navigates to Awards Information with hashtag scrolls to Top Talent section

---

## TC-051: Homepage SAA - Check component interaction

- **ID**: ID-50
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: All award cards

**Steps**:
1. Open homepage
2. Click each award card
3. Verify each navigation

**Expected Result**:
Each card navigates to Awards Information with appropriate hashtag and scrolls to correct section

---

## TC-052: Homepage SAA - Check component interaction

- **ID**: ID-51
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User on homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Hover over any award card
3. Observe visual change

**Expected Result**:
Card elevates slightly with enhanced border/lighting effect

---

## TC-053: Homepage SAA - Check component interaction

- **ID**: ID-52
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: Award card with hashtag

**Steps**:
1. Open homepage
2. Click award card
3. Verify Awards Information page loads
4. Check scroll position

**Expected Result**:
Page scrolls to section matching the hashtag slug

---

## TC-054: Homepage SAA - Check component interaction

- **ID**: ID-53
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Scroll to Sun* Kudos section
3. Click Chi tiết button
4. Verify result

**Expected Result**:
Page navigates to Sun* Kudos detail page

---

## TC-055: Homepage SAA - Check component interaction

- **ID**: ID-54
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User on homepage
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Click widget button (bottom right)
3. Verify result

**Expected Result**:
Quick action menu opens with available options

---

## TC-056: Homepage SAA - Check component interaction

- **ID**: ID-55
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: High
- **Pre-condition**: User on homepage scrolled to footer
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Scroll to footer
3. Click each navigation link
4. Verify results

**Expected Result**:
Each link navigates to corresponding page correctly

---

## TC-057: Homepage SAA - Check data validation

- **ID**: ID-56
- **Type**: FUNCTION
- **Area**: FUNCTION > Check data validation
- **Priority**: High
- **Pre-condition**: Homepage loaded env var set
- **Test Data**: Event datetime in ISO-8601 format

**Steps**:
1. Set event datetime in environment
2. Open homepage
3. Verify countdown calculation

**Expected Result**:
Countdown displays correct remaining time based on env variable

---

## TC-058: Homepage SAA - Check data validation

- **ID**: ID-57
- **Type**: FUNCTION
- **Area**: FUNCTION > Check data validation
- **Priority**: High
- **Pre-condition**: Environment configuration
- **Test Data**: datetime=2025-12-31T18:30:00+07:00

**Steps**:
1. Configure valid ISO-8601 datetime
2. Restart application
3. Open homepage
4. Verify countdown

**Expected Result**:
Countdown calculates and displays correctly

---

## TC-059: Homepage SAA - Check component interaction

- **ID**: ID-58
- **Type**: FUNCTION
- **Area**: FUNCTION > Check component interaction
- **Priority**: Medium
- **Pre-condition**: User on homepage language menu open
- **Test Data**: N/A

**Steps**:
1. Open homepage
2. Click language button
3. Check available options

**Expected Result**:
Only VN and EN options displayed

---

## TC-060: Homepage SAA - Check error handling

- **ID**: ID-59
- **Type**: FUNCTION
- **Area**: FUNCTION > Check error handling
- **Priority**: High
- **Pre-condition**: User on homepage
- **Test Data**: Chrome extension Check My Links

**Steps**:
1. Open homepage
2. Run Check My Links extension
3. Review results

**Expected Result**:
No broken links detected

---

## TC-061: Homepage SAA - Check error handling

- **ID**: ID-60
- **Type**: FUNCTION (Abnormal)
- **Area**: FUNCTION > Check error handling
- **Priority**: Medium
- **Pre-condition**: Environment with invalid datetime
- **Test Data**: datetime=invalid-format

**Steps**:
1. Set invalid datetime in environment
2. Restart application
3. Open homepage
4. Observe countdown

**Expected Result**:
System displays fallback or error message without crashing

---

## TC-062: Homepage SAA - Check error handling

- **ID**: ID-62
- **Type**: FUNCTION (Abnormal)
- **Area**: FUNCTION > Check error handling
- **Priority**: Medium
- **Pre-condition**: User on homepage
- **Test Data**: Award card without hashtag

**Steps**:
1. Open homepage
2. Click award card with missing hashtag
3. Verify result

**Expected Result**:
Page navigates to Awards Information page (without auto-scroll)

---
