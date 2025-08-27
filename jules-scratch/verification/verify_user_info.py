from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Start the app
        page.goto("http://localhost:8081", timeout=60000)

        # 2. Handle the User Info Modal
        expect(page.get_by_text("اطلاعات شما")).to_be_visible(timeout=30000)

        # Enter name
        page.get_by_placeholder("نام خود را وارد کنید").fill("Jules")

        # Select gender
        page.get_by_role("button", name="Male").click()

        # Save
        page.get_by_role("button", name="ذخیره").click()

        # 3. Verify Header Icon
        expect(page.locator('img[src*="MaleUser"]')).to_be_visible()
        page.screenshot(path="jules-scratch/verification/main_page.png")

        # 4. Navigate to Profile and Verify
        page.get_by_label("پروفایل").click()
        expect(page.get_by_text("Jules")).to_be_visible()
        expect(page.locator('img[src*="MaleUser"]')).to_be_visible()
        page.screenshot(path="jules-scratch/verification/profile_page.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
