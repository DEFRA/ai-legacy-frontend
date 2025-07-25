/**
 * Home page controller that redirects to the holdings management page.
 * This makes the holdings management the main landing page for users.
 */
export const homeController = {
  handler(_request, h) {
    return h.redirect('/holdings')
  }
}
