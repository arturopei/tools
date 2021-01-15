/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://bdp-int.cn.bg.corpintra.net/dsp-frontend-dev/#/login')
  })

  it('.type() - login', () => {
    cy.screenshot()
    cy.get('[name=username]')
      .type('jiaxin').should('have.value', 'jiaxin')

      cy.get('[name=password]')
      .type('!jmfiy1fH').should('have.value', '!jmfiy1fH')

      cy.contains('Login').click()
      cy.wait(1000)
      cy.get('.el-icon-s-data').next().click()
      //cy.get(':nth-child(3) > .el-submenu__title > .el-submenu__icon-arrow').click()
      cy.contains('Message Broker Management').click()
      cy.wait(5000)
      cy.contains('Message Broker Name').parent().children('.el-form-item__content').type('jiaxintest')
      cy.contains('Message Broker Type').parent().children('.el-form-item__content').type('ServiceBus')
      //cy.wait(1000)
      cy.get('.el-scrollbar').eq(1).find('.el-select-dropdown__list li').eq(1).click()
      cy.wait(1000)
      cy.contains('Search').click()
  })

})
