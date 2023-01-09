import TheHeader from './TheHeader.vue'

describe('<TheHeader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(TheHeader)
  })
})
