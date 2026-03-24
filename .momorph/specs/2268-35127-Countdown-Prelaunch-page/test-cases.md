# Test Cases: Countdown - Prelaunch page

**Frame ID**: `2268:35127`
**Generated At**: 2026-03-24
**Total Test Cases**: 17

---

## TC-001: Countdown - Prelaunch page - Access control

- **ID**: TC-001
- **Type**: Functional
- **Area**: Access > Authentication
- **Pre-condition**: User has valid credentials
- **Test Data**: Valid user account

**Steps**:
1. Login as valid user.
2. Access via UI.
3. Access via URL.
4. Access with invalid URL.

**Expected Result**:
1. ---
2. Screen displayed.
3. Screen displayed.
4. Error or redirect.

---

## TC-002: Countdown - Prelaunch page - Unauthenticated access

- **ID**: TC-002
- **Type**: Functional
- **Area**: Access > Authentication
- **Pre-condition**: User is not logged in
- **Test Data**: N/A

**Steps**:
1. Not logged in.
2. Access URL.

**Expected Result**:
1. ---
2. Access allowed or blocked per config.

---

## TC-003: Countdown - Prelaunch page - Low-privilege access

- **ID**: TC-003
- **Type**: Functional
- **Area**: Access > Authorization
- **Pre-condition**: User has low-privilege account
- **Test Data**: Low-privilege user account

**Steps**:
1. Login low-privilege.
2. Access via UI.
3. Access via URL.

**Expected Result**:
1. ---
2. Access denied or redirect.
3. Same.

---

## TC-004: Countdown - Prelaunch page - Expired session

- **ID**: TC-004
- **Type**: Functional
- **Area**: Access > Session
- **Pre-condition**: User has active session
- **Test Data**: Valid user account

**Steps**:
1. Login.
2. Let session expire.
3. Access.

**Expected Result**:
1. ---
2. Expired.
3. Redirect to login.

---

## TC-005: Countdown - Prelaunch page - Days unit layout

- **ID**: TC-005
- **Type**: GUI
- **Area**: GUI > Countdown Display
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Observe Days area.

**Expected Result**:
Two digit LED display + 'DAYS' label.

---

## TC-006: Countdown - Prelaunch page - Hours unit layout

- **ID**: TC-006
- **Type**: GUI
- **Area**: GUI > Countdown Display
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Observe Hours area.

**Expected Result**:
Two digit LED display + 'HOURS' label.

---

## TC-007: Countdown - Prelaunch page - Minutes unit layout

- **ID**: TC-007
- **Type**: GUI
- **Area**: GUI > Countdown Display
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Observe Minutes area.

**Expected Result**:
Two digit LED display + 'MINUTES' label.

---

## TC-008: Countdown - Prelaunch page - Labels

- **ID**: TC-008
- **Type**: GUI
- **Area**: GUI > Countdown Display
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Inspect labels.
2. Check color and case.

**Expected Result**:
Uppercase DAYS HOURS MINUTES, white color.

---

## TC-009: Countdown - Prelaunch page - Init Days values

- **ID**: TC-009
- **Type**: Functional
- **Area**: Initialization > Days
- **Pre-condition**: Page is loaded with configurable timer
- **Test Data**: Days values: 0, 9, 10, 31

**Steps**:
1. Set Days to 0.
2. Set Days to 9.
3. Set Days to 10.
4. Set Days to 31.

**Expected Result**:
Shows 00, 09, 10, 31.

---

## TC-010: Countdown - Prelaunch page - Init Hours values

- **ID**: TC-010
- **Type**: Functional
- **Area**: Initialization > Hours
- **Pre-condition**: Page is loaded with configurable timer
- **Test Data**: Hours values: 0, 9, 10, 23

**Steps**:
1. Set Hours to 0.
2. Set Hours to 9.
3. Set Hours to 10.
4. Set Hours to 23.

**Expected Result**:
Shows 00, 09, 10, 23.

---

## TC-011: Countdown - Prelaunch page - Init Minutes values

- **ID**: TC-011
- **Type**: Functional
- **Area**: Initialization > Minutes
- **Pre-condition**: Page is loaded with configurable timer
- **Test Data**: Minutes values: 0, 9, 10, 59

**Steps**:
1. Set Minutes to 0.
2. Set Minutes to 9.
3. Set Minutes to 10.
4. Set Minutes to 59.

**Expected Result**:
Shows 00, 09, 10, 59.

---

## TC-012: Countdown - Prelaunch page - Real-time countdown

- **ID**: TC-012
- **Type**: Functional
- **Area**: Function > Countdown
- **Pre-condition**: Timer is active with days > 1
- **Test Data**: Timer with days > 1

**Steps**:
1. Start timer days>1.
2. Observe decrease.

**Expected Result**:
Values update in real time.

---

## TC-013: Countdown - Prelaunch page - Days below 1

- **ID**: TC-013
- **Type**: Functional
- **Area**: Function > Countdown
- **Pre-condition**: Timer is active
- **Test Data**: Days < 1

**Steps**:
1. Set Days<1.
2. Observe.

**Expected Result**:
Shows 00.

---

## TC-014: Countdown - Prelaunch page - Hours validation

- **ID**: TC-014
- **Type**: Validation
- **Area**: Validation > Hours
- **Pre-condition**: Page is loaded with configurable timer
- **Test Data**: Hours values: -1, 0, 12, 23, 25

**Steps**:
1. Set Hours to -1.
2. Set Hours to 0.
3. Set Hours to 12.
4. Set Hours to 23.
5. Set Hours to 25.

**Expected Result**:
00, 00, 12, 23, 00.

---

## TC-015: Countdown - Prelaunch page - Minutes validation

- **ID**: TC-015
- **Type**: Validation
- **Area**: Validation > Minutes
- **Pre-condition**: Page is loaded with configurable timer
- **Test Data**: Minutes values: -1, 0, 30, 59, 60

**Steps**:
1. Set Minutes to -1.
2. Set Minutes to 0.
3. Set Minutes to 30.
4. Set Minutes to 59.
5. Set Minutes to 60.

**Expected Result**:
00, 00, 30, 59, 00.

---

## TC-016: Countdown - Prelaunch page - Completion

- **ID**: TC-016
- **Type**: Functional
- **Area**: Function > Countdown
- **Pre-condition**: Timer is active and approaching zero
- **Test Data**: N/A

**Steps**:
1. Timer reaches zero.
2. Observe.

**Expected Result**:
All show 00.

---

## TC-017: Countdown - Prelaunch page - Two-digit formatting

- **ID**: TC-017
- **Type**: Functional
- **Area**: Function > Display Format
- **Pre-condition**: Page is loaded with configurable timer
- **Test Data**: Single-digit values

**Steps**:
1. Set single-digit values.
2. Observe.

**Expected Result**:
Leading zeros (05, 09, 00).

---
