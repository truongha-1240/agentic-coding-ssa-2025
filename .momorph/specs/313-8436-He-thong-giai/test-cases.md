# Test Cases: He thong giai

**Frame ID**: `313:8436`
**Generated At**: 2026-03-24
**Total Test Cases**: 15

---

## TC-001: He thong giai - Access - authenticated

- **ID**: TC-001
- **Type**: Functional
- **Area**: Access > Authentication
- **Pre-condition**: User has valid credentials
- **Test Data**: Valid user account

**Steps**:
1. Dang nhap.
2. Navigate den /he-thong-giai.
3. Xac nhan.

**Expected Result**:
Trang hien thi thanh cong.

---

## TC-002: He thong giai - Access - unauthenticated

- **ID**: TC-002
- **Type**: Functional
- **Area**: Access > Authentication
- **Pre-condition**: User is not logged in
- **Test Data**: N/A

**Steps**:
1. Chua dang nhap.
2. Navigate den /he-thong-giai.

**Expected Result**:
Chuyen den trang dang nhap.

---

## TC-003: He thong giai - Access - navigation

- **ID**: TC-003
- **Type**: Functional
- **Area**: Access > Navigation
- **Pre-condition**: User is logged in
- **Test Data**: Valid user account

**Steps**:
1. Dang nhap.
2. Mo menu.
3. Click He thong giai.

**Expected Result**:
Trang hien thi thanh cong.

---

## TC-004: He thong giai - GUI - layout

- **ID**: TC-004
- **Type**: GUI
- **Area**: GUI > Layout
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Mo trang.
2. Quan sat cau truc.

**Expected Result**:
Tieu de tren, menu trai, noi dung giua, banner duoi.

---

## TC-005: He thong giai - Init - title

- **ID**: TC-005
- **Type**: Functional
- **Area**: Initialization > Title
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Mo trang.
2. Quan sat tieu de.

**Expected Result**:
Text phu + tieu de chinh mau vang.

---

## TC-006: He thong giai - Init - menu

- **ID**: TC-006
- **Type**: Functional
- **Area**: Initialization > Menu
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Mo trang.
2. Quan sat menu.
3. Dem muc.

**Expected Result**:
6 muc: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025, MVP.

---

## TC-007: He thong giai - Init - awards

- **ID**: TC-007
- **Type**: Functional
- **Area**: Initialization > Awards
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Mo trang.
2. Cuon qua 6 giai.

**Expected Result**:
6 giai hien thi day du voi thong tin.

---

## TC-008: He thong giai - GUI - images

- **ID**: TC-008
- **Type**: GUI
- **Area**: GUI > Award Cards
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Mo trang.
2. Quan sat hinh anh.

**Expected Result**:
Hinh 336x336px moi the.

---

## TC-009: He thong giai - GUI - banner

- **ID**: TC-009
- **Type**: GUI
- **Area**: GUI > Banner
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Cuon den cuoi.
2. Quan sat banner.

**Expected Result**:
Tieu de Sun* Kudos + mo ta + nut Chi tiet.

---

## TC-010: He thong giai - Function - menu click

- **ID**: TC-010
- **Type**: Functional
- **Area**: Function > Menu Navigation
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Click tung muc menu.

**Expected Result**:
Cuon den section. Active mau vang + underline.

---

## TC-011: He thong giai - Function - menu hover

- **ID**: TC-011
- **Type**: Functional
- **Area**: Function > Menu Navigation
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Di chuot qua menu.

**Expected Result**:
Highlight khi hover.

---

## TC-012: He thong giai - Function - active state

- **ID**: TC-012
- **Type**: Functional
- **Area**: Function > Menu Navigation
- **Pre-condition**: Page is loaded
- **Test Data**: N/A

**Steps**:
1. Click Top Talent.
2. Check.
3. Click MVP.
4. Check.

**Expected Result**:
Chi muc duoc click active.

---

## TC-013: He thong giai - Function - button Chi tiet

- **ID**: TC-013
- **Type**: Functional
- **Area**: Function > Banner
- **Pre-condition**: Page is loaded, scrolled to banner
- **Test Data**: N/A

**Steps**:
1. Cuon den banner.
2. Click Chi tiet.

**Expected Result**:
Trang Sun* Kudos mo.

---

## TC-014: He thong giai - Error - invalid section

- **ID**: TC-014
- **Type**: Error
- **Area**: Error Handling > Navigation
- **Pre-condition**: Page is loaded
- **Test Data**: Non-existent section ID

**Steps**:
1. Truy cap section khong ton tai.

**Expected Result**:
Khong loi JS. Trang giu nguyen.

---

## TC-015: He thong giai - Error - failed navigation

- **ID**: TC-015
- **Type**: Error
- **Area**: Error Handling > Navigation
- **Pre-condition**: Network or server error simulated
- **Test Data**: N/A

**Steps**:
1. Mo phong loi.
2. Click Chi tiet.

**Expected Result**:
Thong bao loi hoac 404.

---
