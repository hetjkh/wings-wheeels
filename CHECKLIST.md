# ✅ Quick Lead Form - Implementation Checklist

## 🎯 Today (Get Started - 10 minutes)

- [ ] **Test the form locally**
  - Visit: `http://localhost:3000/quick-inquiry`
  - Fill it out and test the experience
  - Try on your mobile phone

- [ ] **Update phone numbers**
  - Open: `src/components/QuickLeadForm.jsx`
  - Find lines ~296-302
  - Replace `+91XXXXXXXXXX` with your actual numbers
  - Update both Call and WhatsApp links

- [ ] **Review service options**
  - Check lines 17-27 in `QuickLeadForm.jsx`
  - Make sure services match what you offer
  - Add/remove as needed

## 📱 This Week (Start Marketing - 30 minutes)

- [ ] **Setup Google Sheets** (to save leads)
  - Follow guide: `LEAD_FORM_SETUP.md`
  - Create Google Sheet
  - Setup Apps Script
  - Add URL to `.env.local`
  - Test submission
  - Expected time: 15 minutes

- [ ] **Create short links**
  - Go to bit.ly or tinyurl.com
  - Create: `bit.ly/wings-quote` → `yoursite.com/quick-inquiry`
  - Save for social media

- [ ] **Update social media bios**
  - Instagram bio: Add the link
  - Facebook: Update page info
  - WhatsApp Business: Add to greeting

## 🚀 Before Launch (Make it Live - 1 hour)

- [ ] **Add to homepage** (Optional but recommended)
  - Copy code from: `HOW_TO_ADD_TO_HOMEPAGE.md`
  - Add floating "Get Quote" button
  - Test on desktop and mobile

- [ ] **Customize styling**
  - Match your brand colors
  - Update button text if needed
  - Test all states (empty, error, success)

- [ ] **Setup email notifications**
  - In Google Apps Script
  - Add your email address
  - Test that you receive notifications

- [ ] **Test end-to-end**
  - Fill form
  - Check Google Sheets
  - Check email notification
  - Verify all data is correct

## 📢 After Launch (Marketing - Ongoing)

- [ ] **Create social media posts**
  - Facebook post with link
  - Instagram story with swipe-up
  - WhatsApp status

- [ ] **Update email signature**
  - Add "Get Travel Quote" button
  - Links to `/quick-inquiry`

- [ ] **Create QR code** (Optional)
  - Generate QR for the link
  - Print for physical materials
  - Use on business cards

- [ ] **Setup analytics** (Optional)
  - Track form opens
  - Track submissions
  - Monitor conversion rate

## 🎨 Customization (As Needed)

- [ ] **Brand colors**
  - Update blue → your brand color
  - Test contrast for readability

- [ ] **Add more fields** (Not recommended)
  - Keep it simple for best conversion
  - Only add if absolutely necessary

- [ ] **Translations** (If needed)
  - Hindi/regional languages
  - Update all labels and placeholders

## 📊 Success Metrics (Track Weekly)

- [ ] **Monitor leads**
  - Check Google Sheet regularly
  - Count submissions per week
  - Compare to old contact form

- [ ] **Response time**
  - Aim for < 1 hour response
  - This increases conversion significantly

- [ ] **Follow-up rate**
  - Ensure all leads are contacted
  - Track which sources work best

## 🔧 Troubleshooting

### If form doesn't submit:
- [ ] Check browser console for errors
- [ ] Verify Google Sheets URL in `.env.local`
- [ ] Test with all required fields filled
- [ ] Check internet connection

### If styling looks wrong:
- [ ] Clear browser cache
- [ ] Check Tailwind is working
- [ ] Verify all imports are correct

### If not receiving leads:
- [ ] Check Google Sheet permissions
- [ ] Verify Apps Script deployment
- [ ] Test API endpoint directly
- [ ] Check spam folder for emails

## 📚 Documentation Reference

| Need to... | Check this file |
|------------|----------------|
| Quick overview | `SUMMARY.md` |
| Get started fast | `QUICK_START_LEAD_FORM.md` |
| Setup Google Sheets | `LEAD_FORM_SETUP.md` |
| Add to homepage | `HOW_TO_ADD_TO_HOMEPAGE.md` |
| See visual guide | `LEAD_FORM_OVERVIEW.md` |
| Understand structure | This file! |

## 🎯 Priority Order

### Must Do (Essential):
1. ✅ Update phone numbers
2. ✅ Test the form
3. ✅ Setup Google Sheets

### Should Do (Recommended):
4. ✅ Add to homepage
5. ✅ Create short link
6. ✅ Update social media

### Nice to Have (Optional):
7. ✅ Customize colors
8. ✅ Add analytics
9. ✅ Create QR code

## 🎉 Done?

Once you've checked off the "Must Do" items above, you're ready to start getting leads!

**Share your link and watch the inquiries come in!** 🚀

---

## 📞 Need Help?

All guides are in the project root:
- `SUMMARY.md` - Overview
- `QUICK_START_LEAD_FORM.md` - Getting started
- `LEAD_FORM_SETUP.md` - Detailed setup
- `HOW_TO_ADD_TO_HOMEPAGE.md` - Integration
- `LEAD_FORM_OVERVIEW.md` - Visual guide

---

**Remember:** The simpler the form, the more leads you'll get! ✨

