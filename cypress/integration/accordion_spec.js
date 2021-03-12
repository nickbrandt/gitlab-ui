describe('GlAccordion', () => {
  before(() => {
    cy.visit('iframe.html?id=base-accordion--default&viewMode=story');
  });

  it('clicking on collapsed chevron icon expands accordion item then collapses when clicked again', () => {
    cy.get('[data-testid="accordion-item-collapse-accordion-item-2"]').should(
      'not.have.class',
      'show'
    );

    cy.get('.gl-accordion-item').first().find('button').click();

    cy.get('[data-testid="accordion-item-collapse-accordion-item-2"]').should('have.class', 'show');
  });

  it('clicking on expanded chevron icon collapses accordion item', () => {
    cy.get('[data-testid="accordion-item-collapse-accordion-item-2"]').should('have.class', 'show');

    cy.get('.gl-accordion-item').first().find('button').click();

    cy.get('[data-testid="accordion-item-collapse-accordion-item-2"]').should(
      'not.have.class',
      'show'
    );
  });
});
