import { v4 as uuid } from 'uuid';

describe('Adding scenarios', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:4200/');
    cy.get('[data-e2e="email"]').type("testuser@testuser.com");
    cy.get('[data-e2e="password"]').type("testuser@testuser.com");
    cy.get('[data-e2e="submit"]').click();
    
  });

  it('should add advertisement', () => {
    cy.intercept('POST', '**/api/advertisements').as('addAdvertisement')

    cy.get('[data-e2e="add"]').click();
    cy.get('[data-e2e="title"]').type(`title${uuid()}`);
    cy.get('[data-e2e="description"]').type("description");
    cy.get('[data-e2e="contact"]').type("contact");
    cy.get('[data-e2e="address"]').type("address");

    cy.get('[data-e2e="submit"]').click();

    cy.wait("@addAdvertisement").then(res=>{
      const guid = res.response.body.guid;
      cy.wrap(guid).should('not.equal','');
      cy.url().should('include', `/advertisement/${guid}`);
      cy.wrap(res).its('response.statusCode').should('eq', 200)
    })
  
    cy.get('[data-e2e="edit"]').should('not.be.disabled');
    cy.get('[data-e2e="delete"]').should('not.be.disabled');
    
      
  })
})