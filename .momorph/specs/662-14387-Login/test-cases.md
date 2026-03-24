# Test Cases: Login

**Frame ID**: `662:14387`
**Generated At**: 2026-03-24
**Total Test Cases**: 18

---

## TC-001: Login - Access - unauthenticated

- **ID**: TC-001
- **Type**: Functional
- **Area**: Access > Authentication
- **Pre-condition**: Various authentication states
- **Test Data**: Unauthenticated, post-logout, and authenticated users

**Steps**:
1. Access as unauthenticated.
2. After logout.
3. While authenticated.

**Expected Result**:
1. Login displayed.
2. Redirected to login.
3. Redirected to main app.

---

## TC-002: Login - GUI - Logo position

- **ID**: TC-002
- **Type**: GUI
- **Area**: GUI > Header
- **Pre-condition**: Login page is loaded
- **Test Data**: N/A

**Steps**:
1. Open login.
2. Inspect header Logo.
3. Resize.
4. Interact.

**Expected Result**:
2. Logo top-left.
3. Maintains position.
4. Not interactive.

---

## TC-003: Login - GUI - Language position

- **ID**: TC-003
- **Type**: GUI
- **Area**: GUI > Header
- **Pre-condition**: Login page is loaded
- **Test Data**: N/A

**Steps**:
1. Open login.
2. Inspect Language selector.
3. Resize.

**Expected Result**:
2. Top-right.
3. Maintains position.

---

## TC-004: Login - GUI - Footer

- **ID**: TC-004
- **Type**: GUI
- **Area**: GUI > Footer
- **Pre-condition**: Login page is loaded
- **Test Data**: N/A

**Steps**:
1. Open login.
2. Scroll.
3. Hover/click footer.

**Expected Result**:
1. Footer visible, fixed bottom.
2. Stationary.
3. Not interactive.

---

## TC-005: Login - GUI - Hero background

- **ID**: TC-005
- **Type**: GUI
- **Area**: GUI > Hero Section
- **Pre-condition**: Login page is loaded
- **Test Data**: N/A

**Steps**:
1. Open login.
2. Inspect hero section.

**Expected Result**:
Hero section has key visual background.

---

## TC-006: Login - GUI - Title and description

- **ID**: TC-006
- **Type**: GUI
- **Area**: GUI > Hero Section
- **Pre-condition**: Login page is loaded
- **Test Data**: N/A

**Steps**:
1. Open login.
2. Inspect texts.
3. Interact.

**Expected Result**:
'ROOT FURTHER' title + descriptions. Not interactive.

---

## TC-007: Login - GUI - Login button

- **ID**: TC-007
- **Type**: GUI
- **Area**: GUI > Login Button
- **Pre-condition**: Login page is loaded
- **Test Data**: N/A

**Steps**:
1. Open login.
2. Locate button.
3. Inspect.

**Expected Result**:
Centered below hero, Google icon visible.

---

## TC-008: Login - GUI - Language dropdown

- **ID**: TC-008
- **Type**: GUI
- **Area**: GUI > Language Selector
- **Pre-condition**: Login page is loaded
- **Test Data**: N/A

**Steps**:
1. Open login.
2. Click language.
3. Hover.

**Expected Result**:
2. Dropdown opens.
3. Highlighted + pointer.

---

## TC-009: Login - Init - Default language VN

- **ID**: TC-009
- **Type**: Functional
- **Area**: Initialization > Language
- **Pre-condition**: Login page is loaded, first visit
- **Test Data**: N/A

**Steps**:
1. Open login.
2. Observe selector.

**Expected Result**:
'VN' shown.

---

## TC-010: Login - Init - Flag and chevron

- **ID**: TC-010
- **Type**: GUI
- **Area**: Initialization > Language
- **Pre-condition**: Login page is loaded
- **Test Data**: N/A

**Steps**:
1. Open login.
2. Observe selector.

**Expected Result**:
Vietnam flag left, chevron right.

---

## TC-011: Login - Function - authenticated redirect

- **ID**: TC-011
- **Type**: Functional
- **Area**: Function > Authentication
- **Pre-condition**: User is already authenticated
- **Test Data**: Authenticated user session

**Steps**:
1. Access as authenticated.

**Expected Result**:
Redirected to main app.

---

## TC-012: Login - Function - click login button

- **ID**: TC-012
- **Type**: Functional
- **Area**: Function > Login
- **Pre-condition**: Login page is loaded
- **Test Data**: N/A

**Steps**:
1. Click LOGIN With Google.

**Expected Result**:
Google auth flow starts.

---

## TC-013: Login - Function - hover login button

- **ID**: TC-013
- **Type**: Functional
- **Area**: Function > Login
- **Pre-condition**: Login page is loaded
- **Test Data**: N/A

**Steps**:
1. Hover over login button.

**Expected Result**:
Shadow/elevated effect.

---

## TC-014: Login - Function - loading state

- **ID**: TC-014
- **Type**: Functional
- **Area**: Function > Login
- **Pre-condition**: Login button clicked
- **Test Data**: N/A

**Steps**:
1. Click login.
2. Observe during processing.

**Expected Result**:
Button disabled + loading indicator.

---

## TC-015: Login - Function - click language selector

- **ID**: TC-015
- **Type**: Functional
- **Area**: Function > Language
- **Pre-condition**: Login page is loaded
- **Test Data**: N/A

**Steps**:
1. Click language selector.

**Expected Result**:
Dropdown opens.

---

## TC-016: Login - Function - hover language

- **ID**: TC-016
- **Type**: Functional
- **Area**: Function > Language
- **Pre-condition**: Login page is loaded
- **Test Data**: N/A

**Steps**:
1. Hover language selector.

**Expected Result**:
Highlighted + pointer cursor.

---

## TC-017: Login - Function - successful login

- **ID**: TC-017
- **Type**: Functional
- **Area**: Function > Login
- **Pre-condition**: Login page is loaded, valid Google account available
- **Test Data**: Valid Google credentials

**Steps**:
1. Click login.
2. Authenticate with valid Google.

**Expected Result**:
User info returned, redirect to main app.

---

## TC-018: Login - Function - failed login

- **ID**: TC-018
- **Type**: Functional
- **Area**: Function > Login
- **Pre-condition**: Login page is loaded
- **Test Data**: Invalid or cancelled Google authentication

**Steps**:
1. Click login.
2. Cancel or fail Google authentication.

**Expected Result**:
Error message displayed. User remains on login page.

---
