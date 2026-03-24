# Test Cases: Viet Kudo

**Frame ID**: `520:11602`
**Generated At**: 2026-03-24
**Total Test Cases**: 57

---

## TC-001: Viet Kudo - Access - authenticated

- **ID**: TC-001
- **Type**: Functional
- **Area**: Access > Authentication
- **Pre-condition**: User has valid credentials
- **Test Data**: Valid user account

**Steps**:
1. Dang nhap.
2. Navigate den nut Viet Kudo.
3. Click.

**Expected Result**:
Modal mo thanh cong.

---

## TC-002: Viet Kudo - Access - unauthenticated

- **ID**: TC-002
- **Type**: Functional
- **Area**: Access > Authentication
- **Pre-condition**: User is not logged in
- **Test Data**: N/A

**Steps**:
1. Truy cap khong dang nhap.
2. Co gang truy cap Viet Kudo.

**Expected Result**:
Chuyen huong dang nhap.

---

## TC-003: Viet Kudo - Access - navigation

- **ID**: TC-003
- **Type**: Functional
- **Area**: Access > Navigation
- **Pre-condition**: User is logged in
- **Test Data**: Valid user account

**Steps**:
1. Dang nhap.
2. Navigate den man hinh nguon.
3. Click Viet Kudo.

**Expected Result**:
Modal hien thi day du.

---

## TC-004: Viet Kudo - GUI - layout

- **ID**: TC-004
- **Type**: GUI
- **Area**: GUI > Layout
- **Pre-condition**: Modal is open
- **Test Data**: N/A

**Steps**:
1. Mo modal.
2. Quan sat cau truc.
3. Kiem tra vi tri.

**Expected Result**:
Tieu de o dau, truong theo thu tu, nut Huy va Gui o footer.

---

## TC-005: Viet Kudo - GUI - recipient placeholder

- **ID**: TC-005
- **Type**: GUI
- **Area**: GUI > Recipient Field
- **Pre-condition**: Modal is open
- **Test Data**: N/A

**Steps**:
1. Mo modal.
2. Quan sat truong Nguoi nhan.
3. Check placeholder.

**Expected Result**:
Placeholder 'Tim kiem'.

---

## TC-006: Viet Kudo - GUI - textarea placeholder

- **ID**: TC-006
- **Type**: GUI
- **Area**: GUI > Textarea
- **Pre-condition**: Modal is open
- **Test Data**: N/A

**Steps**:
1. Mo modal.
2. Quan sat textarea.
3. Check placeholder.

**Expected Result**:
Placeholder 'Hay gui gam loi cam on...'.

---

## TC-007: Viet Kudo - GUI - checkbox default

- **ID**: TC-007
- **Type**: GUI
- **Area**: GUI > Checkbox
- **Pre-condition**: Modal is open
- **Test Data**: N/A

**Steps**:
1. Mo modal.
2. Quan sat checkbox.
3. Check trang thai.

**Expected Result**:
Unchecked by default.

---

## TC-008: Viet Kudo - Validation - empty recipient

- **ID**: TC-008
- **Type**: Validation
- **Area**: Validation > Recipient
- **Pre-condition**: Modal is open
- **Test Data**: Empty recipient field

**Steps**:
1. De trong Nguoi nhan.
2. Nhap cac truong khac.
3. Click Gui.

**Expected Result**:
Vien do + loi. Form khong submit.

---

## TC-009: Viet Kudo - Function - recipient search

- **ID**: TC-009
- **Type**: Functional
- **Area**: Function > Recipient Search
- **Pre-condition**: Modal is open
- **Test Data**: Search keyword 'Nguyen'

**Steps**:
1. Click truong Nguoi nhan.
2. Nhap 'Nguyen'.

**Expected Result**:
Danh sach goi y hien thi.

---

## TC-010: Viet Kudo - Validation - special chars in search

- **ID**: TC-010
- **Type**: Validation
- **Area**: Validation > Recipient Search
- **Pre-condition**: Modal is open
- **Test Data**: Special characters '@ # $'

**Steps**:
1. Nhap '@ # $' vao truong Nguoi nhan.

**Expected Result**:
Loc chinh xac hoac khong ket qua.

---

## TC-011: Viet Kudo - Validation - spaces in search

- **ID**: TC-011
- **Type**: Validation
- **Area**: Validation > Recipient Search
- **Pre-condition**: Modal is open
- **Test Data**: '  Nguyen  ' (with spaces)

**Steps**:
1. Nhap '  Nguyen  '.

**Expected Result**:
Trim khoang trang, goi y chinh xac.

---

## TC-012: Viet Kudo - Validation - empty content

- **ID**: TC-012
- **Type**: Validation
- **Area**: Validation > Content
- **Pre-condition**: Modal is open, recipient selected
- **Test Data**: Empty textarea

**Steps**:
1. Chon Nguoi nhan.
2. De trong textarea.
3. Them hashtag.
4. Click Gui.

**Expected Result**:
Loi 'Khong duoc de trong'.

---

## TC-013: Viet Kudo - Function - mention @

- **ID**: TC-013
- **Type**: Functional
- **Area**: Function > Mention
- **Pre-condition**: Modal is open, typing in textarea
- **Test Data**: '@' character followed by name

**Steps**:
1. Nhap 'Cam on @'.
2. Go ten.

**Expected Result**:
Danh sach goi y ten.

---

## TC-014: Viet Kudo - Function - select mention

- **ID**: TC-014
- **Type**: Functional
- **Area**: Function > Mention
- **Pre-condition**: Mention suggestions visible
- **Test Data**: Select 'NguyenVanA'

**Steps**:
1. Nhap '@'.
2. Chon 'NguyenVanA'.

**Expected Result**:
Ten duoc mention.

---

## TC-015: Viet Kudo - Validation - empty hashtag

- **ID**: TC-015
- **Type**: Validation
- **Area**: Validation > Hashtag
- **Pre-condition**: Modal is open, recipient and content filled
- **Test Data**: No hashtag selected

**Steps**:
1. Chon Nguoi nhan + noi dung.
2. Khong them hashtag.
3. Click Gui.

**Expected Result**:
Loi 'Khong duoc de trong'.

---

## TC-016: Viet Kudo - Function - add 1 hashtag

- **ID**: TC-016
- **Type**: Functional
- **Area**: Function > Hashtag
- **Pre-condition**: Modal is open
- **Test Data**: 1 hashtag

**Steps**:
1. Click + Hashtag.
2. Them 1 tag.
3. Click Gui.

**Expected Result**:
Them thanh cong. Submit thanh cong.

---

## TC-017: Viet Kudo - Function - add 5 hashtags

- **ID**: TC-017
- **Type**: Functional
- **Area**: Function > Hashtag
- **Pre-condition**: Modal is open
- **Test Data**: 5 hashtags

**Steps**:
1. Click + Hashtag.
2. Them 5 tags.

**Expected Result**:
5 hashtag them thanh cong.

---

## TC-018: Viet Kudo - Validation - 6th hashtag

- **ID**: TC-018
- **Type**: Validation
- **Area**: Validation > Hashtag
- **Pre-condition**: 5 hashtags already added
- **Test Data**: 6th hashtag

**Steps**:
1. Them 5 hashtag.
2. Co them thu 6.

**Expected Result**:
Thong bao 'Toi da 5 hashtag'.

---

## TC-019: Viet Kudo - Function - upload 3 images

- **ID**: TC-019
- **Type**: Functional
- **Area**: Function > Image Upload
- **Pre-condition**: Modal is open
- **Test Data**: 3 jpg images

**Steps**:
1. Click + Image.
2. Chon 3 anh jpg.

**Expected Result**:
3 anh upload + thumbnail.

---

## TC-020: Viet Kudo - Function - upload 5 images

- **ID**: TC-020
- **Type**: Functional
- **Area**: Function > Image Upload
- **Pre-condition**: Modal is open
- **Test Data**: 5 images

**Steps**:
1. Click + Image.
2. Chon 5 anh.

**Expected Result**:
5 anh upload. Nut an.

---

## TC-021: Viet Kudo - Validation - 6th image

- **ID**: TC-021
- **Type**: Validation
- **Area**: Validation > Image Upload
- **Pre-condition**: 5 images already uploaded
- **Test Data**: 6th image

**Steps**:
1. Upload 5 anh.
2. Co them thu 6.

**Expected Result**:
Nut an, khong them duoc.

---

## TC-022: Viet Kudo - Function - upload jpg

- **ID**: TC-022
- **Type**: Functional
- **Area**: Function > Image Upload
- **Pre-condition**: Modal is open
- **Test Data**: .jpg file

**Steps**:
1. Click + Image.
2. Chon file .jpg.

**Expected Result**:
Upload thanh cong + thumbnail.

---

## TC-023: Viet Kudo - Function - upload png

- **ID**: TC-023
- **Type**: Functional
- **Area**: Function > Image Upload
- **Pre-condition**: Modal is open
- **Test Data**: .png file

**Steps**:
1. Click + Image.
2. Chon file .png.

**Expected Result**:
Upload thanh cong + thumbnail.

---

## TC-024: Viet Kudo - Validation - upload pdf

- **ID**: TC-024
- **Type**: Validation
- **Area**: Validation > Image Upload
- **Pre-condition**: Modal is open
- **Test Data**: .pdf file

**Steps**:
1. Click + Image.
2. Chon file .pdf.

**Expected Result**:
Loi dinh dang.

---

## TC-025: Viet Kudo - Validation - upload mp4

- **ID**: TC-025
- **Type**: Validation
- **Area**: Validation > Image Upload
- **Pre-condition**: Modal is open
- **Test Data**: .mp4 file

**Steps**:
1. Click + Image.
2. Chon file .mp4.

**Expected Result**:
Loi dinh dang.

---

## TC-026: Viet Kudo - Function - recipient input search

- **ID**: TC-026
- **Type**: Functional
- **Area**: Function > Recipient Search
- **Pre-condition**: Modal is open
- **Test Data**: Search keyword 'An'

**Steps**:
1. Click truong Nguoi nhan.
2. Nhap 'An'.

**Expected Result**:
Goi y hien thi ngay.

---

## TC-027: Viet Kudo - Function - select from dropdown

- **ID**: TC-027
- **Type**: Functional
- **Area**: Function > Recipient Selection
- **Pre-condition**: Suggestions visible
- **Test Data**: Select 'Nguyen Van An'

**Steps**:
1. Nhap 'An'.
2. Chon 'Nguyen Van An'.

**Expected Result**:
Ten dien vao truong. Dropdown dong.

---

## TC-028: Viet Kudo - Function - bold format

- **ID**: TC-028
- **Type**: Functional
- **Area**: Function > Text Formatting
- **Pre-condition**: Text entered in textarea
- **Test Data**: Selected text

**Steps**:
1. Nhap text.
2. Boi den.
3. Click B.

**Expected Result**:
Text in dam.

---

## TC-029: Viet Kudo - Function - italic format

- **ID**: TC-029
- **Type**: Functional
- **Area**: Function > Text Formatting
- **Pre-condition**: Text entered in textarea
- **Test Data**: Selected text

**Steps**:
1. Nhap text.
2. Boi den.
3. Click I.

**Expected Result**:
Text in nghieng.

---

## TC-030: Viet Kudo - Function - strikethrough

- **ID**: TC-030
- **Type**: Functional
- **Area**: Function > Text Formatting
- **Pre-condition**: Text entered in textarea
- **Test Data**: Selected text

**Steps**:
1. Nhap text.
2. Boi den.
3. Click S.

**Expected Result**:
Text gach ngang.

---

## TC-031: Viet Kudo - Function - number list

- **ID**: TC-031
- **Type**: Functional
- **Area**: Function > Text Formatting
- **Pre-condition**: Multi-line text entered
- **Test Data**: Multi-line text

**Steps**:
1. Nhap text nhieu dong.
2. Boi den.
3. Click Number list.

**Expected Result**:
Danh sach danh so.

---

## TC-032: Viet Kudo - Function - insert link

- **ID**: TC-032
- **Type**: Functional
- **Area**: Function > Text Formatting
- **Pre-condition**: Text entered in textarea
- **Test Data**: URL to insert

**Steps**:
1. Nhap text.
2. Click Link.
3. Nhap URL.

**Expected Result**:
Lien ket duoc chen.

---

## TC-033: Viet Kudo - Function - insert quote

- **ID**: TC-033
- **Type**: Functional
- **Area**: Function > Text Formatting
- **Pre-condition**: Text entered in textarea
- **Test Data**: Selected text

**Steps**:
1. Nhap text.
2. Boi den.
3. Click Quote.

**Expected Result**:
Dinh dang trich dan.

---

## TC-034: Viet Kudo - Function - mention in textarea

- **ID**: TC-034
- **Type**: Functional
- **Area**: Function > Mention
- **Pre-condition**: Modal is open
- **Test Data**: '@Nguyen' in textarea

**Steps**:
1. Nhap '@Nguyen' vao textarea.

**Expected Result**:
Danh sach goi y ten.

---

## TC-035: Viet Kudo - Function - add hashtag chip

- **ID**: TC-035
- **Type**: Functional
- **Area**: Function > Hashtag
- **Pre-condition**: Modal is open
- **Test Data**: Hashtag 'TeamWork'

**Steps**:
1. Click + Hashtag.
2. Chon 'TeamWork'.

**Expected Result**:
Dropdown hien thi. Chip added.

---

## TC-036: Viet Kudo - Function - add multiple hashtags

- **ID**: TC-036
- **Type**: Functional
- **Area**: Function > Hashtag
- **Pre-condition**: Modal is open
- **Test Data**: Tag1, Tag2, Tag3

**Steps**:
1. Them Tag1.
2. Them Tag2.
3. Them Tag3.

**Expected Result**:
3 chip rieng biet.

---

## TC-037: Viet Kudo - Function - remove hashtag

- **ID**: TC-037
- **Type**: Functional
- **Area**: Function > Hashtag
- **Pre-condition**: Hashtags added
- **Test Data**: Tag1, Tag2

**Steps**:
1. Them Tag1, Tag2.
2. Click x tren Tag1.

**Expected Result**:
Tag1 bien mat. Con Tag2.

---

## TC-038: Viet Kudo - Function - add image

- **ID**: TC-038
- **Type**: Functional
- **Area**: Function > Image Upload
- **Pre-condition**: Modal is open
- **Test Data**: 1 jpg file

**Steps**:
1. Click + Image.
2. Chon 1 file jpg.

**Expected Result**:
File picker mo. Anh upload + thumbnail.

---

## TC-039: Viet Kudo - Function - 5 images hides button

- **ID**: TC-039
- **Type**: Functional
- **Area**: Function > Image Upload
- **Pre-condition**: Modal is open
- **Test Data**: 5 images

**Steps**:
1. Upload 5 anh.

**Expected Result**:
Nut + Image an.

---

## TC-040: Viet Kudo - Function - remove image

- **ID**: TC-040
- **Type**: Functional
- **Area**: Function > Image Upload
- **Pre-condition**: Images uploaded
- **Test Data**: 3 images

**Steps**:
1. Upload 3 anh.
2. Click x tren anh 2.

**Expected Result**:
Anh 2 xoa. Con 2 anh.

---

## TC-041: Viet Kudo - Function - remove restores button

- **ID**: TC-041
- **Type**: Functional
- **Area**: Function > Image Upload
- **Pre-condition**: 5 images uploaded, button hidden
- **Test Data**: 5 images

**Steps**:
1. Upload 5 anh (nut an).
2. Click x xoa 1.

**Expected Result**:
Nut + Image hien lai.

---

## TC-042: Viet Kudo - Function - checkbox toggle on

- **ID**: TC-042
- **Type**: Functional
- **Area**: Function > Anonymous Checkbox
- **Pre-condition**: Modal is open
- **Test Data**: N/A

**Steps**:
1. Click checkbox an danh.

**Expected Result**:
Checkbox checked.

---

## TC-043: Viet Kudo - Function - checkbox toggle off

- **ID**: TC-043
- **Type**: Functional
- **Area**: Function > Anonymous Checkbox
- **Pre-condition**: Checkbox is checked
- **Test Data**: N/A

**Steps**:
1. Check.
2. Click lai.

**Expected Result**:
Checkbox unchecked.

---

## TC-044: Viet Kudo - Function - checkbox shows name field

- **ID**: TC-044
- **Type**: Functional
- **Area**: Function > Anonymous Checkbox
- **Pre-condition**: Modal is open
- **Test Data**: N/A

**Steps**:
1. Click checkbox.

**Expected Result**:
Text field ten an danh hien.

---

## TC-045: Viet Kudo - Function - checkbox hides name field

- **ID**: TC-045
- **Type**: Functional
- **Area**: Function > Anonymous Checkbox
- **Pre-condition**: Checkbox is checked, name field visible
- **Test Data**: N/A

**Steps**:
1. Check (field hien).
2. Uncheck.

**Expected Result**:
Text field an.

---

## TC-046: Viet Kudo - Function - cancel button

- **ID**: TC-046
- **Type**: Functional
- **Area**: Function > Form Actions
- **Pre-condition**: Modal is open with data entered
- **Test Data**: Filled form data

**Steps**:
1. Nhap du lieu.
2. Click Huy.

**Expected Result**:
Modal dong. Du lieu khong luu.

---

## TC-047: Viet Kudo - Function - submit form

- **ID**: TC-047
- **Type**: Functional
- **Area**: Function > Form Actions
- **Pre-condition**: All required fields filled
- **Test Data**: Complete form data with hashtags and images

**Steps**:
1. Dien day du.
2. Them hashtag + anh.
3. Click Gui.

**Expected Result**:
Validate OK. Loading. Modal dong.

---

## TC-048: Viet Kudo - Function - submit without images

- **ID**: TC-048
- **Type**: Functional
- **Area**: Function > Form Actions
- **Pre-condition**: Required fields filled, no images
- **Test Data**: Recipient + content + 1 hashtag

**Steps**:
1. Chon Nguoi nhan + noi dung + 1 hashtag.
2. Click Gui (khong anh).

**Expected Result**:
Submit thanh cong.

---

## TC-049: Viet Kudo - Function - submit disabled

- **ID**: TC-049
- **Type**: Functional
- **Area**: Function > Form Actions
- **Pre-condition**: Modal is open
- **Test Data**: Empty required fields

**Steps**:
1. Khong dien bat buoc.
2. Quan sat nut Gui.

**Expected Result**:
Nut Gui disabled.

---

## TC-050: Viet Kudo - Function - submit enabled

- **ID**: TC-050
- **Type**: Functional
- **Area**: Function > Form Actions
- **Pre-condition**: Modal is open
- **Test Data**: Recipient + content + hashtag

**Steps**:
1. Chon Nguoi nhan + noi dung + hashtag.
2. Quan sat.

**Expected Result**:
Nut Gui enabled.

---

## TC-051: Viet Kudo - Error - empty recipient

- **ID**: TC-051
- **Type**: Error
- **Area**: Error Handling > Recipient
- **Pre-condition**: Other fields filled
- **Test Data**: Empty recipient

**Steps**:
1. Cac truong khac OK.
2. De trong Nguoi nhan.
3. Click Gui.

**Expected Result**:
Vien do + loi.

---

## TC-052: Viet Kudo - Error - empty content

- **ID**: TC-052
- **Type**: Error
- **Area**: Error Handling > Content
- **Pre-condition**: Recipient and hashtag selected
- **Test Data**: Empty content

**Steps**:
1. Chon Nguoi nhan + hashtag.
2. De trong noi dung.
3. Click Gui.

**Expected Result**:
Loi 'Khong duoc de trong'.

---

## TC-053: Viet Kudo - Error - empty hashtag

- **ID**: TC-053
- **Type**: Error
- **Area**: Error Handling > Hashtag
- **Pre-condition**: Recipient and content filled
- **Test Data**: No hashtag

**Steps**:
1. Nguoi nhan + noi dung.
2. Khong hashtag.
3. Click Gui.

**Expected Result**:
Loi 'Khong duoc de trong'.

---

## TC-054: Viet Kudo - Error - exceed 5 hashtags

- **ID**: TC-054
- **Type**: Error
- **Area**: Error Handling > Hashtag
- **Pre-condition**: 5 hashtags added
- **Test Data**: 6th hashtag

**Steps**:
1. Them 5.
2. Co them thu 6.

**Expected Result**:
Thong bao 'Toi da 5 hashtag'.

---

## TC-055: Viet Kudo - Error - exceed 5 images

- **ID**: TC-055
- **Type**: Error
- **Area**: Error Handling > Image Upload
- **Pre-condition**: 5 images uploaded
- **Test Data**: N/A

**Steps**:
1. Upload 5.
2. Nut an.

**Expected Result**:
Khong the them.

---

## TC-056: Viet Kudo - Error - invalid file type

- **ID**: TC-056
- **Type**: Error
- **Area**: Error Handling > Image Upload
- **Pre-condition**: Modal is open
- **Test Data**: .txt file

**Steps**:
1. Click + Image.
2. Chon .txt.

**Expected Result**:
Loi dinh dang.

---

## TC-057: Viet Kudo - Error - all empty submit

- **ID**: TC-057
- **Type**: Error
- **Area**: Error Handling > Form
- **Pre-condition**: Modal is open
- **Test Data**: All fields empty

**Steps**:
1. De trong tat ca.
2. Click Gui.

**Expected Result**:
Loi cho tat ca truong bat buoc. Form khong submit.

---
