from playwright.sync_api import sync_playwright

def verify_skip_link():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        try:
            print("Navigating to http://localhost:3000")
            page.goto("http://localhost:3000")

            # Wait for content to load
            print("Waiting for page content...")
            page.wait_for_selector("h1:has-text('Mohammad Raihan Rabbani')", timeout=15000)

            # Take screenshot of the page to confirm layout
            page.screenshot(path="/app/verification_page_layout.png")

            # Check if SkipLink exists in DOM
            skip_link_locator = page.locator("text='Skip to content'")
            skip_link_count = skip_link_locator.count()
            print(f"Skip link count: {skip_link_count}")

            if skip_link_count > 0:
                # Force focus on it
                print("Forcing focus on skip link...")
                skip_link_locator.focus()

                # Verify it is now visible (checked via screenshot)
                page.screenshot(path="/app/verification_skip_link_focused.png")

                focused_element = page.evaluate("document.activeElement.innerText")
                print(f"Focused element after force focus: {focused_element}")

                if "Skip to content" in focused_element:
                    print("SUCCESS: Skip link focused.")
                    href = page.evaluate("document.activeElement.getAttribute('href')")
                    if href == "#main-content":
                         print("SUCCESS: correct href.")
                    else:
                         print(f"FAIL: incorrect href {href}")
                else:
                    print("FAIL: Skip link not focused.")

            else:
                print("FAIL: Skip link not found in DOM.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_skip_link()
