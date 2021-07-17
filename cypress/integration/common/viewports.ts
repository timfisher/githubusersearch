import { Given } from "cypress-cucumber-preprocessor/steps"

Given(`the viewport is mobile`, () => {
  cy.viewport("iphone-6")
})

Given(`the viewport is tablet`, () => {
  cy.viewport("ipad-2")
})

Given(`the viewport is desktop`, () => {
  cy.viewport(2560, 1212)
})
