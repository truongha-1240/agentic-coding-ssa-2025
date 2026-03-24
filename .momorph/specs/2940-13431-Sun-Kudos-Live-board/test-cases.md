# Test Cases: Sun* Kudos - Live board

**Frame ID**: `2940:13431`
**Generated At**: 2026-03-24
**Total Test Cases**: 41

---

## TC-001: Sun* Annual Awards 2025 Kudos - Open profile navigation

- **ID**: 0952e2f0
- **Type**: manual
- **Area**: ACCESSING > Check navigation path
- **Pre-condition**: User is authenticated, 'Kudos' cards and sidebar are visible
- **Test Data**: N/A

**Steps**:
1. Locate the avatar or name in the Kudos card or sidebar.
2. Click the selected avatar or name.

**Expected Result**:
1. ---
2. The profile page opens for the selected person.

---

## TC-002: Sun* Annual Awards 2025 Kudos - Kudos detail navigation

- **ID**: 31693bb7
- **Type**: manual
- **Area**: ACCESSING > Check navigation path
- **Pre-condition**: User is authenticated, Highlight/All Kudos/Spotlight section is visible
- **Test Data**: N/A

**Steps**:
1. Locate a Kudos card or node in the Highlight, All Kudos, or Spotlight section.
2. Click the 'View Details' button, Kudos content, or recipient node.

**Expected Result**:
1. ---
2. The Kudos detail page opens for the selected Kudos.

---

## TC-003: Sun* Annual Awards 2025 Kudos - Authentication required

- **ID**: 71b3ef43
- **Type**: manual
- **Area**: ACCESSING > Check access condition
- **Pre-condition**: User is unauthenticated but can view Kudos UI
- **Test Data**: N/A

**Steps**:
1. While signed out, attempt to open any profile or details from the Kudos UI.

**Expected Result**:
1. The system redirects to the login page or displays an authentication prompt.

---

## TC-004: Banner KV Kudos - Banner section

- **ID**: 40d4ba26
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Main event screen loaded
- **Test Data**: N/A

**Steps**:
1. Observe the banner at the top of the page.
2. Check logo and title display.
3. Attempt to click or hover on the banner area.

**Expected Result**:
1. Banner KV Kudos is visible and positioned at the top.
2. Logo 'SAA 2025 KUDOS' and the title 'Hệ thống ghi nhận lời cảm ơn' are displayed correctly.
3. Banner is not interactive (readonly).

---

## TC-005: Ô nhập/Ghi nhận - Input field

- **ID**: 0578e8ef
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Main screen loaded
- **Test Data**: N/A

**Steps**:
1. Locate the input form below the banner.
2. Observe its shape.
3. Verify if the left pencil icon is present.
4. Check that nothing overlaps or obscures the input field.

**Expected Result**:
1. Input field is visible and has a pill shape.
2. The left pencil icon is shown.
3. The field is neither overlapped nor obscured.

---

## TC-006: Mục HIGHLIGHT KUDOS - Highlight section

- **ID**: 06b76e80
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Highlight section displayed
- **Test Data**: N/A

**Steps**:
1. Locate the header, filters, and carousel in the Highlight section.
2. Check alignment and spacing.

**Expected Result**:
1. The Highlight header and subtitle are shown.
2. Filter dropdowns visible, properly aligned.
3. Carousel is visible, spaced properly, items do not overlap.

---

## TC-007: Tiêu đề phần 'HIGHLIGHT KUDOS' với bộ lọc - Highlight title and filters

- **ID**: b03a3b4e
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Highlight section displayed, filters present
- **Test Data**: N/A

**Steps**:
1. Confirm visibility, position, and alignment of Hashtag and Phòng ban filter buttons.
2. Check active/inactive visual state switches.

**Expected Result**:
1. Buttons visible and aligned.
2. Visual states switch correctly.

---

## TC-008: Nút lọc 'Hastag' - Button [Hashtag]

- **ID**: 0929bc39
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Highlight section displayed, hashtags available
- **Test Data**: N/A

**Steps**:
1. Locate the Hashtag button.
2. Verify visibility.
3. Confirm not overlapped.

**Expected Result**:
1. Hashtag filter button displayed and positioned.
2. Not overlapped.

---

## TC-009: Nút 'Phòng ban' - Button [Phòng ban]

- **ID**: 7b029a3b
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Highlight section displayed, departments available
- **Test Data**: N/A

**Steps**:
1. Locate the Phòng ban button.
2. Verify visibility.
3. Confirm not overlapped.

**Expected Result**:
1. Button displayed and positioned.
2. Not overlapped.

---

## TC-010: Kudos Nổi Bật - Highlight carousel

- **ID**: 86092c3a
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Carousel loaded with slides
- **Test Data**: N/A

**Steps**:
1. Check total slides (5).
2. Observe Prev/Next arrows.
3. Check enabled/disabled states.
4. Check visual prominence of active card.

**Expected Result**:
1. Top 5 cards displayed.
2. Arrows visible: disabled on 1st and last.
3. Active card prominent; inactive faded.

---

## TC-011: Thẻ KUDO nổi bật - Kudos card

- **ID**: 67c21a05
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Highlighted Kudos available
- **Test Data**: N/A

**Steps**:
1. Examine card fields.
2. Verify presence of all info.

**Expected Result**:
1. Sender and receiver info displayed.
2. Time, message, hashtags visible.
3. Like and copy link buttons present.

---

## TC-012: Thanh tìm kiếm Sunner - Search bar

- **ID**: 1ce82447
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Spotlight or Sidebar visible
- **Test Data**: N/A

**Steps**:
1. Locate search bar.
2. Verify present.
3. Check search icon.
4. Check placeholder.

**Expected Result**:
1. Search bar visible.
2. Search icon shown.
3. Placeholder: 'Tìm kiếm'.

---

## TC-013: Bảng Spotlight - Spotlight word cloud

- **ID**: ddf67e52
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Spotlight section opened
- **Test Data**: N/A

**Steps**:
1. Check word cloud.
2. Look for total count.
3. Check pan/zoom.
4. Observe loading/empty states.

**Expected Result**:
1. Word cloud displayed.
2. Total count visible.
3. Controls present.
4. Proper loading/empty states.

---

## TC-014: Danh sách 'Kudos' - Kudos feed

- **ID**: 9dfda316
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Main page loaded
- **Test Data**: N/A

**Steps**:
1. Locate list and sidebar.
2. Inspect alignment.
3. Check pagination.
4. Observe empty state.

**Expected Result**:
1. Cards aligned, sidebar visible.
2. Pagination works.
3. Empty: 'Hiện tại chưa có Kudos nào.'

---

## TC-015: Thẻ KUDO hiển thị bài cảm ơn - Kudos post card

- **ID**: f92dc686
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Kudos feed displays cards
- **Test Data**: N/A

**Steps**:
1. Check all info fields.
2. Attempt clicking icons.

**Expected Result**:
1. All fields visible and correct.
2. Non-interactive elements unresponsive.

---

## TC-016: Thanh menu bên phải - Sidebar

- **ID**: 99ade8e6
- **Type**: manual
- **Area**: GUI > Check layout
- **Pre-condition**: Sidebar present
- **Test Data**: N/A

**Steps**:
1. Check sidebar visibility.
2. Verify headers, labels, separators, leaderboard.

**Expected Result**:
1. Sidebar visible and separated.
2. All elements shown properly.

---

## TC-017: Ô nhập/Ghi nhận - Placeholder text

- **ID**: b35d40c1
- **Type**: manual
- **Area**: GUI > Initialize
- **Pre-condition**: Page loaded
- **Test Data**: N/A

**Steps**:
1. Observe input field on page load.

**Expected Result**:
1. Placeholder: 'Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?'

---

## TC-018: Thanh tìm kiếm Sunner - Placeholder text

- **ID**: d3877e54
- **Type**: manual
- **Area**: GUI > Initialize
- **Pre-condition**: Page loaded
- **Test Data**: N/A

**Steps**:
1. Inspect search bar on page load.

**Expected Result**:
1. Placeholder: 'Tìm kiếm'

---

## TC-019: Ô nhập/Ghi nhận - Required check

- **ID**: f183a3e4
- **Type**: manual
- **Area**: FUNCTION > Check data validation
- **Pre-condition**: Kudos dialog open
- **Test Data**: N/A

**Steps**:
1. Leave input empty.
2. Try to submit.

**Expected Result**:
1. ---
2. Submission blocked; submit button disabled.

---

## TC-020: Thanh tìm kiếm Sunner - Maximum 100 characters

- **ID**: 9e689933
- **Type**: manual
- **Area**: FUNCTION > Check data validation
- **Pre-condition**: On search bar
- **Test Data**: N/A

**Steps**:
1. Input 100 chars.
2. Input 101 chars.
3. Leave empty.

**Expected Result**:
1. Accepted.
2. Rejected.
3. Blocked.

---

## TC-021: Ô nhập/Ghi nhận - Save Kudos to database

- **ID**: ca8f60b3
- **Type**: manual
- **Area**: FUNCTION > Check business logic
- **Pre-condition**: On submission dialog
- **Test Data**: N/A

**Steps**:
1. Enter valid message.
2. Submit.

**Expected Result**:
1. ---
2. Kudos saved, new entry in feed.

---

## TC-022: Danh sách 'Kudos' - Empty list display

- **ID**: 926d92a5
- **Type**: manual
- **Area**: FUNCTION > Check business logic
- **Pre-condition**: No Kudos entries
- **Test Data**: N/A

**Steps**:
1. Access feed with no Kudos.

**Expected Result**:
1. Shows 'Hiện tại chưa có Kudos nào.'

---

## TC-023: Sidebar leaderboard - Empty list display

- **ID**: d662780b
- **Type**: manual
- **Area**: FUNCTION > Check business logic
- **Pre-condition**: Sidebar leaderboard empty
- **Test Data**: N/A

**Steps**:
1. Open leaderboard when empty.

**Expected Result**:
1. Shows 'Chưa có dữ liệu'

---

## TC-024: Kudos card - Sender cannot like own Kudos

- **ID**: 63645b03
- **Type**: manual
- **Area**: FUNCTION > Check business logic
- **Pre-condition**: User viewing own sent Kudos
- **Test Data**: N/A

**Steps**:
1. Attempt to like own Kudos.

**Expected Result**:
1. Like button disabled for sender.

---

## TC-025: Kudos card - One like per user per Kudos

- **ID**: 91e102ba
- **Type**: manual
- **Area**: FUNCTION > Check business logic
- **Pre-condition**: User has not liked
- **Test Data**: N/A

**Steps**:
1. Click Like multiple times.

**Expected Result**:
1. Only one like allowed per user.

---

## TC-026: Kudos card - Admin configuration 2 hearts

- **ID**: 31936b72
- **Type**: manual
- **Area**: FUNCTION > Check business logic
- **Pre-condition**: Special day configured
- **Test Data**: N/A

**Steps**:
1. Like a special day Kudos.

**Expected Result**:
1. Sender receives +2 hearts.

---

## TC-027: Thống kê tổng quát - Button opens Secret Box dialog

- **ID**: 43b54c29
- **Type**: manual
- **Area**: FUNCTION > Check business logic
- **Pre-condition**: Sidebar available
- **Test Data**: N/A

**Steps**:
1. Click 'Mở quà' on sidebar.

**Expected Result**:
1. Secret Box dialog opens.

---

## TC-028: Spotlight - Loading empty interactive

- **ID**: d035e3b8
- **Type**: manual
- **Area**: FUNCTION > Check business logic
- **Pre-condition**: Access Spotlight
- **Test Data**: N/A

**Steps**:
1. Open Spotlight loading.
2. Open with no data.
3. Open with data.

**Expected Result**:
1. Loading indicator.
2. Empty state message.
3. Nodes displayed.

---

## TC-029: Nút lọc 'Hastag' - Open dropdown and filter

- **ID**: 0e56cacb
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: Hashtags available
- **Test Data**: N/A

**Steps**:
1. Click Hashtag button.
2. Select hashtag.
3. Clear filter.

**Expected Result**:
1. Dropdown opens.
2. List filtered.
3. All shown.

---

## TC-030: Nút 'Phòng ban' - Open dropdown and filter

- **ID**: 159fed13
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: Departments available
- **Test Data**: N/A

**Steps**:
1. Click Phòng ban.
2. Select department.
3. Clear.

**Expected Result**:
1. Dropdown opens.
2. Filtered.
3. All shown.

---

## TC-031: Hashtag - Click filters Kudos list

- **ID**: d01729d4
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: Kudos cards contain hashtags
- **Test Data**: N/A

**Steps**:
1. Click a hashtag tag in card.

**Expected Result**:
1. Kudos list filters by that tag.

---

## TC-032: Highlight carousel - Page navigation disabled at ends

- **ID**: 81446f61
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: Multiple Kudos
- **Test Data**: N/A

**Steps**:
1. Click Next.
2. Click Prev.
3. Observe at first/last.

**Expected Result**:
1. Next moves forward; disabled on last.
2. Prev moves back; disabled on first.
3. States update.

---

## TC-033: Kudos card - Like/unlike toggle

- **ID**: 7a7ec63e
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: User viewing Kudos
- **Test Data**: N/A

**Steps**:
1. Click Like.
2. Click again.

**Expected Result**:
1. Heart red, count +1.
2. Heart gray, count -1.

---

## TC-034: Kudos card - Clipboard copy and toast

- **ID**: 0adfd7ce
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: Kudos card displayed
- **Test Data**: N/A

**Steps**:
1. Click Copy Link.

**Expected Result**:
1. URL copied; toast 'Link copied — ready to share!'

---

## TC-035: Kudos card - Navigate to Kudos detail

- **ID**: 8c0d1781
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: Kudos card displayed
- **Test Data**: N/A

**Steps**:
1. Click View Details.

**Expected Result**:
1. Kudos detail page opens.

---

## TC-036: Thông tin người gửi - Click avatar or name

- **ID**: 2cd77a0c
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: Kudos card with sender info
- **Test Data**: N/A

**Steps**:
1. Click sender avatar/name.

**Expected Result**:
1. Sender profile opens.

---

## TC-037: Thông tin người nhận - Click avatar or name

- **ID**: 630f42a3
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: Kudos card with receiver info
- **Test Data**: N/A

**Steps**:
1. Click receiver avatar/name.

**Expected Result**:
1. Receiver profile opens.

---

## TC-038: Spotlight - Toggle pan/zoom mode

- **ID**: cac4b7a3
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: Spotlight displayed
- **Test Data**: N/A

**Steps**:
1. Click Pan/Zoom icon.

**Expected Result**:
1. Pan/zoom mode toggles.

---

## TC-039: Spotlight - Hover shows tooltip click opens detail

- **ID**: 33ca8f8a
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: Spotlight displayed, nodes interactive
- **Test Data**: N/A

**Steps**:
1. Hover node.
2. Click node.

**Expected Result**:
1. Tooltip shows name/time.
2. Opens Kudos detail.

---

## TC-040: Kudos card - Click opens full-size image

- **ID**: f9b68ffa
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: Kudos card with gallery
- **Test Data**: N/A

**Steps**:
1. Click image thumbnail.

**Expected Result**:
1. Full-size image opens.

---

## TC-041: Sidebar leaderboard - Click avatar/name to profile hover preview

- **ID**: 6b1e2359
- **Type**: manual
- **Area**: FUNCTION > Check component interaction
- **Pre-condition**: Sidebar leaderboard visible
- **Test Data**: N/A

**Steps**:
1. Click leaderboard member.
2. Hover.

**Expected Result**:
1. Profile page opens.
2. Preview shown.

---
